import { readPhoneNumber, preprocessAll } from "./utils/preprocess";
import { msgEncoder } from "./utils/messageEncoder";
import { WapipoMator } from "./utils/webAutomation";

async function main() {
  const phonenums = readPhoneNumber("./src/data/phonenum.txt");
  const message = msgEncoder("./src/data/message.txt");
  const pphonenums = preprocessAll(phonenums);
  const wapipo = new WapipoMator(pphonenums, message);
  wapipo.blast();
}

main().catch(err => console.error(err));