import { readFileSync } from "fs";

/**
 * Reads a file and returns an array of phone numbers.
 * Each phone number is a string.
 *
 * @param filePath - The path to the file to be read.
 * @returns An array of phone numbers.
 */
export function readPhoneNumber(filePath: string): string[] {
  const contents = readFileSync(filePath, "utf-8");
  return contents
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Reads the contents of a file and returns it as a string.
 * @param filePath - The path to the file.
 * @returns The contents of the file as a string.
 */
export function readMsg(filePath: string): string {
  const contents = readFileSync(filePath, "utf-8");
  return contents;
}

/**
 * Preprocesses a phone number by removing hyphens and adding the country code if necessary.
 * @param phoneNumber - The phone number to preprocess.
 * @returns The preprocessed phone number.
 */
export function preprocess(phoneNumber: string): string {
  const cleanedNumber = phoneNumber.replace(/-/g, "");
  const firstChar = cleanedNumber[0];

  if (firstChar === "0") {
    return "62" + cleanedNumber.slice(1);
  }

  if (firstChar === "+") {
    return cleanedNumber.slice(1);
  }

  return cleanedNumber;
}

/**
 * Preprocesses an array of phone numbers.
 *
 * @param phoneNumbers - An array of phone numbers to be preprocessed.
 * @returns An array of preprocessed phone numbers.
 */
export function preprocessAll(phoneNumbers: string[]): string[] {
  return phoneNumbers.map(preprocess);
}
