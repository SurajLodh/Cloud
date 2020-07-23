DROP DATABASE IF EXISTS dbMoneytransfer;
CREATE DATABASE IF NOT EXISTS dbMoneytransfer;

USE dbMoneytransfer;

SET GLOBAL group_concat_max_len = 1000000;

/*(account type for each of the accounts in chart of accounts)*/
CREATE TABLE tMoneytransfer (
_id INT NOT NULL AUTO_INCREMENT,
from_account VARCHAR(255),
to_account VARCHAR(255),	
amount VARCHAR(255),
createdate timestamp default now(),
lastmodifieddate timestamp default now(),
createdby VARCHAR(255) default 'SYS',
lastmodifiedby VARCHAR(255) default 'SYS',
PRIMARY KEY (_id)
);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\tMoneytransfer.csv'  
INTO TABLE tMoneytransfer    
FIELDS TERMINATED BY ','  
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
(	
from_account ,	
to_account
);


