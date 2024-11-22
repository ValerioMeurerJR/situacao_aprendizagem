import { ipcMain } from 'electron';
import EntradaProduto from '../entity/EntradaProduto';
import EntradaProdutoRepository from '../repository/EntradaProdutoRepository';
import EstoqueRepository from '../repository/EstoqueRepository';

export default class EntradaProdutoController {
    constructor() {
        this.initialize();
    }

    private initialize() {
        ipcMain.handle('findAllEntradaProduto', async () => {
            return await new EntradaProdutoRepository().findAll();          
        })
        ipcMain.handle('createEntradaProduto', async (_: any, item: any) => {
            const {numero_nota, quantidade, estoqueid } = item;
            const novoProduto = new EntradaProduto(numero_nota, quantidade, estoqueid);
            console.log(novoProduto)
            new EntradaProdutoRepository().save(novoProduto)
            new EstoqueRepository().somar(estoqueid, quantidade)
          })   
    }
}