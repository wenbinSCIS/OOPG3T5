# OOPG3T5

##Installation

Download the latest [maven](https://maven.apache.org/download.cgi) (binary file)

Have a JDK installation on your system. Either set the JAVA_HOME environment variable pointing to your JDK installation or have the java executable on your PATH.

Extract distribution archive in any directory

Add the bin directory of the created directory apache-maven-3.9.1 to the PATH environment variable

```
installation path\apache-maven-3.9.1-bin\bin
```

Download [mongo shell](https://www.mongodb.com/try/download/shell) and [mongodb community version](https://www.mongodb.com/try/download/community) (install all functionalities and restart com)

Add the bin directory of the created directory apache-maven-3.9.1 to the PATH environment variable

```
installation path\MongoDB\Server\6.0\bin
```

MongoDB needs a folder to store the database. Create a C:\data\db\ directory:

```
mkdir C:\data\db
```

Download and install [Node.js](https://nodejs.org/en) (Recommended version for most users)

```
cd myapp
npm install
```

## Adding data to mongodb

Open the MongoCompass app and connect to your localhost

![image](https://user-images.githubusercontent.com/85857168/229339129-bc254c80-03ec-4724-ba9f-d844fd013dc8.png)

Create the database "OOPdb" with the collection "form_elements"

![image](https://user-images.githubusercontent.com/85857168/229346250-e7dfd55f-a64d-48f1-993e-01feda9c14d6.png)

Under the database OOPDB, create 2 more collections "formInputCollection" and "userCollection"

![image](https://user-images.githubusercontent.com/85857168/229339236-167d378f-1951-4328-baf7-00e736641eb0.png)

Under each collection import the corresponding .json data

![image](https://user-images.githubusercontent.com/85857168/229339285-3a88ebfd-148c-42f5-8d84-3b439e1d6ea4.png)



run setup.bat in the terminal
```
setup
```
