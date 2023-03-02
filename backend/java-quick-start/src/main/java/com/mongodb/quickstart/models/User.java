package com.mongodb.quickstart.models;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userCollection")
public class User {
    @Id
    private String id;

    private String username;
    private String hashedPassword;
    private byte[] passwordSalt;
    private String userType;

    public User() {
        super();
    }
    

    public User(String username, String passwordString, String userType) {
        this.username = username;
        this.passwordSalt = getSalt();
        this.hashedPassword = generatePassword(passwordString, this.passwordSalt);
        this.userType = userType;
    }

    public User(String username, String hashedPassword, byte[] passwordSalt, String userType) {
        this.username = username;
        this.passwordSalt = passwordSalt;
        this.hashedPassword = hashedPassword;
        this.userType = userType;
    }

    private static byte[] getSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[32];
        random.nextBytes(salt);
        return salt;
    }

    private static String generatePassword(String passwordString, byte[] salt) {
        String generatedPassword = null;

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] bytes = md.digest(passwordString.getBytes());
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return generatedPassword;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public String getUserType() {
        return this.userType;
    }

    public void setUserType(String usertype) {
        this.userType = usertype;
    }

    public String getHashedPassword() {
        return this.hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }


    public void setPasswordSalt(byte[] passwordSalt) {
        this.passwordSalt = passwordSalt;
    }


    public byte[] getPasswordSalt() {
        return this.passwordSalt;
    }

    public boolean comparePassword(String inputPassword) {
        String hashedInputPassword = generatePassword(inputPassword, this.passwordSalt);

        return this.hashedPassword.equals(hashedInputPassword);
    }


}
    
