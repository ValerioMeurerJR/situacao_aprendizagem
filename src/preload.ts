import { contextBridge, ipcRenderer } from "electron";
import Producao from "src/entity/Producao";

contextBridge.exposeInMainWorld('bancoAPI', {
    createProducao: async (producao: any) => await ipcRenderer.invoke('createProduto', producao),
    findAllProducao: async () => await ipcRenderer.invoke('findAllProducao'),
    estoquefindByTipo: async (tipo: string) => await ipcRenderer.invoke('estoquefindByTipo', tipo),
    findAllEstoque: async () => await ipcRenderer.invoke('findAllEstoque'),
    findUltimosCadastrado: async () => await ipcRenderer.invoke('findUltimosCadastrado'),
})

contextBridge.exposeInMainWorld("navigateAPI", {
})

contextBridge.exposeInMainWorld('authAPI', {
})