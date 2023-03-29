package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Approver extends AdministrativePersonnel{
    public Approver()
    {
        super();
    }

    public Approver(String username,String password,ArrayList<CreatedForm> createdForm, ArrayList<VendorForm> vendorForm)
    {
        super(username, password,createdForm,vendorForm);
        this.setUserType("Approver");
    }

    public Approver(String username,String hashedPassword,byte[] passwordSalt,ArrayList<CreatedForm> createdForm,ArrayList<VendorForm> vendorForm)
    {
        super(username,hashedPassword,passwordSalt,createdForm,vendorForm);
        this.setUserType("Approver");
    }

    public Approver(String username,ArrayList<CreatedForm> createdForm,ArrayList<VendorForm> vendorForm)
    {
        super(username,null,null,createdForm,vendorForm);
        this.setUserType("Approver");
    }
}