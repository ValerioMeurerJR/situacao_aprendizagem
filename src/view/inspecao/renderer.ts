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
        `<button onclick='atualizarStatus("${item.id}")'>Atualizar Status</button>`
    ]);

    new DataTable('#example', {
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
                console.log('Reprovado');
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
    //permissao()
};

function permissao() {
    console.log(funcionario);
    const ids = ["nome", "quantidade", "fabricante", "tipo"];
    if ((funcionario.cargo == 'Inspetor') || (funcionario.cargo == 'Administrador')) {
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
    }
}
(window as any).atualizarStatus = atualizarStatus;
(window as any).Swal = Swal;