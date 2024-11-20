import { Client } from "pg";
import Producao from "src/entity/Producao";

export default class ProducaoRepository {
    private connection: Client;
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
    async save(producao: Producao){
        try {
            this.connection.connect()
            const sql = "INSERT INTO producao (id, renavam, modelo, motor_id, carcaca_id, kitPneu_id, status, data_fabricacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
            const values = [
                producao.getId(), 
                producao.getRenavam(), 
                producao.getModelo(), 
                producao.getMotorId(), 
                producao.getCarcacaId(), 
                producao.getKitPneuId(), 
                producao.getStatus(), 
                producao.getDataFabricacao()];
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
            const sql = "SELECT * FROM producao";
            const result = await this.connection.query(sql, [true]);
            return result.rows;
        } catch (error) {
            console.log(error)
            return [];
        } finally{
            this.connection.end();
        this.connection = null;
        }
    }

    async findByRenavam(renavam: string){
        try {
            this.connection.connect();
            const sql = "SELECT * FROM producao WHERE renavam = $1";
            const result = await this.connection.query(sql, [renavam]);
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
