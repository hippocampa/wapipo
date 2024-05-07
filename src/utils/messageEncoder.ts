import { readMsg } from "./preprocess";

/**
 * Encodes a message string.
 *
 * @param msg - The message to encode.
 * @returns The encoded message.
 */
export function msgEncoder(msg: string): string {
    const message = readMsg(msg);
    return encodeURI(message);
}