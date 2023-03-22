package com.mongodb.quickstart.models;

import java.util.ArrayList;

import com.mongodb.quickstart.models.AdministrativePersonnel.CreatedForm;
import com.mongodb.quickstart.models.AdministrativePersonnel.VendorForm;

public class TempUser{
    private String username;
    private String passwordString;
    private String userType;
    private String companyName;
    private ArrayList<Project> project;
    private ArrayList<CreatedForm> createdForm;
    private ArrayList<VendorForm> vendorForm;

    public TempUser()
    {
        super();
    }
    public TempUser(String username,String passwordString,String userType)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.project = null;
        this.createdForm = null;
        this.vendorForm = null;
    }

    public TempUser(String username,String passwordString,String userType,ArrayList<Project> project,ArrayList<CreatedForm> createdForm,ArrayList<VendorForm> vendorForm,String companyName)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.project = project;
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
        this.companyName = companyName;
    }

    public ArrayList<CreatedForm> getCreatedForm() {
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

    public ArrayList<Project> getProject() {
        return project;
    }
    public ArrayList<VendorForm> getVendorForm() {
        return vendorForm;
    }
    public String getCompanyName() {
        return companyName;
    }
}