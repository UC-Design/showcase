-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 21, 2019 at 10:14 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `car_show_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `show_log`
--

CREATE TABLE `show_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `event_date` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `parking` varchar(255) DEFAULT NULL,
  `entry_fees` varchar(100) DEFAULT NULL,
  `spectator_fees` varchar(100) DEFAULT NULL,
  `other_detail` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `show_log`
--

INSERT INTO `show_log` (`id`, `title`, `description`, `event_date`, `location`, `parking`, `entry_fees`, `spectator_fees`, `other_detail`, `date`) VALUES
(3, 'Winter nats', 'It will be pretty cool', 'Sat 6 Nov 2019', 'Canberra', 'Parking out back', '$100', '$150', 'Please come', '2019-03-21 07:38:56'),
(4, 'Winter nats', 'It will be pretty cool', 'Sat 6 Nov 2019', 'Canberra', 'Parking out back', '$100', '$150', 'Please come', '2019-03-21 07:40:43'),
(5, 'BLOG SITE ANALYTICS', 'erfwerfwerf', 'sdcasdcrf', 'erfwerf', 'erwerfwerf', 'erfwerf', 'erfwerf', 'erfwerfwerf', '2019-03-21 07:41:01'),
(6, 'i', 'changed', 'this', ' one', 'just', 'now', 'so', 'what', '2019-03-21 09:27:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `date`) VALUES
(1, 'Joshua Wren', '$2y$10$73.3tFbhA6AvLU7eda1hTO0XPgjYUAF7xCEjZQ9IfgAzdfkMXo3ou', '2019-03-16 03:40:00'),
(2, 'Jim Smith', '$2y$10$UYP8pbLLeBG3PBLl34C0De06ZSFH3HrxY.y9RKch1WwBvOP0Ezxgu', '2019-03-21 07:36:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `show_log`
--
ALTER TABLE `show_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `show_log`
--
ALTER TABLE `show_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;