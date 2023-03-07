package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class TempUser{
    private String username;
    private String passwordString;
    private String userType;
    private ArrayList<Object> assignedForms;
    private ArrayList<Object> createdForm;

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
        this.createdForm = null;
    }

    public TempUser(String username,String passwordString,String userType,ArrayList<Object> assignedForms)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.assignedForms = assignedForms;
        this.createdForm = null;
    }

    public TempUser(String username,String passwordString,String userType,ArrayList<Object> assignedForms,ArrayList<Object> createdForm)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.assignedForms = assignedForms;
        this.createdForm = createdForm;
    }

    public ArrayList<Object> getCreatedForm() {
        return createdForm;
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