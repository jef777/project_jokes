import {
  standardizeResponceKeys,
  hasValue,
  timestampToReadableDate,
  format_author_name,
  covertDateToUnix,
} from '../formatters';

describe('Utility Functions', () => {
  describe('standardizeResponceKeys', () => {
    it('should convert object keys to uppercase', () => {
      const input = [{ name: 'John', age: 25 }];
      const expectedOutput = [{ Name: 'John', Age: 25 }];

      expect(standardizeResponceKeys(input)).toEqual(expectedOutput);
    });
  });

  describe('hasValue', () => {
    it('should return the original value if it is not empty', () => {
      const value = 'Hello';
      const expectedOutput = 'Hello';

      expect(hasValue(value)).toEqual(expectedOutput);
    });

    it('should return a placeholder if the value is empty', () => {
      const value = '';
      const expectedOutput = '------';

      expect(hasValue(value)).toEqual(expectedOutput);
    });

    it('should return a placeholder if the value contains only whitespace', () => {
      const value = ' ';
      const expectedOutput = '------';

      expect(hasValue(value)).toEqual(expectedOutput);
    });
  });

  describe('timestampToReadableDate', () => {
    it('should convert a timestamp to a human-readable date', () => {
      const timestamp = '1623665457000';
      const expectedOutput = '14 Jun 2021';

      expect(timestampToReadableDate(timestamp)).toEqual(expectedOutput);
    });

    it('should return placeholder if the timestamp is invalid', () => {
      const timestamp = 'invalid';
      const expectedOutput = '-----';

      expect(timestampToReadableDate(timestamp)).toEqual(expectedOutput);
    });
  });

  describe('format_author_name', () => {
    it('should format an email address', () => {
      const author = 'john@example.com';
      const expectedOutput = 'john@***.com';

      expect(format_author_name(author)).toEqual(expectedOutput);
    });

    it('should return a placeholder for empty author name', () => {
      const author = '';
      const expectedOutput = '-----';

      expect(format_author_name(author)).toEqual(expectedOutput);
    });

    it('should return the original author name if it is not an email address', () => {
      const author = 'John Doe';
      const expectedOutput = 'John Doe';

      expect(format_author_name(author)).toEqual(expectedOutput);
    });
  });

  describe('covertDateToUnix', () => {
    it('should convert a date to Unix timestamp', () => {
      const input = '2022-01-01';
      const expectedOutput = '1640995200';

      expect(covertDateToUnix(input)).toEqual(expectedOutput);
    });
  });
});
