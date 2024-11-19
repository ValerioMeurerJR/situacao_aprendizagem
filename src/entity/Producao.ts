import { v4 as uuid } from 'uuid'

export default class Producao {
    private id: string;
    private renavam: string;
    private modelo: string;
    private motor_id: string;
    private carcaca_id: string;
    private kitPneu_id: string;
    private status: string;
    private data_fabricacao: Date;
    private inpestores_id!: string;

    constructor(renavam: string, modelo: string, motor_id: string, carcaca_id: string, kitPneu_id: string){
        this.id = uuid();     
        this.renavam = renavam;
        this.modelo = modelo;
        this.motor_id = motor_id;
        this.carcaca_id = carcaca_id;
        this.kitPneu_id = kitPneu_id;   
        this.status = "Pronto para inspeçao"
        this.data_fabricacao = new Date();
    }

    public getId(): string {
        return this.id;
    }

    public getRenavam(): string {
        return this.renavam;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public getMotorId(): string {
        return this.motor_id;
    }

    public getCarcacaId(): string {
        return this.carcaca_id;
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