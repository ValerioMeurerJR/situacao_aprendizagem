import { v4 as uuid } from 'uuid'

export default class Producao {
    private id: string;
    private nchassi: string;
    private modelo: string;
    private motor_id: string;
    private chassi_id: string;
    private kitPneu_id: string;
    private status: string;
    private data_fabricacao: Date;
    private inpestores_id!: string;

    constructor(nchassi: string, modelo: string, motor_id: string, chassi_id: string, kitPneu_id: string){
        this.id = uuid();     
        this.nchassi = nchassi;
        this.modelo = modelo;
        this.motor_id = motor_id;
        this.chassi_id = chassi_id;
        this.kitPneu_id = kitPneu_id;   
        this.status = "Pronto para inspeçao"
        this.data_fabricacao = new Date();
    }

    public getId(): string {
        return this.id;
    }

    public getNChassi(): string {
        return this.nchassi;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public getMotorId(): string {
        return this.motor_id;
    }

    public getChassiId(): string {
        return this.chassi_id;
    }

    public getKitPneuId(): string {
        return this.kitPneu_id;
    }

    public getStatus(): string {
        return this.status;
    }

    public getDataFabricacao(): Date {
        return this.data_fabricacao;
    }

    public getInpestoresId(): string {
        return this.inpestores_id;
    }

}