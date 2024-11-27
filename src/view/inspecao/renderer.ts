import Swal from "sweetalert2";
import "./index.css"
import DataTable from "datatables.net-dt";
import { ptbr } from "../ptbr";
import { Funcionariolocal } from "src/entity/Funcionariolocal";

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

async function listadeCarros() {
    const ultimos = await (window as any).bancoAPI.findUltimosCadastrado();
    console.log(ultimos)
    const sideLista = document.getElementById("lista");
    sideLista.innerHTML = "";
    sideLista.innerHTML = `
    <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Numero Chassi</th>
                <th>Modelo</th>
                <th>Motor</th>
                <th>Chassi</th>
                <th>Kit Pneu</th>
                <th>Status</th>
                <th>Data Fabricação</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <!-- Os dados serão carregados dinamicamente -->
        </tbody>
    </table>
    `
    const formattedData = ultimos.map((item: any) => [
        item.nchassi,
        item.modelo,
        item.motor,
        item.chassi,
        item.kitpneu,
        item.status,
        new Date(item.data_fabricacao).toLocaleString('pt-BR'),
        `<button class="button" onclick='atualizarStatus("${item.id}")'>Atualizar Status</button>`
    ]);

    const table = new DataTable('#example', {
        data: formattedData,
        'order': [[1, 'asc']],
        "lengthMenu": [[6, 10, 20, -1], [6, 10, 20, "All"]],
        language: ptbr,
        columns: [
            { title: "Numero Chassi" },
            { title: "Modelo" },
            { title: "Motor" },
            { title: "Chassi" },
            { title: "Kit Pneu" },
            { title: "Status" },
            { title: "Data Fabricação" },
            { title: "Ação" }
        ]
    });
    table.on('draw', () => {
        permissao();
    });
    permissao();
}

async function atualizarStatus(id: string) {
    console.log(id);
    const veiculo = await (window as any).bancoAPI.veiculofindById(id);
    console.log(veiculo);

    if (veiculo.status == "Pronto para inspeçao") {
        await Swal.fire({
            title: 'Atualizar Status para em Andamento',
            showCancelButton: true,
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                (window as any).bancoAPI.veiculoupdateStatusById(id, 'Inspeçao em andamento');
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    } else if (veiculo.status == "Inspeçao em andamento") {
        await Swal.fire({
            title: 'Veiculo foi Aprovado?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Reprovado",
            confirmButtonText: "Aprovado"
        }).then((result) => {
            if (result.isConfirmed) {
                (window as any).bancoAPI.veiculoupdateStatusById(id, 'Aprovado');
            } else if (result.isDismissed) {
                (window as any).bancoAPI.veiculoupdateStatusById(id, 'Reprovado');
            }
        });
    }
    render()
}

function render() {
    listadeCarros();
}
window.onload = () => {
    listadeCarros()
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

};

function permissao() {
    console.log(funcionario);
    if ((funcionario.cargo == 'Inspetor') || (funcionario.cargo == 'Administrador')) {
        const buttons = document.getElementsByClassName("button") as HTMLCollectionOf<HTMLButtonElement>;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }

    } else {
        const buttons = document.getElementsByClassName("button") as HTMLCollectionOf<HTMLButtonElement>;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            buttons[i].innerText = "Desativado";
        }
    }
}
(window as any).atualizarStatus = atualizarStatus;
(window as any).Swal = Swal;