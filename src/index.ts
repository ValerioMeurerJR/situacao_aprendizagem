import { app, BrowserWindow, ipcMain } from 'electron';
import { hash, compare } from 'bcrypt';
import EstoqueController from './controller/EstoqueController';
import ProducaoController from './controller/ProducaoController';
import EntradaProdutoController from './controller/EntradaProdutoController';
import ScreenController from './controller/ScreenController';

declare const LOGIN_PRELOAD_WEBPACK_ENTRY: string;
declare const LOGIN_WEBPACK_ENTRY: string;
declare const INDEX_WEBPACK_ENTRY: string;
declare const PRODUCAO_WEBPACK_ENTRY: string;
declare const ESTOQUE_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

var mainWindow: BrowserWindow;
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: LOGIN_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(INDEX_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  createWindow();
  new EstoqueController();
  new ProducaoController();
  new EntradaProdutoController();
  new ScreenController(mainWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


