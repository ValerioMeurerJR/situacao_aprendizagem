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
      const { nchassi, modelo, motor, chassi, kitpneu } = produto;
      console.log(produto)
      const novoVeiculo = new Producao(nchassi, modelo, motor, chassi, kitpneu);
      new ProducaoRepository().save(novoVeiculo);
      new EstoqueRepository().menos(motor)
      new EstoqueRepository().menos(chassi)
      new EstoqueRepository().menos(kitpneu)
    })
    ipcMain.handle('findUltimosCadastrado', async () => {
      return await new ProducaoRepository().findUltimosCadastrado();
    })
    ipcMain.handle('veiculofindById', async (_: any, id: string) => {
      return await new ProducaoRepository().veiculofindById(id);
    })
    ipcMain.handle('veiculoupdateStatusById', async (_: any, id: string, novoStatus: string) => {
      return await new ProducaoRepository().veiculoupdateStatusById(id, novoStatus);
    })
  }
}
