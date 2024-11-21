document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    var nome = document.getElementById("nome") as HTMLInputElement;
    var quantidade = document.getElementById("quantidade") as HTMLInputElement;
    var fabricante = document.getElementById("fabricante") as HTMLInputElement;
    var tipo = document.getElementById("tipo") as HTMLInputElement;

    const item = {
        nome: nome.value,
        quantidade: quantidade.value,
        fabricante: fabricante.value,
        tipo: tipo.value
    }
    const result = await (window as any).bancoAPI.createEstoque(item);
})