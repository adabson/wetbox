CREATE TABLE `uptime` (
  `date` datetime NOT NULL DEFAULT NOW(),
  `isup` int(1) DEFAULT NULL,
  PRIMARY KEY (`date`),
  UNIQUE KEY `date_UNIQUE` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;