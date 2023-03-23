package com.mongodb.quickstart.models;

public class CompanyInfo {
    private String companyName;
    private String registrationNo;
    private String contactNo;
    private String emailAddress;
    private String natureOfBusiness;
    private String gSTNo;

    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getRegistrationNo() {
        return registrationNo;
    }
    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }
    public String getContactNo() {
        return contactNo;
    }
    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }
    public String getEmailAddress() {
        return emailAddress;
    }
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
    public String getNatureOfBusiness() {
        return natureOfBusiness;
    }
    public void setNatureOfBusiness(String natureOfBusiness) {
        this.natureOfBusiness = natureOfBusiness;
    }
    public String getgSTNo() {
        return gSTNo;
    }
    public void setGSTNo(String gSTNo) {
        this.gSTNo = gSTNo;
    }

    
}
