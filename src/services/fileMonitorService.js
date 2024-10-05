// src/services/fileMonitorService.js

const chokidar = require('chokidar');
const path = require('path');
const { getConfig } = require('./configService');

let watcher;

function startWatching() {
  const config = getConfig();
  // console.log('Loaded config:', config);  // Log the loaded config

  const watchDir = path.resolve(config.filesDir);
  console.log('Watching directory:', watchDir);  // Log the directory being watched

  if (watcher) {
    watcher.close();
  }

  watcher = chokidar.watch(watchDir, {
    persistent: true,
    ignoreInitial: true,
    depth: 0,
  });

  watcher.on('add', (filePath) => {
    console.log(`File added: ${filePath}`);
    // We'll add file processing logic later
  });

  watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
  });

  watcher.on('ready', () => {
    console.log('Initial scan complete. Ready for changes.');
  });

  console.log(`Started watching directory: ${watchDir}`);
}

function stopWatching() {
  if (watcher) {
    watcher.close();
    watcher = null;
    console.log('Stopped watching');
  }
}

module.exports = {
  startWatching,
  stopWatching,
};