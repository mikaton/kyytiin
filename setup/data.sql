-- MySQL dump 10.16  Distrib 10.2.13-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: kyyti
-- ------------------------------------------------------
-- Server version	10.2.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `car` varchar(10) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`car`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `social_id` varchar(500) DEFAULT NULL,
  `social_token` varchar(500) DEFAULT NULL,
  `social_provider` varchar(100) DEFAULT NULL,
  `social_photourl` varchar(500) DEFAULT NULL,
  `customer_id` varchar(100) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `additional_information` varchar(512) DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `reset_token` varchar(50) DEFAULT ' ',
  `reset_token_expiry` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (NULL,NULL,NULL,NULL,'1b92c9e0-3bd9-43dd-a6da-8081d747dbf4','Testi','Testitesti','testi@testitesti.fi','$2a$05$96QosYT/BaO0XI0CywRbCeIb1JyuFDwC6FNZS1foNd.4Zs6IFN.pG','123123123',NULL,0,' ','2018-03-15 09:15:48'),(NULL,NULL,NULL,NULL,'5517d70b-89c4-4252-ba83-96f1ac4cf7ea','Testitesti','Testitesti','testientestien@testi.fi','$2a$05$t3Fzf79iaKZFfueSQb6EQu7UVI3FWymyLV5AtUSXrDA4i4r8QG36u','123321123',NULL,0,' ','2018-03-15 09:15:48'),(NULL,NULL,NULL,NULL,'5cb8c6db-099a-4d14-9623-85f8759c99fa','Testitesti','Testitesti','testi@testotesto.fi','$2a$05$GTz.0VCmQ8V58bPnktrYZ.BliCvCAqELt9FtH1eS5ph4VBzEzFtkO','123321123',NULL,0,' ','2018-03-15 09:15:48'),(NULL,NULL,NULL,NULL,'72327379-6b85-4252-9c42-9bfab3cf00e8','Testi','Testinen','testi@testi.fi','$2a$05$Yw6fcVitUArZGfFmEdxO5..Kdta6x/ZjpwzW04wkdGC5ND4tHcvw6','123123123',NULL,0,' ','2018-03-15 09:15:48'),('10211365864691639','EAAJ059oLZCF0BAPIRJtKXfQn5spjJq9pXEXo9wQVkhzHHlmZC30bv7Yedbb5serJG65rPZBl0GZBYFT7e53upebtepx3c0u4piAVwauxcXuWZCi4z8Ao7SXLuGM8f2U1RsyrZBeDnNqF0OSGhUsOLZAyHkfODsSxapLrRveRSB6gMNjVZCV6v2hOGI0GhLnCwZBxVYQMV6ZCMlhIVrYtF3ZB7ZCB','FACEBOOK','https://graph.facebook.com/10211365864691639/picture?type=normal','7b2f23d6-7113-4810-87a7-70d848ff6c0f','Teemu','Pölkki','temesus@hotmail.com',NULL,NULL,NULL,0,' ','2018-03-15 09:15:48'),(NULL,NULL,NULL,NULL,'80095ba9-c7fc-4e10-8608-0804f5f598c6','testi','testi','teemesus@test.fi','$2a$05$onFnp7/mWvvKdYBM4y9lPu4/YQjkxFHNDTEtLkaaMl9o/agBRnRPK','123123123',NULL,0,' ','2018-03-15 07:24:00'),(NULL,NULL,NULL,NULL,'b9dae006-1641-44a4-a61b-5d0446d1373a','Teemu','Pölkki','testi@jäbä.fi','$2a$05$g9noRkKYhT/ss9.bexa1rONXJsIkkFAhZtGnHfu.Gx2dXYuS9shmy','0458565225',NULL,0,' ','2018-03-15 09:15:48'),(NULL,NULL,NULL,NULL,'e0d75f17-8955-4dd5-b870-08e9a06fdfc6','Testaan','Testaan','testitestitesti@testi.fi','$2a$05$Er.p3HyDGZY6Nql4AxVc7OaBcXWSBXCBUhNB8jbGBm.eDJ2a2IpGm','123321123',NULL,0,' ','2018-03-15 07:26:21'),(NULL,NULL,NULL,NULL,'e9133e5b-2212-4389-a3ba-ec053a0281b8','Teemun','Testitunnus','teemu@testi.fi','$2a$05$w9BzTEY6uAoBUEVimCyfFO3qns/n2iTOVYC4QR9htVdWhkOzpa/MC','123123123',NULL,0,' ','2018-03-15 09:15:48'),(NULL,NULL,NULL,NULL,'f210cb19-6eaf-4840-a3bf-b5a16a085b92','Nytpitäisitoimi','Eiköniin','toimijo@homo.fi','$2a$05$wezAyTc3/KmMB/VB9..bk.tJmP3h.OMyNJdPA72cYKt8nBfQ9goIW','123321123',NULL,0,' ','2018-03-15 07:29:47'),(NULL,NULL,NULL,NULL,'f7475135-d5d1-486b-bb6f-c515977ed93a','Mä testaan','Testaan taas','testi@testijeesus.fi','$2a$05$wi/ZFGzDTzwGMktsF8iXCuuoJaVrpRiqZPTOjgKZVKUgswSrv3bIO','123321123',NULL,0,' ','2018-03-15 07:28:54'),('105612645448323166879','ya29.Gl14BdCA_8BHQtMcnGfBTaHoyIV_uA6eotY07YnmDc1jOPLo_1BiyUP_zmOxFUM4PnLlQTT-5-dx2A-EUiH00QXPZYIHimswyPTOakVksahE3IwKLpfPqPOM_bd7wQI','GOOGLE','https://lh3.googleusercontent.com/-6GBE7j29RXE/AAAAAAAAAAI/AAAAAAAAAEk/TkYS5AdsPv4/s96-c/photo.jpg','fa17dc03-05bd-404f-89d2-caf98d1c2e6c','Teemu','Pölkki','pegasosasd@gmail.com',NULL,NULL,NULL,0,' ','2018-03-15 09:15:48');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerscars`
--

DROP TABLE IF EXISTS `customerscars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customerscars` (
  `car` varchar(10) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  KEY `customer_car` (`customer_id`),
  KEY `car` (`car`),
  CONSTRAINT `customer_car` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customerscars_ibfk_1` FOREIGN KEY (`car`) REFERENCES `cars` (`car`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerscars`
--

LOCK TABLES `customerscars` WRITE;
/*!40000 ALTER TABLE `customerscars` DISABLE KEYS */;
/*!40000 ALTER TABLE `customerscars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customersrides_ride`
--

DROP TABLE IF EXISTS `customersrides_ride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customersrides_ride` (
  `customersrides_ride_id` varchar(100) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `ride_id` varchar(100) NOT NULL,
  `price` mediumint(9) DEFAULT NULL,
  `provision` mediumint(9) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  KEY `customer_ride_ride` (`customer_id`),
  KEY `ride_id` (`ride_id`),
  CONSTRAINT `customer_ride_ride` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON UPDATE CASCADE,
  CONSTRAINT `customersrides_ride_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`ride_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customersrides_ride`
--

LOCK TABLES `customersrides_ride` WRITE;
/*!40000 ALTER TABLE `customersrides_ride` DISABLE KEYS */;
INSERT INTO `customersrides_ride` VALUES ('52d66dfb-dced-47fb-bb8f-efa5566580d8','b9dae006-1641-44a4-a61b-5d0446d1373a','8b708bd7-2386-452c-83ff-622475cf6f7e',NULL,NULL,NULL),('2f4fbf62-bd2a-40aa-9b3a-d95468ba95d6','72327379-6b85-4252-9c42-9bfab3cf00e8','8b708bd7-2386-452c-83ff-622475cf6f7e',NULL,NULL,NULL),('196ef3a5-095e-4160-a8ec-572a3badb839','72327379-6b85-4252-9c42-9bfab3cf00e8','8b708bd7-2386-452c-83ff-622475cf6f7e',NULL,NULL,NULL),('bdecf6be-b728-4600-9bd1-6cf2e1957b2b','72327379-6b85-4252-9c42-9bfab3cf00e8','5ebc4a92-b0b9-44c0-9ca7-42779bada588',NULL,NULL,NULL),('0a58bcbb-cff9-4569-899c-600956f15d23','72327379-6b85-4252-9c42-9bfab3cf00e8','76cd1a62-3ad5-4535-9ab4-7e43cf012307',NULL,NULL,NULL),('8bf34d88-8860-4329-9b63-e39bfdb950b1','72327379-6b85-4252-9c42-9bfab3cf00e8','2c902543-c2fa-4a0e-b472-38d28566b230',NULL,NULL,NULL),('6a86f11d-5e6c-449c-974a-08ef1b4f3cab','72327379-6b85-4252-9c42-9bfab3cf00e8','2c902543-c2fa-4a0e-b472-38d28566b230',NULL,NULL,NULL),('91e7cbab-57db-49a8-a1c6-194f043b22b7','72327379-6b85-4252-9c42-9bfab3cf00e8','5ebc4a92-b0b9-44c0-9ca7-42779bada588',NULL,NULL,NULL),('58adf1e2-ac7d-4516-aef9-e275a4674cf8','72327379-6b85-4252-9c42-9bfab3cf00e8','338f7341-21bf-451c-9269-7ecb9d2af8c6',NULL,NULL,NULL),('e2962fd2-b55a-4748-ba06-27a7eda3ffeb','72327379-6b85-4252-9c42-9bfab3cf00e8','214246db-b708-451f-93a6-e43cb07919f4',NULL,NULL,NULL),('0d21e290-f29a-4e60-af06-2b23d81de79b','72327379-6b85-4252-9c42-9bfab3cf00e8','76cd1a62-3ad5-4535-9ab4-7e43cf012307',NULL,NULL,NULL),('b367fd6e-e564-4042-8f92-dadd22d71434','72327379-6b85-4252-9c42-9bfab3cf00e8','258c1ccd-70dd-4b42-875d-4df77c2cd868',NULL,NULL,NULL),('f4afad2d-2702-4da9-8ea3-8dfeeed28af0','72327379-6b85-4252-9c42-9bfab3cf00e8','214246db-b708-451f-93a6-e43cb07919f4',NULL,NULL,NULL),('e2752de8-7eab-4d2a-a36f-83509516c34a','72327379-6b85-4252-9c42-9bfab3cf00e8','3a67dc7f-7dbf-473d-83a2-712d43c03060',NULL,NULL,NULL),('bd713548-603c-4d8e-b43a-b84fb3c85f67','72327379-6b85-4252-9c42-9bfab3cf00e8','5ebc4a92-b0b9-44c0-9ca7-42779bada588',NULL,NULL,NULL),('1ee0a3ae-cb66-4ae8-97e1-2fa4fb5d5e76','72327379-6b85-4252-9c42-9bfab3cf00e8','5ebc4a92-b0b9-44c0-9ca7-42779bada588',NULL,NULL,NULL),('959f5e31-d093-4921-9339-5416dc066af7','7b2f23d6-7113-4810-87a7-70d848ff6c0f','15d8ea47-471f-4296-8c18-e8d179a13507',NULL,NULL,NULL);
/*!40000 ALTER TABLE `customersrides_ride` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `review_id` varchar(100) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `stars` tinyint(4) NOT NULL,
  `review_text` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides`
--

DROP TABLE IF EXISTS `rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rides` (
  `ride_id` varchar(100) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `startingplace` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `journey` varchar(100) DEFAULT NULL,
  `time_of_departure` datetime NOT NULL,
  `alternate_time_of_departure` datetime NOT NULL,
  `time_of_arrival` datetime DEFAULT NULL,
  `alternate_time_of_arrival` datetime DEFAULT NULL,
  `free_seats` tinyint(4) NOT NULL,
  `smoking` tinyint(1) NOT NULL,
  `pets` tinyint(1) NOT NULL,
  `hidden` tinyint(1) NOT NULL,
  `additional_information` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`ride_id`),
  KEY `customer_ride_fk` (`customer_id`),
  CONSTRAINT `customer_ride_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides`
--

LOCK TABLES `rides` WRITE;
/*!40000 ALTER TABLE `rides` DISABLE KEYS */;
INSERT INTO `rides` VALUES ('15d8ea47-471f-4296-8c18-e8d179a13507','72327379-6b85-4252-9c42-9bfab3cf00e8','asd','asd',NULL,'1450-02-27 22:22:00','1450-02-27 22:22:00','1996-11-11 23:23:00','1996-11-11 23:23:00',4,0,0,0,NULL),('214246db-b708-451f-93a6-e43cb07919f4','72327379-6b85-4252-9c42-9bfab3cf00e8','Seinäjoki','Oulu',NULL,'2018-03-14 10:00:00','2018-03-14 10:00:00','2018-03-14 13:00:00','2018-03-14 13:00:00',0,1,0,0,NULL),('258c1ccd-70dd-4b42-875d-4df77c2cd868','72327379-6b85-4252-9c42-9bfab3cf00e8','Jyväskylä','Oslo',NULL,'2018-03-08 03:30:00','2018-03-08 03:30:00','2018-03-08 06:06:00','2018-03-08 06:06:00',2,1,1,0,NULL),('2c902543-c2fa-4a0e-b472-38d28566b230','72327379-6b85-4252-9c42-9bfab3cf00e8','Järvenpää','Kuopio',NULL,'2018-03-15 13:00:00','2018-03-15 13:00:00','2018-03-15 18:30:00','2018-03-15 18:30:00',0,0,0,0,NULL),('338f7341-21bf-451c-9269-7ecb9d2af8c6','72327379-6b85-4252-9c42-9bfab3cf00e8','Kuopio','Rovaniemi',NULL,'2018-03-16 23:03:00','2018-03-16 23:03:00','2018-03-16 02:00:00','2018-03-16 02:00:00',1,0,0,0,NULL),('34309922-6f93-4b37-8f46-4b1e1c6dd6f0','72327379-6b85-4252-9c42-9bfab3cf00e8','Kuusaa','Kouvola',NULL,'0002-02-28 23:10:00','0002-02-28 23:10:00','1428-12-31 10:10:00','1428-12-31 10:10:00',5,1,0,0,NULL),('3a67dc7f-7dbf-473d-83a2-712d43c03060','72327379-6b85-4252-9c42-9bfab3cf00e8','Kuokkala','Keskusta',NULL,'2020-03-08 20:00:00','2020-03-08 20:00:00','2021-01-11 20:00:00','2021-01-11 20:00:00',0,1,1,0,NULL),('51ea9eba-ab7d-4921-9642-2d58bdeefd77','72327379-6b85-4252-9c42-9bfab3cf00e8','Jämsänkoski','Rovaniemi',NULL,'2018-04-22 13:45:00','2018-04-22 13:45:00','2018-04-26 06:12:00','2018-04-26 06:12:00',100,0,0,0,NULL),('5ebc4a92-b0b9-44c0-9ca7-42779bada588','72327379-6b85-4252-9c42-9bfab3cf00e8','jyväskylä','japani',NULL,'2054-01-23 23:59:00','2054-01-23 23:59:00','1998-07-25 00:10:00','1998-07-25 00:10:00',-3,1,1,0,NULL),('6bb17546-cf42-431b-9f7e-96ac8f35886f','7b2f23d6-7113-4810-87a7-70d848ff6c0f','Akaa','Alajärvi',NULL,'2018-03-14 09:21:08','2018-03-14 09:21:08','2018-03-14 09:21:08','2018-03-14 09:21:08',2,1,0,0,NULL),('6d8c97d7-41ea-4e6c-ae70-48a5a0c4da5f','7b2f23d6-7113-4810-87a7-70d848ff6c0f','Alajärvi','Alavus',NULL,'2018-03-15 12:08:16','2018-03-15 12:08:16','2018-03-15 12:08:16','2018-03-15 12:08:16',2,0,0,0,'Ei ole. '),('76cd1a62-3ad5-4535-9ab4-7e43cf012307','72327379-6b85-4252-9c42-9bfab3cf00e8','Jyväskylä','Rauma',NULL,'2018-03-09 18:00:00','2018-03-09 18:00:00','2018-03-09 22:00:00','2018-03-09 22:00:00',2,0,1,0,NULL),('8b708bd7-2386-452c-83ff-622475cf6f7e','b9dae006-1641-44a4-a61b-5d0446d1373a','Lahti','Jyväskylä',NULL,'2018-03-07 14:30:00','2018-03-07 14:30:00','2018-03-07 15:30:00','2018-03-07 15:30:00',-1,1,1,0,NULL),('b299db38-0eda-4162-876e-58733732c002','72327379-6b85-4252-9c42-9bfab3cf00e8','Jyväskylä','Kuopio',NULL,'2018-03-31 00:59:00','2018-03-31 00:59:00','2018-03-31 03:03:00','2018-03-31 03:03:00',3,1,0,0,NULL),('bb600873-a802-4b94-9028-9aa8fda73a57','72327379-6b85-4252-9c42-9bfab3cf00e8','asd','asd',NULL,'0003-02-27 22:22:00','0003-02-27 22:22:00','1996-11-11 23:23:00','1996-11-11 23:23:00',5,0,0,0,NULL),('d7acc5f2-dae5-47b3-9795-bd0bc7dd85ac','72327379-6b85-4252-9c42-9bfab3cf00e8','Jyväskylä','Praha',NULL,'2018-03-07 12:00:00','2018-03-07 12:00:00','2018-03-07 15:00:00','2018-03-07 15:00:00',4,1,1,0,NULL),('dba47393-7048-4d6f-a672-d32c468cdd75','7b2f23d6-7113-4810-87a7-70d848ff6c0f','Testi','Testi',NULL,'2018-03-14 07:34:36','2018-03-14 07:34:36','2018-03-14 07:34:36','2018-03-14 07:34:36',2,0,1,0,NULL),('dd77269b-c8ac-4297-89ca-598a550031de','72327379-6b85-4252-9c42-9bfab3cf00e8','Kuopio','Tampere',NULL,'2018-03-10 10:00:00','2018-03-10 10:00:00','2018-03-10 14:15:00','2018-03-10 14:15:00',3,0,1,0,NULL),('e197f8a8-dd2e-4768-b54c-b974aa9266fb','72327379-6b85-4252-9c42-9bfab3cf00e8','asd','asd',NULL,'0003-02-27 22:22:00','0003-02-27 22:22:00','1991-01-01 22:23:00','1991-01-01 22:23:00',1,0,0,0,NULL),('eadb68ed-b5fb-42e7-9cd8-f4715901a9d5','7b2f23d6-7113-4810-87a7-70d848ff6c0f','Testi','Testi',NULL,'2018-03-09 09:37:43','2018-03-09 09:37:43','2018-03-09 09:37:43','2018-03-09 09:37:43',2,1,0,0,NULL),('f4d83a80-c679-4288-b442-7654350c5a72','7b2f23d6-7113-4810-87a7-70d848ff6c0f','Nakkila','Pello',NULL,'2018-03-14 09:23:29','2018-03-14 09:23:29','2018-03-14 09:23:29','2018-03-14 09:23:29',2,0,0,0,NULL);
/*!40000 ALTER TABLE `rides` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15 14:44:07
