package com.mongodb.quickstart;

import org.bson.json.JsonObject;
import org.bson.BsonDocument;
import org.bson.BsonValue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import java.util.ArrayList;

@SpringBootApplication
@RestController
public class ReadFormAPI {

    public static void main(String[] args) {
        SpringApplication.run(ReadFormAPI.class, args);
    }

    @PostMapping("/readform")
    public ArrayList<BsonDocument> handleReadFormRequest(@RequestBody String request) {
        // Create a MongoDB client
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017/");

        // Connect to the database
        MongoDatabase database = mongoClient.getDatabase("Forms");

        // Get the collection
        //MongoCollection<Document> collection = database.getCollection("elements");
        MongoCollection<JsonObject> collection = database.getCollection("elements", JsonObject.class);

        ArrayList<BsonDocument> jsonArray = new ArrayList<>();
        // Insert the document into the collection
        try {
            //collection.insertOne(request);
            MongoCursor<JsonObject> cursor = collection.find(new JsonObject(request)).iterator();
            try {
                while (cursor.hasNext()) {
                    BsonDocument curDocument = cursor.next().toBsonDocument();
                    String checkName = curDocument.getString("formName").getValue();
                    System.out.println(checkName);
                    jsonArray.add(curDocument);
                }
                
                return jsonArray;
            } 
            catch (Exception e)
            {
                e.printStackTrace();
            }
            finally {
                cursor.close();
            }

        } catch (Exception e) {
            e.printStackTrace(); // print the full stack trace of the exception
            return jsonArray;
        } finally {
            mongoClient.close();
        }
        return jsonArray;
    }
}
