package com.mongodb.quickstart.service.email;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;
import com.mongodb.quickstart.models.TempUser;

class Mailer {
    public static void send(String from, String password, String to, String sub, String msg) {
        // Get properties object
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");
        // get Session
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(from, password);
                    }
                });
        // compose message
        try {
            MimeMessage message = new MimeMessage(session);
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(sub);
            message.setText(msg);
            message.setContent(msg, "text/html");
            // send message
            Transport.send(message);
            System.out.println("message sent successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}

public class SendEmail {
    public static void main(String[] args) {
        // from,password,to,subject,message
        Mailer.send("OOPG3T5@gmail.com", "livmeituhepihmrm", "kruisetog@gmail.com", "test msg",
                "would u be surprised if this works?");
    }

    public static void sendTestEmail(String toEmail) {
        Mailer.send("OOPG3T5@gmail.com", "livmeituhepihmrm", toEmail, "test email", "this is a test message");
    }

    public static void emailAccountCreation(TempUser tempUser) {
        String msg = String.format(
                "<p>Hi</p><p>Your account details are:</p><p>Username:  %s<br>Password:  %s</p><p>Best Regards<br>OOPG3T5</p>",
                tempUser.getUsername(), tempUser.getPasswordString());
        Mailer.send("OOPG3T5@gmail.com", "livmeituhepihmrm", tempUser.getUsername(), "Account creation", msg);
    }

    public static void emailAssignForm(String toEmail) {
        Mailer.send("OOPG3T5@gmail.com", "livmeituhepihmrm", toEmail, "Form assigned for ", "account created");
    }
}
