"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageEncoder_1 = require("../utils/messageEncoder");
const preprocess_1 = require("../utils/preprocess");
jest.mock('../utils/preprocess', () => ({
    readMsg: jest.fn(),
}));
describe('msgEncoder', () => {
    it('should encode the message using encodeURI', () => {
        const input = 'Hello, world!';
        const encodedMessage = 'Hello,%20world!';
        preprocess_1.readMsg.mockReturnValue(input);
        // Create a spy on global encodeURI function
        const encodeURISpy = jest.spyOn(global, 'encodeURI').mockImplementation(() => encodedMessage);
        // Pass only the input to msgEncoder
        const result = (0, messageEncoder_1.msgEncoder)(input);
        expect(preprocess_1.readMsg).toHaveBeenCalledWith(input);
        expect(encodeURISpy).toHaveBeenCalledWith(input);
        expect(result).toEqual(encodedMessage);
        // Clean up the spy
        encodeURISpy.mockRestore();
    });
});
