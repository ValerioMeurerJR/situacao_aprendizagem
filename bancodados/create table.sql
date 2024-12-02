


CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE inspetores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	telefone VARCHAR(50) NOT NULL
);

CREATE TABLE estoque (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	quantidade INTEGER NOT NULL,
	fabricante VARCHAR(50) NOT NULL,
	tipo VARCHAR(50) NOT NULL
);

CREATE TABLE producao (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nchassi VARCHAR(50) UNIQUE NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    motor_id UUID NOT NULL,
    chassi_id UUID NOT NULL,
    kitPneu_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_fabricacao TIMESTAMP NOT NULL,
    inspetores_id UUID NULL,
	FOREIGN KEY (motor_id) REFERENCES estoque(id) ON DELETE CASCADE,
	FOREIGN KEY (chassi_id) REFERENCES estoque(id) ON DELETE CASCADE,
	FOREIGN KEY (kitPneu_id) REFERENCES estoque(id) ON DELETE CASCADE,
	FOREIGN KEY (inspetores_id) REFERENCES inspetores(id) ON DELETE CASCADE
);

CREATE TABLE entradaproduto (
    id UUID PRIMARY KEY,
	numero_nota INTEGER NOT NULL,
	quantidade INTEGER NOT NULL,
	estoque_id UUID NOT NULL,
    FOREIGN KEY (estoque_id) REFERENCES estoque(id) ON DELETE CASCADE
);

CREATE TABLE funcionarios (
	id UUID PRIMARY KEY, 
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(150) NOT NULL,
	usuario VARCHAR(150) NOT NULL,
	password_hash VARCHAR(200) NOT NULL,
	cargo VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);