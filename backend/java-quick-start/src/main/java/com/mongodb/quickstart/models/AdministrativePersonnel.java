package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class AdministrativePersonnel extends User{
    private ArrayList<Object> createdForm;
    public AdministrativePersonnel(){}
    public AdministrativePersonnel(String username,String password,ArrayList<Object> createdForm)
    {
        super(username, password,"AdministrativePersonnel");
        this.createdForm = createdForm;
    }

    public AdministrativePersonnel(String username,String hashedPassword,byte[] passwordSalt,ArrayList<Object> createdForm)
    {
        super(username,hashedPassword,passwordSalt,"AdministrativePersonnel");
        this.createdForm = createdForm;
    }

    public AdministrativePersonnel(String username,ArrayList<Object> createdForm)
    {
        super(username,null,null,"AdministrativePersonnel");
        this.createdForm = createdForm;
    }
    public ArrayList<Object> getCreatedForm() {
        return createdForm;
    }
    public void setCreatedForm(ArrayList<Object> createdForm) {
        this.createdForm = createdForm;
    }

    public static class CreatedForm {
        private String formName;
        private String status;
        private double formVersion;

        public CreatedForm() {
            super();
        }

        public CreatedForm(String formName, String status, double formVersion) {
            this.formName = formName;
            this.status = status;
            this.formVersion = formVersion;
        }

        public String getFormName() {
            return formName;
        }

        public void setFormName(String formName) {
            this.formName = formName;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    
        public double getFormVersion() {
            return formVersion;
        }
    
        public void setFormVersion(double formVersion) {
            this.formVersion = formVersion;
        }
    }
}
