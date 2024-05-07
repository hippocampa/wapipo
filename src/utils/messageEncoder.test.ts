import { msgEncoder } from '../utils/messageEncoder';
import { readMsg } from '../utils/preprocess';

jest.mock('../utils/preprocess', () => ({
  readMsg: jest.fn(),
}));

describe('msgEncoder', () => {
  it('should encode the message using encodeURI', () => {
    const input = 'Hello, world!';
    const encodedMessage = 'Hello,%20world!';
    (readMsg as jest.Mock).mockReturnValue(input);

    // Create a spy on global encodeURI function
    const encodeURISpy = jest.spyOn(global, 'encodeURI').mockImplementation(() => encodedMessage);

    // Pass only the input to msgEncoder
    const result = msgEncoder(input);

    expect(readMsg).toHaveBeenCalledWith(input);
    expect(encodeURISpy).toHaveBeenCalledWith(input);
    expect(result).toEqual(encodedMessage);

    // Clean up the spy
    encodeURISpy.mockRestore();
  });
});