-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `packages`;
CREATE TABLE `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `packages` (`id`, `name`) VALUES
(2,	'php7.0'),
(3,	'nginx'),
(4,	'mysql-5.6'),
(5,	'php5');

DROP TABLE IF EXISTS `packages_versions`;
CREATE TABLE `packages_versions` (
  `package_id` int(11) NOT NULL,
  `version` varchar(16) NOT NULL,
  KEY `package_id` (`package_id`),
  CONSTRAINT `packages_versions_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `packages_versions` (`package_id`, `version`) VALUES
(2,	'7.0.11'),
(3,	'1.8.0'),
(3,	'1.10.2'),
(4,	'5.6.35'),
(4,	'5.6.25'),
(5,	'5.6.30'),
(5,	'5.6.21');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(16) NOT NULL,
  `pass` varchar(64) NOT NULL,
  `auth` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `login`, `pass`, `auth`) VALUES
(1,	'gaudea_h',	'cf42713fbfa844ea8031a337c3b036c681c21bbdba1e9c0eca545527ff2609f0',	1);

-- 2017-02-04 10:10:30