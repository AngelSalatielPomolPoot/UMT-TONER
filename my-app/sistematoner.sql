-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2021 a las 03:54:35
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistematoner`
--
CREATE DATABASE IF NOT EXISTS `sistematoner` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sistematoner`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `IdPedido` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(80) NOT NULL,
  `MarcaImpresora` varchar(10) NOT NULL,
  `ModeloImpresora` varchar(10) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `SerieTinta` varchar(10) NOT NULL,
  `Color` varchar(10) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `TipoPedido` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impresoras`
--

CREATE TABLE `impresoras` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(10) NOT NULL,
  `Modelo` varchar(10) NOT NULL,
  `TipoImpresora` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `IdPedido` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(80) NOT NULL,
  `MarcaImpresora` varchar(10) NOT NULL,
  `ModeloImpresora` varchar(10) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `SerieTinta` varchar(10) NOT NULL,
  `Color` varchar(10) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `TipoPedido` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tonners`
--

CREATE TABLE `tonners` (
  `NumeroSerie` varchar(15) NOT NULL,
  `Marca` varchar(15) NOT NULL,
  `Color` varchar(10) NOT NULL,
  `MarcaImpresora` varchar(15) NOT NULL,
  `ModeloImpresora` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(30) CHARACTER SET latin1 NOT NULL,
  `PrimerApellido` varchar(20) CHARACTER SET latin1 NOT NULL,
  `SegundoApellido` varchar(20) CHARACTER SET latin1 NOT NULL,
  `Facultad` varchar(25) CHARACTER SET latin1 NOT NULL,
  `Correo` varchar(55) CHARACTER SET latin1 NOT NULL,
  `MarcaImpresora` varchar(20) NOT NULL,
  `ModeloImpresora` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`IdPedido`);

--
-- Indices de la tabla `impresoras`
--
ALTER TABLE `impresoras`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`IdPedido`);

--
-- Indices de la tabla `tonners`
--
ALTER TABLE `tonners`
  ADD PRIMARY KEY (`NumeroSerie`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `IdPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `impresoras`
--
ALTER TABLE `impresoras`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `IdPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
