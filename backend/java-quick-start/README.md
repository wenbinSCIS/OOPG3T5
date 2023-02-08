# Java Quick Start Project

This repository contains code samples for the Quick Start blog post series.

You can read more about the Quick Start series on the [MongoDB Developer Hub](https://developer.mongodb.com/learn/).

- [MongoDB & Java - CRUD Operations Tutorial](https://developer.mongodb.com/quickstart/java-setup-crud-operations)

# Setup for noobs like me

Download [maven](https://maven.apache.org/download.cgi) (binary file)

Download (mongo shell)[https://www.mongodb.com/try/download/shell] and (mongodb community version)[https://www.mongodb.com/try/download/community] (install all functionalities and restart com)

MongoDB needs a folder to store the database. Create a C:\data\db\ directory:

```
mkdir C:\data\db
```

Add the following env variables from the installation

```
apache-maven-3.9.0-bin\bin
MongoDB\Server\6.0\bin
```

Check proper setup with
`mvn -v`  
`mongod`
mongod will start the mongo server and should not shutdown by itself if the previous steps were done correctly. A common error would be error code 100 which means u did not create a folder to store the database.

Open MongoCompass to see your databases.

Currently ive only edited the Create file which adds the `sample.json` into the db.

Run the `Create` command below to add in a document into the db.
![image of db](<Screenshot 2023-02-08 153515.jpg> "Title")

# Command lines

Change directory to:

```
cd backend\java-quick-start
```

- Compile:

```sh
mvn clean compile
```

- Run the `HelloMongoDB` class:

```sh
mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.HelloMongoDB" -Dexec.cleanupDaemonThreads=false
```

- Run the `Connection` class:

```sh
mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Connection" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false
```

- Run the `Create` class:

```sh
mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Create" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false
```

# I HAVE NOT TESTED THESE

- Run the `Read` class:

```sh
mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Read" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false
```

- Run the `Update` class:

```sh
mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Update" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false
```

- Run the `Delete` class:

```sh
mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Delete" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false
```

# Requirements

- Ensure your Java JDK 8 to 15.
- Maven 3.6.3.
