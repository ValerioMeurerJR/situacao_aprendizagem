import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('bancoAPI', {
    createProducao: async (producao: any) => await ipcRenderer.invoke('createProduto', producao),
    findAllProducao: async () => await ipcRenderer.invoke('findAllProducao'),
    PodDataTotal: async (inicio: string, fim: string) => await ipcRenderer.invoke('PodDataTotal', inicio, fim),
    estoquefindByTipo: async (tipo: string) => await ipcRenderer.invoke('estoquefindByTipo', tipo),
    findAllEstoque: async () => await ipcRenderer.invoke('findAllEstoque'),
    findAlllEstoque: async () => await ipcRenderer.invoke('findAlllEstoque'),
    findUltimosCadastrado: async () => await ipcRenderer.invoke('findUltimosCadastrado'),
    createEstoque: async (item: any) => await ipcRenderer.invoke('createEstoque', item),
    createEntradaProduto: async (item: any) => await ipcRenderer.invoke('createEntradaProduto', item),
    findAllInspetor: async () => await ipcRenderer.invoke('findAllInspetor'),
    createInspetor: async (item: any) => await ipcRenderer.invoke('createInspetor', item),
    veiculofindById: async (id: string) => await ipcRenderer.invoke('veiculofindById', id),
    veiculoupdateStatusById: async (id: string, novoStatus: string, funcionario?: string) => await ipcRenderer.invoke('veiculoupdateStatusById', id, novoStatus, funcionario),
    PodDataEstoque: async (inicio: string, fim: string) => await ipcRenderer.invoke('PodDataEstoque', inicio, fim)
})

contextBridge.exposeInMainWorld('bancoAPIUsuario', {
    createFuncionario: async (funcionario: any) => await ipcRenderer.invoke('createFuncionario', funcionario),
    usuariofindByEmailorUser: async (email: string, user: string) => await ipcRenderer.invoke('usuariofindByEmailorUser', email, user),
    findAllFuncionarios: async () => await ipcRenderer.invoke('findAllFuncionarios'),
})


contextBridge.exposeInMainWorld("navigateAPI", {
    irPaginaEstoque: () => ipcRenderer.send("irPaginaEstoque"),
    irPaginaProducao: () => ipcRenderer.send("irPaginaProducao"),
    irPaginaLogin: () => ipcRenderer.send("irPaginaLogin"),
    irPaginaIndex: () => ipcRenderer.send("irPaginaIndex"),
    irPaginaInspecao: () => ipcRenderer.send("irPaginaInspecao"),
    irPaginaFuncionarios: () => ipcRenderer.send("irPaginaFuncionarios"),
})

contextBridge.exposeInMainWorld('authAPI', {
    hash: async (credentials: any) => await ipcRenderer.invoke('hash_password', credentials),
})

