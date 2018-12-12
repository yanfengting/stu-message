/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50634
Source Host           : localhost:3306
Source Database       : db-student-y

Target Server Type    : MYSQL
Target Server Version : 50634
File Encoding         : 65001

Date: 2018-08-24 08:47:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '班级名称',
  `departId` varchar(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='班级';

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES ('1', '402', '1', '0', '2018-08-21 09:25:21', '1', null, null);

-- ----------------------------
-- Table structure for colleges
-- ----------------------------
DROP TABLE IF EXISTS `colleges`;
CREATE TABLE `colleges` (
  `id` int(11) NOT NULL COMMENT '主键',
  `name` varchar(20) NOT NULL COMMENT '学校名称',
  `address` varchar(50) DEFAULT NULL COMMENT '学校地址',
  `principal` varchar(10) DEFAULT NULL COMMENT '校长',
  `email` varchar(20) DEFAULT NULL COMMENT '邮箱',
  `telephone` varchar(20) DEFAULT NULL COMMENT '电话',
  `website` varchar(20) DEFAULT NULL COMMENT '网站',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学校表';

-- ----------------------------
-- Records of colleges
-- ----------------------------

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `score` float(2,2) NOT NULL COMMENT '学分',
  `departId` int(11) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of courses
-- ----------------------------

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `collegeId` int(11) NOT NULL COMMENT '所属学校(外键)',
  `principal` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES ('1', '软件学院', '1', '1', '0', '2018-08-21 09:24:43', '1', null, null);

-- ----------------------------
-- Table structure for majors
-- ----------------------------
DROP TABLE IF EXISTS `majors`;
CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `departId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of majors
-- ----------------------------
INSERT INTO `majors` VALUES ('1', '计算机', '1', '0', '2018-08-21 09:26:35', '1', null, null);

-- ----------------------------
-- Table structure for scores
-- ----------------------------
DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `stuId` int(11) NOT NULL COMMENT '学生id（外键）',
  `courseId` int(11) NOT NULL COMMENT '学科id（外键）',
  `score` float(3,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scores
-- ----------------------------

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sno` varchar(20) NOT NULL COMMENT '学号',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `sex` char(10) NOT NULL COMMENT '性别',
  `birthday` datetime NOT NULL COMMENT '出生日期',
  `card` varchar(18) NOT NULL,
  `majorId` varchar(255) NOT NULL COMMENT '所学专业（外键）',
  `classId` int(11) NOT NULL,
  `departId` int(11) NOT NULL COMMENT '所属院系',
  `nativePlace` varchar(50) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `qq` varchar(15) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('1', '1514010408', '1234fefes', '女', '2018-08-02 00:00:00', 'ew', '1', '1', '1', 'fdsv', 'r3wq', 'av', 'svdf', '而我', '1', '2018-08-21 10:35:21', '1', '0000-00-00 00:00:00', '2018');
INSERT INTO `students` VALUES ('2', '1514010409', '我访问过', '女', '2018-08-30 00:00:00', '问清楚', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:46:13', '1', null, null);
INSERT INTO `students` VALUES ('3', '1514010407', '定位', '男', '2018-08-04 00:00:00', '位', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:49:24', '1', null, null);
INSERT INTO `students` VALUES ('4', '1514010406', '第三方', '男', '2018-08-04 00:00:00', '围裙', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:53:11', '1', null, null);
INSERT INTO `students` VALUES ('5', '1514010405', '3任务', '男', '2018-08-03 00:00:00', '21', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:55:43', '1', null, null);
INSERT INTO `students` VALUES ('6', '1514010404', '3任务', '男', '2018-08-03 00:00:00', '21', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:56:28', '1', null, null);
INSERT INTO `students` VALUES ('7', '1514010403', '3任务', '男', '2018-08-03 00:00:00', '21', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:57:21', '1', null, null);
INSERT INTO `students` VALUES ('8', '1514010402', '方便', '男', '2018-08-04 00:00:00', '违法', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 10:58:20', '1', null, null);
INSERT INTO `students` VALUES ('9', '1514010401', '热水', '男', '2018-08-03 00:00:00', '否', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 11:00:40', '1', null, null);
INSERT INTO `students` VALUES ('10', '1514010412', '分数', '男', '2018-08-26 00:00:00', '浮动', '1', '1', '1', '', '', '', '', '', '0', '2018-08-21 11:04:28', '1', null, null);
INSERT INTO `students` VALUES ('11', '15rewfsz f', 'rf', '男', '2018-07-31 00:00:00', 'fd', '1', '1', '1', 'egs', 'fa z', 'df s', 'f d', 'fg', '0', '2018-08-22 09:28:22', '1', null, null);
INSERT INTO `students` VALUES ('13', 'fdga', 'f', '男', '2018-08-02 00:00:00', 'f', '1', '1', '1', 'f', '', '', '', '', '0', '2018-08-23 20:28:04', '1', null, null);
INSERT INTO `students` VALUES ('14', '1514010422', '22', '男', '2018-08-03 00:00:00', '2', '1', '1', '1', '2', 'd', 'f', 'v', 'x', '0', '2018-08-23 20:35:41', '1', null, null);
INSERT INTO `students` VALUES ('15', '15140104232', '32123', '男', '2018-08-25 00:00:00', '21', '1', '1', '1', '2', '', '', '', '', '0', '2018-08-23 20:43:44', '1', null, null);

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `tno` varchar(20) NOT NULL COMMENT '学号',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `sex` char(10) NOT NULL COMMENT '性别',
  `birthday` datetime NOT NULL COMMENT '出生日期',
  `card` varchar(18) NOT NULL,
  `majorId` varchar(255) NOT NULL COMMENT '所学专业（外键）',
  `classId` int(11) NOT NULL,
  `departId` int(11) NOT NULL COMMENT '所属院系',
  `nativePlace` varchar(50) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `qq` varchar(15) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `createUserId` int(11) NOT NULL COMMENT '创建人id',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `updateUserId` int(11) DEFAULT NULL COMMENT '更新人记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='教师表';

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES ('0', '2213134', '4', '男', '2018-08-25 00:00:00', 's', '1', '1', '1', 's', '', '', '', '', '0', '2018-08-23 21:02:52', '1', null, null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginName` varchar(20) NOT NULL,
  `password` varchar(35) NOT NULL,
  `type` int(11) NOT NULL COMMENT '用户类型，（0超级管理员，1表示教师，2表示学生）',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0.正常，1.删除，2休学）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '0', '0');
INSERT INTO `users` VALUES ('2', '闫凤婷', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('3', '我访问过', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('4', '定位', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('5', '第三方', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('6', '3任务', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('7', '3任务', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('8', '3任务', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('9', '方便', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('10', '热水', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('11', '分数', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('12', 'rf', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('13', '1234', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('14', 'f', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('15', '22', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
INSERT INTO `users` VALUES ('17', '4', 'e10adc3949ba59abbe56e057f20f883e', '2', '0');
