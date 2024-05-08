"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWapipo = void 0;
const commander_1 = require("commander");
const preprocess_1 = require("./utils/preprocess");
const messageEncoder_1 = require("./utils/messageEncoder");
const webAutomation_1 = require("./utils/webAutomation");
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
        .action(async (options) => {
        const phonenums = (0, preprocess_1.readPhoneNumber)(options.participants);
        const message = (0, messageEncoder_1.msgEncoder)(options.message);
        const pphonenums = (0, preprocess_1.preprocessAll)(phonenums);
        const wapipo = new webAutomation_1.WapipoMator(pphonenums, message);
        await wapipo.blast();
    });
    program.parse(process.argv);
}
exports.runWapipo = runWapipo;
