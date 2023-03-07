package com.mongodb.quickstart.models;

import java.util.ArrayList;

public class Approver extends User{
    private ArrayList<Object> createdForm;
    private ArrayList<Object> vendorForm;
    
    public Approver()
    {
        super();
    }

    public Approver(String username,String password)
    {
        super(username, password,"Approver");
        this.createdForm = new ArrayList<>();
        this.vendorForm = new ArrayList<>();
    }

    public Approver(String username,String hashedPassword,byte[] passwordSalt,ArrayList<Object> createdForm,ArrayList<Object> vendorForm)
    {
        super(username,hashedPassword,passwordSalt,"Approver");
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
    }

    public Approver(String username,ArrayList<Object> createdForm,ArrayList<Object> vendorForm)
    {
        super(username,null,null,"Approver");
        this.createdForm = createdForm;
        this.vendorForm = vendorForm;
    }



    public ArrayList<Object> getCreatedForm() {
        return createdForm;
    }

    public void setCreatedForm(ArrayList<Object> createdForm) {
        this.createdForm = createdForm;
    }

    public ArrayList<Object> getVendorForm() {
        return vendorForm;
    }

    public void setVendorForm(ArrayList<Object> vendorForm) {
        this.vendorForm = vendorForm;
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