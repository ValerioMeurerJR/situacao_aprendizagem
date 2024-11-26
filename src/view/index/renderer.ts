import "./index.css"


// ============================ Menu ========================================================
document.getElementById("menu-estoque").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    (window as any).navigateAPI.irPaginaEstoque()    
}) 
document.getElementById("menu-producao").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    (window as any).navigateAPI.irPaginaProducao()    
}) 
document.getElementById("menu-index").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    (window as any).navigateAPI.irPaginaIndex()    
}) 
document.getElementById("menu-inspecao").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    (window as any).navigateAPI.irPaginaInspecao()    
}) 
document.getElementById("menu-funcionarios").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    (window as any).navigateAPI.irPaginaFuncionarios()
})
// ============================================================================================