package com.mongodb.quickstart.models;

public class Approver extends User{
    
    public Approver(String username,String password)
    {
        super(username, password,"Approver");
    }

    public Approver(String username,String hashedPassword,byte[] passwordSalt)
    {
        super(username,hashedPassword,passwordSalt,"Approver");
    }
}