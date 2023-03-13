package com.mongodb.quickstart.models;

import java.util.ArrayList;

import com.mongodb.quickstart.models.AdministrativePersonnel.CreatedForm;
import com.mongodb.quickstart.models.AdministrativePersonnel.VendorForm;
import com.mongodb.quickstart.models.Vendor.AssignedForm;

public class TempUser{
    private String username;
    private String passwordString;
    private String userType;
    private ArrayList<AssignedForm> assignedForms;
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
        this.assignedForms = null;
        this.createdForm = null;
        this.vendorForm = null;
    }

    public TempUser(String username,String passwordString,String userType,ArrayList<AssignedForm> assignedForms,ArrayList<CreatedForm> createdForm,ArrayList<VendorForm> vendorForm)
    {
        this.username = username;
        this.passwordString = passwordString;
        this.userType = userType;
        this.assignedForms = assignedForms;
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
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

    public ArrayList<AssignedForm> getAssignedForms() {
        return assignedForms;
    }
    public ArrayList<VendorForm> getVendorForm() {
        return vendorForm;
    }
    
}