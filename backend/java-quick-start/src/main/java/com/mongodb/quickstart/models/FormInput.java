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
    private ArrayList<Object> formInputData;

    public FormInput()
    {
        super();
    }

    public FormInput(String formName, String username, double formVersion, ArrayList<Object> formInputData)
    {
        this.formName = formName;
        this.username = username;
        this.formVersion = formVersion;
        this.formInputData = formInputData;
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
    public ArrayList<Object> getFormInputData() {
        return formInputData;
    }
    public void setFormInputData(ArrayList<Object> formInputData) {
        this.formInputData = formInputData;
    }

    
}