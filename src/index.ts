import { readPhoneNumber, preprocessAll } from "./utils/preprocess";
import { msgEncoder } from "./utils/messageEncoder";

async function main() {
  const phonenums = readPhoneNumber("./src/data/phonenum.txt");
  const message = msgEncoder("./src/data/message.txt");
  console.log(message)
  const pphonenums = preprocessAll(phonenums);
  console.log(pphonenums);
}

main().catch(err => console.error(err));