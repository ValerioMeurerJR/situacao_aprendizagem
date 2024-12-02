CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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
	FOREIGN KEY (inspetores_id) REFERENCES funcionarios(id) ON DELETE CASCADE
);

CREATE TABLE entradaproduto (
    id UUID PRIMARY KEY,
	numero_nota INTEGER NOT NULL,
	quantidade INTEGER NOT NULL,
	estoque_id UUID NOT NULL,
    FOREIGN KEY (estoque_id) REFERENCES estoque(id) ON DELETE CASCADE
);


-- Inserindo motores
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Motor Ford Duratorq TDCi', 100, 'Ford', 'Motor');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Motor Cummins ISF 2.8 Diesel', 50, 'Cummins', 'Motor');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Motor Honda L15B7', 75, 'Honda', 'Motor');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Motor Volkswagen EA888', 80, 'Volkswagen', 'Motor');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Motor Toyota 2ZR-FE', 90, 'Toyota', 'Motor');

-- Inserindo kits de pneus
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Kit 5 Pneu Pirelli', 200, 'Pirelli', 'Pneu');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Kit 5 Pneu Bridgestone', 180, 'Bridgestone', 'Pneu');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Kit 5 Pneu Continental', 150, 'Continental', 'Pneu');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Kit 5 Pneu Michelin', 220, 'Michelin', 'Pneu');

-- Inserindo fabricantes de veículos
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Tesla', 50, 'Tesla', 'Chassi');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('BMW', 60, 'BMW', 'Chassi');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Volvo', 40, 'Volvo', 'Chassi');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Jeep', 70, 'Jeep', 'Chassi');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Chevrolet', 80, 'Chevrolet', 'Chassi');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Toyota', 90, 'Toyota', 'Chassi');
INSERT INTO estoque (nome, quantidade, fabricante, tipo) VALUES ('Mercedes-Benz', 55, 'Mercedes-Benz', 'Chassi');

-- Inserindo usuarios
INSERT INTO funcionarios (id, Nome, email, usuario, data_nascimento, password_hash, cargo, criado_em, atualizado_em) 
values ('0bd59649-1d92-4406-9bd4-46ab47ba6329', 'Administrador', 'admin@gmail.com', 'admin', '2000-05-09', '$2b$12$rRm2hP5ke.Z0RMmYGoO3uuQyLnRUpVcMb6bNXax71pmbrYroDjqQS', 'Administrador', '2024-11-27', '2024-11-27' )


-- Usuario: admin
-- Senha: 1234