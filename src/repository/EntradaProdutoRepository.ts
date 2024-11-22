import { Client } from "pg";
import EntradaProduto from "src/entity/EntradaProduto";
import Estoque from "src/entity/Estoque";

export default class EntradaProdutoRepository {
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

    async save(EntradaProduto: EntradaProduto){
        try {
            this.connection.connect()
            const sql = "INSERT INTO entradaproduto (id, numero_nota, quantidade, estoque_id) VALUES ($1, $2, $3, $4)";
            const values = [
                EntradaProduto.getId(), 
                EntradaProduto.getNumeroNota(), 
                EntradaProduto.getQuantidade(),
                EntradaProduto.getEstoqueId()];
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
            const sql = "SELECT * FROM entradaproduto";
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
            const sql = "SELECT * FROM EntradaProduto WHERE numero_nota = $1";
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
