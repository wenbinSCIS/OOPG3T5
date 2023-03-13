package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class AdministrativePersonnel extends User{
    private ArrayList<CreatedForm> createdForm;
    private ArrayList<VendorForm> vendorForm;
    public AdministrativePersonnel(){}
    public AdministrativePersonnel(String username,String password,ArrayList<com.mongodb.quickstart.models.Approver.CreatedForm> createdForm2, ArrayList<com.mongodb.quickstart.models.Approver.VendorForm> vendorForm2)
    {
        super(username, password,"AdministrativePersonnel");
        this.createdForm = createdForm2;
        this.vendorForm = vendorForm2;
    }

    public AdministrativePersonnel(String username,String hashedPassword,byte[] passwordSalt,ArrayList<com.mongodb.quickstart.models.Approver.CreatedForm> createdForm2,ArrayList<com.mongodb.quickstart.models.Approver.VendorForm> vendorForm2)
    {
        super(username,hashedPassword,passwordSalt,"AdministrativePersonnel");
        this.createdForm = createdForm2;
        this.vendorForm = vendorForm2;
    }

    public AdministrativePersonnel(String username,ArrayList<CreatedForm> createdForm,ArrayList<VendorForm> vendorForm)
    {
        super(username,null,null,"AdministrativePersonnel");
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
    }
    public ArrayList<VendorForm> getVendorForm() {
        return vendorForm;
    }
    public void setVendorForm(ArrayList<VendorForm> vendorForm) {
        this.vendorForm = vendorForm;
    }
    public ArrayList<CreatedForm> getCreatedForm() {
        return createdForm;
    }
    public void setCreatedForm(ArrayList<CreatedForm> createdForm) {
        this.createdForm = createdForm;
    }

    public static class CreatedForm {
        private String formName;
        private double formVersion;

        public CreatedForm() {
            super();
        }

        public CreatedForm(String formName, double formVersion) {
            this.formName = formName;
            this.formVersion = formVersion;
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
    }

    public static class VendorForm {
        private String formName;
        private String status;
        private double formVersion;
        private String vendorName;

        public VendorForm() {
            super();
        }

        public VendorForm(String formName, String status, double formVersion,String vendorName) {
            this.formName = formName;
            this.status = status;
            this.formVersion = formVersion;
            this.vendorName = vendorName;
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
    
        public String getVendorName() {
            return vendorName;
        }

        public void setVendorName(String vendorName) {
            this.vendorName = vendorName;
        }

        public void setFormVersion(double formVersion) {
            this.formVersion = formVersion;
        }
    }
}