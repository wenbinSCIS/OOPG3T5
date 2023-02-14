import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class User{
    private String username;
    private String hashedPassword;
    private byte[] passwordSalt;

    public User(String username,String passwordString)
    {
        this.username = username;
        this.passwordSalt = getSalt();
        this.hashedPassword = generatePassword(passwordString,this.passwordSalt);
    }

    private static byte[] getSalt()
    {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private static String generatePassword(String passwordString,byte[] salt)
    {
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

    public void setUsername(String username) 
    {
        this.username = username;
    }

    public String getUsername()
    {
        return this.username;
    }

    public String getHashedPassword() 
    {
        return this.hashedPassword;
    }

    public boolean comparePassword(String inputPassword)
    {
        String hashedInputPassword = generatePassword(inputPassword, this.passwordSalt);

        return this.hashedPassword.equals(hashedInputPassword);
    }
}