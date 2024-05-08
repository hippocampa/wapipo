"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WapipoMator = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const firefox = __importStar(require("selenium-webdriver/firefox"));
const path_1 = __importDefault(require("path"));
class WapipoMator {
    static DEFAULT_DRIVER_PATHS = {
        win32: path_1.default.join("C:", "WebDriver", "bin", "geckodriver.exe"),
        darwin: path_1.default.join("/", "usr", "local", "bin", "geckodriver"),
        linux: path_1.default.join("/", "usr", "local", "bin", "geckodriver"),
    };
    driver;
    url = "https://web.whatsapp.com";
    participants;
    message;
    constructor(participants, message, driverPath) {
        this.participants = participants;
        this.message = message;
        if (!driverPath) {
            driverPath =
                WapipoMator.DEFAULT_DRIVER_PATHS[process.platform];
        }
        const options = new firefox.Options();
        this.driver = new selenium_webdriver_1.Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(options)
            .setFirefoxService(new firefox.ServiceBuilder(driverPath))
            .build();
        this.openWebPage(this.url);
        this.driver.sleep(5000);
    }
    async blast() {
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
    async send(phone, message) {
        const messageXPath = "//p[@class='selectable-text copyable-text x15bjb6t x1n2onr6' and @dir='ltr']//span[@class='selectable-text copyable-text' and @data-lexical-text='true']";
        const timeOut = 100000;
        const maxAttempts = 3;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await this.driver.get(`${this.url}/send?phone=${phone}&text=${message}`);
                await this.driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath(messageXPath)), timeOut);
                console.debug(`Page loaded successfully on attempt ${attempt} for phone number ${phone}`);
                break;
            }
            catch (error) {
                console.debug(`Attempt ${attempt} to load page for phone number ${phone} failed. Retrying...`);
                await this.driver.navigate().refresh();
                if (attempt === maxAttempts) {
                    console.error(`Failed to load page after ${maxAttempts} attempts for phone number ${phone}`);
                    return false;
                }
            }
        }
        const sendButtonXPath = "//button[@aria-label='Kirim']";
        const sendButton = await this.driver.findElement(selenium_webdriver_1.By.xpath(sendButtonXPath));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", sendButton);
        await this.driver.sleep(5000);
        await sendButton.click();
        console.debug(`Message sent to phone number ${phone}`);
        await this.driver.sleep(5000);
        return true;
    }
    async openWebPage(url) {
        await this.driver.get(url);
        const canvasXPath = "//canvas[@width='264' and @height='264' and @aria-label='Scan me!' and @role='img']";
        await this.driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath(canvasXPath)), 30000);
        console.debug("QR Code Detected");
    }
    async closeDriver() {
        await this.driver.quit();
    }
}
exports.WapipoMator = WapipoMator;
