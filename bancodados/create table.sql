CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE inpestores (
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
    renavam VARCHAR(50) UNIQUE NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    motor_id UUID NOT NULL,
    carcaca_id UUID NOT NULL,
    kitPneu_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_fabricacao TIMESTAMP NOT NULL,
    inpestores_id UUID NULL,
	FOREIGN KEY (motor_id) REFERENCES estoque(id) ON DELETE CASCADE,
	FOREIGN KEY (carcaca_id) REFERENCES estoque(id) ON DELETE CASCADE,
	FOREIGN KEY (kitPneu_id) REFERENCES estoque(id) ON DELETE CASCADE,
	FOREIGN KEY (inpestores_id) REFERENCES inpestores(id) ON DELETE CASCADE
);

CREATE TABLE entradaproduto (
    id UUID PRIMARY KEY,
	numero_nota INTEGER NOT NULL,
	quantidade INTEGER NOT NULL,
	estoque_id UUID NOT NULL
    FOREIGN KEY (estoque_id) REFERENCES estoque(id) ON DELETE CASCADE,
);