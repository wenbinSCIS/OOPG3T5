package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Vendor extends User{
    private ArrayList<AssignedForm> assignedForms;
    public Vendor(){}

    public Vendor(String username,String password,ArrayList<AssignedForm> assignedForms)
    {
        super(username,password,"Vendor");
        this.assignedForms = assignedForms;
    }

    public Vendor(String username,String hashedPassword,byte[] passwordSalt,ArrayList<AssignedForm> assignedForms)
    {
        super(username,hashedPassword,passwordSalt,"Vendor");
        this.assignedForms = assignedForms;
    }

    public Vendor(String username,ArrayList<AssignedForm> assignedForm)
    {
        super(username,null,null,"Vendor");
        this.assignedForms = assignedForm;
    }

    public ArrayList<AssignedForm> getAssignedForms() {
        return assignedForms;
    }

    public void setAssignedForms(ArrayList<AssignedForm> assignedForms) {
        this.assignedForms = assignedForms;
    }

    public static class AssignedForm {
        private String formName;
        private String status;
        private String description;
        private double formVersion;
        private ArrayList<String> adminName;
        private ArrayList<String> approverName;

        public AssignedForm() {
            super();
        }

        public AssignedForm(String formName, String status, String description, double formVersion,ArrayList<String> adminName,ArrayList<String> approverName) {
            this.formName = formName;
            this.status = status;
            this.description = description;
            this.formVersion = formVersion;
            this.adminName = adminName;
            this.approverName = approverName;
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

        public ArrayList<String> getAdminName() {
            return adminName;
        }

        public void setAdminName(ArrayList<String> adminName) {
            this.adminName = adminName;
        }

        public ArrayList<String> getApproverName() {
            return approverName;
        }

        public void setApproverName(ArrayList<String> approverName) {
            this.approverName = approverName;
        }
    }
}
