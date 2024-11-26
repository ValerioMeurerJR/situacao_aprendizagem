import { Funcionariolocal } from "src/entity/Funcionariolocal";
import { ptbr } from "../ptbr";
import "./login.css"
import DataTable from "datatables.net-dt";
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
    var nchassi = document.getElementById("nchassi") as HTMLInputElement;
    var modelo = document.getElementById("modelo") as HTMLInputElement;
    var motor = document.getElementById("motor") as HTMLInputElement;
    var kitpneu = document.getElementById("kitpneu") as HTMLInputElement;
    var chassi = document.getElementById("chassi") as HTMLInputElement;
    const carro = {
        nchassi: nchassi.value,
        modelo: modelo.value,
        motor: motor.value,
        chassi: chassi.value,
        kitpneu: kitpneu.value
    }
    console.log(carro)
    await (window as any).bancoAPI.createProducao(carro);
    nchassi.value = '';
    modelo.value = '';
    render();
})

async function preencheComboBox() {
    const estoque = await (window as any).bancoAPI.findAllEstoque();
    var motor = document.getElementById("motor");
    var kitpneu = document.getElementById("kitpneu");
    var chassi = document.getElementById("chassi");
    motor.innerHTML = `<option value="" >Selecione uma opção</option>`;
    kitpneu.innerHTML = `<option value="" >Selecione uma opção</option>`;
    chassi.innerHTML = `<option value="" >Selecione uma opção</option>`;

    for (var i = 0; i < estoque.length; i++) {
        if (estoque[i].tipo === 'Motor') {
            motor.innerHTML += `
                <option value="${estoque[i].id}">${estoque[i].nome}</option>
            `;
        } else if (estoque[i].tipo === 'Pneu') {
            kitpneu.innerHTML += `
            <option value="${estoque[i].id}">${estoque[i].nome}</option>
        `;
        } else if (estoque[i].tipo === 'Chassi') {
            chassi.innerHTML += `
            <option value="${estoque[i].id}">${estoque[i].nome}</option>
        `;
        }
    }
}

async function listaUltimosCadastrado() {
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
        new Date(item.data_fabricacao).toLocaleString('pt-BR')
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
            { title: "Data Fabricação" }
        ]
    });
}

async function render(){
    console.log("Atualizar")
    await listaUltimosCadastrado();    
    preencheComboBox();
}
window.onload = () => {
    preencheComboBox();
    listaUltimosCadastrado();
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
    permissao()
};

function permissao() {
    console.log(funcionario);
    const ids = ["nome", "quantidade", "fabricante", "tipo"];
    if ((funcionario.cargo == 'Produção') || (funcionario.cargo == 'Administrador')) {   
        (document.getElementById("cadastrar") as HTMLButtonElement).disabled = false     
        ids.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                element.disabled = false; 
            }
        });
    }else{
        (document.getElementById("cadastrar") as HTMLButtonElement).disabled = true
        ids.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                element.disabled = true;
            }
        });
    }
}