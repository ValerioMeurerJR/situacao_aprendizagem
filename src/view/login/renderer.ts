import Swal from "sweetalert2";


document.getElementById("acessar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    const user = document.getElementById("user") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const usuario = await (window as any).bancoAPIUsuario.usuariofindByEmailorUser('', user.value)

    if (usuario === undefined) {
        Swal.fire({
            title: "Oops...",
            text: "Usuario  não cadastrado!",
            icon: "error"
        });
        return;
    }
    const passwordConfirmation = {
        password: password.value,
        password_hash: usuario.password_hash
    }
    const validPassword = await (window as any).authAPI.hash(passwordConfirmation)

    if (!validPassword) {
        Swal.fire({
            title: "Oops...",
            text: "SENHAS NÃO CONFEREM!",
            icon: "error"
        });
        return;
    }
    localStorage.setItem("funcionario", JSON.stringify(usuario));
    (window as any).navigateAPI.irPaginaIndex()
})