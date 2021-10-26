-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Erstellungszeit: 26. Okt 2021 um 19:40
-- Server-Version: 5.7.34
-- PHP-Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `schoolutilities`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `course_description` text NOT NULL,
  `school_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course_persons`
--

CREATE TABLE `course_persons` (
  `course_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `departments`
--

CREATE TABLE `departments` (
  `department_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `school_id` int(255) NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `childs_visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `school_id`, `is_visible`, `childs_visible`) VALUES
(2, 'Medientechnik v2', 1, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `languages`
--

CREATE TABLE `languages` (
  `language_id` int(255) NOT NULL,
  `language_name` varchar(255) NOT NULL,
  `language_tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `languages`
--

INSERT INTO `languages` (`language_id`, `language_name`, `language_tag`) VALUES
(1, 'german', 'de-DE'),
(2, 'english', 'en-US');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `login_tokens`
--

CREATE TABLE `login_tokens` (
  `login_token_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `login_tokens`
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
-- Tabellenstruktur für Tabelle `persons`
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
-- Daten für Tabelle `persons`
--

INSERT INTO `persons` (`person_id`, `firstname`, `lastname`, `birthdate`, `school_id`, `class_id`, `email`, `password`, `email_verified`, `creation_date`) VALUES
(2, 'john', 'smith', '2012-11-01', NULL, NULL, 'graski.tobias@gmail.com', 'U2FsdGVkX18CR75APKy4X+meb4vmhxzG+2uH6zY9DpA=', 0, '2021-10-04 14:59:01'),
(3, 'asdf', 'fasdf', '2021-10-15', NULL, NULL, 'asdf@asdf.com', 'U2FsdGVkX1+lOWj5qu/yUca5Asj3MzfS', 0, '2021-10-12 18:50:53'),
(4, 'asdf', 'asdf', '2021-10-14', NULL, NULL, 'schoolutilities_betaasdf@asdf.com', 'U2FsdGVkX1+Mea+UMcUl/WGExfh7o4L+', 0, '2021-10-12 18:58:46'),
(6, 'john', 'smith', '2012-11-01', NULL, NULL, 'tobias.graski@gmx.at', 'U2FsdGVkX1+mq7azXse1ABOu3YU1f3LLR/ww+34juW8=', 1, '2021-10-14 14:16:37'),
(7, 'john', 'smith', '2012-11-01', NULL, NULL, 'david.woegerb@gmail.com', 'U2FsdGVkX18f30zI3uAwuYnEJqVcuGy7go9rnX5da1E=', 0, '2021-10-14 14:45:34');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `person_roles`
--

CREATE TABLE `person_roles` (
  `person_id` int(255) NOT NULL,
  `role_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `register_tokens`
--

CREATE TABLE `register_tokens` (
  `register_link_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roles`
--

CREATE TABLE `roles` (
  `role_id` int(255) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schools`
--

CREATE TABLE `schools` (
  `school_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `language_id` int(255) NOT NULL,
  `timezone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `schools`
--

INSERT INTO `schools` (`school_id`, `name`, `language_id`, `timezone`) VALUES
(1, 'HTL Leonding', 1, '+00:00'),
(2, 'HTL Leonding', 1, '+00:00'),
(3, 'HTL Leonding', 1, '+00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `school_classes`
--

CREATE TABLE `school_classes` (
  `class_id` int(255) NOT NULL,
  `department_id` int(255) NOT NULL,
  `class_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(255) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `class_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `fk_course_school` (`school_id`),
  ADD KEY `fk_course_subject` (`subject_id`),
  ADD KEY `fk_course_class` (`class_id`);

--
-- Indizes für die Tabelle `course_persons`
--
ALTER TABLE `course_persons`
  ADD UNIQUE KEY `course_id` (`course_id`),
  ADD KEY `fk_course_persons_person_id` (`person_id`);

--
-- Indizes für die Tabelle `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `fk_department_school` (`school_id`);

--
-- Indizes für die Tabelle `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`language_id`);

--
-- Indizes für die Tabelle `login_tokens`
--
ALTER TABLE `login_tokens`
  ADD PRIMARY KEY (`login_token_id`),
  ADD KEY `fk_login_token_person` (`person_id`);

--
-- Indizes für die Tabelle `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `fk_person_school` (`school_id`),
  ADD KEY `fk_person_class` (`class_id`);

--
-- Indizes für die Tabelle `person_roles`
--
ALTER TABLE `person_roles`
  ADD UNIQUE KEY `person_id` (`person_id`),
  ADD KEY `fk_person_role_role` (`role_id`);

--
-- Indizes für die Tabelle `register_tokens`
--
ALTER TABLE `register_tokens`
  ADD PRIMARY KEY (`register_link_id`),
  ADD KEY `fk_register_token_person` (`person_id`);

--
-- Indizes für die Tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indizes für die Tabelle `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD KEY `language_id` (`language_id`);

--
-- Indizes für die Tabelle `school_classes`
--
ALTER TABLE `school_classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `fk_school_class_deparment` (`department_id`);

--
-- Indizes für die Tabelle `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `languages`
--
ALTER TABLE `languages`
  MODIFY `language_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `login_tokens`
--
ALTER TABLE `login_tokens`
  MODIFY `login_token_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT für Tabelle `persons`
--
ALTER TABLE `persons`
  MODIFY `person_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `register_tokens`
--
ALTER TABLE `register_tokens`
  MODIFY `register_link_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `school_classes`
--
ALTER TABLE `school_classes`
  MODIFY `class_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `fk_course_class` FOREIGN KEY (`class_id`) REFERENCES `school_classes` (`class_id`),
  ADD CONSTRAINT `fk_course_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`),
  ADD CONSTRAINT `fk_course_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

--
-- Constraints der Tabelle `course_persons`
--
ALTER TABLE `course_persons`
  ADD CONSTRAINT `fk_course_persons_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `fk_course_persons_person_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints der Tabelle `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_department_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints der Tabelle `login_tokens`
--
ALTER TABLE `login_tokens`
  ADD CONSTRAINT `fk_login_token_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints der Tabelle `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `fk_person_class` FOREIGN KEY (`class_id`) REFERENCES `school_classes` (`class_id`),
  ADD CONSTRAINT `fk_person_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints der Tabelle `person_roles`
--
ALTER TABLE `person_roles`
  ADD CONSTRAINT `fk_person_role_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`),
  ADD CONSTRAINT `fk_person_role_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints der Tabelle `register_tokens`
--
ALTER TABLE `register_tokens`
  ADD CONSTRAINT `fk_register_token_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints der Tabelle `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `fk_school_language` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`);

--
-- Constraints der Tabelle `school_classes`
--
ALTER TABLE `school_classes`
  ADD CONSTRAINT `fk_school_class_deparment` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
