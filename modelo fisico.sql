SQL 

CREATE DATABASE nodelogin ; 

USE nodelogin ; 

CREATE TABLE users ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 username VARCHAR(255) NOT NULL UNIQUE, 
 password VARCHAR(255) NOT NULL, 
 email VARCHAR(255), -- Campo para correo electrónico 
 age INT, -- Edad del usuario 
 country VARCHAR(255), -- País del usuario 
 profile_icon INT, -- Índice del icono de perfil 
 creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación de la cuenta  role ENUM('student', 'teacher') DEFAULT 'student' -- Rol del usuario 
); 

CREATE TABLE sessions ( 
 session_id VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL PRIMARY  KEY, 
 user_id INT NOT NULL, 
 expires INT(11) UNSIGNED NOT NULL, 
 data MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
); 

CREATE TABLE user_points_and_achievements ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 user_id INT NOT NULL,
 points INT DEFAULT 0, 
 achievement_id INT, 
 FOREIGN KEY (user_id) REFERENCES users(id) 
); 

CREATE TABLE quizzes ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 title VARCHAR(255) NOT NULL, 
 description TEXT, 
 topic VARCHAR(255), 
 creator_id INT NOT NULL, 
 access_code VARCHAR(255), 
 FOREIGN KEY (creator_id) REFERENCES users(id) ); 

CREATE TABLE quiz_participations ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 user_id INT NOT NULL, 
 quiz_id INT NOT NULL, 
 score INT, 
 participation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  status ENUM('completed', 'incomplete') DEFAULT 'incomplete',  FOREIGN KEY (user_id) REFERENCES users(id), 
 FOREIGN KEY (quiz_id) REFERENCES quizzes(id) 
); 

CREATE TABLE incomplete_quiz_progress ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 user_id INT NOT NULL,
 quiz_id INT NOT NULL, 
 progress TEXT, 
 FOREIGN KEY (user_id) REFERENCES users(id), 
 FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ); 

CREATE TABLE achievements ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 name VARCHAR(255) NOT NULL, 
 description TEXT 
); 

CREATE TABLE user_achievements ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 user_id INT NOT NULL, 
 achievement_id INT NOT NULL, 
 unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY (user_id) REFERENCES users(id), 
 FOREIGN KEY (achievement_id) REFERENCES achievements(id) ); 

CREATE TABLE leaderboard ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 user_id INT NOT NULL, 
 total_points INT NOT NULL, 
 update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),  FOREIGN KEY (user_id) REFERENCES users(id) 
);

CREATE TABLE profile_icons ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 icon_name VARCHAR(255) NOT NULL, -- Nombre del icono (opcional)  icon_path VARCHAR(255) NOT NULL -- Ruta o URL donde se almacena el icono ); 

ALTER TABLE users 
ADD COLUMN profile_icon_id INT, 
ADD FOREIGN KEY (profile_icon_id) REFERENCES profile_icons(id); 

CREATE TABLE password_reset_tokens ( 
 id INT AUTO_INCREMENT PRIMARY KEY, 
 user_id INT NOT NULL, 
 token VARCHAR(255) NOT NULL, 
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
 expires_at DATETIME, 
 FOREIGN KEY (user_id) REFERENCES users(id) 
); 

INSERT INTO users (username, password) 
VALUES ('usuario1', 'password123'); 

INSERT INTO password_reset_tokens (user_id, token, expires_at)
VALUES (1, 'random_token', NOW() + INTERVAL 1 HOUR); DROP DATABASE nodelogin ;
