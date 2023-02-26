package com.mongodb.quickstart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.quickstart.models.Form;

public interface FormRepository extends MongoRepository<Form, String> {
  List<Form> findByFormNameContaining(String formName);
  List<Form> findByVersion(double version);
  Optional<Form> findByFormName(String formName);
  void deleteByFormName(String formName);

}
