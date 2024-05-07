import { Builder, WebDriver, By, until } from "selenium-webdriver";

export class WapipoMator {
  private participants: string[];
  private message: string;
  private driver: WebDriver;
  private url: string;

  constructor(participants: string[], message: string) {
    this.participants = participants;
    this.message = message;
    this.driver = new Builder().forBrowser("firefox").build();
    this.url = "https://web.whatsapp.com";
    this.openWebPage(this.url);
    this.driver.sleep(5000);
  }

  public async blast() {
    for (const participant of this.participants) {
      // console.log(`Blasting message to ${participant}`);
      await this.send(participant, this.message);
    }
    this.closeDriver();
  }

  private async send(phone: string, message: string) {
    const messageXPath =
      "//p[@class='selectable-text copyable-text x15bjb6t x1n2onr6' and @dir='ltr']//span[@class='selectable-text copyable-text' and @data-lexical-text='true']";
    const timeOut = 100000;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await this.driver.get(
          `https://web.whatsapp.com/send?phone=${phone}&text=${message}`
        );
        await this.driver.wait(
          until.elementLocated(By.xpath(messageXPath)),
          timeOut
        );
        console.debug("Page loaded");
        break;
      } catch (error) {
        console.debug("Waiting for page to load");
        await this.driver.navigate().refresh();
      }
    }
    const sendButtonXPath = "//button[@aria-label='Kirim']";
    const sendButton = this.driver.findElement(By.xpath(sendButtonXPath));
    // Scroll the send button into view
    await this.driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      sendButton
    );
    await this.driver.sleep(5000);
    await sendButton.click();
    console.debug("Message sent");
    await this.driver.sleep(5000);
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
