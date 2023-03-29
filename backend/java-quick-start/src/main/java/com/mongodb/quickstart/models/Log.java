package com.mongodb.quickstart.models;

public class Log {
    private String userID;
    private String action;
    private String objectID;
    private String database;

    public Log(String userID,String action,String objectID,String database)
    {
        this.userID = userID;
        this.action = action;
        this.objectID = objectID;
        this.database = database;
    }

    public String getUserID() {
        return userID;
    }
    public String getAction() {
        return action;
    }
    public String getObjectID() {
        return objectID;
    }
    public String getDatabase() {
        return database;
    }

    
}
