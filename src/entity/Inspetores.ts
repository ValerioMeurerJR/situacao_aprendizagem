import { v4 as uuid } from 'uuid'

export default class Inspetores {
    private id: string;
	private nome: string;
	private email: string;
	private telefone: string;
    constructor (nome: string, email: string, telefone: string){
        this.id = uuid();    
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    public getId(): string {
        return this.id;
    }
    
    public getNome(): string {
        return this.nome;
    }    
    public getEmail(): string {
        return this.email;
    }    
    public getTelefone(): string {
        return this.telefone;
    };
    
}