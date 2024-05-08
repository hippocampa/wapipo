"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessAll = exports.preprocess = exports.readMsg = exports.readPhoneNumber = void 0;
const fs_1 = require("fs");
/**
 * Reads a file and returns its contents as an array of lines.
 * @param filePath - The path to the file to be read.
 * @returns An array of lines from the file.
 */
function readPhoneNumber(filePath) {
    const contents = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return contents.split("\n");
}
exports.readPhoneNumber = readPhoneNumber;
function readMsg(filePath) {
    const contents = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return contents;
}
exports.readMsg = readMsg;
/**
 * Preprocesses a phone number by removing hyphens and adding the country code if necessary.
 * @param phoneNumber - The phone number to preprocess.
 * @returns The preprocessed phone number.
 */
function preprocess(phoneNumber) {
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
exports.preprocess = preprocess;
/**
 * Preprocesses an array of phone numbers.
 *
 * @param phoneNumbers - An array of phone numbers to be preprocessed.
 * @returns An array of preprocessed phone numbers.
 */
function preprocessAll(phoneNumbers) {
    return phoneNumbers.map(preprocess);
}
exports.preprocessAll = preprocessAll;
