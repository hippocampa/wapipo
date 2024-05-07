import { readFileSync } from "fs";

/**
 * Reads a file and returns its contents as an array of lines.
 * @param filePath - The path to the file to be read.
 * @returns An array of lines from the file.
 */
export function readPhoneNumber(filePath: string): string[] {
  const contents = readFileSync(filePath, 'utf-8');
  return contents.split("\n");
}

export function readMsg(filePath: string): string {
  const contents = readFileSync(filePath, 'utf-8');
  return contents;
}

/**
 * Preprocesses a phone number by removing hyphens and adding the country code if necessary.
 * @param phoneNumber - The phone number to preprocess.
 * @returns The preprocessed phone number.
 */
export function preprocess(phoneNumber: string): string {
  const cleanedNumber = phoneNumber.replace(/-/g, '');
  const firstChar = cleanedNumber[0];

  if (firstChar === '0') {
    return '62' + cleanedNumber.slice(1);
  }

  if (firstChar === '+') {
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