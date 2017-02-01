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
(1,	'nodejs'),
(2,	'php7.0');

DROP TABLE IF EXISTS `packages_versions`;
CREATE TABLE `packages_versions` (
  `package_id` int(11) NOT NULL,
  `version` varchar(16) NOT NULL,
  KEY `package_id` (`package_id`),
  CONSTRAINT `packages_versions_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `packages_versions` (`package_id`, `version`) VALUES
(1,	'1.0.5'),
(2,	'2.5'),
(1,	'7.4.2'),
(1,	'6.8');

-- 2017-02-01 08:38:31