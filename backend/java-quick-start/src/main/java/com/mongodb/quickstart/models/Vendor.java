package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Vendor extends User{
    private ArrayList<Form> form_list;

    public Vendor(String username,String password)
    {
        super(username, password,"Vendor");
        this.form_list = new ArrayList<Form>();
    }


    public Vendor(String username,String hashedPassword,byte[] passwordSalt)
    {
        super(username,hashedPassword,passwordSalt,"Vendor");
        this.form_list = new ArrayList<Form>();
    }
}
