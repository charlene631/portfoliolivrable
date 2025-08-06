CREATE TABLE `utilisateursgit st` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `lastname` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` bool DEFAULT false,
  `created_at` datetime
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

