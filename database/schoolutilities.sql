-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Nov 08, 2021 at 06:20 PM
-- Server version: 5.7.35
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schoolutilities`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `course_description` text NOT NULL,
  `school_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `name`, `course_description`, `school_id`, `subject_id`, `class_id`) VALUES
(40, 'Math 2', '', 1, 1, 1),
(41, 'Mathe', '2', 1, 1, 1),
(42, 'Math', '2', 1, 1, 1),
(43, 'Maeth', '2', 1, 1, 1),
(44, 'Math v2', '2', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_persons`
--

CREATE TABLE `course_persons` (
  `course_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_persons`
--

INSERT INTO `course_persons` (`course_id`, `person_id`) VALUES
(41, 2),
(42, 2),
(43, 2),
(40, 3),
(41, 3),
(41, 4),
(42, 4);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `school_id` int(255) NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `childs_visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `school_id`, `is_visible`, `childs_visible`) VALUES
(2, 'Medientechnik v2', 1, 0, 0),
(7, 'v2', 1, 1, 0),
(8, 'Alo', 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `language_id` int(255) NOT NULL,
  `language_name` varchar(255) NOT NULL,
  `language_tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`language_id`, `language_name`, `language_tag`) VALUES
(1, 'german', 'de-DE'),
(2, 'english', 'en-US');

-- --------------------------------------------------------

--
-- Table structure for table `login_tokens`
--

CREATE TABLE `login_tokens` (
  `login_token_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_tokens`
--

INSERT INTO `login_tokens` (`login_token_id`, `person_id`, `refresh_token`, `creation_time`) VALUES
(1, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NTk3LCJleHAiOjE2MzM4MTAzOTd9.BejZ3ugvzWTKqz8HyRjUbOAs0-_enQI7gDVb4KZfKi4', '2021-10-07 20:13:16'),
(2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjEyLCJleHAiOjE2MzM4MTA0MTJ9.B-vnv-iXSHzWDyeBPL8JKiBqW1iifSzE57Bkh1Yk3nk', '2021-10-07 20:13:31'),
(3, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjUyLCJleHAiOjE2MzM4MTA0NTJ9.Omxy3eJyiN1nBUokcVn5jSRaiuY2rr-bWYzbnWywie8', '2021-10-07 20:14:11'),
(4, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjUzLCJleHAiOjE2MzM4MTA0NTN9.nLYWkSrzRaorKoC_Jx4kG_VatA6YHYWVfnRun15irts', '2021-10-07 20:14:12'),
(5, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU0LCJleHAiOjE2MzM4MTA0NTR9.-YnKE-PWDK2HYfQGoYKzamt7tHYGg05mow9UITtzYTE', '2021-10-07 20:14:13'),
(6, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU1LCJleHAiOjE2MzM4MTA0NTV9.tsxpQbjPWwRpVArH4VsSzfpUpttvXFkma19EpzMqsxM', '2021-10-07 20:14:14'),
(7, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU1LCJleHAiOjE2MzM4MTA0NTV9.tsxpQbjPWwRpVArH4VsSzfpUpttvXFkma19EpzMqsxM', '2021-10-07 20:14:14'),
(8, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU2LCJleHAiOjE2MzM4MTA0NTZ9.octzrQcbpNtbfdFosfIHUHyXQPhQ9jZLEx_wVsgIOGM', '2021-10-07 20:14:15'),
(9, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU3LCJleHAiOjE2MzM4MTA0NTd9.2iTo2ugBFn4m_4oRcH3AN8QZ0t9r7waxr_Vh5yBKR8U', '2021-10-07 20:14:16'),
(10, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU4LCJleHAiOjE2MzM4MTA0NTh9.8hFplFPngW5z01MOE6IBt4ZwLUUzO9_D6hh2SV2KbF0', '2021-10-07 20:14:17'),
(11, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjU5LCJleHAiOjE2MzM4MTA0NTl9.UDym2OjaUeLoCTJ5S4TeO3_YnNhnNIAD3uHoAm_Chq0', '2021-10-07 20:14:18'),
(12, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjYwLCJleHAiOjE2MzM4MTA0NjB9.RC3Ch-diY0G4mZBIDiFAB-m9peqePvnK-1voOZnGlDA', '2021-10-07 20:14:19'),
(13, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjYwLCJleHAiOjE2MzM4MTA0NjB9.RC3Ch-diY0G4mZBIDiFAB-m9peqePvnK-1voOZnGlDA', '2021-10-07 20:14:19'),
(14, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjYxLCJleHAiOjE2MzM4MTA0NjF9.5m0ZpCX9d6oFiDglKHrPybn9NFZytH38ETPnzMbcmMA', '2021-10-07 20:14:20'),
(15, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjYxLCJleHAiOjE2MzM4MTA0NjF9.5m0ZpCX9d6oFiDglKHrPybn9NFZytH38ETPnzMbcmMA', '2021-10-07 20:14:20'),
(16, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM3NjYyLCJleHAiOjE2MzM4MTA0NjJ9.atzQkrBCHiha1FJvInOp8mxTCSEnlqBL3-Z6omG-kT4', '2021-10-07 20:14:21'),
(17, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNjM4NTE3LCJleHAiOjE2MzM4MTEzMTd9.7hpbttGLESwFUoewL_nFXjvUoiGf4DC9ieSca80Mk5A', '2021-10-07 20:28:36'),
(18, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzNzExMjYxLCJleHAiOjE2MzM4ODQwNjF9.qcAdClZRj_yu8iytjoThPKcvLhs1VufHlgm15N71Va0', '2021-10-08 16:41:01'),
(19, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM0MDIxMjE0LCJleHAiOjE2MzQxOTQwMTR9.ouHmDpIwKPuETnQrqUUx5HiIH-wnVmtzy7OtXvTgepI', '2021-10-12 06:46:54');

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `person_id` int(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `school_id` int(255) DEFAULT NULL,
  `class_id` int(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `persons`
--

INSERT INTO `persons` (`person_id`, `firstname`, `lastname`, `birthdate`, `school_id`, `class_id`, `email`, `password`, `email_verified`, `creation_date`) VALUES
(2, 'john', 'smith', '2012-11-01', NULL, NULL, 'graski.tobias@gmail.com', 'U2FsdGVkX18CR75APKy4X+meb4vmhxzG+2uH6zY9DpA=', 0, '2021-10-04 14:59:01'),
(3, 'asdf', 'fasdf', '2021-10-15', NULL, NULL, 'asdf@asdf.com', 'U2FsdGVkX1+lOWj5qu/yUca5Asj3MzfS', 0, '2021-10-12 18:50:53'),
(4, 'asdf', 'asdf', '2021-10-14', NULL, NULL, 'schoolutilities_betaasdf@asdf.com', 'U2FsdGVkX1+Mea+UMcUl/WGExfh7o4L+', 0, '2021-10-12 18:58:46'),
(6, 'john', 'smith', '2012-11-01', NULL, NULL, 'tobias.graski@gmx.at', 'U2FsdGVkX1+mq7azXse1ABOu3YU1f3LLR/ww+34juW8=', 1, '2021-10-14 14:16:37'),
(7, 'john', 'smith', '2012-11-01', NULL, NULL, 'david.woegerb@gmail.com', 'U2FsdGVkX18f30zI3uAwuYnEJqVcuGy7go9rnX5da1E=', 0, '2021-10-14 14:45:34');

-- --------------------------------------------------------

--
-- Table structure for table `person_roles`
--

CREATE TABLE `person_roles` (
  `person_id` int(255) NOT NULL,
  `role_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `register_tokens`
--

CREATE TABLE `register_tokens` (
  `register_link_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(255) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `language_id` int(255) NOT NULL,
  `timezone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_id`, `name`, `language_id`, `timezone`) VALUES
(1, 'HTL Leonding', 1, '+00:00'),
(2, 'HTL Leonding', 1, '+00:00'),
(3, 'HTL Leonding', 1, '+00:00'),
(4, 'HTL Leonding', 1, '+00:00'),
(5, 'HTL Leonding', 1, '+10:00');

-- --------------------------------------------------------

--
-- Table structure for table `school_classes`
--

CREATE TABLE `school_classes` (
  `class_id` int(255) NOT NULL,
  `department_id` int(255) NOT NULL,
  `class_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_classes`
--

INSERT INTO `school_classes` (`class_id`, `department_id`, `class_name`) VALUES
(1, 2, '4AHITM');

-- --------------------------------------------------------

--
-- Table structure for table `school_join_codes`
--

CREATE TABLE `school_join_codes` (
  `school_join_code_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `join_code` varchar(255) NOT NULL,
  `expire_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `join_code_name` varchar(255) NOT NULL,
  `person_creation_id` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school_join_codes`
--

INSERT INTO `school_join_codes` (`school_join_code_id`, `school_id`, `join_code`, `expire_date`, `join_code_name`, `person_creation_id`, `creation_date`) VALUES
(1, 1, 'un6jfgeBFBcXDzmlGBv7B', '2021-10-22 12:00:00', 'code...', 2, '2021-11-05 22:26:34'),
(2, 1, '8oni4w7ZZb3hJpa83cihg', '2021-10-22 12:00:00', 'codee...', 2, '2021-11-05 22:35:07'),
(3, 1, 'Slq90dBqZHq50sHLtSlc-', '2021-10-22 12:00:00', 'codeee...', 2, '2021-11-05 22:38:08');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(255) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `class_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_name`, `class_id`) VALUES
(1, 'Test', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `unique_course_name_school_id` (`name`,`school_id`),
  ADD KEY `fk_course_school` (`school_id`),
  ADD KEY `fk_course_subject` (`subject_id`),
  ADD KEY `fk_course_class` (`class_id`);

--
-- Indexes for table `course_persons`
--
ALTER TABLE `course_persons`
  ADD UNIQUE KEY `coursePersonId` (`course_id`,`person_id`),
  ADD KEY `fk_course_persons_person_id` (`person_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `fk_department_school` (`school_id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`language_id`);

--
-- Indexes for table `login_tokens`
--
ALTER TABLE `login_tokens`
  ADD PRIMARY KEY (`login_token_id`),
  ADD KEY `fk_login_token_person` (`person_id`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `fk_person_school` (`school_id`),
  ADD KEY `fk_person_class` (`class_id`);

--
-- Indexes for table `person_roles`
--
ALTER TABLE `person_roles`
  ADD UNIQUE KEY `person_id` (`person_id`),
  ADD KEY `fk_person_role_role` (`role_id`);

--
-- Indexes for table `register_tokens`
--
ALTER TABLE `register_tokens`
  ADD PRIMARY KEY (`register_link_id`),
  ADD KEY `fk_register_token_person` (`person_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD KEY `language_id` (`language_id`);

--
-- Indexes for table `school_classes`
--
ALTER TABLE `school_classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `fk_school_class_deparment` (`department_id`);

--
-- Indexes for table `school_join_codes`
--
ALTER TABLE `school_join_codes`
  ADD PRIMARY KEY (`school_join_code_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `language_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_tokens`
--
ALTER TABLE `login_tokens`
  MODIFY `login_token_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `person_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `register_tokens`
--
ALTER TABLE `register_tokens`
  MODIFY `register_link_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `school_classes`
--
ALTER TABLE `school_classes`
  MODIFY `class_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `school_join_codes`
--
ALTER TABLE `school_join_codes`
  MODIFY `school_join_code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `fk_course_class` FOREIGN KEY (`class_id`) REFERENCES `school_classes` (`class_id`),
  ADD CONSTRAINT `fk_course_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`),
  ADD CONSTRAINT `fk_course_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

--
-- Constraints for table `course_persons`
--
ALTER TABLE `course_persons`
  ADD CONSTRAINT `fk_course_persons_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `fk_course_persons_person_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_department_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints for table `login_tokens`
--
ALTER TABLE `login_tokens`
  ADD CONSTRAINT `fk_login_token_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints for table `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `fk_person_class` FOREIGN KEY (`class_id`) REFERENCES `school_classes` (`class_id`),
  ADD CONSTRAINT `fk_person_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints for table `person_roles`
--
ALTER TABLE `person_roles`
  ADD CONSTRAINT `fk_person_role_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`),
  ADD CONSTRAINT `fk_person_role_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `register_tokens`
--
ALTER TABLE `register_tokens`
  ADD CONSTRAINT `fk_register_token_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints for table `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `fk_school_language` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`);

--
-- Constraints for table `school_classes`
--
ALTER TABLE `school_classes`
  ADD CONSTRAINT `fk_school_class_deparment` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
