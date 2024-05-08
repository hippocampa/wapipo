"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWapipo = void 0;
const commander_1 = require("commander");
const preprocess_1 = require("./utils/preprocess");
const messageEncoder_1 = require("./utils/messageEncoder");
const webAutomation_1 = require("./utils/webAutomation");
const path_1 = __importDefault(require("path"));
function runWapipo() {
    const program = new commander_1.Command();
    program
        .version("1.0.0") // Add version information
        .description("Wapipo: A CLI tool for broadcasting whatsapp messages to a list of participants. Author: I Gede Teguh Satya Dharma <tsdhrm@outlook.com>"); // Add a description
    program
        .command("blast")
        .description("Blast (broadcast) a message to a list of participants")
        .option("-p, --participants <dir>", "Directory of the participants file")
        .option("-m, --message <dir>", "Directory of the message file")
        .option("-d, --driver <path>", "Path to the webdriver", "/usr/local/bin/geckodriver")
        .action(async (options) => {
        const participantsPath = path_1.default.resolve(options.participants);
        const messagePath = path_1.default.resolve(options.message);
        const driverPath = path_1.default.resolve(options.driver);
        console.debug("Participants path: ", participantsPath);
        console.debug("Message path: ", messagePath);
        console.debug("Driver path: ", driverPath);
        const phonenums = (0, preprocess_1.readPhoneNumber)(participantsPath);
        const message = (0, messageEncoder_1.msgEncoder)(messagePath);
        const pphonenums = (0, preprocess_1.preprocessAll)(phonenums);
        const wapipo = new webAutomation_1.WapipoMator(pphonenums, message, driverPath);
        await wapipo.blast();
    });
    program.parse(process.argv);
}
exports.runWapipo = runWapipo;
