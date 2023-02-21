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
import spark.Request;
import spark.Response;
import static spark.Spark.*;

import java.io.Console;

public class MyFormAPI {

    public static void main(String[] args) {
        // Create a MongoDB client
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017/");

        // Connect to the database
        MongoDatabase database = mongoClient.getDatabase("Forms");

        // Get the collection
        //MongoCollection<Document> collection = database.getCollection("elements");
        MongoCollection<JsonObject> collection = database.getCollection("elements", JsonObject.class);

        // Set up the REST API endpoint
        post("/myform", (req, res) -> {
            // Parse the JSON data from the request body
            //System.out.println(req);
            //System.out.println(req.body());
            //Document doc = Document.parse(req.body());
            
            // Insert the document into the collection
            try {
                //collection.insertOne(req.body());
                collection.insertOne(new JsonObject(req.body()));
                System.out.println("Document inserted successfully");
                return "Document inserted successfully";
            } catch (Exception e) {
                e.printStackTrace(); // print the full stack trace of the exception
                res.status(500);
                return "Error inserting document";
            }
        });
        //mongoClient.close();
    }
}
