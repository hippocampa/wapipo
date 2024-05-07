import { readFile, preprocessAll } from "./utils/preprocess";

async function main() {
  const phonenums = readFile("./src/data/phonenum.txt");
  const pphonenums = preprocessAll(phonenums);
  console.log(pphonenums);
}

main().catch(err => console.error(err));