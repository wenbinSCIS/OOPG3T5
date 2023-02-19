package com.mongodb.quickstart;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertManyOptions;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static java.util.Arrays.asList;

public class Create {
    /* 
    README
    run command below to compile first

    cd backend\java-quick-start
    mvn clean compile

    then run command below to create/push BSON to mongoDB

    mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Create" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false

    replace URI with what your DB connection string is. To find your connection string, open MongoDBCompass, connect to your DB, press the ... button at the top left hand corner and click "Copy connection string"

    now run the command below to read the data you just pushed to your DB. It prints the data to your console. code is in Read.java

    mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Read" -Dmongodb.uri="mongodb+srv://USERNAME:PASSWORD@cluster0-abcde.mongodb.net/test?w=majority" -Dexec.cleanupDaemonThreads=false

    replace URI with what your DB connection string is.
    */

    
    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create(System.getProperty("mongodb.uri"))) {

            MongoDatabase formsDB = mongoClient.getDatabase("Forms");
            MongoCollection<Document> forms = formsDB.getCollection("Form Elements");


            //Code to convert JSON object to document object because mongoDB only accepts BSON
            //Document document = Document.parse(myForm.toString());

            String jsonString = """
                {
                    "formName": "myform2",
                    "sections": [
                        {
                            "sectionName": "Name",
                            "sectionText": "Fill in your name",
                            "sectionFont": "12",
                            "numRows": "1",
                            "rowElements": [
                                [
                                    {
                                        "elementName": "firstName",
                                        "elementHeader": "Full Name",
                                        "placeholder": "First Name",
                                        "placeholderPosition": "hint", //either hint or under for now
                                        "elementType": "Textinput"
                                    },
                                    {
                                        "elementName": "lastName",
                                        "elementHeader": null,
                                        "placeholder": "Last Name",
                                        "placeholderPosition": "under",
                                        "elementType": "Textinput"
                                    }
                                ]
                            ]
                        }
                    ]
                }
                
                    """;


            // create ObjectMapper instance
            ObjectMapper objectMapper = new ObjectMapper().enable(JsonParser.Feature.ALLOW_COMMENTS);;

            // read JSON string and create JsonNode instance
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode;
            try {
                jsonNode = objectMapper.readTree(jsonString);
            } catch (JsonProcessingException e) {
                System.err.println("Error converting user to JSON: " + e.getMessage());
                return;
            }

            // convert JsonNode to document object
            Document document = Document.parse(jsonNode.toString());

            //Document document = new Document("FormID", 1).append("elements",myForm);
            // Insert the Document into the collection
            forms.insertOne(document);

            // Close the MongoDB connection
            mongoClient.close();
            //insertOneDocument(forms);
            //insertManyDocuments(forms);
        }
    }
    /* 
    private static void insertOneDocument(MongoCollection<Document> forms) {
        forms.insertOne(generateNewGrade(10000d, 1d));
        System.out.println("One grade inserted for studentId 10000.");
    }

    private static void insertManyDocuments(MongoCollection<Document> forms) {
        List<Document> grades = new ArrayList<>();
        for (double classId = 1d; classId <= 10d; classId++) {
            grades.add(generateNewGrade(10001d, classId));
        }

        forms.insertMany(grades, new InsertManyOptions().ordered(false));
        System.out.println("Ten grades inserted for studentId 10001.");
    }

    private static Document generateNewGrade(double studentId, double classId) {
        List<Document> scores = asList(new Document("type", "exam").append("score", rand.nextDouble() * 100),
                                       new Document("type", "quiz").append("score", rand.nextDouble() * 100),
                                       new Document("type", "homework").append("score", rand.nextDouble() * 100),
                                       new Document("type", "homework").append("score", rand.nextDouble() * 100));
        return new Document("_id", new ObjectId()).append("student_id", studentId)
                                                  .append("class_id", classId)
                                                  .append("scores", scores);
    }
    */
}