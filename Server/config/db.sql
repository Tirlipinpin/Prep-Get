-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `packages`;
CREATE TABLE `packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `author` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `packages` (`id`, `name`, `author`) VALUES
(26,	'apcu',	'gaudea_h'),
(28,	'apcu-bc',	'gaudea_h'),
(29,	'libmemcached',	'gaudea_h'),
(30,	'mysql-5.5',	'gaudea_h'),
(31,	'mysql-5.6',	'gaudea_h'),
(32,	'nginx',	'gaudea_h'),
(33,	'pear-channels',	'gaudea_h'),
(34,	'percona-toolkit',	'gaudea_h'),
(35,	'php5',	'gaudea_h'),
(36,	'php5-apcu',	'gaudea_h'),
(37,	'php5-gearman',	'gaudea_h'),
(38,	'php5-geoip',	'gaudea_h'),
(39,	'php5-imagick',	'gaudea_h'),
(40,	'php5-memcache',	'gaudea_h'),
(41,	'php5-memcached',	'gaudea_h'),
(42,	'php5-mongo',	'gaudea_h'),
(43,	'php5-msgpack',	'gaudea_h'),
(44,	'php5-pecl-http',	'gaudea_h'),
(45,	'php5-propro',	'gaudea_h'),
(46,	'php5-pthreads',	'gaudea_h'),
(47,	'php5-raphf',	'gaudea_h'),
(48,	'php5-redis',	'gaudea_h'),
(49,	'php5-ssh2',	'gaudea_h'),
(50,	'php7.0',	'gaudea_h'),
(51,	'php-geoip',	'gaudea_h'),
(52,	'php-igbinary',	'gaudea_h'),
(53,	'php-imagick',	'gaudea_h'),
(54,	'php-memcached',	'gaudea_h'),
(55,	'php-mongodb',	'gaudea_h'),
(56,	'php-msgpack',	'gaudea_h'),
(57,	'php-pear',	'gaudea_h'),
(58,	'php-redis',	'gaudea_h'),
(59,	'php-ssh2',	'gaudea_h'),
(60,	'pinba-engine',	'gaudea_h'),
(61,	'pinba-engine-mysql',	'gaudea_h'),
(62,	'redis',	'gaudea_h'),
(63,	'ruby-passenger',	'gaudea_h'),
(64,	'xdebug',	'gaudea_h'),
(65,	'xhprof',	'gaudea_h'),
(66,	'zabbix',	'gaudea_h');

DROP TABLE IF EXISTS `packages_versions`;
CREATE TABLE `packages_versions` (
  `package_id` int(11) NOT NULL,
  `version` varchar(16) NOT NULL,
  KEY `package_id` (`package_id`),
  CONSTRAINT `packages_versions_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `packages_versions` (`package_id`, `version`) VALUES
(26,	'5.1.3'),
(26,	'5.1.4'),
(26,	'5.1.5'),
(26,	'5.1.6'),
(26,	'5.1.7'),
(26,	'5.1.8'),
(28,	'1.0.1'),
(28,	'1.0.2'),
(28,	'1.0.3'),
(29,	'1.0.10'),
(29,	'1.0.16'),
(30,	'5.5.38'),
(31,	'5.6.32'),
(31,	'5.6.33'),
(31,	'5.6.34'),
(31,	'5.6.35'),
(31,	'5.6.25'),
(31,	'5.6.29'),
(32,	'1.10.1'),
(32,	'1.10.2'),
(32,	'1.8.1'),
(32,	'1.8.0'),
(33,	'0~20140806'),
(34,	'2.2.12'),
(35,	'5.4.41'),
(35,	'5.4.42'),
(35,	'5.4.43'),
(35,	'5.4.44'),
(35,	'5.4.45'),
(35,	'5.5.25'),
(35,	'5.5.26'),
(35,	'5.5.27'),
(35,	'5.5.28'),
(35,	'5.5.29'),
(35,	'5.5.30'),
(35,	'5.5.31'),
(35,	'5.5.32'),
(35,	'5.5.33'),
(35,	'5.5.34'),
(35,	'5.5.36'),
(35,	'5.5.37'),
(35,	'5.6.11'),
(35,	'5.6.12'),
(35,	'5.6.13'),
(35,	'5.6.14'),
(35,	'5.6.15'),
(35,	'5.6.16'),
(35,	'5.6.17'),
(35,	'5.6.18'),
(35,	'5.6.19'),
(35,	'5.6.20'),
(35,	'5.6.21'),
(35,	'5.6.22'),
(35,	'5.6.23'),
(35,	'5.6.24'),
(35,	'5.6.25'),
(35,	'5.6.26'),
(35,	'5.6.27'),
(35,	'5.6.28'),
(35,	'5.6.29'),
(35,	'5.6.30'),
(36,	'4.0.7'),
(37,	'0.8.3'),
(38,	'1.0.8'),
(39,	'3.1.2'),
(40,	'3.0.8'),
(41,	'2.2.0'),
(42,	'1.6.10'),
(43,	'0.5.6'),
(44,	'2.5.0'),
(45,	'1.0.0'),
(46,	'2.0.10'),
(47,	'1.0.4'),
(48,	'2.2.7'),
(49,	'0.12'),
(50,	'7.0.1'),
(50,	'7.0.2'),
(50,	'7.0.3'),
(50,	'7.0.4'),
(50,	'7.0.5'),
(50,	'7.0.6'),
(50,	'7.0.7'),
(50,	'7.0.8'),
(50,	'7.0.9'),
(50,	'7.0.10'),
(50,	'7.0.11'),
(50,	'7.0.12'),
(50,	'7.0.13'),
(50,	'7.0.14'),
(50,	'7.0.15'),
(51,	'1.1.0'),
(51,	'1.1.1'),
(52,	'1.2.1-1~2b7c703'),
(52,	'1.2.1-3~6a2d5b7'),
(52,	'2.0.0'),
(52,	'2.0.1'),
(53,	'3.4.0'),
(53,	'3.4.1'),
(53,	'3.4.2'),
(53,	'3.4.0~rc5'),
(53,	'3.4.0~rc6'),
(54,	'2.2.0-1-7cb0c48'),
(54,	'2.2.0-2-52c644b'),
(55,	'1.1.2'),
(55,	'1.1.3'),
(55,	'1.1.4'),
(55,	'1.1.5'),
(55,	'1.1.6'),
(55,	'1.1.7'),
(55,	'1.1.8'),
(55,	'1.1.9'),
(55,	'1.2.2'),
(55,	'1.2.3'),
(55,	'1.2.4'),
(56,	'2.0.0'),
(56,	'2.0.1'),
(57,	'1.10.1'),
(58,	'2.2.7-1~7b36957'),
(58,	'3.0.0~rc1'),
(58,	'3.1.0'),
(59,	'1.0'),
(60,	'1.0.0'),
(61,	'1.0.0'),
(62,	'3.0.0'),
(62,	'3.0.1'),
(62,	'3.0.2'),
(62,	'3.0.3'),
(62,	'3.0.4'),
(62,	'3.0.5'),
(62,	'3.0.6'),
(62,	'3.0.7'),
(62,	'3.2.0'),
(62,	'3.2.1'),
(62,	'3.2.2'),
(62,	'3.2.3'),
(62,	'3.2.4'),
(62,	'3.2.5'),
(62,	'3.2.6'),
(62,	'3.2.7'),
(63,	'3.0.19'),
(64,	'2.3.3'),
(64,	'2.4.0~rc3'),
(64,	'2.4.0~rc4'),
(64,	'2.4.0'),
(64,	'2.4.1'),
(64,	'2.5.0'),
(65,	'0.9.4'),
(66,	'2.2.10'),
(66,	'2.2.11');

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

-- 2017-02-05 08:32:53