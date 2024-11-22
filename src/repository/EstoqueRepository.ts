import { Client } from "pg";
import Estoque from "src/entity/Estoque";

export default class EstoqueRepository {
    private connection: Client

    constructor() {
        if(!this.connection){
            this.connection = new Client({
                host: "localhost",
                port: 5432,
                database: 'fabrica',
                user: 'postgres',
                password: 'senai'
            });
        }
    }

    async save(estoque: Estoque){
        try {
            this.connection.connect()
            const sql = "INSERT INTO estoque (id, nome, quantidade, fabricante, tipo) VALUES ($1, $2, $3, $4, $5)";
            const values = [
                estoque.getId(), 
                estoque.getNome(), 
                estoque.getQuantidade(), 
                estoque.getFabricante(), 
                estoque.getTipo()];
            await this.connection.query(sql, values);
            
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }
    
    async findAll(){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM estoque WHERE quantidade != 0";
            const result = await this.connection.query(sql);
            return result.rows;
        } catch (error) {
            console.log(error)
            return [];
        } finally{
            this.connection.end();
        this.connection = null;
        }
    }

    async findAlll(){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM estoque WHERE quantidade != 0";
            const result = await this.connection.query(sql);
            return result.rows;
        } catch (error) {
            console.log(error)
            return [];
        } finally{
            this.connection.end();
        this.connection = null;
        }
    }

    async findByTipo(tipo: string){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM estoque WHERE tipo = $1";
            const result = await this.connection.query(sql, [tipo]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
            return []
        }finally {
            this.connection.end();
            this.connection = null;
        }
    }
    async menos(produto: string) {
        try {
            this.connection.connect();
            const sql = "UPDATE estoque SET quantidade = quantidade - 1  WHERE id = $1";
            await this.connection.query(sql, [produto])
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }
    async somar(produto: string, quantidade: number) {
        try {
            this.connection.connect();
            const sql = "UPDATE estoque SET quantidade = quantidade + $2  WHERE id = $1";
            await this.connection.query(sql, [produto, quantidade])
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }

    // async delete(id: string) {
        // try {
        //     this.connection.connect();
        //     const sql = "UPDATE producao SET esta_ativo = $1 WHERE id = $2";
        //     await this.connection.query(sql, [false, id])
        // } catch (error) {
        //     console.log(error)
        // } finally {
        //     this.connection.end();
        //     this.connection = null;
        // }
    // }


}
