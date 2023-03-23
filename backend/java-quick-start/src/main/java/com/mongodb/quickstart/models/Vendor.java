package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Vendor extends User{
    private ArrayList<Project> project;
    private CompanyInfo companyInfo;
    public Vendor(){}

    public Vendor(String username,String password,ArrayList<Project> project,CompanyInfo companyInfo)
    {
        super(username,password,"Vendor");
        this.project = project;
        this.companyInfo = companyInfo;
    }

    public Vendor(String username,String hashedPassword,byte[] passwordSalt,ArrayList<Project> project,CompanyInfo companyInfo)
    {
        super(username,hashedPassword,passwordSalt,"Vendor");
        this.project = project;
        this.companyInfo = companyInfo;
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

    public CompanyInfo getCompanyInfo() {
        return companyInfo;
    }

    public void setCompanyInfo(CompanyInfo companyInfo) {
        this.companyInfo = companyInfo;
    }

}
