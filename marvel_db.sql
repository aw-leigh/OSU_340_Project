-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 06, 2019 at 05:17 AM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_wilsoan6`
--

-- --------------------------------------------------------

--
-- Table structure for table `Characters`
--

CREATE TABLE `Characters` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Race` varchar(50) NOT NULL,
  `Alignment` enum('HERO','VILLAIN') NOT NULL,
  `Planet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Characters`
--

INSERT INTO `Characters` (`ID`, `Name`, `Race`, `Alignment`, `Planet`) VALUES
(1, 'Captain America', 'Human', 'HERO', 1),
(2, 'Thor', 'Asgardian', 'HERO', 2),
(3, 'Nick Fury', 'Human', 'HERO', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Characters_Movies`
--

CREATE TABLE `Characters_Movies` (
  `char_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Characters_Movies`
--

INSERT INTO `Characters_Movies` (`char_id`, `movie_id`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Characters_Organizations`
--

CREATE TABLE `Characters_Organizations` (
  `char_id` int(11) NOT NULL,
  `org_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Characters_Organizations`
--

INSERT INTO `Characters_Organizations` (`char_id`, `org_id`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

CREATE TABLE `Movies` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Release_Date` date NOT NULL,
  `Phase` enum('1','2','3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Movies`
--

INSERT INTO `Movies` (`ID`, `Name`, `Release_Date`, `Phase`) VALUES
(1, 'The Avengers', '2012-05-04', '1');

-- --------------------------------------------------------

--
-- Table structure for table `Organizations`
--

CREATE TABLE `Organizations` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Leader` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Organizations`
--

INSERT INTO `Organizations` (`ID`, `Name`, `Leader`) VALUES
(1, 'S.H.I.E.L.D.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Organizations_Movies`
--

CREATE TABLE `Organizations_Movies` (
  `movie_id` int(11) NOT NULL,
  `org_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Organizations_Movies`
--

INSERT INTO `Organizations_Movies` (`movie_id`, `org_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Planets`
--

CREATE TABLE `Planets` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Planets`
--

INSERT INTO `Planets` (`ID`, `Name`) VALUES
(1, 'Earth'),
(2, 'Asgard');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Characters`
--
ALTER TABLE `Characters`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Planet` (`Planet`);

--
-- Indexes for table `Characters_Movies`
--
ALTER TABLE `Characters_Movies`
  ADD PRIMARY KEY (`char_id`,`movie_id`);

--
-- Indexes for table `Characters_Organizations`
--
ALTER TABLE `Characters_Organizations`
  ADD PRIMARY KEY (`char_id`,`org_id`),
  ADD KEY `org_id` (`org_id`);

--
-- Indexes for table `Movies`
--
ALTER TABLE `Movies`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Organizations`
--
ALTER TABLE `Organizations`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Leader` (`Leader`);

--
-- Indexes for table `Organizations_Movies`
--
ALTER TABLE `Organizations_Movies`
  ADD PRIMARY KEY (`movie_id`,`org_id`),
  ADD KEY `org_id` (`org_id`);

--
-- Indexes for table `Planets`
--
ALTER TABLE `Planets`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Characters`
--
ALTER TABLE `Characters`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Organizations`
--
ALTER TABLE `Organizations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Planets`
--
ALTER TABLE `Planets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Characters`
--
ALTER TABLE `Characters`
  ADD CONSTRAINT `Characters_ibfk_1` FOREIGN KEY (`Planet`) REFERENCES `Planets` (`ID`);

--
-- Constraints for table `Characters_Movies`
--
ALTER TABLE `Characters_Movies`
  ADD CONSTRAINT `Characters_Movies_ibfk_1` FOREIGN KEY (`char_id`) REFERENCES `Characters` (`ID`),
  ADD CONSTRAINT `Characters_Movies_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`ID`);

--
-- Constraints for table `Characters_Organizations`
--
ALTER TABLE `Characters_Organizations`
  ADD CONSTRAINT `Characters_Organizations_ibfk_1` FOREIGN KEY (`char_id`) REFERENCES `Characters` (`ID`),
  ADD CONSTRAINT `Characters_Organizations_ibfk_2` FOREIGN KEY (`org_id`) REFERENCES `Organizations` (`ID`);

--
-- Constraints for table `Organizations`
--
ALTER TABLE `Organizations`
  ADD CONSTRAINT `Organizations_ibfk_1` FOREIGN KEY (`Leader`) REFERENCES `Characters` (`ID`);

--
-- Constraints for table `Organizations_Movies`
--
ALTER TABLE `Organizations_Movies`
  ADD CONSTRAINT `Organizations_Movies_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`ID`),
  ADD CONSTRAINT `Organizations_Movies_ibfk_2` FOREIGN KEY (`org_id`) REFERENCES `Organizations` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
