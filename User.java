import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class User{
    private String username;
    private String hashed_password;
    private byte[] password_salt;

    public User(String username,String password_string)
    {
        this.username = username;
        this.password_salt = getSalt();
        this.hashed_password = generatePassword(password_string,this.password_salt);
    }

    private static byte[] getSalt()
    {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private static String generatePassword(String password_string,byte[] salt)
    {
        String generated_password = null;

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] bytes = md.digest(password_string.getBytes());
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generated_password = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return generated_password;
    }

    public void setUsername(String username) 
    {
        this.username = username;
    }

    public String getHashedPassword() 
    {
        return this.hashed_password;
    }

    public boolean comparePassword(String input_password)
    {
        String hashed_input_password = generatePassword(input_password, this.password_salt);

        return this.hashed_password.equals(hashed_input_password);
    }
}