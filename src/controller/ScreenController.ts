import { BrowserWindow, ipcMain } from 'electron';

declare const LOGIN_PRELOAD_WEBPACK_ENTRY: string;
declare const LOGIN_WEBPACK_ENTRY: string;
declare const INDEX_WEBPACK_ENTRY: string;
declare const PRODUCAO_WEBPACK_ENTRY: string;
declare const ESTOQUE_WEBPACK_ENTRY: string;
declare const INSPECAO_WEBPACK_ENTRY: string;
declare const FUNCIONARIOS_WEBPACK_ENTRY: string;

export default class ScreenController {
    private mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
        this.initialize();
    }

    private initialize() {
        ipcMain.on("irPaginaIndex", () => {
            this.mainWindow.loadURL(INDEX_WEBPACK_ENTRY)
        })    
        ipcMain.on("irPaginaEstoque", () => {
            this.mainWindow.loadURL(ESTOQUE_WEBPACK_ENTRY)
        })
        ipcMain.on("irPaginaProducao", () => {
            this.mainWindow.loadURL(PRODUCAO_WEBPACK_ENTRY)
        })
        ipcMain.on("irPaginaLogin", () => {
            this.mainWindow.loadURL(LOGIN_WEBPACK_ENTRY)
        })            
        ipcMain.on("irPaginaInspecao", () => {
            this.mainWindow.loadURL(INSPECAO_WEBPACK_ENTRY)
        })                    
        ipcMain.on("irPaginaFuncionarios", () => {
            this.mainWindow.loadURL(FUNCIONARIOS_WEBPACK_ENTRY)
        })  
    }
}
