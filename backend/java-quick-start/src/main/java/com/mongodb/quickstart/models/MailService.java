package com.mongodb.quickstart.models;
public interface MailService {
 String sendMail(MailDetail mailDetail);
 String sendMailWithAttachment(MailDetail mailDetail);
 }