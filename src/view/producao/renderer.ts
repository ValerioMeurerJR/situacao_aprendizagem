import "./login.css"
import Producao from "../../entity/Producao";

document.getElementById("cadastrar").addEventListener("click", async (event: MouseEvent) => {
    event.preventDefault();
    var renavam = document.getElementById("renavam") as HTMLInputElement;
    var modelo = document.getElementById("modelo") as HTMLInputElement;
    var motor = document.getElementById("motor") as HTMLInputElement;
    var kitpneu = document.getElementById("kitpneu") as HTMLInputElement;
    var carcaca = document.getElementById("carcaca") as HTMLInputElement;
    const carro = {
        renavam:  renavam.value, 
        modelo: modelo.value, 
        motor: motor.value, 
        carcaca: carcaca.value, 
        kitpneu: kitpneu.value
    }
    const result = await (window as any).bancoAPI.createProducao(carro);
    renavam.value = '';
    modelo.value = '';
    preencheComboBox();
})

async function preencheComboBox() {
    const estoque = await (window as any).bancoAPI.findAllEstoque();
    var motor = document.getElementById("motor");
    var kitpneu = document.getElementById("kitpneu");
    var carcaca = document.getElementById("carcaca");
    motor.innerHTML = `<option value="" >Selecione uma opção</option>`;
    kitpneu.innerHTML = `<option value="" >Selecione uma opção</option>`;
    carcaca.innerHTML = `<option value="" >Selecione uma opção</option>`;
    
    for (var i = 0; i < estoque.length; i++) {
        if(estoque[i].tipo === 'Motor'){            
            motor.innerHTML += `
                <option value="${estoque[i].id}">${estoque[i].nome}</option>
            `;
        }else if(estoque[i].tipo === 'Pneu'){
            kitpneu.innerHTML += `
            <option value="${estoque[i].id}">${estoque[i].nome}</option>
        `;
        }else if(estoque[i].tipo === 'Carcaca'){
            carcaca.innerHTML += `
            <option value="${estoque[i].id}">${estoque[i].nome}</option>
        `;
        }
    }
}
(window as any).Onload(preencheComboBox())