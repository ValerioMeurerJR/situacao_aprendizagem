import Swal from "sweetalert2";
import "./index.css"
import DataTable from "datatables.net-dt";
import { ptbr } from "../ptbr";


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
async function atualizarStatus(id: string){
    console.log(id);
    const veiculo = await (window as any).bancoAPI.veiculofindById(id);
    console.log(veiculo);
    
    if(veiculo.status == "Pronto para inspeçao"){
        Swal.fire("Assumir inspeção!")
        
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
    }else if(veiculo.status == "Inspeçao em andamento"){ 
    }
    render()
}

function render() {
    console.log("Atualizar")
    listadeCarros();
}
window.onload = () => {
    listadeCarros()
};
(window as any).atualizarStatus = atualizarStatus;
(window as any).Swal = Swal;