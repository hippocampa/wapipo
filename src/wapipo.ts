import { Command } from "commander";
import { readPhoneNumber, preprocessAll } from "./utils/preprocess";
import { msgEncoder } from "./utils/messageEncoder";
import { WapipoMator } from "./utils/webAutomation";

export function runWapipo() {
  const program = new Command();

  program
    .version("1.0.0") // Add version information
    .description(
      "Wapipo: A CLI tool for broadcasting whatsapp messages to a list of participants. Author: I Gede Teguh Satya Dharma <tsdhrm@outlook.com>"
    ); // Add a description

  program
    .command("blast")
    .description("Blast (broadcast) a message to a list of participants")
    .option("-p, --participants <dir>", "Directory of the participants file")
    .option("-m, --message <dir>", "Directory of the message file")
    .action(async (options) => {
      const phonenums = readPhoneNumber(options.participants);
      const message = msgEncoder(options.message);
      const pphonenums = preprocessAll(phonenums);
      const wapipo = new WapipoMator(pphonenums, message);
      await wapipo.blast();
    });

  program.parse(process.argv);
}
