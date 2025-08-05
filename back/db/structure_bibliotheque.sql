CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

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

ALTER TABLE `documents` ADD FOREIGN KEY (`auteur_id`) REFERENCES `utilisateurs` (`id`);

ALTER TABLE `documents` ADD FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`);
