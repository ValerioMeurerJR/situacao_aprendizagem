import { ipcMain } from 'electron';
import EstoqueRepository from '../repository/EstoqueRepository';
import Estoque from '../entity/Estoque';

export default class EstoqueController {
    constructor() {
        this.initialize();
    }

    private initialize() {
        ipcMain.handle('findAllEstoque', async () => {
            return await new EstoqueRepository().findAll();          
        })
        ipcMain.handle('findAlllEstoque', async () => {
            return await new EstoqueRepository().findAlll();          
        })
        ipcMain.handle('createEstoque', async (_: any, item: any) => {
            const {nome, quantidade, fabricante, tipo } = item;
            const novoProduto = new Estoque(nome, quantidade, fabricante, tipo);
            console.log(novoProduto)
            new EstoqueRepository().save(novoProduto)
          })   
    }
}