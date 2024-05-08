import { Command } from "commander";
import { readPhoneNumber, preprocessAll } from "./utils/preprocess";
import { msgEncoder } from "./utils/messageEncoder";
import { WapipoMator } from "./utils/webAutomation";
import path from "path";

export function runWapipo() {
  const program = new Command();

  program
    .name("wapipo") // Add the name of the program
    .version("1.1.0") // Add version information
    .description(
      "Wapipo: A CLI tool for broadcasting whatsapp messages to a list of participants. Author: I Gede Teguh Satya Dharma <tsdhrm@outlook.com>"
    ); // Add a description

  program
    .command("blast")
    .description("Blast (broadcast) a message to a list of participants")
    .option("-p, --participants <dir>", "Directory of the participants file")
    .option("-m, --message <dir>", "Directory of the message file")
    .option("-d, --driver <path>", "Path to the webdriver")
    .action(async (options) => {
      const participantsPath = path.resolve(options.participants);
      const messagePath = path.resolve(options.message);
      const driverPath = options.driver
        ? path.resolve(options.driver)
        : undefined;
      const phonenums = readPhoneNumber(participantsPath);
      const message = msgEncoder(messagePath);
      const pphonenums = preprocessAll(phonenums);
      const wapipo = new WapipoMator(pphonenums, message, driverPath);
      await wapipo.blast();
    });

  program.parse(process.argv);
}
