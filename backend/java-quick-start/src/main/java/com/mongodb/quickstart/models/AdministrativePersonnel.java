package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class AdministrativePersonnel extends User{
    private ArrayList<Object> createdForm;
    private ArrayList<Object> vendorForm;
    public AdministrativePersonnel(){}
    public AdministrativePersonnel(String username,String password)
    {
        super(username, password,"AdministrativePersonnel");
        this.createdForm = new ArrayList<>();
        this.vendorForm = new ArrayList<>();
    }

    public AdministrativePersonnel(String username,String hashedPassword,byte[] passwordSalt,ArrayList<Object> createdForm,ArrayList<Object> vendorForm)
    {
        super(username,hashedPassword,passwordSalt,"AdministrativePersonnel");
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
    }

    public AdministrativePersonnel(String username,ArrayList<Object> createdForm,ArrayList<Object> vendorForm)
    {
        super(username,null,null,"AdministrativePersonnel");
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
    }
    public ArrayList<Object> getVendorForm() {
        return vendorForm;
    }
    public void setVendorForm(ArrayList<Object> vendorForm) {
        this.vendorForm = vendorForm;
    }
    public ArrayList<Object> getCreatedForm() {
        return createdForm;
    }
    public void setCreatedForm(ArrayList<Object> createdForm) {
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