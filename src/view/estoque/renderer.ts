import DataTable from "datatables.net-dt";
import Swal from "sweetalert2";
import { ptbr } from "../ptbr";
import "./index.css"
import { Funcionariolocal } from "src/interface/Funcionariolocal";

let funcionario: Funcionariolocal;


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
document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
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
    await (window as any).bancoAPI.createEstoque(item);
    nome.value = '';
    quantidade.value = '';
    fabricante.value = '';
    tipo.value = '';
    await listadeProdutos();
})

async function listadeProdutos() {
    console.log("Atualizado")
    const Produtos = await (window as any).bancoAPI.findAlllEstoque();
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
        `<button class='button' onclick='RegistarEntrada("${item.id}")'>Entrada Nota</button>`
    ]);

    const table = new DataTable('#example', {
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
    table.on('draw', () => {
        //permissao();
    });
    //permissao();
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
    const { isConfirmed, value: formValues } = await Swal.fire({
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

            return { nNota, quantidade };
        }
    });

    if (!isConfirmed) {
        return;
    }



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
    const funcionarioStorage = localStorage.getItem("funcionario");

    if (funcionarioStorage) {
        const funcionariol = JSON.parse(funcionarioStorage);
        const funcionariolocal: Funcionariolocal = {
            id: funcionariol.id,
            nome: funcionariol.nome,
            email: funcionariol.email,
            cargo: funcionariol.cargo
        };
        funcionario = funcionariolocal;
    }
    //permissao()
};

function permissao() {
    console.log(funcionario);
    const ids = ["nome", "quantidade", "fabricante", "tipo"];
    const buttons = document.getElementsByClassName("button") as HTMLCollectionOf<HTMLButtonElement>;
    if ((funcionario.cargo == 'Logista') || (funcionario.cargo == 'Administrador')) {
        (document.getElementById("cadastrar") as HTMLButtonElement).disabled = false
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
        ids.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                element.disabled = false; // Desativa o campo
            }
        });
    } else {
        ids.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                element.disabled = true; // Desativa o campo
            }
        });
        (document.getElementById("cadastrar") as HTMLButtonElement).disabled = true
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            buttons[i].innerText = "Desativado";
        }
    }
}

(window as any).RegistarEntrada = RegistarEntrada;
(window as any).Swal = Swal;