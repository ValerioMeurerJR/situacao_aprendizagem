import { DataValue } from "src/interface/Funcionariolocal";
import "./index.css"
import * as echarts from 'echarts';

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

async function desenharGraficoProducao() {
    const producaoVeiculo = document.getElementById("producao") as HTMLDivElement;
    const dadosData = getSemanaAtual();
    let modelos: string[] = [];
    let series: any[] = [];
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const PodDataTotal = await (window as any).bancoAPI.PodDataTotal(dadosData.inicio, dadosData.fim);
    console.log(PodDataTotal)
    PodDataTotal.forEach((valor: any) => {
        if (!modelos.find((item: any) => item === valor.modelo)) {
            modelos.push(valor.modelo)
        }
    });
    PodDataTotal.forEach((valor: any) => {
        const data = new Date(valor.data_fabricacao);
        const diaSemana = data.getDay(); 
        if (!series[valor.modelo]) {
            series[valor.modelo] = { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0 };
        }
        const dia = diasDaSemana[diaSemana - 1];
        series[valor.modelo][dia]++;
        
    });
    const resultado = Object.entries(series).map(([modelo, quantidade]) => ({
        name: modelo,
        type: 'line',
        stack: 'Total',
        data: diasDaSemana.map((dia) => quantidade[dia]),
    }));
    console.log(resultado)


    if (!producaoVeiculo) {
        console.error("Elemento com ID 'linha' não encontrado.");
        return;
    }
    producaoVeiculo.style.width = "600px";
    producaoVeiculo.style.height = "400px";

    const chart = echarts.init(producaoVeiculo);


    const option = {
        title: { text: "Produção" },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
        },
        yAxis: { type: 'value' },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: modelos
        },
        series: resultado
    };

    chart.setOption(option);
    console.log(option);
}

async function desenharGraficoMotor() {
    const producaoVeiculo = document.getElementById("motor") as HTMLDivElement;
    const dadosData = getSemanaAtual();
    let motor: string[] = [];
    let series: any[] = [];
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const PodDataEstoque = await (window as any).bancoAPI.PodDataEstoque(dadosData.inicio, dadosData.fim);
    console.log(PodDataEstoque)
    PodDataEstoque.forEach((valor: any) => {
        if (!motor.find((item: any) => item === valor.motor)) {
            motor.push(valor.motor)
        }
    });
    PodDataEstoque.forEach((valor: any) => {
        const data = new Date(valor.data_fabricacao);
        const diaSemana = data.getDay(); 
        if (!series[valor.motor]) {
            series[valor.motor] = { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0 };
        }
        const dia = diasDaSemana[diaSemana - 1];
        series[valor.motor][dia]++;        
    });
    const resultado = Object.entries(series).map(([motor, quantidade]) => ({
        name: motor,
        type: 'line',
        stack: 'Total',
        data: diasDaSemana.map((dia) => quantidade[dia]),
    }));
    console.log(resultado)


    if (!producaoVeiculo) {
        console.error("Elemento com ID 'linha' não encontrado.");
        return;
    }
    producaoVeiculo.style.width = "600px";
    producaoVeiculo.style.height = "400px";

    const chart = echarts.init(producaoVeiculo);


    const option = {
        title: { text: "Motor" },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
        },
        yAxis: { type: 'value' },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: motor
        },
        series: resultado
    };

    chart.setOption(option);
    console.log(option);
}

async function desenharGraficoPneu() {
    const producaoVeiculo = document.getElementById("pneu") as HTMLDivElement;
    const dadosData = getSemanaAtual();
    let pneu: string[] = [];
    let series: any[] = [];
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const PodDataEstoque = await (window as any).bancoAPI.PodDataEstoque(dadosData.inicio, dadosData.fim);
    console.log(PodDataEstoque)
    PodDataEstoque.forEach((valor: any) => {
        if (!pneu.find((item: any) => item === valor.pneu)) {
            pneu.push(valor.pneu)
        }
    });
    PodDataEstoque.forEach((valor: any) => {
        const data = new Date(valor.data_fabricacao);
        const diaSemana = data.getDay(); 
        if (!series[valor.pneu]) {
            series[valor.pneu] = { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0 };
        }
        const dia = diasDaSemana[diaSemana - 1];
        series[valor.pneu][dia]++;        
    });
    const resultado = Object.entries(series).map(([pneu, quantidade]) => ({
        name: pneu,
        type: 'line',
        stack: 'Total',
        data: diasDaSemana.map((dia) => quantidade[dia]),
    }));
    console.log(resultado)


    if (!producaoVeiculo) {
        console.error("Elemento com ID 'linha' não encontrado.");
        return;
    }
    producaoVeiculo.style.width = "600px";
    producaoVeiculo.style.height = "400px";

    const chart = echarts.init(producaoVeiculo);


    const option = {
        title: { text: "Pneu" },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
        },
        yAxis: { type: 'value' },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: pneu
        },
        series: resultado
    };

    chart.setOption(option);
    console.log(option);
}

async function desenharGraficoChassi() {
    const producaoVeiculo = document.getElementById("chassi") as HTMLDivElement;
    const dadosData = getSemanaAtual();
    let chassi: string[] = [];
    let series: any[] = [];
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const PodDataEstoque = await (window as any).bancoAPI.PodDataEstoque(dadosData.inicio, dadosData.fim);
    console.log(PodDataEstoque)
    PodDataEstoque.forEach((valor: any) => {
        if (!chassi.find((item: any) => item === valor.chassi)) {
            chassi.push(valor.chassi)
        }
    });
    PodDataEstoque.forEach((valor: any) => {
        const data = new Date(valor.data_fabricacao);
        const diaSemana = data.getDay(); 
        if (!series[valor.chassi]) {
            series[valor.chassi] = { Segunda: 0, Terça: 0, Quarta: 0, Quinta: 0, Sexta: 0 };
        }
        const dia = diasDaSemana[diaSemana - 1];
        series[valor.chassi][dia]++;        
    });
    const resultado = Object.entries(series).map(([chassi, quantidade]) => ({
        name: chassi,
        type: 'line',
        stack: 'Total',
        data: diasDaSemana.map((dia) => quantidade[dia]),
    }));
    console.log(resultado)


    if (!producaoVeiculo) {
        console.error("Elemento com ID 'linha' não encontrado.");
        return;
    }
    producaoVeiculo.style.width = "600px";
    producaoVeiculo.style.height = "400px";

    const chart = echarts.init(producaoVeiculo);
    const option = {
        title: { text: "Chassi" },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta']
        },
        yAxis: { type: 'value' },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: chassi
        },
        series: resultado
    };

    chart.setOption(option);
    console.log(option);
}
function render() {
    desenharGraficoProducao()
    desenharGraficoMotor()
    desenharGraficoPneu()
    desenharGraficoChassi()
}

window.onload = () => {
    render()
}


function getSemanaAtual(): { inicio: string; fim: string } {
    const Data = new Date();
    const diaAtual = Data.getDay();

    const segunda = new Date(Data);
    segunda.setDate(Data.getDate() - diaAtual + 1);

    const sexta = new Date(segunda);
    sexta.setDate(segunda.getDate() + 4);

    return {
        inicio: segunda.toISOString().split('T')[0],
        fim: sexta.toISOString().split('T')[0],
    };
}