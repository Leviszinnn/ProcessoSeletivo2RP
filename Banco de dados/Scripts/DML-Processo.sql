USE Processo2rp;
GO

INSERT INTO TipoUsuario(TipoUser)
VALUES ('Geral'),('Admin'),('Root');
GO

INSERT INTO Usuarios(IdTipo,Nome,Senha,Email,Status)
VALUES (1, 'Claudio', '12345', 'Claudio@2rpnet.com', 1),
(2, 'Roberto', '54321', 'Roberto@2rpnet.com', 1),
(3, 'Camila', '98765', 'Camila@2rpnet.com', 1);
GO