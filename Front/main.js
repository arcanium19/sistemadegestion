// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1366,
//     height: 768,
//     webPreferences: {
//       nodeIntegration: false,  // Seguridad, no habilitar nodeIntegration
//       contextIsolation: true,  // Aislamiento de contexto
//     //   preload: path.join(__dirname, 'preload.js')  // Preload si tienes este archivo
//     }
//   });

//   win.loadURL('http://localhost:3000');
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;
let backendProcess;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  // Cargar la app del frontend
  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    mainWindow = null;
    backendProcess.kill(); // Termina el backend
  });
};

app.on("ready", () => {
  // Iniciar backend
  backendProcess = spawn("node", ["../Back/index.js"], {
    stdio: "inherit",
    shell: true,
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
