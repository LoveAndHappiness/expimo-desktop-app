const fs = require('fs').promises;
const pdfParse = require('./pdf-parse-wrapper');

async function extractTextFromPDF(filePath) {
  console.log(`[pdfService] Attempting to extract text from: ${filePath}`);
  try {
    console.log(`[pdfService] Reading file: ${filePath}`);
    const dataBuffer = await fs.readFile(filePath);
    console.log(`[pdfService] Successfully read file: ${filePath}`);
    
    console.log(`[pdfService] Parsing PDF: ${filePath}`);
    const data = await pdfParse(dataBuffer);
    console.log(`[pdfService] Successfully parsed PDF: ${filePath}`);
    
    // Limit to first 5000 characters
    return data.text.slice(0, 5000);
  } catch (error) {
    console.error(`[pdfService] Error in extractTextFromPDF for file ${filePath}:`, error);
    throw error;
  }
}

module.exports = {
  extractTextFromPDF,
};