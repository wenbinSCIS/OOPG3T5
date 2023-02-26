package com.mongodb.quickstart;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import java.nio.file.Paths;

public class MongoDBSetup {
    public static void main(String[] args) {
        // Create a MongoClientURI object
        // MongoClientURI uri = new MongoClientURI("mongodb://localhost:27017");

        // Create a MongoClient object using the MongoClientURI object
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");

        // Get a reference to the database
        MongoDatabase database = mongoClient.getDatabase("test");

        // Create a new collection
        MongoCollection<Document> collection = database.getCollection("sample_collection");

        // Create a JSON document OR
        // Document jsonDocument = new Document("field1", "value1")
        // .append("field2", "value2")
        // .append("field3", "value3");
        // (optional by kruise) OR get jsonobject from json file
        try {
            JSONObject jsonFile = parseJSONFile(
                    "src\\main\\java\\com\\mongodb\\quickstart\\sampleDatabase\\sample.json");
            Document jsonDocument = Document.parse(jsonFile.toString());

            // Insert the JSON document into the collection
            collection.insertOne(jsonDocument);

            System.out.println("JSON document inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static JSONObject parseJSONFile(String filename) throws JSONException, IOException {
        Path currentDir = Paths.get(".", filename);
        System.out.println(currentDir.toAbsolutePath());
        String content = new String(Files.readAllBytes(Paths.get(".", filename)));
        System.out.println(content);
        return new JSONObject(content);
    }
}