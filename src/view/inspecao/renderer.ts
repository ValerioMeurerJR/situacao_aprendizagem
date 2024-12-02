import Swal from "sweetalert2";
import "./index.css"
import DataTable from "datatables.net-dt";
import { ptbr } from "../ptbr";
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

async function listadeCarros() {
    const ultimos = await (window as any).bancoAPI.findUltimosCadastrado();
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
        //permissao();
    });
    //permissao();
}

async function atualizarStatus(id: string) {
    const veiculo = await (window as any).bancoAPI.veiculofindById(id);
    
    if (veiculo.status == "Pronto para inspeçao") {
        console.log(veiculo)
        await Swal.fire({
            title: 'Atualizar status para em andamento',
            showCancelButton: true,
            showConfirmButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                (window as any).bancoAPI.veiculoupdateStatusById(id, 'Inspeçao em andamento');
                Swal.fire("Status Atualizado!", "", "success");
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
        }).then( async (result) => {
            if (result.isConfirmed) {
                await (window as any).bancoAPI.veiculoupdateStatusById(id, 'Aprovado');                
                Swal.fire("Status Atualizado!", "", "success");
            } else if (result.isDismissed) {
                await (window as any).bancoAPI.veiculoupdateStatusById(id, 'Reprovado');
                Swal.fire("Status Atualizado!", "", "success");
            }
        });
    }
    render()
}

async function render() {
    await listadeCarros();
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