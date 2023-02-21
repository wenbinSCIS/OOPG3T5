package com.mongodb.quickstart;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertManyOptions;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.bson.types.ObjectId;
import org.json.JSONObject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class MyFormAPI {

    public static void main(String[] args) {
        SpringApplication.run(MyFormAPI.class, args);
    }

    @PostMapping("/myform")
    public String handleMyFormRequest(@RequestBody String request) {
        // Create a MongoDB client
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017/");

        // Connect to the database
        MongoDatabase database = mongoClient.getDatabase("Forms");

        // Get the collection
        //MongoCollection<Document> collection = database.getCollection("elements");
        MongoCollection<JsonObject> collection = database.getCollection("elements", JsonObject.class);

        // Insert the document into the collection
        try {
            //collection.insertOne(request);
            collection.insertOne(new JsonObject(request));
            System.out.println("Document inserted successfully");
            return "Document inserted successfully";
        } catch (Exception e) {
            e.printStackTrace(); // print the full stack trace of the exception
            return "Error inserting document";
        } finally {
            mongoClient.close();
        }
    }
}
