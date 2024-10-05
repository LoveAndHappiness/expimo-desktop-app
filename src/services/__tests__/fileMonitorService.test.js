// src/services/__tests__/fileMonitorService.test.js

const chokidar = require('chokidar');
jest.mock('chokidar');

const path = require('path');  // Import path to handle paths correctly
const { startWatching, stopWatching } = require('../fileMonitorService');
const { getConfig } = require('../configService');
jest.mock('../configService');

describe('File Monitor Service', () => {
  beforeEach(() => {
    chokidar.watch.mockClear();
    getConfig.mockClear();
  });

  test('startWatching should initialize watcher with correct directory', () => {
    // Mock getConfig to return the testing configuration
    getConfig.mockReturnValue({
      filesDir: path.resolve(__dirname, '../../../test-files')  // Using the relative path from the testing config
    });

    const mockOn = jest.fn();
    chokidar.watch.mockReturnValue({ on: mockOn, close: jest.fn() });

    startWatching();

    expect(chokidar.watch).toHaveBeenCalledWith(
      path.resolve(__dirname, '../../../test-files'),  // Ensure path is correctly resolved
      expect.any(Object)
    );
    expect(mockOn).toHaveBeenCalledWith('add', expect.any(Function));
  });

  test('stopWatching should close the watcher', () => {
    const mockClose = jest.fn();
    chokidar.watch.mockReturnValue({ on: jest.fn(), close: mockClose });

    startWatching();
    stopWatching();

    expect(mockClose).toHaveBeenCalled();
  });
});
