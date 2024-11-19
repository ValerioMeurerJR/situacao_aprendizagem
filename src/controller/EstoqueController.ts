import { ipcMain } from 'electron';
import EstoqueRepository from '../repository/EstoqueRepository';

export default class EstoqueController {
    constructor() {
        this.initialize();
    }

    private initialize() {
        ipcMain.handle('findAllEstoque', async () => {
            return await new EstoqueRepository().findAll();          
        })        
    }

}