import { Client } from "pg";
import Funcionario from "src/entity/Funcionario";

export default class FuncionariosRepository {
    private connection: Client;
    constructor() {
        if (!this.connection) {
            this.connection = new Client({
                host: "localhost",
                port: 5432,
                database: 'fabrica',
                user: 'postgres',
                password: 'senai'
            });
        }	
        // id UUID PRIMARY  KEY,
        // nome VARCHAR(100) NOT NULL,
        // email VARCHAR(100) UNIQUE NOT NULL,
        // usuario VARCHAR(32) UNIQUE NOT NULL,
        // data_nascimento DATE NOT NULL,
        // password_hash VARCHAR(200) NOT NULL,
        // cargo VARCHAR(100) NOT NULL,
        // criado_em TIMESTAMP NOT NULL,
        //  atualizado_em TIMESTAMP NOT NULL	
    }
    async save(funcionario: Funcionario) {
        try {
            this.connection.connect()
            const sql = "INSERT INTO funcionarios (id, nome, email, usuario, data_nascimento, password_hash, cargo, criado_em, atualizado_em) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
            const values = [
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getEmail(),
                funcionario.getUsuario(),
                funcionario.getDataNascimento(),
                funcionario.getPassword(),
                funcionario.getCargo(),
                funcionario.getCriadoEm(),
                funcionario.getAtualizadoEm()];
            await this.connection.query(sql, values);

        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }

    async findAll() {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM funcionarios";
            const result = await this.connection.query(sql);
            return result.rows;
        } catch (error) {
            console.log(error)
            return [];
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }
    
    async usuariofindByEmailorUser(email: string, user: string) {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM funcionarios WHERE email = $1 OR usuario =$2";
            const result = await this.connection.query(sql, [email, user]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
            return []
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }
    // async veiculoupdateStatusById(id: string, novoStatus: string) {
    //     try {
    //         this.connection.connect();
    //         const sql = "UPDATE producao SET status = $1 WHERE id = $2";
    //         const result = await this.connection.query(sql, [novoStatus, id]);
    //         return result.rows[0];
    //     } catch (error) {
    //         console.log(error)
    //         return []
    //     } finally {
    //         this.connection.end();
    //         this.connection = null;
    //     }
    // }

    // async delete(id: string) {
    //     try {
    //         this.connection.connect();
    //         const sql = "UPDATE producao SET esta_ativo = $1 WHERE id = $2";
    //         await this.connection.query(sql, [false, id])
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         this.connection.end();
    //         this.connection = null;
    //     }
    // }


}
