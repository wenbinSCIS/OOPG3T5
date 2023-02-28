package com.mongodb.quickstart.models;

public class AdministrativePersonnel extends User{
    
    public AdministrativePersonnel(String username,String password)
    {
        super(username, password,"AdministrativePersonnel");
    }

    public AdministrativePersonnel(String username,String hashedPassword,byte[] passwordSalt)
    {
        super(username,hashedPassword,passwordSalt,"AdministrativePersonnel");
    }
}
