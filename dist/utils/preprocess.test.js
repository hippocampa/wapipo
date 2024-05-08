"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preprocess_1 = require("../utils/preprocess");
describe('preprocess', () => {
    it('should remove hyphens from phone number', () => {
        const phoneNumber = '123-456-7890';
        const expected = '1234567890';
        const result = (0, preprocess_1.preprocess)(phoneNumber);
        expect(result).toEqual(expected);
    });
    it('should add country code if necessary', () => {
        const phoneNumber = '01234567890';
        const expected = '621234567890';
        const result = (0, preprocess_1.preprocess)(phoneNumber);
        expect(result).toEqual(expected);
    });
    it('should not add country code if already present', () => {
        const phoneNumber = '+621234567890';
        const expected = '621234567890';
        const result = (0, preprocess_1.preprocess)(phoneNumber);
        expect(result).toEqual(expected);
    });
});
