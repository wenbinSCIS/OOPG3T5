package com.mongodb.quickstart.models;

public class TempUser{
    private String username;
    private String passwordString;
    private String userType;

    public TempUser(String username,String passwordString,String userType)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordString() {
        return passwordString;
    }

    public String getUserType() {
        return userType;
    }
}