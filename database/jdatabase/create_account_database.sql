DROP DATABASE IF EXISTS dbAccount;
CREATE DATABASE IF NOT EXISTS dbAccount;

USE dbAccount;

SET GLOBAL group_concat_max_len = 1000000;

/*(account type for each of the accounts in chart of accounts)*/
CREATE TABLE tAccount (
_id INT NOT NULL AUTO_INCREMENT,
accountname VARCHAR(255),	
accountbalance VARCHAR(255),
createdate timestamp default now(),
lastmodifieddate timestamp default now(),
createdby VARCHAR(255) default 'SYS',
lastmodifiedby VARCHAR(255) default 'SYS',
PRIMARY KEY (_id)
);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\tAccount.csv'  
INTO TABLE tAccount    
FIELDS TERMINATED BY ','  
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
(	
accountname ,	
accountbalance
);


