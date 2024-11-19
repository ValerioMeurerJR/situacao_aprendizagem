import { v4 as uuid } from 'uuid'

export default class Estoque {
    private id: string;
	private nome: string;
	private quantidade: number;
	private fabricante: string;
	private tipo: string;
    constructor (nome: string, quantidade: number, fabricante: string, tipo: string){
        this.id = uuid();    
        this.nome = nome;
        this.quantidade = quantidade;
        this.fabricante = fabricante;
        this.tipo = tipo;
    }

    public getId(): string {
        return this.id;
    }
    
    public getNome(): string {
        return this.nome;
    }
    
    public getQuantidade(): number {
        return this.quantidade;
    }
    
    public getFabricante(): string {
        return this.fabricante;
    }
    
    public getTipo(): string {
        return this.tipo;
    }
    
}