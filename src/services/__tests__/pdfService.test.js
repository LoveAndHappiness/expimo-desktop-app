// src/services/__tests__/pdfService.test.js

const fs = require('fs').promises;
const path = require('path');
const { extractTextFromPDF } = require('../pdfService');

// Mock the pdf-parse-wrapper module
jest.mock('../pdf-parse-wrapper', () => {
  return jest.fn().mockResolvedValue({ text: 'Mocked PDF content' });
});

describe('PDF Service', () => {
  const testFilePath = path.resolve(__dirname, '../../../test-files/test.pdf');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('extractTextFromPDF should read file and return text', async () => {
    fs.readFile = jest.fn().mockResolvedValue(Buffer.from('dummy pdf content'));

    const result = await extractTextFromPDF(testFilePath);

    expect(fs.readFile).toHaveBeenCalledWith(testFilePath);
    expect(result).toBe('Mocked PDF content');
  });

  test('extractTextFromPDF should handle file read errors', async () => {
    fs.readFile = jest.fn().mockRejectedValue(new Error('File read error'));

    await expect(extractTextFromPDF(testFilePath)).rejects.toThrow('File read error');
  });

  test('extractTextFromPDF should handle PDF parsing errors', async () => {
    fs.readFile = jest.fn().mockResolvedValue(Buffer.from('dummy pdf content'));
    require('../pdf-parse-wrapper').mockRejectedValue(new Error('PDF parsing error'));

    await expect(extractTextFromPDF(testFilePath)).rejects.toThrow('PDF parsing error');
  });

  test('extractTextFromPDF should limit output to 5000 characters', async () => {
    const longText = 'a'.repeat(6000);
    require('../pdf-parse-wrapper').mockResolvedValue({ text: longText });

    const result = await extractTextFromPDF(testFilePath);

    expect(result.length).toBe(5000);
  });
});