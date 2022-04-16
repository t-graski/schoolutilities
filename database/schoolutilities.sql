-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Dec 02, 2021 at 08:20 PM
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
  `course_uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `course_description` text NOT NULL,
  `school_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `course_files`
--

CREATE TABLE `course_files` (
  `course_file_id` int(11) NOT NULL,
  `course_file_uuid` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `date_uploaded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_size` int(11) NOT NULL,
  `file_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_files`
--

INSERT INTO `course_files` (`course_file_id`, `course_file_uuid`, `file_name`, `date_uploaded`, `file_size`, `file_type`) VALUES
(5, '6d0c96707-dc20-4d9e-9a72-3631dcbc7af1.jpg', '57156093', '2021-11-25 20:20:04', 14896, 'image/jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `course_persons`
--

CREATE TABLE `course_persons` (
  `course_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(255) NOT NULL,
  `department_uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `school_id` int(255) NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `childs_visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_uuid`, `name`, `school_id`, `is_visible`, `childs_visible`) VALUES
(2, '', 'Medientechnik v2', 1, 0, 0),
(7, '', 'v2', 1, 1, 0),
(8, '', 'Alo', 2, 0, 0),
(16, '3005e85a7-91ea-4622-9076-35beb39c1e2d', 'Medizintechnik', 1, 0, 0),
(17, '3e0fe70d0-9612-456d-b8a5-ff5599f7945d', 'Medientechnik', 1, 0, 0),
(18, '32159ccae-3df9-40d4-af53-bd575ee4f84c', 'ewhe', 1, 0, 0),
(19, '334be1fa4-f6be-4200-a4c6-a70102ba3e9d', 'rewij', 1, 0, 0),
(20, '32b083a8d-6872-4493-8978-db4cf66177f0', 'asacv', 1, 0, 0),
(21, '3638a142c-1bf0-4f27-b0d1-3799e8ddc7e4', 'wewe', 1, 0, 0),
(22, '3fe576401-384a-439f-a076-28a949ae4ff8', 'asaahasasv', 1, 0, 0),
(23, '3c96ecb33-7ce9-4026-8953-d04bf55f67e8', 'wasasaswe', 1, 0, 0),
(24, '302367719-3ecf-49df-8942-07a7a41c72f8', 'was', 1, 0, 0),
(25, '3074ecdbc-2594-4377-b425-455fa7c61c76', 'dsa', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `email_log`
--

CREATE TABLE `email_log` (
  `email_id` int(255) NOT NULL,
  `email_uuid` varchar(255) NOT NULL,
  `person_id` int(255) NOT NULL,
  `email_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email_subject` varchar(255) NOT NULL,
  `email_receiver` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `person_id` int(255) NOT NULL,
  `person_uuid` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `person_roles`
--

CREATE TABLE `person_roles` (
  `person_id` int(255) NOT NULL,
  `role_id` int(255) NOT NULL,
  `school_id` int(255) NOT NULL
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

--
-- Daten für Tabelle `register_tokens`
--

INSERT INTO `register_tokens` (`register_link_id`, `person_id`, `token`) VALUES
(1, 1, 'akjVD3xc_WnsLjcyEeb7z'),
(7, 7, '2A8YTMAYi6hs3OJjXcy36'),
(10, 10, 'EZrVEjlpxLBiBP3mej_yi'),
(11, 11, 'TalbGqFlowNtkFHkvHt2A'),
(13, 2, 'w60TVhlo-9zJIitQj7Z18'),
(14, 3, 'V8YVaXr8yycqCQDAi90ZK'),
(15, 4, 'ZM4thn4E8b2t467gyC0tR'),
(17, 7, 'KlD_653pUw8MkPh1zdNEq');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(255) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(0, 'Supervisor'),
(1, 'Admin'),
(2, 'Student'),
(3, 'Teacher');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(255) NOT NULL,
  `school_uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `language_id` int(255) NOT NULL,
  `timezone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_id`, `school_uuid`, `name`, `language_id`, `timezone`) VALUES
(1, '', 'HTL Leonding', 1, '+00:00'),
(2, '', 'HTL Leonding', 1, '+00:00'),
(3, '', 'HTL Leonding', 1, '+00:00'),
(4, '', 'HTL Leonding', 1, '+00:00'),
(5, '', 'HTL Leonding', 1, '+10:00'),
(6, '2709ca540-47da-4935-976e-69839db50dd0', 'HTL Leonding', 1, '+00:00');

-- --------------------------------------------------------

--
-- Table structure for table `school_classes`
--

CREATE TABLE `school_classes` (
  `class_id` int(255) NOT NULL,
  `class_uuid` varchar(255) NOT NULL,
  `department_id` int(255) NOT NULL,
  `class_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `school_persons`
--

CREATE TABLE `school_persons` (
  `school_id` int(255) NOT NULL,
  `person_id` int(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(255) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `class_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `timezones`
--

CREATE TABLE `timezones` (
  `timezone_id` int(255) NOT NULL,
  `timezone_uuid` varchar(255) NOT NULL,
  `timezone_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timezones`
--

INSERT INTO `timezones` (`timezone_id`, `timezone_uuid`, `timezone_name`) VALUES
(1, '77bbddc32-0d96-425c-8abf-60d94b663981', 'Africa/Accra'),
(2, '7c2c566ba-d627-41bf-bcac-f16a53b20fbf', 'Africa/Addis_Ababa'),
(3, '79ee9dc2e-a2d9-41ca-953e-c6e071ca3931', 'Africa/Algiers'),
(4, '79bff57af-a018-4a2a-8e6c-4f50ae9b710e', 'Africa/Asmera'),
(5, '7e60dc0b2-3612-4725-ad3c-b057d2420aa0', 'Africa/Bamako'),
(6, '7986b4ba7-e568-441b-92cf-3a94d0c76c2b', 'Africa/Bangui'),
(7, '77e887668-10df-4e4b-8b36-3e3f9fbfeb8f', 'Africa/Banjul'),
(8, '75f0f10e1-b0a8-4a1f-b5ca-f33f8df67faa', 'Africa/Bissau'),
(9, '71e60e4b5-5610-4c79-9245-b44153504737', 'Africa/Blantyre'),
(10, '7eb327cf1-b262-4d90-895d-01ff7440d096', 'Africa/Brazzaville'),
(11, '7b1c379c2-fea7-427d-b4d9-8c782248db81', 'Africa/Bujumbura'),
(12, '7a58b0be3-0894-400e-8932-e43f5c6fb5d5', 'Africa/Cairo'),
(13, '7981ea886-4d62-442e-a493-cad98cb13821', 'Africa/Casablanca'),
(14, '72e34cde4-c4fe-4aae-905e-d324e73b723b', 'Africa/Ceuta'),
(15, '72dfd1734-110d-4fc2-a7a8-346fb4d2c395', 'Africa/Conakry'),
(16, '746795ab9-a286-4b70-8530-7c6e56335311', 'Africa/Dakar'),
(17, '7571dd158-add7-4a31-9245-735c5912852d', 'Africa/Dar_es_Salaam'),
(18, '713ddbd0c-eb6e-448f-9fcf-448efb0ce447', 'Africa/Djibouti'),
(19, '76f1906d7-b566-4749-9669-18cf6a7f04cb', 'Africa/Douala'),
(20, '7f6f78b8d-834a-45d7-9830-8662b0ec147a', 'Africa/El_Aaiun'),
(21, '753f45c8f-b001-4d7e-b613-2b76ad2c9d72', 'Africa/Freetown'),
(22, '763d90239-85b7-49d7-b92b-49b2bc7febb0', 'Africa/Gaborone'),
(23, '708f2dca7-16fa-4d7b-8c58-28351903a1ae', 'Africa/Harare'),
(24, '719cdaaf4-b1a3-46e8-b6ab-2edd9b1f2ac0', 'Africa/Johannesburg'),
(25, '799639519-0726-44c8-be9f-64556b53cca2', 'Africa/Juba'),
(26, '70ead7b40-4107-4a8d-a42b-b9868af473cb', 'Africa/Kampala'),
(27, '717f47901-0d76-4a84-afd5-71f6d75323de', 'Africa/Khartoum'),
(28, '7af07848c-c193-4c51-a69e-8526831f7eec', 'Africa/Kigali'),
(29, '7cb25fd27-eedd-48d1-8f69-2ebcc7823f91', 'Africa/Kinshasa'),
(30, '7643134e3-2a51-4286-9988-93c41832008d', 'Africa/Lagos'),
(31, '797934e07-a689-4877-b0e5-ee8460b36582', 'Africa/Libreville'),
(32, '7b006614c-2d27-4fd3-beff-8ebb0f13b351', 'Africa/Lome'),
(33, '787a5c6d5-50af-412d-b746-6df0de9f1154', 'Africa/Luanda'),
(34, '7dd487f7e-046f-4a9e-8a4a-db0dbb081363', 'Africa/Lubumbashi'),
(35, '782b39460-2fe0-457f-aad5-2d38c0f0c766', 'Africa/Lusaka'),
(36, '7122a3982-b545-465d-b6db-3d8755aaf2c8', 'Africa/Malabo'),
(37, '716cc3c75-6fc5-4936-b6c5-7a2149ffb84a', 'Africa/Maputo'),
(38, '71a25d8ef-6a8b-41aa-9d5c-99af114526af', 'Africa/Maseru'),
(39, '75d98aa13-0aa2-4c7c-9e65-fa9d57fcd329', 'Africa/Mbabane'),
(40, '731b19613-92e6-4c5d-bc19-d2bf2f87e00c', 'Africa/Mogadishu'),
(41, '7cb2e4432-604c-41a6-8a31-d45739102786', 'Africa/Monrovia'),
(42, '79a4e5d20-6fbc-4c66-8420-b3ed5b788d88', 'Africa/Nairobi'),
(43, '7d50da9ce-13cf-4f7f-b4e7-fb6110f69635', 'Africa/Ndjamena'),
(44, '7961b31ad-4357-4bd6-a995-d3579fd161d8', 'Africa/Niamey'),
(45, '75ea80d56-4d16-45ad-b93c-3b9b96f516f4', 'Africa/Nouakchott'),
(46, '79339dfe8-abb8-407d-ae95-a3e79e7fad4f', 'Africa/Ouagadougou'),
(47, '7d160f5d4-3593-4671-a038-a6e501bf1793', 'Africa/Porto-Novo'),
(48, '7fae5346b-bd26-40c8-9b76-1bc74bc50a54', 'Africa/Sao_Tome'),
(49, '798208169-ccb2-43b1-9251-ad40362145ae', 'Africa/Tripoli'),
(50, '702c39376-af4d-4d77-9e96-b4b48cb9d804', 'Africa/Tunis'),
(51, '76e7a6e72-36fa-4f10-82b0-f47960ee0aae', 'Africa/Windhoek'),
(52, '7a6faceb3-338c-46ff-9834-3eeb51bdfe98', 'America/Anchorage'),
(53, '79d592293-17f5-469b-a174-d3ff8910f4e5', 'America/Anguilla'),
(54, '7e5529353-cf63-4245-8f74-880c775c55c5', 'America/Antigua'),
(55, '7fcb60da3-08f4-4c2c-aaba-d1ade857b6fa', 'America/Araguaina'),
(56, '7a5699ad2-7e6c-4190-8f1e-4e15ea34cdbc', 'America/Argentina/La_Rioja'),
(57, '7236f7ad5-4eb5-4f09-9027-91ed8b65275b', 'America/Argentina/Rio_Gallegos'),
(58, '70285aa6d-4dfa-4aec-875e-3c200ce83b54', 'America/Argentina/Salta'),
(59, '7c53eb262-e198-45fa-89ef-f0296ffc65ce', 'America/Argentina/San_Juan'),
(60, '7f752ff3d-3408-4451-bee4-9354c260de21', 'America/Argentina/San_Luis'),
(61, '7276cfc32-8948-4927-a4ab-aa9ebd5d38ab', 'America/Argentina/Tucuman'),
(62, '7fb0923b6-1f2b-4cb7-b519-c0a564c77501', 'America/Argentina/Ushuaia'),
(63, '73a54d0ac-81bb-4183-8218-0b56467b9a1b', 'America/Aruba'),
(64, '78c04dce2-1877-40da-bbf0-7429c6de1726', 'America/Asuncion'),
(65, '7ab523695-6dad-4e8c-92ce-b149043735a5', 'America/Bahia'),
(66, '77d218acf-92a8-46f1-b8da-0efc87dcdf51', 'America/Bahia_Banderas'),
(67, '7a3d18d17-344e-4f9d-80dc-6043c4a7f698', 'America/Barbados'),
(68, '7b9f194c8-3029-40cc-bbbf-8cec936c52fa', 'America/Belem'),
(69, '71c8dcfe3-4add-4205-a27f-7aeb1043e461', 'America/Belize'),
(70, '768c375a1-aff6-4273-88f3-c4c031530100', 'America/Blanc-Sablon'),
(71, '7b8dd5372-bcd1-4e17-abcd-5f4d95307664', 'America/Boa_Vista'),
(72, '780fe30fc-3105-44df-8905-8c715c275708', 'America/Bogota'),
(73, '7190d4616-ead4-4937-bcdd-2fcbb8741e4e', 'America/Boise'),
(74, '7fb4e5881-38cb-4aa4-84cf-319e8c84cb93', 'America/Buenos_Aires'),
(75, '73bc5a5ed-5997-4644-a29b-b81789c8ad05', 'America/Cambridge_Bay'),
(76, '77992e1ce-499d-4a5a-9342-480027c84349', 'America/Campo_Grande'),
(77, '7bb818f0a-93a8-4ad0-b1e0-509dad465bb9', 'America/Cancun'),
(78, '7850b44d8-d31b-4db9-8edd-a04529676711', 'America/Caracas'),
(79, '7df984ed8-5625-40e2-8de9-de109cc9f437', 'America/Catamarca'),
(80, '7f7d2f31b-acce-4747-8a44-a0290397afa4', 'America/Cayenne'),
(81, '7dc929247-04e3-4421-9e6d-d2d4cc2e5819', 'America/Cayman'),
(82, '730a855d3-0287-407c-a6c5-d7ab60c3d90c', 'America/Chicago'),
(83, '75618d3d8-2403-4433-9dcb-5bf9558a9b1c', 'America/Chihuahua'),
(84, '799d9fbb0-e808-45d6-969b-b564a90ecc47', 'America/Coral_Harbour'),
(85, '782c1956e-4af1-4b9d-b51d-0d29f951565e', 'America/Cordoba'),
(86, '7a1220fd9-263d-42b2-8873-609fa903ee22', 'America/Costa_Rica'),
(87, '798894c4c-0ed1-47d0-8de6-071426688de6', 'America/Creston'),
(88, '7014ee521-4031-4039-9372-edfdb9b45b81', 'America/Cuiaba'),
(89, '78c0c63f2-d3d1-4bc8-a585-517e17cf1f8f', 'America/Curacao'),
(90, '7eb15fa24-e1ed-4994-8005-33253b5cd59e', 'America/Danmarkshavn'),
(91, '771f6bfc4-8b4b-4538-88bb-e15ca379b963', 'America/Dawson'),
(92, '731e34233-d4cb-4e19-ab87-ad992b93c1ba', 'America/Dawson_Creek'),
(93, '77c162a4d-f92c-4bd7-9c71-67fef2f0a529', 'America/Denver'),
(94, '7fe9e8090-6718-4689-8250-75b7d2f1c29d', 'America/Detroit'),
(95, '739aa22aa-f9dc-4c58-bc33-33aecbbad0e9', 'America/Dominica'),
(96, '779db6f50-f730-4cb8-83ff-872fb71772ac', 'America/Edmonton'),
(97, '77249bd12-d8bc-412c-8f10-bff1a594e49b', 'America/Eirunepe'),
(98, '7a0ed1701-84a1-457b-ad1e-198200f781b2', 'America/El_Salvador'),
(99, '7028903ee-f3c6-4d20-8a66-aa708f9cbf38', 'America/Fortaleza'),
(100, '7c6e52d1c-efbd-491e-b607-f36440937d09', 'America/Glace_Bay'),
(101, '71aebc473-d96d-4f77-98eb-6169b706ea0a', 'America/Godthab'),
(102, '7f43aa5cc-d88d-4e2e-a429-63888152a763', 'America/Goose_Bay'),
(103, '780693455-0be4-4594-996c-c1e18cc59f2d', 'America/Grand_Turk'),
(104, '74ffa62a8-51da-4767-962b-66cc446a378d', 'America/Grenada'),
(105, '7a36be129-98cc-4992-a60b-393689be7e93', 'America/Guadeloupe'),
(106, '78d809916-7075-4fc5-8aa5-74a95f8ad095', 'America/Guatemala'),
(107, '750e2607c-dbe4-40ae-a4a9-2d989a5e5c28', 'America/Guayaquil'),
(108, '7ff6bde22-6ab0-484f-a7e6-0c50b477358e', 'America/Guyana'),
(109, '74d30cfa7-da75-4251-a194-fedc22c46e50', 'America/Halifax'),
(110, '79e381784-2d9b-4e48-bcd8-8742c0475ebe', 'America/Havana'),
(111, '7c23da358-cd47-421b-a258-009e4b02063e', 'America/Hermosillo'),
(112, '712e4d6f4-de4f-4a46-9bfd-f518d5a3f3ac', 'America/Indiana/Knox'),
(113, '7ae6d20bd-88d2-4e5d-9f02-ff07faa579c9', 'America/Indiana/Marengo'),
(114, '74a46da81-c8b5-4d7a-8035-2fc63d6de3ae', 'America/Indiana/Petersburg'),
(115, '7790737f5-9e06-4890-9766-6049e8f9fdb4', 'America/Indiana/Tell_City'),
(116, '733081887-0b94-4640-a6ba-637381c697e5', 'America/Indiana/Vevay'),
(117, '7282871f4-d0c9-4cb4-98d3-270affa56090', 'America/Indiana/Vincennes'),
(118, '7e07ca2f1-0648-49f1-845f-75c7af7fae51', 'America/Indiana/Winamac'),
(119, '756d4f9cb-32ba-4dab-b305-aa0779626def', 'America/Indianapolis'),
(120, '76e5e24b4-e299-4910-b4ca-89fb7589ff96', 'America/Inuvik'),
(121, '774ddc1d3-17e2-42a7-b345-6a1226019caf', 'America/Iqaluit'),
(122, '792fc0058-e09f-495f-bac5-a4277da64ba0', 'America/Jamaica'),
(123, '7b4c7e67b-ec94-4ac5-9e84-11a088447d29', 'America/Jujuy'),
(124, '711b0c992-df90-4c74-bb34-9f7020d53038', 'America/Juneau'),
(125, '7131873b9-a645-46e0-ab4d-47f992214eed', 'America/Kentucky/Monticello'),
(126, '7c208a243-fce7-4440-b27a-da426bf4854c', 'America/Kralendijk'),
(127, '77f74580b-7922-46d7-abcc-7191a3ff5bd1', 'America/La_Paz'),
(128, '7ddf5fad6-3cc8-4259-bbbf-c1aff0dd8ed6', 'America/Lima'),
(129, '7244fa890-f6b7-4602-a6ef-b188e1c0afd7', 'America/Los_Angeles'),
(130, '78a568504-94fd-4357-b598-30662af9e224', 'America/Louisville'),
(131, '712da2bbe-3282-473d-be56-3aeb22b0c505', 'America/Lower_Princes'),
(132, '7db2c5090-1c9c-443c-bfed-9cc642cc605b', 'America/Maceio'),
(133, '7a8da3d6a-417f-41a4-ae90-c6bc6c1bf24a', 'America/Managua'),
(134, '7950012c0-3ab2-4db3-ba92-93d3d12251d4', 'America/Manaus'),
(135, '7e2f25fe6-d14d-41ab-bcc6-53fca32e81a4', 'America/Marigot'),
(136, '74173c7ff-f466-4f7c-a866-f4fe07917f8d', 'America/Martinique'),
(137, '7ea1bfdb0-2eb2-4e86-ae23-d015b2b5833e', 'America/Matamoros'),
(138, '747cd5cef-1c46-424a-aabb-7ee54bf0de0c', 'America/Mazatlan'),
(139, '7596fa2e7-d034-4459-b96c-afc0dbedae49', 'America/Mendoza'),
(140, '7d6bca4da-1946-4dcc-b97f-2138755bd1ea', 'America/Menominee'),
(141, '7149b2460-7fcf-4aa8-9e6d-08ef939de08e', 'America/Merida'),
(142, '705150bb4-9a31-4640-8117-c2888d562328', 'America/Mexico_City'),
(143, '71deeb28a-80ce-4347-a0b5-a9b3ad78a0fc', 'America/Moncton'),
(144, '788190afb-08d1-4ea3-9f3e-350ef685260b', 'America/Monterrey'),
(145, '7d78c42af-bea5-41bd-8288-ee1d3ec80162', 'America/Montevideo'),
(146, '72dfef0cf-70a5-4306-b96e-48fee7bae2b6', 'America/Montreal'),
(147, '78afe9a1f-16a9-40d8-bafa-92216625f071', 'America/Montserrat'),
(148, '7ce2674cc-e0e0-4400-804c-856e7e999956', 'America/Nassau'),
(149, '7b10e3717-8ef0-48cc-8ecd-9ed7ebe13ee5', 'America/New_York'),
(150, '7ebce1daa-0481-4e47-8df4-12b52ea0ba9e', 'America/Nipigon'),
(151, '7c6e8cbb3-6a18-4d2f-b797-7b643b1e8ae8', 'America/Nome'),
(152, '70eb97e89-3619-4e4f-8cf6-7e4965c9995c', 'America/Noronha'),
(153, '728705b74-efcf-489b-8be0-b08bfc71c179', 'America/North_Dakota/Beulah'),
(154, '732ed956d-fc02-49d2-a455-960a29dbf6e3', 'America/North_Dakota/Center'),
(155, '78c0533b5-fb4d-412d-80fd-4fc56bfe74cc', 'America/North_Dakota/New_Salem'),
(156, '755ddae7c-05db-4003-97ac-cc2e57f60ba7', 'America/Ojinaga'),
(157, '75ccaf36d-ec20-43b3-80fd-b429d8620d9d', 'America/Panama'),
(158, '7a9166624-029f-4018-9980-07df3e11daf7', 'America/Pangnirtung'),
(159, '7255d4fcc-4864-4950-a6b9-5bbffd606a14', 'America/Paramaribo'),
(160, '7f3b6d5af-0ab3-431b-857a-4e21e136a030', 'America/Phoenix'),
(161, '7cd87a657-fe7d-4fe7-8fee-105f97b122b7', 'America/Port-au-Prince'),
(162, '7880a4f7f-a81b-4aae-9a45-c3989611ba35', 'America/Port_of_Spain'),
(163, '7eb0394b7-3b3f-48a4-9c8b-5ec09fe41a71', 'America/Porto_Velho'),
(164, '7f670e693-3849-47ed-9a0e-f85109837c83', 'America/Puerto_Rico'),
(165, '7c2c5c044-aabc-4408-8d39-0b9947db63c6', 'America/Rainy_River'),
(166, '74dff425d-e86c-452c-b164-1aa14ef88e20', 'America/Rankin_Inlet'),
(167, '7e4913d15-8828-4845-b8e3-4433c084fa88', 'America/Recife'),
(168, '7efc1fd78-9984-4e72-97e0-03460c6cb438', 'America/Regina'),
(169, '7332aa1e7-5e05-4ceb-942d-37199cef3dfb', 'America/Resolute'),
(170, '7a1490054-356f-4047-b575-9870fb59d1ec', 'America/Rio_Branco'),
(171, '77d45130c-ec38-4c6e-a212-374f1671a26e', 'America/Santa_Isabel'),
(172, '76bab8149-71e2-487b-bfd9-f17fd92cd3be', 'America/Santarem'),
(173, '7480faca0-fb6d-4a5f-ab11-0d011a6d3db3', 'America/Santiago'),
(174, '775b4edb2-602d-4dcd-ad2c-92669958a6c5', 'America/Santo_Domingo'),
(175, '723381626-b69f-4787-adfb-7f092b1430b9', 'America/Sao_Paulo'),
(176, '7ec3e1daf-257e-41b8-aeef-d11e26356057', 'America/Scoresbysund'),
(177, '74276149e-41b2-474e-a772-42204a515830', 'America/Sitka'),
(178, '72af36bd6-489e-47b5-b405-40605a049cd9', 'America/St_Barthelemy'),
(179, '7336ba161-a8c6-4b4d-8d0a-7371b85eee8c', 'America/St_Johns'),
(180, '73de367fe-0e67-4ddc-94c8-15532dc0c96c', 'America/St_Kitts'),
(181, '7ee5f52fd-4f6d-40ad-9634-6dd9e3e1d116', 'America/St_Lucia'),
(182, '74ce4689e-bd95-4e38-8df7-24de29ee76b8', 'America/St_Thomas'),
(183, '7ec174ba0-9367-4bc3-815e-9e213972891e', 'America/St_Vincent'),
(184, '7718f58a4-9549-49ca-b977-f99d0990ec26', 'America/Swift_Current'),
(185, '7e793f908-2316-4701-81ae-f6a0a538e16b', 'America/Tegucigalpa'),
(186, '78346f7aa-672c-416a-bcd1-d9edeee56a31', 'America/Thule'),
(187, '7af767b9c-042a-43b1-a938-f72d79bd6062', 'America/Thunder_Bay'),
(188, '7260093b3-67dc-446b-9ff1-d57d06998f91', 'America/Tijuana'),
(189, '775de4504-e33e-4da3-98b9-d604e49c36c5', 'America/Toronto'),
(190, '7ff8e4818-764d-454b-98c9-0dc48e999be3', 'America/Tortola'),
(191, '7c8adbece-819f-45c4-b314-83da99734512', 'America/Vancouver'),
(192, '7d978b484-48f4-4c3e-885d-918b60489e93', 'America/Whitehorse'),
(193, '738b921a4-c2da-4fc7-815c-b9719adb432d', 'America/Winnipeg'),
(194, '7fc6b4d4c-71ad-46b3-bede-6f8afefc55ff', 'America/Yakutat'),
(195, '7c6d488c1-c2b9-4f87-9099-86d72dd996c4', 'America/Yellowknife'),
(196, '7eaf9c37c-bcd6-4c1e-a818-330ed4da28fc', 'Antarctica/Casey'),
(197, '775139039-7a0c-46fb-9ca2-55bd6aff72dc', 'Antarctica/Davis'),
(198, '7602c4ab4-a6c0-4376-8ed9-be4d7f0b34ba', 'Antarctica/DumontDUrville'),
(199, '7a0f04407-fbd4-446f-bab8-dd0d24a98c51', 'Antarctica/Macquarie'),
(200, '7d46b4b99-2ef7-4d50-9564-2681107d1013', 'Antarctica/Mawson'),
(201, '77d84593e-e15c-435c-8f53-3875ff466370', 'Antarctica/McMurdo'),
(202, '7ff561277-9022-4199-9805-dd6c63f08098', 'Antarctica/Palmer'),
(203, '706292734-1cb3-4b1f-9f5d-1c5e5f955a0a', 'Antarctica/Rothera'),
(204, '7bcb7bec3-bd07-42e8-8450-45f7895a0974', 'Antarctica/Syowa'),
(205, '72412be1a-1053-4c8f-824d-e8b28d4f3246', 'Antarctica/Vostok'),
(206, '75226caa1-2ff4-4dce-a759-f2c6c4d19a95', 'Arctic/Longyearbyen'),
(207, '7e29c3144-51b3-4f71-b890-17a96757301f', 'Asia/Aden'),
(208, '7da9688ae-2c24-4fee-b800-34176945304f', 'Asia/Almaty'),
(209, '7b0f44996-907d-4d17-8900-2553fb9c9ce9', 'Asia/Amman'),
(210, '7b116f16e-e1fd-4b16-a5bd-127f5417b25a', 'Asia/Anadyr'),
(211, '7e5619f11-3544-463c-b17e-9953631b8627', 'Asia/Aqtau'),
(212, '7fb75d2d6-e13f-4ff9-891e-5ea991c37e52', 'Asia/Aqtobe'),
(213, '796b1110e-2345-401b-9531-df99abeafa2b', 'Asia/Ashgabat'),
(214, '7e3114227-89e3-4596-b47f-6cfa57c67174', 'Asia/Baghdad'),
(215, '7fb21eab8-dc79-43d1-adc8-84d00e5575f1', 'Asia/Bahrain'),
(216, '7fd847dd7-8463-4433-acdf-39f3211fa5ca', 'Asia/Baku'),
(217, '7910b9e5f-3672-4b21-8547-34d50492d2c7', 'Asia/Bangkok'),
(218, '7c9da9ca0-14ca-4c70-a683-78fb093b9edf', 'Asia/Beirut'),
(219, '7bdeaff1f-1e20-4d38-bd45-001ed1b8e17a', 'Asia/Bishkek'),
(220, '76f4b9987-b9bb-4350-9fb8-2bf2dd00dbc0', 'Asia/Brunei'),
(221, '77baa7873-0e2b-4790-b547-a10af4df7609', 'Asia/Calcutta'),
(222, '7184e0d07-3e1d-4335-bb24-2717b887e846', 'Asia/Chita'),
(223, '722603adb-1575-4159-9a67-22c1dbb29d69', 'Asia/Choibalsan'),
(224, '734f6404f-ea8f-4abb-a01c-93a503bf7fa3', 'Asia/Colombo'),
(225, '708054fa5-5b9b-4be6-b9e2-22f4b00c1324', 'Asia/Damascus'),
(226, '7bfd38ef1-b49d-4b88-8cec-272c1f0f0ae0', 'Asia/Dhaka'),
(227, '76dda6e14-d5b6-4018-bd04-72b35e87f6dc', 'Asia/Dili'),
(228, '7fd6e3f49-1711-4e0b-a2dd-ecb8ff53174d', 'Asia/Dubai'),
(229, '7f35a650b-be12-4e7c-ac92-3f74e46aa84c', 'Asia/Dushanbe'),
(230, '7a8abee68-7d0b-4680-a741-448cdae0a4a7', 'Asia/Hong_Kong'),
(231, '70a056dc5-efe2-41cd-a7d2-63464b7debeb', 'Asia/Hovd'),
(232, '77bf8b962-247a-4e89-9a4d-bcc7979f0a3c', 'Asia/Irkutsk'),
(233, '76d4ba7d6-677d-4481-af10-46045d5da345', 'Asia/Jakarta'),
(234, '7fb6d8a79-26a5-494f-bf9f-9f968b503984', 'Asia/Jayapura'),
(235, '7c19dc27f-62b6-4b98-b202-8617f2bdcffd', 'Asia/Jerusalem'),
(236, '76b5b56b3-e733-4f17-9387-33b00121c1ca', 'Asia/Kabul'),
(237, '767d46ec3-2b75-40e5-ac90-78ee28a2c536', 'Asia/Kamchatka'),
(238, '71e985e77-14f4-490f-a06c-27e0800bbee2', 'Asia/Karachi'),
(239, '7a174ee2b-db75-49c4-8f7d-45a131d4571d', 'Asia/Kathmandu'),
(240, '7633c7af2-d735-424e-b56c-a4ba83a83e89', 'Asia/Khandyga'),
(241, '7dcd7a820-03f7-48e8-b131-a7c2375b25ba', 'Asia/Kolkata'),
(242, '70c3f2345-3915-4e22-9831-0965e6478a95', 'Asia/Krasnoyarsk'),
(243, '7275dfafb-bc23-4955-b37f-b2a217a58921', 'Asia/Kuala_Lumpur'),
(244, '7155d9901-9dc5-41ec-bb7a-e106edb3ebbb', 'Asia/Kuching'),
(245, '75f25be0f-974e-44ed-869f-a1821f71c344', 'Asia/Kuwait'),
(246, '7db03e1bc-118b-4d96-b7ef-e052d34c8062', 'Asia/Macau'),
(247, '7c296d361-3cd7-4d2f-ac43-b0ce0bbd6e5c', 'Asia/Magadan'),
(248, '73f1a3d3a-4046-4f3c-a44d-1c495c004254', 'Asia/Makassar'),
(249, '7f265b318-33c2-438a-9d55-9284be116cfc', 'Asia/Manila'),
(250, '7b6c0fe41-60e0-40db-80e3-6846dea50a05', 'Asia/Muscat'),
(251, '7662a1d77-9a21-436e-85d8-f24e43785f3a', 'Asia/Nicosia'),
(252, '7d735a3c8-946e-4d40-8d84-598e5a23bdec', 'Asia/Novokuznetsk'),
(253, '75f5bb092-781d-41ba-bacf-b3308c5b38dd', 'Asia/Novosibirsk'),
(254, '7fec374eb-e6a0-42a1-bd3b-c0b5e5479cde', 'Asia/Omsk'),
(255, '796ba4421-79d3-4b4f-a9c9-708866e5dc1e', 'Asia/Oral'),
(256, '7e6504c5a-bc1b-457b-97ed-d605c45e6498', 'Asia/Phnom_Penh'),
(257, '775a20300-b942-4d8f-8a2b-835b49dffe8a', 'Asia/Pontianak'),
(258, '7a1edfb69-51af-4098-91c5-5c56e9b385b5', 'Asia/Pyongyang'),
(259, '774b76fa0-3a68-48bb-983f-9e733a6f21d5', 'Asia/Qatar'),
(260, '7369229c6-accb-4d8a-8bb9-f67f50c8d98c', 'Asia/Qyzylorda'),
(261, '73cddefef-066b-416d-b34d-66ee7e1834a9', 'Asia/Rangoon'),
(262, '72a673a7f-e5e6-4d00-aac0-88bf89ce6faf', 'Asia/Riyadh'),
(263, '780656bac-8950-4f9e-b6ee-f4a7c0bf6997', 'Asia/Saigon'),
(264, '7344cf487-27d8-42ea-88fd-388ddedb9358', 'Asia/Sakhalin'),
(265, '770fe71cb-f312-4575-9e7c-ca3234256f11', 'Asia/Samarkand'),
(266, '7e274b748-7e0e-4376-bce9-f8830de1eca0', 'Asia/Seoul'),
(267, '7b252bc4b-f811-42c1-8448-ca3ae09fe537', 'Asia/Shanghai'),
(268, '7b2500198-fc61-409c-81fe-f07d966d1e70', 'Asia/Singapore'),
(269, '7eb66d190-7264-4e40-9fc4-8dda50d2df01', 'Asia/Srednekolymsk'),
(270, '7c49e73fd-2f92-4e84-85ba-8e09f6b3310a', 'Asia/Taipei'),
(271, '73c40d57d-d7ba-4b6d-a6c6-fb4b8f9b5887', 'Asia/Tashkent'),
(272, '78b9daf16-9d93-4975-9328-0ec176d68aa0', 'Asia/Tbilisi'),
(273, '775ffbbcd-8131-4aa2-8b35-4f50c99e55ae', 'Asia/Tehran'),
(274, '73639f7c4-e84c-4d5e-96fc-3708a10e1a1a', 'Asia/Thimphu'),
(275, '7c032d1fb-c5bc-4c93-b8bb-8c024cf1d8e5', 'Asia/Tokyo'),
(276, '797c5d52a-3bc5-4ef6-8b27-d49468350cb4', 'Asia/Ulaanbaatar'),
(277, '795ccca82-7097-4f41-99d3-d16b37ca21c9', 'Asia/Urumqi'),
(278, '7a46be4eb-4b81-4104-a384-d05a45bd86a7', 'Asia/Ust-Nera'),
(279, '7659aca9c-ad0a-48e1-a04c-9f4a1071a701', 'Asia/Vientiane'),
(280, '7ea79ad8e-a4ce-4a5b-9bf9-5fd513002209', 'Asia/Vladivostok'),
(281, '716e4e09b-9d0b-4d53-89c7-e4572e0d492a', 'Asia/Yakutsk'),
(282, '72bf1d1e4-d305-4469-8ca2-07c74f65fd8e', 'Asia/Yekaterinburg'),
(283, '71e9a8c6c-0338-46e7-8e1a-29bc79ba707e', 'Asia/Yerevan'),
(284, '78af1a40f-5d00-4f05-840e-760e23ed1542', 'Atlantic/Azores'),
(285, '7706935e1-1780-48ec-ab17-3967d052953e', 'Atlantic/Bermuda'),
(286, '72c61fb2a-7345-4250-a161-932547504c2d', 'Atlantic/Canary'),
(287, '7f597f941-5aa6-4664-a9c4-310f7e402f16', 'Atlantic/Cape_Verde'),
(288, '7626a4cf8-ee63-4882-8989-0acddb426fc4', 'Atlantic/Faeroe'),
(289, '790cb668b-288e-4e70-9876-900766e3d24b', 'Atlantic/Madeira'),
(290, '7daf4247f-1af7-414e-b45e-8e59f8e3a55d', 'Atlantic/Reykjavik'),
(291, '7a424dc07-a027-4046-9837-cec170ac251d', 'Atlantic/South_Georgia'),
(292, '7f7a3082f-e3c9-4dac-baf0-39bc64bf5dff', 'Atlantic/St_Helena'),
(293, '7f47875b8-5337-4fce-821d-c8563e3a11fc', 'Atlantic/Stanley'),
(294, '721331763-13de-4a6f-89f0-dad57509b230', 'Australia/Adelaide'),
(295, '75c8f6e7d-5959-4434-991c-63760d561426', 'Australia/Brisbane'),
(296, '7c0011402-c1a7-400a-b4f5-727279b00161', 'Australia/Broken_Hill'),
(297, '78297b31e-597f-4c8a-86f7-5ab1d45ecf5d', 'Australia/Currie'),
(298, '7f91951c0-bc49-40e9-9bdd-bf2f6077f003', 'Australia/Darwin'),
(299, '789bd9a94-2af1-4acc-b5ef-8930b8628d86', 'Australia/Hobart'),
(300, '73c78fc70-b2cd-4130-99cf-9ad749516c5b', 'Australia/Lindeman'),
(301, '7aa302010-9cc3-4b35-a98a-3cfbc173c129', 'Australia/Melbourne'),
(302, '7a34cca0a-de92-4af2-af73-de7b62ebd92a', 'Australia/Perth'),
(303, '71b3a0bd2-0b46-45b6-af8d-535ce3b27a18', 'Australia/Sydney'),
(304, '7f18c2814-00c4-45a4-ad89-2deed9ebb355', 'Europe/Amsterdam'),
(305, '7033cc2f9-92c8-43b9-891c-fafa2bb588b4', 'Europe/Andorra'),
(306, '7397ae4cc-fa12-4d16-b915-5fa2c77b481a', 'Europe/Astrakhan'),
(307, '7fcb70341-abfe-4b69-a13a-ad8ed54d28da', 'Europe/Athens'),
(308, '72286dd3e-e0e9-4833-bd06-450a5eede0ca', 'Europe/Belgrade'),
(309, '7d91ad5e1-f188-4f23-bbd5-cacec341f7d5', 'Europe/Berlin'),
(310, '7d3468f8c-ea70-41cf-bf27-260534b17a6c', 'Europe/Bratislava'),
(311, '7a68b9aeb-5a7b-4ab6-bc38-f1cbf76eee41', 'Europe/Brussels'),
(312, '79442dc18-7ea8-4491-9856-fc089ffc7b7e', 'Europe/Bucharest'),
(313, '76ecfe223-24c2-4d3a-a7ee-fd4d7211fd40', 'Europe/Budapest'),
(314, '7d7c68886-92d7-40a3-9346-e7f57eaac029', 'Europe/Busingen'),
(315, '71a5a76c3-5e27-4cd1-9d96-b4c2dbdea614', 'Europe/Chisinau'),
(316, '774b281b9-9cb2-46f4-9078-f010a7be212f', 'Europe/Copenhagen'),
(317, '7323f3ab3-7bc1-47fd-b42b-2c48f99eac1b', 'Europe/Dublin'),
(318, '758a44048-1eb4-46e7-9cd6-09997dd30c3d', 'Europe/Gibraltar'),
(319, '7b65834d4-4cd8-4d89-a07a-89a19e6a91ea', 'Europe/Guernsey'),
(320, '7facaad6e-0bdd-4eea-be04-ef3306f1c155', 'Europe/Helsinki'),
(321, '7fd5b81f8-4b8c-4dd2-97ad-ac9623e9288b', 'Europe/Isle_of_Man'),
(322, '74a61b068-f60f-49c3-a789-4b77c58b6742', 'Europe/Istanbul'),
(323, '76146a657-d1da-4d1a-9155-4834688f70b6', 'Europe/Jersey'),
(324, '712a70e20-d5a5-4fbf-ab93-2591012e812c', 'Europe/Kaliningrad'),
(325, '7ac6721df-5cc1-4d2d-9945-5a6fd71290b8', 'Europe/Kiev'),
(326, '7b6341b47-0725-4e17-83b5-687b8f889f63', 'Europe/Kirov'),
(327, '743f16886-6a5c-4264-9810-fffe6ce45533', 'Europe/Lisbon'),
(328, '7edfc46db-d8cd-4529-be10-a93436e6b0b2', 'Europe/Ljubljana'),
(329, '7491d30b0-9ab7-4e7e-878f-79c5d33d3a8c', 'Europe/London'),
(330, '76888ef35-ad0a-4232-bef5-98a99a844cbc', 'Europe/Luxembourg'),
(331, '788d31f3c-ef5d-4c13-b0c6-0d963e27a196', 'Europe/Madrid'),
(332, '710f9a6b7-3b74-4fad-bfd0-53442fc8fef0', 'Europe/Malta'),
(333, '70a7a085c-7169-4960-9850-40d58ea4c913', 'Europe/Mariehamn'),
(334, '7c24d760c-64d9-46e1-bd99-d61781c0b9ff', 'Europe/Minsk'),
(335, '791ad6751-706c-4f74-8a0f-3013eb74f5c6', 'Europe/Monaco'),
(336, '7c5fcd056-5e80-4f45-9112-659d8826aa2e', 'Europe/Moscow'),
(337, '7bc91bfa5-0e89-4226-a040-3d158ef34e32', 'Europe/Nicosia'),
(338, '710845338-ad07-4d6c-815c-a2eb6c40795b', 'Europe/Oslo'),
(339, '78d73f570-872c-40e1-b0f9-f173844f348d', 'Europe/Paris'),
(340, '76c70a4c7-6966-48d0-944f-00bcaf2fab48', 'Europe/Podgorica'),
(341, '79a07bd69-c246-47cb-8bac-fd20eef2139a', 'Europe/Prague'),
(342, '7a303967f-b15e-4957-a28b-c7485c23958a', 'Europe/Riga'),
(343, '709a250af-a82d-4e64-9fc4-4bde96034f2a', 'Europe/Rome'),
(344, '78581e3f5-14e9-480d-8432-f8b1e6cb237a', 'Europe/Samara'),
(345, '7591bed8f-8c43-40ff-9db8-289171ca3ea7', 'Europe/San_Marino'),
(346, '75be7ed84-ec56-4bde-80a9-441032863287', 'Europe/Sarajevo'),
(347, '7f7460903-dfad-4572-9ece-8d7eb789ef9d', 'Europe/Simferopol'),
(348, '7cef057f2-136c-414e-91f0-ecf5b2d5e7f7', 'Europe/Skopje'),
(349, '714380eb6-e474-4699-8187-d9eeab7b3255', 'Europe/Sofia'),
(350, '7ba1e6aef-dcf3-40f9-9419-662373e7b4f3', 'Europe/Stockholm'),
(351, '70879581d-fbe2-46b3-ba78-bf60fdfc0e91', 'Europe/Tallinn'),
(352, '7e8438098-3591-43c9-8e66-ec7125ceb739', 'Europe/Tirane'),
(353, '7dd7638ee-7085-4bd4-b511-9f3ceba780eb', 'Europe/Ulyanovsk'),
(354, '7ddddb702-9d33-4a81-acd9-6213fc7ca3b6', 'Europe/Uzhgorod'),
(355, '7534b73d3-ca5d-4b6f-8ac6-6018a599dd1e', 'Europe/Vaduz'),
(356, '76c3674c1-d732-4bfc-b350-1ef71524cd31', 'Europe/Vatican'),
(357, '7ab4a01c1-fb04-4d24-91a7-5bb92891b413', 'Europe/Vienna'),
(358, '7d86d2c37-6385-4cf3-b8e8-04b523742a9d', 'Europe/Vilnius'),
(359, '7b9f5bd03-d9b8-41fc-b151-2751ebea66a6', 'Europe/Volgograd'),
(360, '731dfe351-621c-481f-8491-843c1fbb546a', 'Europe/Warsaw'),
(361, '7e6a4af15-06ec-4d6f-b2b9-30d7175a5a80', 'Europe/Zagreb'),
(362, '7f2b20ef2-06c5-4cc4-bc91-0ca2739b3f57', 'Europe/Zaporozhye'),
(363, '7892a3f1b-6bc8-49aa-b6e2-69090cc63a06', 'Europe/Zurich'),
(364, '7f8149b1a-cf52-4601-813d-00ca943be934', 'Indian/Antananarivo'),
(365, '7e4321c06-3d9d-4b72-b709-3c15a840e5f9', 'Indian/Chagos'),
(366, '7df2e06c6-4049-4d76-a0d2-0ea62fed4b18', 'Indian/Christmas'),
(367, '7cb7e37c3-1265-4529-a3f0-25857a3aa3b1', 'Indian/Cocos'),
(368, '701225159-8995-4c4d-97e4-46e9878e0bf6', 'Indian/Comoro'),
(369, '7bf7a6601-8770-474f-8c8a-de1384964986', 'Indian/Kerguelen'),
(370, '79770ba51-a6a8-4db4-91d4-dc4522e842c2', 'Indian/Mahe'),
(371, '71b03e4e0-b5c5-4eda-801a-6f428b990b68', 'Indian/Maldives'),
(372, '7fa7efef0-08c5-4fc5-9691-66d749ad7355', 'Indian/Mauritius'),
(373, '73465e2ec-688f-4d3d-9ebc-197c866f0aa2', 'Indian/Mayotte'),
(374, '724fba4b3-3155-4a12-a954-a285bf112b39', 'Indian/Reunion'),
(375, '7b4484f42-1aa6-42df-9f12-db4e898ebf2a', 'MST7MDT'),
(376, '73ba569fd-210f-4b2f-adb6-ba3fd5bd9c58', 'PST8PDT'),
(377, '765be408f-f1b1-440b-8e2c-0c7f5ac617ab', 'Pacific/Apia'),
(378, '796e655db-c495-47af-bd78-5df85e078e28', 'Pacific/Auckland'),
(379, '777edd15e-eeb3-4813-bdbc-4a04ca0a56de', 'Pacific/Efate'),
(380, '7a6f3ea7d-eef2-43c5-b39d-833f50d0a613', 'Pacific/Enderbury'),
(381, '71fa5c829-8560-4ca7-aa3c-2ec94051ac65', 'Pacific/Fakaofo'),
(382, '794f1e35f-9543-423d-9c4f-fa36a3069dbb', 'Pacific/Fiji'),
(383, '7d4449835-0061-4a0b-a1b9-20402d09f7c3', 'Pacific/Funafuti'),
(384, '7df27f965-c94a-4ab8-a13e-8eadf1d846e4', 'Pacific/Galapagos'),
(385, '79bee57a3-22f2-40ea-b780-96b713dd96bf', 'Pacific/Guadalcanal'),
(386, '7be5d51f4-ed34-4503-8749-7905af700f05', 'Pacific/Guam'),
(387, '7d998f827-9121-4b62-9ebc-e604a24ca536', 'Pacific/Honolulu'),
(388, '73c1fd2e1-1960-40a4-b2e6-49ba763ddb36', 'Pacific/Johnston'),
(389, '710c9a424-1483-46f9-a184-ad328de21d19', 'Pacific/Kosrae'),
(390, '724bf85f0-2c50-428b-bb97-8cf228b23e37', 'Pacific/Kwajalein'),
(391, '726c8e0de-7e9e-4b28-b9bd-b078bdb7a652', 'Pacific/Majuro'),
(392, '7bf3579ae-42b1-47a7-bbb3-575003793d3c', 'Pacific/Midway'),
(393, '7225ae516-ddc3-4a9c-b25e-b6db37e881af', 'Pacific/Nauru'),
(394, '758e3acef-a0c0-488c-b3f6-f1a9da5f1312', 'Pacific/Niue'),
(395, '7bf414544-bd2a-4d4b-8fd1-c10a2d0f06eb', 'Pacific/Noumea'),
(396, '7b77713d9-a2b5-4065-81ca-a9838a19589f', 'Pacific/Pago_Pago'),
(397, '71b027a98-684a-4aab-9a80-e7fcb2259b45', 'Pacific/Palau'),
(398, '74307b80b-ee5f-4691-a4b1-d5d3eb420e14', 'Pacific/Ponape'),
(399, '71230f439-0b8b-4acd-a015-f834ba8813a8', 'Pacific/Port_Moresby'),
(400, '70d7ee55a-72af-416e-acb2-cfbcb1a4bae1', 'Pacific/Rarotonga'),
(401, '7b8b52d71-cf5b-44d3-906e-7634bf6494e1', 'Pacific/Saipan'),
(402, '7546ca407-846a-411c-9817-1e93cb58ce8d', 'Pacific/Tahiti'),
(403, '747a17512-7005-4b16-bbd6-f081bbe43314', 'Pacific/Tarawa'),
(404, '7a286a3b3-0247-4fef-a428-b37366fcae70', 'Pacific/Tongatapu'),
(405, '7555deb2b-afff-42c3-a43f-53731a1ccad4', 'Pacific/Truk'),
(406, '77e1bcd6c-c2ba-4ebe-9125-8fb4426e1eb2', 'Pacific/Wake'),
(407, '779ffb982-7b36-4505-9ded-a21aafb001fd', 'Pacific/Wallis');

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
-- Indexes for table `course_files`
--
ALTER TABLE `course_files`
  ADD PRIMARY KEY (`course_file_id`);

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
-- Indexes for table `email_log`
--
ALTER TABLE `email_log`
  ADD PRIMARY KEY (`email_id`),
  ADD KEY `fk_email_log_person` (`person_id`);

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
  ADD UNIQUE KEY `unique_persons_email` (`email`),
  ADD UNIQUE KEY `person_uuid_unique` (`person_uuid`),

--
-- Indexes for table `person_roles`
--
ALTER TABLE `person_roles`
  ADD UNIQUE KEY `person_role_school_id` (`person_id`,`role_id`,`school_id`),
  ADD KEY `fk_person_role_role` (`role_id`),
  ADD KEY `fk_person_role_school` (`school_id`);

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
-- Indexes for table `school_persons`
--
ALTER TABLE `school_persons`
  ADD UNIQUE KEY `schoolPersonId` (`school_id`,`person_id`),
  ADD KEY `fk_school_persons_person_id` (`person_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `timezones`
--
ALTER TABLE `timezones`
  ADD PRIMARY KEY (`timezone_id`),
  ADD UNIQUE KEY `timezone_name_unique` (`timezone_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `course_files`
--
ALTER TABLE `course_files`
  MODIFY `course_file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `email_log`
--
ALTER TABLE `email_log`
  MODIFY `email_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `language_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_tokens`
--
ALTER TABLE `login_tokens`
  MODIFY `login_token_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `person_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `register_tokens`
--
ALTER TABLE `register_tokens`
  MODIFY `register_link_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `school_classes`
--
ALTER TABLE `school_classes`
  MODIFY `class_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `school_join_codes`
--
ALTER TABLE `school_join_codes`
  MODIFY `school_join_code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `timezones`
--
ALTER TABLE `timezones`
  MODIFY `timezone_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=408;

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
-- Constraints for table `email_log`
--
ALTER TABLE `email_log`
  ADD CONSTRAINT `fk_email_log_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints for table `login_tokens`
--
ALTER TABLE `login_tokens`
  ADD CONSTRAINT `fk_login_token_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

--
-- Constraints for table `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `fk_person_class` FOREIGN KEY (`class_ide`) REFERENCES `school_classes` (`class_id`);

--
-- Constraints for table `person_roles`
--
ALTER TABLE `person_roles`
  ADD CONSTRAINT `fk_person_role_person` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`),
  ADD CONSTRAINT `fk_person_role_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `fk_person_role_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

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

--
-- Constraints for table `school_persons`
--
ALTER TABLE `school_persons`
  ADD CONSTRAINT `fk_school_persons_person_id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`),
  ADD CONSTRAINT `fk_school_persons_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
