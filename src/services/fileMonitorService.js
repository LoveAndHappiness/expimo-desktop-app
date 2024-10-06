const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { getConfig } = require('./configService');
const { extractTextFromPDF } = require('./pdfService');

let watcher;
let mainWindow;

function setMainWindow(win) {
  console.log('Setting main window in fileMonitorService');
  mainWindow = win;
}

function startWatching() {
  console.log('startWatching called in fileMonitorService');
  const config = getConfig();
  console.log('Config loaded:', config);
  const watchDir = path.resolve(config.filesDir);
  console.log('Resolved watch directory:', watchDir);

  if (!fs.existsSync(watchDir)) {
    console.error(`Watch directory does not exist: ${watchDir}`);
    return;
  }

  if (watcher) {
    console.log('Closing existing watcher');
    watcher.close();
  }

  console.log('Initializing chokidar watcher');
  watcher = chokidar.watch(watchDir, {
    persistent: true,
    ignoreInitial: false,
    depth: 0,
  });

  watcher.on('add', async (filePath) => {
    console.log(`File detected: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return;
    }

    const fileInfo = {
      name: path.basename(filePath),
      path: filePath
    };

    if (path.extname(filePath).toLowerCase() === '.pdf') {
      console.log(`Attempting to extract text from PDF: ${filePath}`);
      try {
        const pdfContent = await extractTextFromPDF(filePath);
        console.log(`Successfully extracted text from PDF: ${filePath}`);
        fileInfo.content = pdfContent.substring(0, 200) + '...'; // First 200 characters
      } catch (error) {
        console.error(`Error extracting text from PDF ${filePath}:`, error);
        fileInfo.error = 'Error extracting PDF content';
      }
    }

    if (mainWindow) {
      console.log('Sending file-detected event to renderer');
      mainWindow.webContents.send('file-detected', fileInfo);
    } else {
      console.log('mainWindow is not set, cannot send file-detected event');
    }
  });

  watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
  });

  watcher.on('ready', () => {
    console.log('Initial scan complete. Ready for changes.');
  });
}

function stopWatching() {
  console.log('stopWatching called in fileMonitorService');
  if (watcher) {
    watcher.close();
    watcher = null;
    console.log('Stopped watching');
  }
}

module.exports = {
  startWatching,
  stopWatching,
  setMainWindow,
};