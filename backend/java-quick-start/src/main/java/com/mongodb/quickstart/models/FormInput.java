package com.mongodb.quickstart.models;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "formInputCollection")

public class FormInput {
    @Id
    private String id;

    private String formName;
    private String username;
    private double formVersion;
    private String status;
    private ArrayList<Object> formInputData;
    private CompanyInfo companyInfo;
    private ArrayList<Object> approverComments;

   

    public FormInput()
    {
        super();
    }
    
    
    public FormInput(String formName, String username, double formVersion, String status,
        ArrayList<Object> formInputData, CompanyInfo companyInfo) {
        this.formName = formName;
        this.username = username;
        this.formVersion = formVersion;
        this.status = status;
        this.formInputData = formInputData;
        this.companyInfo = companyInfo;
    }

    public FormInput(String formName, String username, double formVersion, String status,
        ArrayList<Object> formInputData, CompanyInfo companyInfo, ArrayList<Object> approverComments) {
        this.formName = formName;
        this.username = username;
        this.formVersion = formVersion;
        this.status = status;
        this.formInputData = formInputData;
        this.companyInfo = companyInfo;
        this.approverComments = approverComments;
    }


    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getFormName() {
        return formName;
    }
    public void setFormName(String formName) {
        this.formName = formName;
    }
    public double getFormVersion() {
        return formVersion;
    }
    public void setFormVersion(double formVersion) {
        this.formVersion = formVersion;
    }
    public ArrayList<Object> getApproverComments() {
        return approverComments;
    }

    public void setApproverComments(ArrayList<Object> approverComments) {
        this.approverComments = approverComments;
    }

    public ArrayList<Object> getFormInputData() {
        return formInputData;
    }
    public void setFormInputData(ArrayList<Object> formInputData) {
        this.formInputData = formInputData;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public CompanyInfo getCompanyInfo() {
        return companyInfo;
    }

    public void setCompanyInfo(CompanyInfo companyInfo) {
        this.companyInfo = companyInfo;
    }

    
    
}
