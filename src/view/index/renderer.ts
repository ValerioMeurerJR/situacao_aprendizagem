import { DataValue } from "src/entity/Funcionariolocal";
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

async function desenharGraficoLinha() {
    const producaoVeiculo = document.getElementById("linha") as HTMLDivElement;    
    const weekDates = getWeekDatesMondayToFriday();  
    const PodDataTotal = await (window as any).bancoAPI.PodDataTotal(weekDates);
    console.log(legend)


    if (!producaoVeiculo) {
        console.error("Elemento com ID 'linha' não encontrado.");
        return;
    }
    producaoVeiculo.style.width = "600px";
    producaoVeiculo.style.height = "400px";
    
    const chart = echarts.init(producaoVeiculo);
    
        var legend = [ 
            {
            name: 'Polo',
            type: 'line',
            data: [0, 20, 30, 40, 50]
        },
        {
            name: 'Carro',
            type: 'line',
            stack: 'Total',
            data: [200, 30, 50, 4, 7, 300]
        }]
    
    const option = {
        title: { text: "Produção" },
        xAxis: {             
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] 
        },
        yAxis: { type: 'value' },
        tooltip: {
            trigger: 'axis'
          },
        legend: {
            data: ['legend', 'teste']
          },
        series: legend
    };

    chart.setOption(option);
    console.log(option);
}


function render (){
    desenharGraficoLinha()
}

window.onload = () => {
    render()
}


function getWeekDatesMondayToFriday(): string[] {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    // Calcular o offset de dias até segunda-feira (1)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + 1); // Ajusta para segunda-feira

    // Criar uma lista de datas de segunda a sexta em formato de string YYYY-MM-DD
    const weekDates: string[] = [];
    for (let i = 0; i < 5; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push(day.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    }

    return weekDates;
}