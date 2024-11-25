import { ipcMain } from 'electron';
import Inspetores from '../entity/Inspetores';
import InspetoresRepository from '../repository/InspetoresRepository';

export default class InspetoresController {
    constructor() {
        this.initialize();
    }

    private initialize() {
        ipcMain.handle('findAllInspetor', async () => {
            return await new InspetoresRepository().findAll();          
        })
        ipcMain.handle('createInspetor', async (_: any, item: any) => {
            const {nome, email, telefone } = item;
            const inspetor = new Inspetores(nome, email, telefone);
            console.log(inspetor)
            new InspetoresRepository().save(inspetor)
          })   
    }
}