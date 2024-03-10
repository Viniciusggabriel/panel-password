CREATE DATABASE PANEL;
    
USE PANEL;
    
CREATE TABLE PANEL_PASS (
  ID_PASS INT PRIMARY KEY AUTO_INCREMENT,
  PASS VARCHAR(10) UNIQUE NOT NULL,
  PASS_TYPE ENUM("Otorrinolaringologista", "Pediatra", "Oftalmologista", "Cardiologista", "Ortopedista", "Ginecologista") NOT NULL,  
  PASS_GUICHE VARCHAR(9) NOT NULL,
  LAST_CONSULT DATETIME DEFAULT NULL 
);

DELIMITER //
CREATE PROCEDURE CAD_PASS_CLIENT (
  IN P_NEW_PASS VARCHAR(10),
  IN P_NEW_PASS_TYPE ENUM("Otorrinolaringologista", "Pediatra", "Oftalmologista", "Cardiologista", "Ortopedista", "Ginecologista"),
  IN P_NEW_GUICHE VARCHAR(9)
)
BEGIN
  DECLARE INSERT_SUCESS INT DEFAULT 0;

  -- Valida os inputs de novo cadastro e retorna uma mensagem de erro
  IF LENGTH(P_NEW_PASS) <> 10 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tamanho de pass invalido (tem de ter 10 caracteres)';
  END IF;

  IF P_NEW_PASS_TYPE NOT IN ("Otorrinolaringologista", "Pediatra", "Oftalmologista", "Cardiologista", "Ortopedista", "Ginecologista") THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Opção invalida';
  END IF;

  IF LENGTH(P_NEW_GUICHE) <> 9 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Guiche invalido';
  END IF;

  -- Insert new pass
  INSERT INTO PANEL_PASS (PASS, PASS_TYPE, PASS_GUICHE)
  VALUES (P_NEW_PASS, P_NEW_PASS_TYPE,P_NEW_GUICHE);

  SET INSERT_SUCESS = ROW_COUNT();

  IF INSERT_SUCESS = 1 THEN
    SELECT 'Novo registro feito com sucesso';
  ELSE
    SELECT 'registro deu erro!';
  END IF;
END //
DELIMITER ;