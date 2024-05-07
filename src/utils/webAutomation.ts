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
  }

  public async blast() {
    for (const participant of this.participants) {
      // console.log(`Blasting message to ${participant}`);
      await this.send(participant, this.message);
    }
    this.closeDriver();
  }

  private async send(phone: string, message: string) {
    const paneSideId = "pane-side";
    const timeOut = 100000;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await this.driver.get(this.url);
        await this.driver.wait(
          until.elementLocated(By.id(paneSideId)),
          timeOut
        );
        console.debug("Page loaded");
        break;
      } catch (error) {
        console.debug("Waiting for page to load");
        await this.driver.navigate().refresh();
      }
    }
    await this.driver.get(
      `https://web.whatsapp.com/send?phone=${phone}&text=${message}`
    );
    // Code to send message to phone
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
