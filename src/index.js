const { app, BrowserWindow } = require('electron/main');

let expressProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1800,
    height: 1200,
  });

  win.loadFile('./src/build/index.html');

  win.webContents.on('did-finish-load', () => {
    startExpressServer();
  });

  app.on('before-quit', () => {
    stopExpressServer();
  });
}

function startExpressServer() {
  const serverModule = require('./server/server.js');

  expressProcess = serverModule;
}

function stopExpressServer() {
  if (expressProcess) {
    expressProcess.close(() => {
      console.log('Express server closed.');
      expressProcess = null;
      app.quit();
    });
  } else {
    app.quit();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
