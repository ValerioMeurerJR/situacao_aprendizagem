import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('bancoAPI', {
    createProducao: async (producao: any) => await ipcRenderer.invoke('createProduto', producao),
    findAllProducao: async () => await ipcRenderer.invoke('findAllProducao'),
    estoquefindByTipo: async (tipo: string) => await ipcRenderer.invoke('estoquefindByTipo', tipo),
    findAllEstoque: async () => await ipcRenderer.invoke('findAllEstoque'),
    findAlllEstoque: async () => await ipcRenderer.invoke('findAlllEstoque'),
    findUltimosCadastrado: async () => await ipcRenderer.invoke('findUltimosCadastrado'),
    createEstoque: async (item: any) => await ipcRenderer.invoke('createEstoque', item),
    createEntradaProduto: async (item: any) => await ipcRenderer.invoke('createEntradaProduto', item),
    findAllInspetor: async () => await ipcRenderer.invoke('findAllInspetor'),
    createInspetor: async (item: any) => await ipcRenderer.invoke('createInspetor', item)
})

contextBridge.exposeInMainWorld("navigateAPI", {
    irPaginaEstoque: () => ipcRenderer.send("irPaginaEstoque"),
    irPaginaProducao: () => ipcRenderer.send("irPaginaProducao"),
    irPaginaLogin: () => ipcRenderer.send("irPaginaLogin"),
    irPaginaIndex: () => ipcRenderer.send("irPaginaIndex"),
    irPaginaInspecao: () => ipcRenderer.send("irPaginaInspecao"),
})

contextBridge.exposeInMainWorld('authAPI', {
})

