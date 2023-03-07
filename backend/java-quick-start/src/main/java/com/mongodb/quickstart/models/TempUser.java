package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class TempUser{
    private String username;
    private String passwordString;
    private String userType;
    private ArrayList<Object> assignedForms;
    private ArrayList<Object> createdForm;
    private ArrayList<Object> vendorForm;

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
        this.vendorForm = null;
    }

    public TempUser(String username,String passwordString,String userType,ArrayList<Object> assignedForms,ArrayList<Object> createdForm,ArrayList<Object> vendorForm)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.assignedForms = assignedForms;
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
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
    public ArrayList<Object> getVendorForm() {
        return vendorForm;
    }
    
}