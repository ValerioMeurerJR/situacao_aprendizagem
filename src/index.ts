import { app, BrowserWindow, ipcMain } from 'electron';
import { hash, compare } from 'bcrypt';
import EstoqueController from './controller/EstoqueController';
import ProducaoController from './controller/ProducaoController';
import EntradaProdutoController from './controller/EntradaProdutoController';
import ScreenController from './controller/ScreenController';
import InspetoresController from './controller/InspetoresController';
import FuncionariosController from './controller/FuncionariosController';

declare const LOGIN_PRELOAD_WEBPACK_ENTRY: string;
declare const LOGIN_WEBPACK_ENTRY: string;
declare const INDEX_WEBPACK_ENTRY: string;
declare const PRODUCAO_WEBPACK_ENTRY: string;
declare const ESTOQUE_WEBPACK_ENTRY: string;
declare const INSPECAO_WEBPACK_ENTRY: string;

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

  mainWindow.loadURL(LOGIN_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  createWindow();
  new EstoqueController();
  new ProducaoController();
  new EntradaProdutoController();
  new ScreenController(mainWindow);
  new InspetoresController()
  new FuncionariosController()
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

ipcMain.handle('hash_password', async (_: any, credentials: any) => {
  const {password, password_hash} = credentials
  return await compare(password, password_hash);
})
