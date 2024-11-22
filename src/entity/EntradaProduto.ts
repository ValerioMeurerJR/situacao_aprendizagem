import { v4 as uuid } from 'uuid'

export default class EntradaProduto {
    private id: string;
	private numero_nota: string;
	private quantidade: number;
	private estoqueid: string;
    constructor (numero_nota: string, quantidade: number, estoqueid: string){
        this.id = uuid();    
        this.numero_nota = numero_nota;
        this.quantidade = quantidade;
        this.estoqueid = estoqueid;
    }

    public getId(): string {
        return this.id;
    }
    
    public getNumeroNota(): string {
        return this.numero_nota;
    }
    
    public getQuantidade(): number {
        return this.quantidade;
    }    
    public getEstoqueId(): string {
        return this.estoqueid;
    }    
}