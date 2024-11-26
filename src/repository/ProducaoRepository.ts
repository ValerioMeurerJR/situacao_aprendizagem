import { Client } from "pg";
import Producao from "src/entity/Producao";

export default class ProducaoRepository {
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
    }
    async save(producao: Producao) {
        try {
            this.connection.connect()
            const sql = "INSERT INTO producao (id, nchassi, modelo, motor_id, chassi_id, kitPneu_id, status, data_fabricacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
            const values = [
                producao.getId(),
                producao.getNChassi(),
                producao.getModelo(),
                producao.getMotorId(),
                producao.getChassiId(),
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

    async findAll() {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM producao";
            const result = await this.connection.query(sql, [true]);
            return result.rows;
        } catch (error) {
            console.log(error)
            return [];
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }

    async findUltimosCadastrado() {
        try {
            this.connection.connect();
            const sql = `
                SELECT 
                p.id,
                p.nchassi,
                p.modelo,
                m.nome as motor,
                c.nome as chassi,
                k.nome as KitPneu,
                p.status,
                p.data_fabricacao
                FROM 
                producao as p
                INNER JOIN estoque m ON p.motor_id = m.id
                INNER JOIN estoque c ON p.chassi_id = c.id
                INNER JOIN estoque k ON p.kitPneu_id = k.id
                ORDER BY data_fabricacao DESC`;
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

    async findByRenavam(renavam: string) {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM producao WHERE renavam = $1";
            const result = await this.connection.query(sql, [renavam]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
            return []
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }
    async veiculofindById(id: string) {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM producao WHERE id = $1";
            const result = await this.connection.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
            return []
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }
    async veiculoupdateStatusById(id: string, novoStatus: string) {
        try {
            this.connection.connect();
            const sql = "UPDATE producao SET status = $1 WHERE id = $2";
            const result = await this.connection.query(sql, [novoStatus, id]);
            return result.rows[0];
        } catch (error) {
            console.log(error)
            return []
        } finally {
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
