import DataTable from "datatables.net-dt";
import Swal from "sweetalert2";
import { ptbr } from "../ptbr";


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
    };
    const result = await (window as any).bancoAPI.createEstoque(item);
    nome.value = '';
    quantidade.value = '';
    fabricante.value = '';
    tipo.value = '';
    listadeProdutos()
})

async function listadeProdutos() {
    const Produtos = await (window as any).bancoAPI.findAlllEstoque();
    console.log(Produtos)
    const divLista = document.getElementById("lista");   
    divLista.innerHTML = ""; 
    divLista.innerHTML = `
    <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Fabricante</th>
                <th>Tipo</th>
                <th>Acão</th>
            </tr>
        </thead>
        <tbody>
            <!-- Os dados serão carregados dinamicamente -->
        </tbody>
    </table>
    `
    const formattedData = Produtos.map((item: any) => [
        item.nome,
        item.quantidade,
        item.fabricante,
        item.tipo,
        `<button onclick='RegistarEntrada("${item.id}")'>teste</button>`
        ]);
    console.log(formattedData)

    new DataTable('#example', {
        data: formattedData,
        'order': [[1, 'asc']],
        "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
        language: ptbr,
        columns: [
            { title: "Nome" },
            { title: "Quantidade" },
            { title: "Fabricante" },
            { title: "Tipo" },
            { title: "Ação" }
        ]
    });
}
async function RegistarEntrada(item: string) {
    const html = `
        <form id="os-form" class="swal-form-container">
            <div class="swal-form-group">
                <label for="nNota">N° Nota:</label>
                <input id="nNota" type="number" required>
            </div>
            <div class="swal-form-group">
                <label for="quantidadeswal">Quantidade:</label>
                <input id="quantidadeswal" type="number" required>
            </div>
        </form>
    `;

    const { value: formValues } = await Swal.fire({
        title: 'Registrar Entrada de Estoque',
        html: html,
        showCancelButton: true,
        showConfirmButton: true, 
        preConfirm: () => {
            
            const quantidade = (document.getElementById("quantidadeswal") as HTMLInputElement).value;
            const nNota = (document.getElementById("nNota") as HTMLInputElement).value;

            if (!nNota || !quantidade) {
                Swal.showValidationMessage("Por favor, preencha todos os campos!");
                return null; 
            }

            return { nNota, quantidade: quantidade };
        }
    });

    const nota = {
        numero_nota: formValues.nNota,
        quantidade: formValues.quantidade,
        estoqueid: item
    }
    const result = await (window as any).bancoAPI.createEntradaProduto(nota);
    listadeProdutos()
}



window.onload = () => {
    listadeProdutos();
};
(window as any).RegistarEntrada = RegistarEntrada;
(window as any).Swal = Swal;