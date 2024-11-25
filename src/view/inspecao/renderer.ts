import Swal from "sweetalert2";
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
// ============================================================================================ 

document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    var nome = document.getElementById("nome") as HTMLInputElement;
    var email = document.getElementById("email") as HTMLInputElement;
    var telefone = document.getElementById("telefone") as HTMLInputElement;
    const item = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value
    };
    const result = await (window as any).bancoAPI.createInspetor(item);
    nome.value = '';
    email.value = '';
    telefone.value = '';
})