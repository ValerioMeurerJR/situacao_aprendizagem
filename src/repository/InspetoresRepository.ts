import { Client } from "pg";
import Inspetores from "../entity/Inspetores";

export default class InspetoresRepository {
    private connection: Client

    constructor() {
        if(!this.connection){
            this.connection = new Client({
                host: "valeriomeurer.ddns.net",
                port: 8086,
                database: 'fabrica',
                user: 'postgres',
                password: '4qcMR484g9AA'
            });
        } 
    }

    async save(inspetor: Inspetores){
        try {
            this.connection.connect()
            const sql = "INSERT INTO inspetores (id, nome, email, telefone) VALUES ($1, $2, $3, $4)";
            const values = [
                inspetor.getId(), 
                inspetor.getNome(), 
                inspetor.getEmail(),
                inspetor.getTelefone()];
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
            const sql = "SELECT * FROM inspetores";
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
            const sql = "SELECT * FROM inspetores";
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
