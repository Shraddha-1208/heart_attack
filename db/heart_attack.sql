-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2025 at 07:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heart_attack`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_master`
--

CREATE TABLE `admin_master` (
  `id` int(11) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(75) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_master`
--

INSERT INTO `admin_master` (`id`, `full_name`, `username`, `email`, `phone`, `date_created`, `status`, `image`) VALUES
(1, 'Admin User', 'SuperAdmin', 'admin@gmail.com', '9876543210', '2025-05-02 21:58:50', 1, 'user/download.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_master`
--

CREATE TABLE `doctor_master` (
  `doctor_id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `qualification` varchar(50) NOT NULL,
  `specialization` varchar(50) NOT NULL,
  `email` varchar(75) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `doctor_status` tinyint(1) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_master`
--

INSERT INTO `doctor_master` (`doctor_id`, `full_name`, `username`, `qualification`, `specialization`, `email`, `phone`, `created_date`, `doctor_status`, `image`) VALUES
(2, 'ajay kumar', 'ajay', 'MBBS', 'General', 'ashikbright10@gmail.com', '9639639639', '2025-05-04 16:07:09', 1, 'user/doctor_image.jpg'),
(7, 'Athul', 'Athul', 'MBBS', 'general', 'athul30@gmail.com', '1234567890', '2025-06-17 22:47:04', 1, '1750180624634.jpeg'),
(8, 'Vishaka', 'Vishaka', 'MBBS', 'Cardiologist', 'vishu25@gmail.com', '9353326608', '2025-06-18 14:18:56', 1, '1750236536802.png'),
(35, 'Thejas', 'Thejas', 'MBBS', 'Cardiologist', 'thejas23@gmail.com', '9353326608', '2025-07-04 10:24:03', 1, ''),
(36, 'Manvi', 'Manvi', 'MBBS', 'Cardiologist', 'manvi25@gmail.com', '9353326608', '2025-08-01 10:57:11', 1, '1754026031676.webp'),
(37, 'Aniketh', 'Aniketh', 'MBBS', 'cardiac', 'aniketh25@gmail.com', '9353326608', '2025-08-10 18:59:00', 1, ''),
(38, 'Aman', 'aman', 'MBBS', 'Cardiologist', 'thejas23@gmail.com', '9353326608', '2025-08-11 08:49:04', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `patient_master`
--

CREATE TABLE `patient_master` (
  `id` int(11) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `username` varchar(50) NOT NULL,
  `UHID` varchar(25) NOT NULL,
  `gender` varchar(25) NOT NULL,
  `dob` date NOT NULL,
  `age` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `injuries` varchar(45) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `email` varchar(75) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_master`
--

INSERT INTO `patient_master` (`id`, `full_name`, `username`, `UHID`, `gender`, `dob`, `age`, `phone`, `address`, `injuries`, `status`, `date_created`, `email`, `image`) VALUES
(3, 'Mohammad Ashik', 'ashik', 'UHID552289', 'Male', '2000-04-30', 24, '9148097564', 'Paraneerukatte House Kabaka ', 'pain in eye nerve and head ache', 1, '2025-05-04 12:42:15', 'ashiqkbk10@gmail.com', 'user/patient_image.jpg'),
(7, 'Shraddha', 'Shraddha', '12345', 'Female', '2025-06-17', 22, '1234567890', 'Shakthinagara', 'High BP', 1, '2025-06-17 22:45:55', 'shraddhabekal25@gmail.com', '1750180555181.jpeg'),
(9, 'Vishaka', 'Vishaka', '887666', 'female', '2025-06-19', 10, '9353326608', 'Managalore', 'BP', 1, '2025-06-19 12:34:10', 'vishu25@gmail.com', '1750316650623.jpeg'),
(10, 'Aman', 'aman', 'UHID610820', 'Male', '2025-06-12', 0, '9353326608', 'ahahaha', 'ansnss sb', 1, '2025-06-27 12:50:25', 'vishu25@gmail.com', '1751008825485.png'),
(11, 'Manasa', 'Manasa', 'UHID755067', 'female', '2025-07-04', 50, '9353326608', 'Kerala', 'BP', 1, '2025-07-04 10:04:28', 'manasa25@gmail.com', ''),
(12, 'Dhanush', 'Dhanush', 'UHID133742', 'Male', '2025-08-01', 45, '9353326608', 'Mangalore', 'High Sugar', 1, '2025-08-01 10:44:54', 'dhanu24@gmail.com', ''),
(13, 'Athul', 'Athul', 'UHID972699', 'Male', '2023-02-01', 2, '9353326608', 'MANGALORE', 'ababa', 1, '2025-08-01 11:55:33', 'thejas23@gmail.com', '1754029533510.jpg'),
(20, 'Soujanya', 'Soujanya', 'UHID912349', 'female', '1973-05-16', 52, '9353326608', 'Mangalore', 'High Sugar', 1, '2025-08-01 11:58:31', 'souju25@gmail.com', '1754029711787.jpg'),
(21, 'Anusha', 'Anusha', 'UHID525435', 'Female', '1985-06-12', 40, '9353326608', 'Mangalore', 'High blood pressure', 1, '2025-08-10 17:20:21', 'anusha25@gmail.com', ''),
(22, 'Charitha', 'Charitha', 'UHID460882', 'female', '1953-06-10', 72, '9353326608', 'Bangalore', 'Hypertension', 1, '2025-08-11 06:38:29', 'charitha25@gmail.com', ''),
(23, 'Jaya', 'Jaya', 'UHID627611', 'female', '1979-11-01', 45, '9353326608', 'Mumbai', 'Stress', 1, '2025-08-11 06:43:31', 'jaya25@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `report_history`
--

CREATE TABLE `report_history` (
  `report_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `label` varchar(20) DEFAULT NULL,
  `confidence` float DEFAULT NULL,
  `risk_rate` float DEFAULT NULL,
  `suggestion` text DEFAULT NULL,
  `image_path` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `uhid` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Not Sent',
  `feedback` text DEFAULT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `feedback_pdf_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_history`
--

INSERT INTO `report_history` (`report_id`, `name`, `age`, `gender`, `label`, `confidence`, `risk_rate`, `suggestion`, `image_path`, `created_at`, `uhid`, `status`, `feedback`, `pdf_path`, `feedback_pdf_path`) VALUES
(1, 'Shraddha', 37, 'Female', 'Normal', 99.98, 28.6, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250627124110_r1.jpeg', '2025-06-27 12:41:10', NULL, 'Not Sent', NULL, NULL, NULL),
(2, 'aniketh', 23, 'Male', 'Normal', 99.98, 23.33, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250627124906_r1.jpeg', '2025-06-27 12:49:08', 'null', 'Not Sent', NULL, NULL, NULL),
(3, 'Aniketh', 34, 'Male', 'Normal', 99.98, 18.79, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250627125058_r1.jpeg', '2025-06-27 12:50:59', 'null', 'Not Sent', NULL, NULL, NULL),
(4, 'aniketh', 34, 'Male', 'Normal', 99.98, 24.94, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250627130921_r1.jpeg', '2025-06-27 13:09:22', 'UHID610820', 'Not Sent', NULL, NULL, NULL),
(5, 'Shraddha', 45, 'Female', 'Abnormal', 100, 80, '🚨 Very high risk. Immediate medical attention needed.', 'uploads/20250702134910_retinal.jpg', '2025-07-02 13:49:11', '12345', 'Reviewed', '{\"medicines\":[{\"name\":\"\",\"dosage\":\"\",\"timing\":\"Morning\"}],\"exercise\":\"\",\"checkup\":\"\",\"location\":\"\"}', 'Uploads/PDFs/report_12345_2025-07-02T08-20-26.764Z.pdf', 'uploads/PDFs/12345_feedback.pdf'),
(6, 'Manas', 50, 'Female', 'Abnormal', 100, 80, '🚨 Very high risk. Immediate medical attention needed.', 'uploads/20250704100636_retinal.jpg', '2025-07-04 10:06:38', 'UHID755067', 'Pending', NULL, 'Uploads/PDFs/report_UHID755067_2025-07-04T04-37-18.284Z.pdf', NULL),
(7, 'Manasa', 35, 'Female', 'Abnormal', 100, 70, '⚠️ High risk. Please consult a cardiologist soon.', 'uploads/20250704122519_retinal.jpg', '2025-07-04 12:25:20', 'UHID755067', 'Pending', NULL, 'Uploads/PDFs/report_UHID755067_2025-07-04T06-56-08.102Z.pdf', NULL),
(8, 'Shraddha', 30, 'Female', 'Abnormal', 100, 70, '⚠️ High risk. Please consult a cardiologist soon.', 'uploads/20250709195343_2.png', '2025-07-09 19:53:44', '12345', 'Not Sent', NULL, NULL, NULL),
(9, 'Shraddha', 50, 'Female', 'Abnormal', 100, 80, '🚨 Very high risk. Immediate medical attention needed.', 'uploads/20250709195446_1004.png', '2025-07-09 19:54:46', '12345', 'Not Sent', NULL, NULL, NULL),
(10, 'Shraddha', 50, 'Female', 'Normal', 100, 32.62, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250709195600_1ffa962a-8d87-11e8-9daf-6045cb817f5b..JPG', '2025-07-09 19:56:00', '12345', 'Not Sent', NULL, NULL, NULL),
(11, 'Aman', 45, 'Male', 'Normal', 99.98, 33.67, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250714222411_r1.jpeg', '2025-07-14 22:24:13', 'UHID610820', 'Not Sent', NULL, NULL, NULL),
(12, 'Dhanush', 45, 'Male', 'Normal', 99.98, 30.34, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250801104643_r1.jpeg', '2025-08-01 10:46:45', 'UHID133742', 'Not Sent', NULL, NULL, NULL),
(13, 'Soujanya', 52, 'Female', 'Abnormal', 100, 80, '🚨 Very high risk. Immediate medical attention needed.', 'uploads/20250801120024_retinal.jpg', '2025-08-01 12:00:26', 'UHID912349', 'Not Sent', NULL, NULL, NULL),
(14, 'Anjali', 45, 'Female', 'Abnormal', 100, 80, '🚨 Very high risk. Immediate medical attention needed.', 'uploads/20250801120224_retinal.jpg', '2025-08-01 12:02:25', 'UHID912349', 'Reviewed', '{\"medicines\":[{\"name\":\"Thrombolytics\",\"dosage\":\"Full\",\"timing\":\"Both\"}],\"exercise\":\"Yoga\",\"checkup\":\"Once in a Month\",\"location\":\"Mangalore\"}', 'Uploads/PDFs/report_UHID912349_2025-08-01T06-32-42.891Z.pdf', 'uploads/PDFs/UHID912349_feedback.pdf'),
(15, 'Anusha', 40, 'Female', 'Abnormal', 100, 70, '⚠️ High risk. Please consult a cardiologist soon.', 'uploads/20250810172350_retinal.jpg', '2025-08-10 17:23:53', 'UHID525435', 'Pending', NULL, 'Uploads/PDFs/report_UHID525435_2025-08-10T11-54-39.150Z.pdf', NULL),
(16, 'Charitha', 50, 'Female', 'Normal', 99.98, 34.55, '✅ You are in good condition. Maintain a balanced diet, exercise regularly.', 'uploads/20250811064005_r1.jpeg', '2025-08-11 06:40:06', 'UHID460882', 'Not Sent', NULL, NULL, NULL),
(17, 'Jaya', 45, 'Female', 'Abnormal', 100, 80, '🚨 Very high risk. Immediate medical attention needed.', 'uploads/20250811064421_retinal.jpg', '2025-08-11 06:44:22', 'UHID627611', 'Reviewed', '{\"medicines\":[{\"name\":\"Therapy\",\"dosage\":\"0\",\"timing\":\"Both\"}],\"exercise\":\"Completely bedrest\",\"checkup\":\"ECG need to be done early has possible\",\"location\":\"Mangalore\"}', 'Uploads/PDFs/report_UHID627611_2025-08-11T01-14-39.211Z.pdf', 'uploads/PDFs/UHID627611_feedback.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','doctor','patient') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `otp` int(11) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `otp`, `otp_expiry`) VALUES
(10, 'janu', 'janu@3@gmail.com', '123', '', '2025-04-26 08:56:47', NULL, NULL),
(11, 'shraddha', 'shradha@gmail.com', '123', 'patient', '2025-06-14 05:48:08', NULL, NULL),
(12, 'admin', 'admin@gmail.com', 'admin123', 'admin', '2025-06-15 09:10:42', NULL, NULL),
(13, 'admin', 'admin@gmail.com', 'admin123', 'admin', '2025-06-15 09:48:34', NULL, NULL),
(14, 'shraddha', 'shradha@gmail.com', '123', 'patient', '2025-06-15 09:59:21', NULL, NULL),
(15, 'doctor', 'doctor@gmail.com', 'doctor123', 'doctor', '2025-06-15 11:47:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` int(10) NOT NULL,
  `type` varchar(25) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `type`, `username`, `password`, `date_created`, `status`) VALUES
(1, 'Admin', 'SuperAdmin', '123123', '2025-05-02 21:57:14', 1),
(2, 'Doctor', 'Kushi', 'PAss270051', '2025-05-02 22:01:15', 1),
(5, 'Patient', 'ashik', '123123', '2025-05-04 12:42:15', 1),
(6, 'Patient', 'anas', 'PAss393487', '2025-05-04 15:57:25', 1),
(7, 'Doctor', 'ajay', '123123', '2025-05-04 16:07:09', 1),
(8, 'Patient', 'fathima', 'PAss151066', '2025-05-12 15:00:20', 1),
(11, 'doctor', 'athul', '123', '2025-06-16 07:01:01', 1),
(12, 'patient', 'shraddha', '123', '2025-06-16 07:24:30', 1),
(13, 'doctor', 'Doctor', 'doctor123', '2025-06-16 07:27:46', 1),
(14, 'admin', 'Admin', 'admin123', '2025-06-16 07:28:24', 1),
(16, 'patient', 'Athul', '123', '2025-06-16 10:08:02', 1),
(24, 'patient', 'Shraddha', '123', '2025-06-17 22:45:55', 1),
(25, 'doctor', 'Athul', 'doctor123', '2025-06-17 22:47:04', 1),
(29, 'patient', 'aman', '123', '2025-06-27 12:50:25', 1),
(30, 'patient', 'Manasa', '123', '2025-07-04 10:04:28', 1),
(31, 'doctor', 'Thejas', '123', '2025-07-04 10:09:33', 1),
(32, 'doctor', 'Thejas', '123', '2025-07-04 10:09:50', 1),
(33, 'doctor', 'Thejas', '123', '2025-07-04 10:09:51', 1),
(34, 'doctor', 'Thejas', '123', '2025-07-04 10:09:51', 1),
(35, 'doctor', 'Thejas', '123', '2025-07-04 10:09:51', 1),
(36, 'doctor', 'Thejas', '123', '2025-07-04 10:09:52', 1),
(37, 'doctor', 'Thejas', '123', '2025-07-04 10:09:55', 1),
(38, 'doctor', 'Thejas', '123', '2025-07-04 10:09:55', 1),
(39, 'doctor', 'Thejas', '123', '2025-07-04 10:09:56', 1),
(40, 'doctor', 'Thejas', '123', '2025-07-04 10:09:56', 1),
(41, 'doctor', 'Thejas', '123', '2025-07-04 10:10:03', 1),
(42, 'doctor', 'Thejas', '123', '2025-07-04 10:10:03', 1),
(43, 'doctor', 'Thejas', '123', '2025-07-04 10:10:03', 1),
(44, 'doctor', 'Thejas', '123', '2025-07-04 10:10:04', 1),
(45, 'doctor', 'Thejas', '123', '2025-07-04 10:10:04', 1),
(46, 'doctor', 'Thejas', '123', '2025-07-04 10:10:04', 1),
(47, 'doctor', 'Thejas', '123', '2025-07-04 10:10:04', 1),
(48, 'doctor', 'Thejas', '123', '2025-07-04 10:10:14', 1),
(49, 'doctor', 'Thejas', '123', '2025-07-04 10:13:46', 1),
(50, 'doctor', 'Thejas', '123', '2025-07-04 10:13:47', 1),
(51, 'doctor', 'Thejas', '123', '2025-07-04 10:13:48', 1),
(52, 'doctor', 'Thejas', '123', '2025-07-04 10:13:48', 1),
(53, 'doctor', 'Thejas', '123', '2025-07-04 10:13:48', 1),
(54, 'doctor', 'Thejas', '123', '2025-07-04 10:13:48', 1),
(55, 'doctor', 'Thejas', '123', '2025-07-04 10:13:48', 1),
(56, 'doctor', 'Thejas', '123', '2025-07-04 10:21:46', 1),
(57, 'doctor', 'Thejas', '123', '2025-07-04 10:24:03', 1),
(58, 'patient', 'Dhanush', 'dhanu123', '2025-08-01 10:44:54', 1),
(59, 'doctor', 'Manvi', 'manvi123', '2025-08-01 10:57:11', 1),
(60, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(61, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(62, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(63, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(64, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(65, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(66, 'patient', 'Athul', 'Athul@123', '2025-08-01 11:55:33', 1),
(67, 'patient', 'Soujanya', 'Souju@123', '2025-08-01 11:58:31', 1),
(68, 'patient', 'Anusha', 'Anusha@123', '2025-08-10 17:20:21', 1),
(69, 'doctor', 'Aniketh', 'Aniketh@123', '2025-08-10 18:59:01', 1),
(70, 'patient', 'Charitha', 'Charitha@123', '2025-08-11 06:38:29', 1),
(71, 'patient', 'Jaya', 'Jaya@123', '2025-08-11 06:43:31', 1),
(72, 'doctor', 'aman', 'aman@123', '2025-08-11 08:49:04', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_master`
--
ALTER TABLE `admin_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_master`
--
ALTER TABLE `doctor_master`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `patient_master`
--
ALTER TABLE `patient_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_history`
--
ALTER TABLE `report_history`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_master`
--
ALTER TABLE `admin_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctor_master`
--
ALTER TABLE `doctor_master`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `patient_master`
--
ALTER TABLE `patient_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `report_history`
--
ALTER TABLE `report_history`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
