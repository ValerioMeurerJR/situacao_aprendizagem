import { v4 as uuid } from 'uuid'

export default class Funcionario {
    private id: string;
    private nome: string;
    private email: string;
    private usuario: string;
    private password: string;
    private data_nascimento: Date;
    private criado_em: Date;
    private atualizado_em: Date;
    private cargo: string;

    constructor(nome: string, email: string, usuario: string, password: string, data_nascimento: Date, cargo: string) {
        this.id = uuid();
        this.nome = nome;
        this.email = email;
        this.usuario = usuario;
        this.data_nascimento = data_nascimento;
        this.criado_em = new Date();
        this.atualizado_em = new Date();
        this.password = password;
        this.cargo = cargo;
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

    public getUsuario(): string {
        return this.usuario;
    }

    public getPassword(): string {
        return this.password;
    }

    public getDataNascimento(): Date {
        return this.data_nascimento;
    }

    public getCriadoEm(): Date {
        return this.criado_em;
    }

    public getAtualizadoEm(): Date {
        return this.atualizado_em;
    }
    
    public getCargo(): string {
        return this.cargo;
    }
}
