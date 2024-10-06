const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { getConfig } = require('./configService');

let watcher;
let mainWindow;

function setMainWindow(win) {
  console.log('Setting main window in fileMonitorService');
  mainWindow = win;
}

function startWatching() {
  console.log('startWatching called in fileMonitorService');
  const config = getConfig();
  console.log('Loaded config:', JSON.stringify(config, null, 2));

  const watchDir = path.resolve(config.filesDir);
  console.log('Resolved watch directory:', watchDir);

  // Check if directory exists
  if (!fs.existsSync(watchDir)) {
    console.error(`Watch directory does not exist: ${watchDir}`);
    return;
  }

  // Log directory contents
  console.log('Directory contents:');
  fs.readdirSync(watchDir).forEach(file => {
    console.log(file);
  });

  if (watcher) {
    console.log('Closing existing watcher');
    watcher.close();
  }

  watcher = chokidar.watch(watchDir, {
    persistent: true,
    ignoreInitial: false,
    depth: 0,
  });

  watcher.on('add', (filePath) => {
    console.log(`File detected: ${filePath}`);
    const fileInfo = {
      name: path.basename(filePath),
      path: filePath
    };
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