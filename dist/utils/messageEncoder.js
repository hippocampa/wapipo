"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgEncoder = void 0;
const preprocess_1 = require("./preprocess");
/**
 * Encodes a message string.
 *
 * @param msg - The message to encode.
 * @returns The encoded message.
 */
function msgEncoder(msg) {
    const message = (0, preprocess_1.readMsg)(msg);
    return encodeURI(message);
}
exports.msgEncoder = msgEncoder;
