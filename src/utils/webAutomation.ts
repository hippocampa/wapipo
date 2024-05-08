import { Builder, WebDriver, By, until } from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";

export class WapipoMator {
  private driver: WebDriver;
  private readonly url = "https://web.whatsapp.com";
  private participants: string[];
  private message: string;

  constructor(participants: string[], message: string, driverPath: string) {
    this.participants = participants;
    this.message = message;
    const options = new firefox.Options();
    options.setBinary(driverPath);
    this.driver = new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options)
      .build();
    this.openWebPage(this.url);
    this.driver.sleep(5000);
  }

  public async blast() {
    const results = this.participants.map((participant) => ({
      participant,
      status: "Pending",
    }));

    for (const result of results) {
      const success = await this.send(result.participant, this.message);
      result.status = success ? "Success" : "Failed";
    }

    console.table(results);

    this.closeDriver();
  }

  private async send(phone: string, message: string): Promise<boolean> {
    const messageXPath =
      "//p[@class='selectable-text copyable-text x15bjb6t x1n2onr6' and @dir='ltr']//span[@class='selectable-text copyable-text' and @data-lexical-text='true']";
    const timeOut = 100000;
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.driver.get(
          `${this.url}/send?phone=${phone}&text=${message}`
        );
        await this.driver.wait(
          until.elementLocated(By.xpath(messageXPath)),
          timeOut
        );
        console.debug(
          `Page loaded successfully on attempt ${attempt} for phone number ${phone}`
        );
        break;
      } catch (error) {
        console.debug(
          `Attempt ${attempt} to load page for phone number ${phone} failed. Retrying...`
        );
        await this.driver.navigate().refresh();
        if (attempt === maxAttempts) {
          console.error(
            `Failed to load page after ${maxAttempts} attempts for phone number ${phone}`
          );
          return false;
        }
      }
    }

    const sendButtonXPath = "//button[@aria-label='Kirim']";
    const sendButton = await this.driver.findElement(By.xpath(sendButtonXPath));
    await this.driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      sendButton
    );
    await this.driver.sleep(5000);
    await sendButton.click();
    console.debug(`Message sent to phone number ${phone}`);
    await this.driver.sleep(5000);
    return true;
  }

  private async openWebPage(url: string) {
    await this.driver.get(url);
    const canvasXPath =
      "//canvas[@width='264' and @height='264' and @aria-label='Scan me!' and @role='img']";
    await this.driver.wait(until.elementLocated(By.xpath(canvasXPath)), 30000);
    console.debug("QR Code Detected");
  }

  public async closeDriver() {
    await this.driver.quit();
  }
}
