-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: gestion
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EspecialidadUser`
--

DROP TABLE IF EXISTS `EspecialidadUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EspecialidadUser` (
  `EspecialidadesId` int NOT NULL,
  `UsuariosId` int NOT NULL,
  PRIMARY KEY (`EspecialidadesId`,`UsuariosId`),
  KEY `IX_EspecialidadUser_UsuariosId` (`UsuariosId`),
  CONSTRAINT `FK_EspecialidadUser_T_Especialidad_EspecialidadesId` FOREIGN KEY (`EspecialidadesId`) REFERENCES `T_Especialidad` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_EspecialidadUser_T_User_UsuariosId` FOREIGN KEY (`UsuariosId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EspecialidadUser`
--

LOCK TABLES `EspecialidadUser` WRITE;
/*!40000 ALTER TABLE `EspecialidadUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `EspecialidadUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PermissionRole`
--

DROP TABLE IF EXISTS `PermissionRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PermissionRole` (
  `PermisosId` int NOT NULL,
  `RolesId` int NOT NULL,
  PRIMARY KEY (`PermisosId`,`RolesId`),
  KEY `IX_PermissionRole_RolesId` (`RolesId`),
  CONSTRAINT `FK_PermissionRole_T_Permiso_PermisosId` FOREIGN KEY (`PermisosId`) REFERENCES `T_Permiso` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_PermissionRole_T_Rol_RolesId` FOREIGN KEY (`RolesId`) REFERENCES `T_Rol` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PermissionRole`
--

LOCK TABLES `PermissionRole` WRITE;
/*!40000 ALTER TABLE `PermissionRole` DISABLE KEYS */;
/*!40000 ALTER TABLE `PermissionRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoleUser`
--

DROP TABLE IF EXISTS `RoleUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RoleUser` (
  `RoleId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`RoleId`,`UserId`),
  KEY `IX_RoleUser_UserId` (`UserId`),
  CONSTRAINT `FK_RoleUser_T_Rol_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `T_Rol` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_RoleUser_T_User_UserId` FOREIGN KEY (`UserId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoleUser`
--

LOCK TABLES `RoleUser` WRITE;
/*!40000 ALTER TABLE `RoleUser` DISABLE KEYS */;
INSERT INTO `RoleUser` VALUES (2,3),(3,3);
/*!40000 ALTER TABLE `RoleUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Anexo`
--

DROP TABLE IF EXISTS `T_Anexo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Anexo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SolicitudDetalleId` int NOT NULL,
  `FechaUltimaModificacion` timestamp NULL DEFAULT NULL,
  `TipoAnexoId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_T_Anexo_SolicitudDetalleId` (`SolicitudDetalleId`),
  KEY `IX_T_Anexo_TipoAnexoId` (`TipoAnexoId`),
  CONSTRAINT `FK_T_Anexo_T_Solicitud_Detalle_SolicitudDetalleId` FOREIGN KEY (`SolicitudDetalleId`) REFERENCES `T_Solicitud_Detalle` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_T_Anexo_T_Tipo_Anexo_TipoAnexoId` FOREIGN KEY (`TipoAnexoId`) REFERENCES `T_Tipo_Anexo` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Anexo`
--

LOCK TABLES `T_Anexo` WRITE;
/*!40000 ALTER TABLE `T_Anexo` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Anexo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_AnexoField`
--

DROP TABLE IF EXISTS `T_AnexoField`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_AnexoField` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` longtext NOT NULL,
  `Value` longtext NOT NULL,
  `AnexoId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_T_AnexoField_AnexoId` (`AnexoId`),
  CONSTRAINT `FK_T_AnexoField_T_Anexo_AnexoId` FOREIGN KEY (`AnexoId`) REFERENCES `T_Anexo` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_AnexoField`
--

LOCK TABLES `T_AnexoField` WRITE;
/*!40000 ALTER TABLE `T_AnexoField` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_AnexoField` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Archivo`
--

DROP TABLE IF EXISTS `T_Archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Archivo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` longtext NOT NULL,
  `SolicitudDetalleId` int NOT NULL,
  `Url` longtext NOT NULL,
  `FechaCreacion` timestamp NOT NULL,
  `NumeroDescargas` int NOT NULL,
  `Extension` longtext NOT NULL,
  `UsuarioId` int NOT NULL,
  `TipoArchivoId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_T_Archivo_TipoArchivoId` (`TipoArchivoId`),
  KEY `IX_T_Archivo_UsuarioId` (`UsuarioId`),
  CONSTRAINT `FK_T_Archivo_T_Tipo_Archivo_TipoArchivoId` FOREIGN KEY (`TipoArchivoId`) REFERENCES `T_Tipo_Archivo` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_T_Archivo_T_User_UsuarioId` FOREIGN KEY (`UsuarioId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Archivo`
--

LOCK TABLES `T_Archivo` WRITE;
/*!40000 ALTER TABLE `T_Archivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Asignacion`
--

DROP TABLE IF EXISTS `T_Asignacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Asignacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SolicitudDetalleId` int NOT NULL,
  `FechaAsignacion` timestamp NULL DEFAULT NULL,
  `FechaEntrega` timestamp NULL DEFAULT NULL,
  `UserAsignadoId` int NOT NULL,
  `ArchivoId` int DEFAULT NULL,
  `DocumentoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IX_T_Asignacion_ArchivoId` (`ArchivoId`),
  KEY `IX_T_Asignacion_DocumentoId` (`DocumentoId`),
  KEY `IX_T_Asignacion_SolicitudDetalleId` (`SolicitudDetalleId`),
  KEY `IX_T_Asignacion_UserAsignadoId` (`UserAsignadoId`),
  CONSTRAINT `FK_T_Asignacion_T_Archivo_ArchivoId` FOREIGN KEY (`ArchivoId`) REFERENCES `T_Archivo` (`Id`),
  CONSTRAINT `FK_T_Asignacion_T_Archivo_DocumentoId` FOREIGN KEY (`DocumentoId`) REFERENCES `T_Archivo` (`Id`),
  CONSTRAINT `FK_T_Asignacion_T_Solicitud_Detalle_SolicitudDetalleId` FOREIGN KEY (`SolicitudDetalleId`) REFERENCES `T_Solicitud_Detalle` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_T_Asignacion_T_User_UserAsignadoId` FOREIGN KEY (`UserAsignadoId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Asignacion`
--

LOCK TABLES `T_Asignacion` WRITE;
/*!40000 ALTER TABLE `T_Asignacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Asignacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Especialidad`
--

DROP TABLE IF EXISTS `T_Especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Especialidad` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Especialidad`
--

LOCK TABLES `T_Especialidad` WRITE;
/*!40000 ALTER TABLE `T_Especialidad` DISABLE KEYS */;
INSERT INTO `T_Especialidad` VALUES (1,'Investigador 1',1);
/*!40000 ALTER TABLE `T_Especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Estado_Solicitud`
--

DROP TABLE IF EXISTS `T_Estado_Solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Estado_Solicitud` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Estado_Solicitud`
--

LOCK TABLES `T_Estado_Solicitud` WRITE;
/*!40000 ALTER TABLE `T_Estado_Solicitud` DISABLE KEYS */;
INSERT INTO `T_Estado_Solicitud` VALUES (1,'Creada'),(2,'Iniciada'),(3,'Factibilidad'),(4,'Asignada'),(5,'En Revisión'),(6,'Resolución'),(7,'Finalizada');
/*!40000 ALTER TABLE `T_Estado_Solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Permiso`
--

DROP TABLE IF EXISTS `T_Permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Permiso` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(55) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Permiso`
--

LOCK TABLES `T_Permiso` WRITE;
/*!40000 ALTER TABLE `T_Permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Resolucion`
--

DROP TABLE IF EXISTS `T_Resolucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Resolucion` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FechaEmision` datetime DEFAULT NULL,
  `SolicitudId` int NOT NULL,
  `ArchivoId` int NOT NULL,
  `Observacion` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_T_Resolucion_ArchivoId` (`ArchivoId`),
  UNIQUE KEY `IX_T_Resolucion_SolicitudId` (`SolicitudId`),
  CONSTRAINT `FK_T_Resolucion_T_Archivo_ArchivoId` FOREIGN KEY (`ArchivoId`) REFERENCES `T_Archivo` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_T_Resolucion_T_Solicitud_SolicitudId` FOREIGN KEY (`SolicitudId`) REFERENCES `T_Solicitud` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Resolucion`
--

LOCK TABLES `T_Resolucion` WRITE;
/*!40000 ALTER TABLE `T_Resolucion` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Resolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Rol`
--

DROP TABLE IF EXISTS `T_Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Rol` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `MaxUsers` int NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Rol`
--

LOCK TABLES `T_Rol` WRITE;
/*!40000 ALTER TABLE `T_Rol` DISABLE KEYS */;
INSERT INTO `T_Rol` VALUES (1,'Presidente',1,1),(2,'Usuario Externo',50,1),(3,'Investigador',50,1);
/*!40000 ALTER TABLE `T_Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Solicitud`
--

DROP TABLE IF EXISTS `T_Solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Solicitud` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(45) DEFAULT NULL,
  `Titulo` longtext,
  `FechaCreacion` datetime DEFAULT NULL,
  `FechaRevision` datetime DEFAULT NULL,
  `FechaCierre` datetime DEFAULT NULL,
  `Apelacion` tinyint(1) DEFAULT NULL,
  `UsuarioId` int NOT NULL,
  `EstadoId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_T_Solicitud_EstadoId` (`EstadoId`),
  KEY `IX_T_Solicitud_UsuarioId` (`UsuarioId`),
  CONSTRAINT `FK_T_Solicitud_T_Estado_Solicitud_EstadoId` FOREIGN KEY (`EstadoId`) REFERENCES `T_Estado_Solicitud` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_T_Solicitud_T_User_UsuarioId` FOREIGN KEY (`UsuarioId`) REFERENCES `T_User` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Solicitud`
--

LOCK TABLES `T_Solicitud` WRITE;
/*!40000 ALTER TABLE `T_Solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Solicitud_Detalle`
--

DROP TABLE IF EXISTS `T_Solicitud_Detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Solicitud_Detalle` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Observacion` longtext NOT NULL,
  `SolicitudId` int NOT NULL,
  `Factibilidad` tinyint(1) NOT NULL,
  `OtrosArchivos` tinyint(1) NOT NULL,
  `ArchivosSolicitados` longtext NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_T_Solicitud_Detalle_SolicitudId` (`SolicitudId`),
  CONSTRAINT `FK_T_Solicitud_Detalle_T_Solicitud_SolicitudId` FOREIGN KEY (`SolicitudId`) REFERENCES `T_Solicitud` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Solicitud_Detalle`
--

LOCK TABLES `T_Solicitud_Detalle` WRITE;
/*!40000 ALTER TABLE `T_Solicitud_Detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Solicitud_Detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Tipo_Anexo`
--

DROP TABLE IF EXISTS `T_Tipo_Anexo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Tipo_Anexo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TituloPrincipal` longtext NOT NULL,
  `Subtitulo` longtext NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Tipo_Anexo`
--

LOCK TABLES `T_Tipo_Anexo` WRITE;
/*!40000 ALTER TABLE `T_Tipo_Anexo` DISABLE KEYS */;
INSERT INTO `T_Tipo_Anexo` VALUES (1,'Anexo1A','Solicitud de análisis de propuestas de investigación'),(2,'Anexo1','Solicitud de análisis ético del proyecto de investigación'),(3,'Anexo2','Compromiso de buenas prácticas en investigación y respeto a las normas éticas de espol'),(4,'Anexo3','Solicitud de guía, información y normativas básicas respecto de buenas prácticas y ética en investigación del centro de investigación, facultad o institución de espol'),(5,'Anexo4','Declaración de asunción de responsabilidad para el uso adecuado de la información de carácter confidencial'),(6,'Anexo5','Información de derechos sobre datos personales y consentimiento para su conservación'),(7,'Anexo6','Consentimiento de datos personales de investigadores para su tratamiento y conservación al comité de etica de investigación de espol');
/*!40000 ALTER TABLE `T_Tipo_Anexo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Tipo_Archivo`
--

DROP TABLE IF EXISTS `T_Tipo_Archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Tipo_Archivo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(75) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Tipo_Archivo`
--

LOCK TABLES `T_Tipo_Archivo` WRITE;
/*!40000 ALTER TABLE `T_Tipo_Archivo` DISABLE KEYS */;
INSERT INTO `T_Tipo_Archivo` VALUES (1,'DocumentacionAdicional'),(2,'Informe'),(3,'Resolucion'),(4,'EntregasAdicionales');
/*!40000 ALTER TABLE `T_Tipo_Archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_Tipo_Solicitud`
--

DROP TABLE IF EXISTS `T_Tipo_Solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_Tipo_Solicitud` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `DiasPlazo` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_Tipo_Solicitud`
--

LOCK TABLES `T_Tipo_Solicitud` WRITE;
/*!40000 ALTER TABLE `T_Tipo_Solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_Tipo_Solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_User`
--

DROP TABLE IF EXISTS `T_User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `T_User` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ContrasenaHash` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Cedula` int NOT NULL,
  `FechaCreacion` timestamp NOT NULL,
  `FechaUltimoLogin` timestamp NULL DEFAULT NULL,
  `Estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_User`
--

LOCK TABLES `T_User` WRITE;
/*!40000 ALTER TABLE `T_User` DISABLE KEYS */;
INSERT INTO `T_User` VALUES (3,'user1@gmail.com','dev','user1@gmail.com','user1@gmail.com','5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',999999991,'2023-12-23 10:59:13',NULL,1);
/*!40000 ALTER TABLE `T_User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20230914180939_initial','7.0.9');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gestion'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-23 11:00:41
