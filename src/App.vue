<template>
  <div id="app">
    <h1>Expimo Desktop App</h1>
    <button @click="startMonitoring" :disabled="isMonitoring">Start Monitoring</button>
    <button @click="stopMonitoring" :disabled="!isMonitoring">Stop Monitoring</button>
    
    <h2>Monitored Files ({{ monitoredFiles.length }})</h2>
    <ul>
      <li v-for="file in monitoredFiles" :key="file.path">
        <strong>{{ file.name }}</strong> ({{ file.path }})
        <div v-if="file.content" class="pdf-content">
          <h4>PDF Content Preview:</h4>
          <p>{{ file.content }}</p>
        </div>
        <div v-if="file.error" class="error-message">
          {{ file.error }}
        </div>
      </li>
    </ul>
    
    <h2>Processed Files ({{ processedFiles.length }})</h2>
    <ul>
      <li v-for="file in processedFiles" :key="file.originalName">
        Original: {{ file.originalName }} <br />
        New Name: {{ file.newName }} <br />
        New Path: {{ file.newPath }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'App',
  setup() {
    console.log('App setup function called');
    const isMonitoring = ref(false);
    const monitoredFiles = ref([]);
    const processedFiles = ref([]);

    const startMonitoring = () => {
      console.log('Start monitoring clicked');
      window.electron.ipcRenderer.send('start-monitoring');
      isMonitoring.value = true;
    };

    const stopMonitoring = () => {
      console.log('Stop monitoring clicked');
      window.electron.ipcRenderer.send('stop-monitoring');
      isMonitoring.value = false;
    };

    const handleFileDetected = (fileInfo) => {
      console.log('File detected:', fileInfo);
      if (fileInfo && fileInfo.path) {
        monitoredFiles.value.push(fileInfo);
      }
    };

    const handleFileProcessed = (fileInfo) => {
      console.log('File processed:', fileInfo);
      processedFiles.value.push(fileInfo);
    };

    const handleInitialFiles = (files) => {
      console.log('Initial files:', files);
      monitoredFiles.value = files;
    };

    onMounted(() => {
      console.log('App mounted');
      window.electron.ipcRenderer.on('file-detected', handleFileDetected);
      window.electron.ipcRenderer.on('file-processed', handleFileProcessed);
      window.electron.ipcRenderer.on('initial-files', handleInitialFiles);
    });

    onUnmounted(() => {
      window.electron.ipcRenderer.removeAllListeners('file-detected');
      window.electron.ipcRenderer.removeAllListeners('file-processed');
      window.electron.ipcRenderer.removeAllListeners('initial-files');
    });

    return {
      isMonitoring,
      monitoredFiles,
      processedFiles,
      startMonitoring,
      stopMonitoring
    };
  }
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 14px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

.pdf-content {
  margin-top: 10px;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 5px;
}
</style>