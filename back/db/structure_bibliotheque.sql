CREATE DATABASE IF NOT EXISTS accessitheque;
USE accessitheque;
CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_verified` BOOLEAN DEFAULT FALSE
);

INSERT INTO users (name, lastname, email, password, role, is_verified)
VALUES 
  ("admin", "admin", "a@a.fr", "admin", "admin", 1),
  ("john", "Doe", "b@b.fr", "b", "user", 0 ),
  ("jane", "Doe", "c@c.fr", "c", "user", 0 )
  ;


CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

INSERT INTO categories (name)
VALUES 
  ("NUTRITION"),
  ("SPORT"),
  ("TECHNOLOGIE"),
  ("ACCESSIBILTE")
  ;


CREATE TABLE `documents` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `format` varchar(255),
  `auteur_id` int,
  `categorie_id` int,
  `created_at` datetime,
  `updated_at` datetime
);
ALTER TABLE `documents`
ADD FOREIGN KEY (`auteur_id`) REFERENCES `users` (`id`);
ALTER TABLE `documents`
ADD FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`);

INSERT INTO documents (
    title,
    description,
    format,
    auteur_id,
    categorie_id,
    created_at,
    updated_at
) VALUES
("Guide de nutrition équilibrée",
 "Un guide complet pour adopter une alimentation saine et équilibrée.",
 "PDF",
 2,
 1,
 '2025-05-10 14:23:00',
 '2025-05-25 10:12:00'),

("Recettes rapides et saines",
 "Collection de recettes simples pour manger mieux au quotidien.",
 "DOCX",
 3,
 1,
 '2025-04-18 09:45:00',
 '2025-04-29 16:37:00'),

("Programme d'entraînement débutant",
 "Plan d'exercices sur 4 semaines pour améliorer sa condition physique.",
 "PDF",
 2,
 2,
 '2025-03-22 08:15:00',
 '2025-04-05 11:48:00'),

("Yoga pour tous",
 "Séance vidéo de yoga adaptée à tous les niveaux.",
 "MP4",
 3,
 2,
 '2025-06-02 15:10:00',
 '2025-06-10 18:25:00'),

("Introduction à l'accessibilité web",
 "Document expliquant les bonnes pratiques pour rendre un site accessible.",
 "PDF",
 1,
 3,
 '2025-02-14 10:05:00',
 '2025-03-01 09:20:00'),

("Guide d'utilisation des lecteurs d'écran",
 "Instructions pour configurer et utiliser un lecteur d’écran sur PC et mobile.",
 "DOCX",
 1,
 3,
 '2025-04-05 13:50:00',
 '2025-04-20 14:42:00'),

("Accessibilité dans les lieux publics",
 "Analyse des normes et bonnes pratiques pour améliorer l'accès aux bâtiments.",
 "PDF",
 2,
 4,
 '2025-01-28 08:33:00',
 '2025-02-15 12:55:00'),

("Créer un document accessible",
 "Tutoriel étape par étape pour créer un document compatible avec les outils d’accessibilité.",
 "PDF",
 3,
 4,
 '2025-07-01 09:00:00',
 '2025-07-15 11:27:00')
 ;

