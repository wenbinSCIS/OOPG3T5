package com.mongodb.quickstart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.quickstart.models.FormInput;

public interface FormInputRepository extends MongoRepository<FormInput, String> {
  List<FormInput> findByFormNameContaining(String formName);
  List<FormInput> findByFormName(String formName);
  List<FormInput> findByStatus(String status);
  List<FormInput> findByUsernameContaining(String username);
  List<FormInput> findByUsername(String username);
  void deleteByFormNameAndUsernameAndFormVersion(String formName,String username,double formVersion);
  List<FormInput> findByFormNameAndFormVersion(String formName, double formVersion);
  List<FormInput> findByFormNameAndUsername(String formName, String username);
  Optional<FormInput> findByFormNameAndUsernameAndFormVersion(String formName, String username,double formVersion);

}
