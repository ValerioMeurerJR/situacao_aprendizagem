import { ipcMain } from "electron";
import Producao from "../entity/Producao";
import ProducaoRepository from "../repository/ProducaoRepository";
import EstoqueRepository from "../repository/EstoqueRepository";

export default class ProducaoController {
    constructor() {
        this.initialize();
    }

    private initialize() {
        ipcMain.handle('createProduto', async (_: any, produto: any) => {
            const {renavam, modelo, motor, carcaca, kitpneu  } = produto;
            console.log(produto)
            const novoVeiculo = new Producao(renavam, modelo, motor, carcaca, kitpneu);
            new ProducaoRepository().save(novoVeiculo);
            new EstoqueRepository().menos(motor)
            new EstoqueRepository().menos(carcaca)
            new EstoqueRepository().menos(kitpneu)
          })
          ipcMain.handle('findUltimosCadastrado', async () => {
            return await new ProducaoRepository().findUltimosCadastrado();
          })
    }

    
}
