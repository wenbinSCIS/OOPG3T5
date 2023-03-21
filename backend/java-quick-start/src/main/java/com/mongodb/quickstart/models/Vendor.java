package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Vendor extends User{
    private ArrayList<Project> project;
    private String companyName;
    public Vendor(){}

    public Vendor(String username,String password,ArrayList<Project> project,String companyName)
    {
        super(username,password,"Vendor");
        this.project = project;
        this.companyName = companyName;
    }

    public Vendor(String username,String hashedPassword,byte[] passwordSalt,ArrayList<Project> project,String companyName)
    {
        super(username,hashedPassword,passwordSalt,"Vendor");
        this.project = project;
        this.companyName = companyName;
    }

    public Vendor(String username)
    {
        super(username,null,null,"Vendor");
    }

    public ArrayList<Project> getProject() {
        return project;
    }

    public void setProject(ArrayList<Project> project) {
        this.project = project;
    }

    public String getCompanyName()
    {
        return companyName;
    }

    public void setCompanyName(String companyName)
    {
        this.companyName = companyName;
    }
}
