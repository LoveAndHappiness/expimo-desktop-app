// src/services/configService.js

const path = require('path');
const fs = require('fs');

let config = null;

function loadConfig() {
  if (config) return config;

  const configPath = path.resolve(__dirname, '../../config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found at ${configPath}`);
  }

  const rawData = fs.readFileSync(configPath);
  const parsedConfig = JSON.parse(rawData);

  const mode = parsedConfig.mode || 'testing';
  config = parsedConfig[mode];

  // Resolve relative paths to absolute paths
  const appRoot = path.resolve(__dirname, '../..');
  for (const key in config) {
    if (typeof config[key] === 'string' && config[key].startsWith('./')) {
      config[key] = path.resolve(appRoot, config[key]);
    }
  }

  return config;
}

function getConfig() {
  if (!config) {
    config = loadConfig();
  }
  return config;
}

module.exports = {
  getConfig,
};