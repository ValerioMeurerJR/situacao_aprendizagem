import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('bancoAPI', {
    createProducao: async (producao: any) => await ipcRenderer.invoke('createProduto', producao),
    findAllProducao: async () => await ipcRenderer.invoke('findAllProducao'),
    estoquefindByTipo: async (tipo: string) => await ipcRenderer.invoke('estoquefindByTipo', tipo),
    findAllEstoque: async () => await ipcRenderer.invoke('findAllEstoque'),
    findAlllEstoque: async () => await ipcRenderer.invoke('findAlllEstoque'),
    findUltimosCadastrado: async () => await ipcRenderer.invoke('findUltimosCadastrado'),
    createEstoque: async (item: any) => await ipcRenderer.invoke('createEstoque', item),
    createEntradaProduto: async (item: any) => await ipcRenderer.invoke('createEntradaProduto', item)
})

contextBridge.exposeInMainWorld("navigateAPI", {
})

contextBridge.exposeInMainWorld('authAPI', {
})