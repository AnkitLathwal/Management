const { app, BrowserWindow } = require("electron");

let mainWindow;
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenu(null); // Remove menu bar
  mainWindow.loadURL("http://localhost:3000"); // Load your React app
});
