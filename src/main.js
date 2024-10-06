const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startWatching, stopWatching, setMainWindow } = require('./services/fileMonitorService');

// Add these lines at the top of the file
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

function createWindow() {
  console.log('Creating main window');
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();

  setMainWindow(mainWindow);

  ipcMain.on('start-monitoring', () => {
    console.log('Received start-monitoring event in main process');
    startWatching();
  });

  ipcMain.on('stop-monitoring', () => {
    console.log('Received stop-monitoring event in main process');
    stopWatching();
  });

  // Send initial files to renderer
  mainWindow.webContents.on('did-finish-load', () => {
    const { getConfig } = require('./services/configService');
    const config = getConfig();
    const fs = require('fs');
    const initialFiles = fs.readdirSync(config.filesDir).map(file => ({
      name: file,
      path: path.join(config.filesDir, file)
    }));
    mainWindow.webContents.send('initial-files', initialFiles);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});