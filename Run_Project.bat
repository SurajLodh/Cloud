cls
cd C:\Cloud\database
@echo off 

cls
echo "COMPILING jdatabase code .. "
javac -cp "json-simple-1.1.1.jar";"mysql-connector-java-8.0.18.jar"; jdatabase\*.java

echo "CREATING jdatabase jar" 

jar cvf jdatabase.jar ./jdatabase/*.class json-simple-1.1.1.jar mysql-connector-java-8.0.18.jar

echo "INSTALLING mysql-connector-java-8.0.18 jar files maven repository .. "

start "MVN INSTALLING mysql-connector-java-8.0.18 jar files maven repository" cmd.exe /k "mvn install:install-file -Dfile=C:\Cloud\database\mysql-connector-java-8.0.18.jar -DgroupId=mysql -DartifactId=mysql-connector-java -Dversion=8.0.18 -Dpackaging=jar -DgeneratePom=true"

echo "INSTALLING json-simple-1.1.1 jar files maven repository .. "
 
start "MVN INSTALLING json-simple-1.1.1 jar files maven repository .. " cmd.exe /k "mvn install:install-file -Dfile=C:\Cloud\database\json-simple-1.1.1.jar -DgroupId=com.googlecode.json-simple -DartifactId=json-simple -Dversion=1.1.1 -Dpackaging=jar -DgeneratePom=true"

echo "INSTALLING jdatabase jar files maven repository .. "

start "MVN INSTALLING jdatabase jar files maven repository .. " cmd.exe /k "mvn install:install-file -Dfile=C:\Cloud\database\jdatabase.jar -DgroupId=mysql -DartifactId=jdatabase -Dversion=1.0 -Dpackaging=jar -DgeneratePom=true"

echo "TESTING jdatabase connection .."
echo
java -cp "json-simple-1.1.1.jar";"mysql-connector-java-8.0.18.jar"; jdatabase.dbsql

echo "Starting Customer Microservice .. "
cd C:\Cloud\jerseyservice\Customer
start "Customer Microservice" cmd.exe /k "mvn clean compile exec:java"

echo "Starting Account Microservice .. "
cd C:\Cloud\jerseyservice\Account
start "Account Microservice" cmd.exe /k "mvn clean compile exec:java"

echo "Starting MoneyTransfer Microservice .. "
cd C:\Cloud\jerseyservice\MoneyTransfer
start "MoneyTransfer Microservice" cmd.exe /k "mvn clean compile exec:java"


echo "Starting Eventsync Microservice .. "
ECHO Waiting %9 seconds
cd C:\Cloud\jerseyservice\Eventsync
start "Eventsync Microservice" cmd.exe /k "mvn clean compile exec:java"
