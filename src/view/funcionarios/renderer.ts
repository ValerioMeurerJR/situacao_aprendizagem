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


document.getElementById("Cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    var name = document.getElementById("nome") as HTMLInputElement;
    var user = document.getElementById("usuario") as HTMLInputElement;
    var data_nascimento = document.getElementById("data_nascimento") as HTMLInputElement;
    var email = document.getElementById("email") as HTMLInputElement;
    var password = document.getElementById("password") as HTMLInputElement;
    var passwordConfirmation = document.getElementById("password_confirmation") as HTMLInputElement;
    var cargo = document.getElementById("cargo") as HTMLInputElement;

    if ((password.value !== passwordConfirmation.value) || (name.value === '' || data_nascimento.value === '' || email.value === '' || password.value === ''|| user.value === '')) {
        Swal.fire({
            title: "Oops...",
            text: "SENHAS NÃO CONFEREM!",
            icon: "error"
        });
        return;
    }
    const usuarioExiste = await (window as any).bancoAPIUsuario.usuariofindByEmailorUser(email.value, user.value)
    console.log(usuarioExiste)
    if (usuarioExiste !== undefined) {
        Swal.fire({
            title: "Oops...",
            text: "E-mail ou Usuario ja cadastrado!",
            icon: "error"
        });
        return;
    }
    var usuario = {
        nome: name.value,
        email: email.value,
        user: user.value,
        password: password.value,
        data_nascimento: new Date(data_nascimento.value),
        cargo: cargo.value,
    };
    await (window as any).bancoAPIUsuario.createFuncionario(usuario);
    name.value = '';
    email.value = '';
    password.value = '';
    data_nascimento.value = '';
    passwordConfirmation.value = '';
    user.value = '';
    render()
})


async function listarFuncionarios() {
    const lista = await (window as any).bancoAPIUsuario.findAllFuncionarios();
    console.log(lista)
    const sideLista = document.getElementById("lista");
    sideLista.innerHTML = "";
    sideLista.innerHTML = `
    <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Data Nascimento</th>
                <th>Cargo</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <!-- Os dados serão carregados dinamicamente -->
        </tbody>
    </table>
    `
    const formattedData = lista.map((item: any) => [
        item.nome,
        item.usuario,
        item.email,
        new Date(item.data_nascimento).toLocaleDateString('pt-BR'),
        item.cargo,
        new Date(item.criado_em).toLocaleString('pt-BR'),
        new Date(item.atualizado_em).toLocaleString('pt-BR'),
        `<button onclick='atualizarStatus("${item.id}")'>Editar</button>`
    ]);

    new DataTable('#example', {
        data: formattedData,
        'order': [[1, 'asc']],
        "lengthMenu": [[6, 10, 20, -1], [6, 10, 20, "All"]],
        language: ptbr,
        columns: [
            { title: "Nome" },
            { title: "Usuario" },
            { title: "Email" },
            { title: "Data Nascimento" },
            { title: "Cargo" },
            { title: "Criado em" },
            { title: "Atualizado em" },
            { title: "Ação" }
        ]
    });
}


function render() {
    console.log("Atualizar")
    listarFuncionarios();
}
window.onload = () => {
    listarFuncionarios()
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
    const ids = ["nome", "usuario", "data_nascimento", "email", "password", "password_confirmation", "cargo"];
    if (funcionario.cargo == 'Administrador') {        
        ids.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                element.disabled = false; // Desativa o campo
            }
        });
    }else{
        ids.forEach(id => {
            const element = document.getElementById(id) as HTMLInputElement;
            if (element) {
                element.disabled = true; // Desativa o campo
            }
        });
    }
}
(window as any).listarFuncionarios = listarFuncionarios;
(window as any).Swal = Swal;