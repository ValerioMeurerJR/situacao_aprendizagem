import { hash, compare } from 'bcrypt';
import { ipcMain } from "electron";
import Funcionario from "../entity/Funcionario";
import FuncionariosRepository from "../repository/FuncionariosRepository";

export default class FuncionariosController {
  constructor() {
    this.initialize();
  }

  private initialize() {
    ipcMain.handle('createFuncionario', async (_: any, funcionario: any) => {
      const { nome, email, user, password, data_nascimento, cargo } = funcionario;  
      const passwordHash = await hash(password, 12);    
      const novoFuncionario = new Funcionario(nome, email, user, passwordHash, data_nascimento, cargo)
      new FuncionariosRepository().save(novoFuncionario)
    })

    ipcMain.handle('usuariofindByEmailorUser', async (_: any, email: string, user) => {
      return await new FuncionariosRepository().usuariofindByEmailorUser(email, user);
    })
    ipcMain.handle('findAllFuncionarios', async () => {
      return await new FuncionariosRepository().findAll();
    })
  }
}
