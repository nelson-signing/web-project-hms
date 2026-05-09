-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id_booking` int NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('confirmed','cancelled') DEFAULT 'confirmed',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `id_client` int DEFAULT NULL,
  `id_room` int DEFAULT NULL,
  PRIMARY KEY (`id_booking`),
  KEY `id_client` (`id_client`),
  KEY `id_room` (`id_room`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_booking_dates` CHECK ((`end_date` > `start_date`)),
  CONSTRAINT `chk_booking_status` CHECK ((`status` in (_utf8mb4'confirmed',_utf8mb4'cancelled'))),
  CONSTRAINT `chk_booking_total_price` CHECK ((`total_price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id_user` int NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`),
  CONSTRAINT `client_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (2,'0601020304','123 Rue de la Paix, 75000 Paris','2026-05-11 01:33:07','2026-05-11 01:33:07');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id_room` int NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `type` enum('single','double','suite','deluxe','family') NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `description` text,
  `is_available` tinyint(1) DEFAULT '1',
  `image_url` varchar(255) DEFAULT '/uploads/rooms/default.jpg',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id_room`),
  UNIQUE KEY `number` (`number`),
  CONSTRAINT `chk_room_number` CHECK ((`number` > 0)),
  CONSTRAINT `chk_room_price` CHECK ((`price_per_night` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'101','single',85.00,'Cozy single room with a garden view.',1,'/uploads/rooms/room-101.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(2,'102','double',130.00,'Elegant double room with modern amenities.',1,'/uploads/rooms/room-102.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(3,'103','deluxe',210.00,'Luxury room with a king-size bed and sea view.',1,'/uploads/rooms/room-103.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(4,'104','suite',450.00,'Grand suite with a separate lounge area.',1,'/uploads/rooms/room-104.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(5,'105','family',190.00,'Spacious family room with extra bedding.',1,'/uploads/rooms/room-105.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(6,'106','single',85.00,'Compact and quiet room for solo travelers.',1,'/uploads/rooms/room-106.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(7,'107','double',135.00,'Bright room with high ceilings and luxury linens.',1,'/uploads/rooms/room-107.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(8,'108','deluxe',220.00,'Premium deluxe room with a private balcony.',1,'/uploads/rooms/room-108.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(9,'109','suite',480.00,'Executive suite with panoramic city views.',1,'/uploads/rooms/room-109.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(10,'110','family',200.00,'Perfect for families with a small kitchenette.',1,'/uploads/rooms/room-110.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(11,'201','single',90.00,'Modern single room with smart TV.',1,'/uploads/rooms/room-201.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(12,'202','double',140.00,'Spacious double room with a workspace.',1,'/uploads/rooms/room-202.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(13,'203','deluxe',230.00,'Deluxe room with a designer bathroom.',1,'/uploads/rooms/room-203.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(14,'204','suite',500.00,'Imperial suite with luxury furniture.',1,'/uploads/rooms/room-204.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(15,'205','family',210.00,'Multi-room family setup for privacy.',1,'/uploads/rooms/room-205.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(16,'206','single',95.00,'Quiet room ideal for business travelers.',1,'/uploads/rooms/room-206.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(17,'207','double',150.00,'Romantic double room with soft lighting.',1,'/uploads/rooms/room-207.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(18,'208','deluxe',240.00,'Large deluxe suite with premium minibar.',1,'/uploads/rooms/room-208.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(19,'209','suite',550.00,'Royal suite with 24/7 butler service.',1,'/uploads/rooms/room-209.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05'),(20,'210','family',220.00,'Kids-friendly room with fun decor.',1,'/uploads/rooms/room-210.jpg','2026-05-10 19:00:05','2026-05-10 19:00:05');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id_user` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'2026-05-11 01:32:43','2026-05-11 01:32:43');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `chk_email_format` CHECK ((`email` like _utf8mb4'%_@__%.__%'))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Alice','Smith','alice.smith@luxuryhotel.com','$2b$10$1KDyHDztyBuHbKLgqi1U1u2uuafjbi1GATclW8N5G9L0FvC5I6XTm','2026-05-11 01:32:43','2026-05-11 01:32:43'),(2,'Jean','Dupont','jean.dupont@gmail.com','$2b$10$OxGj30g9AD.oWbJZ2lOFmuaN5yqndlLEDtfy2aoOysP0hdIeEI.Se','2026-05-11 01:33:07','2026-05-11 01:33:07');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-11  2:48:16
