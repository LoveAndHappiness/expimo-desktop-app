const path = require('path');
const fs = require('fs');

let config = null;

function loadConfig() {
  if (config) return config;

  const configPath = path.resolve(__dirname, '../../config.json');
  console.log('Loading config from:', configPath);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found at ${configPath}`);
  }

  const rawData = fs.readFileSync(configPath, 'utf8');
  console.log('Raw config data:', rawData);

  const parsedConfig = JSON.parse(rawData);

  const mode = parsedConfig.mode || 'production';
  console.log('Using mode:', mode);

  config = parsedConfig[mode];

  // Resolve relative paths to absolute paths
  const appRoot = path.resolve(__dirname, '../..');
  for (const key in config) {
    if (typeof config[key] === 'string' && config[key].startsWith('./')) {
      config[key] = path.resolve(appRoot, config[key]);
    }
  }

  console.log('Resolved config:', JSON.stringify(config, null, 2));

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