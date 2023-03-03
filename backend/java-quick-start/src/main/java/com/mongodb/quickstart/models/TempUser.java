package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class TempUser{
    private String username;
    private String passwordString;
    private String userType;
    private ArrayList<Object> assignedForms;

    public TempUser()
    {
        super();
    }
    public TempUser(String username,String passwordString,String userType)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.assignedForms = null;
    }

    public TempUser(String username,String passwordString,String userType,ArrayList<Object> assignedForms)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.assignedForms = assignedForms;
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

    public ArrayList<Object> getAssignedForms() {
        return assignedForms;
    }
    
}