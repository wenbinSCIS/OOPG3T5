package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Vendor extends User{
    private ArrayList<Object> assignedForms;
    public Vendor(){}

    public ArrayList<Object> getAssignedForms() {
        return assignedForms;
    }

    public void setAssignedForms(ArrayList<Object> assignedForms) {
        this.assignedForms = assignedForms;
    }

    public Vendor(String username,String password,ArrayList<Object> assignedForms)
    {
        super(username,password,"Vendor");
        this.assignedForms = assignedForms;
    }

    public Vendor(String username,String hashedPassword,byte[] passwordSalt,ArrayList<Object> assignedForms)
    {
        super(username,hashedPassword,passwordSalt,"Vendor");
        this.assignedForms = assignedForms;
    }

    public static class AssignedForm {
        private String formName;
        private String status;
        private String description;
        private double formVersion;

        public AssignedForm() {
            super();
        }

        public AssignedForm(String formName, String status, String description, double formVersion) {
            this.formName = formName;
            this.status = status;
            this.description = description;
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

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    
        public double getFormVersion() {
            return formVersion;
        }
    
        public void setFormVersion(double formVersion) {
            this.formVersion = formVersion;
        }
    }
}
