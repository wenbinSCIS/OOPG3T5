package com.mongodb.quickstart.controller;

import com.mongodb.quickstart.models.Form;
import com.mongodb.quickstart.repository.FormRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api")
public class FormController {

  @Autowired
  FormRepository formRepository;

  @GetMapping("/forms")
  public ResponseEntity<List<Form>> getAllForms(@RequestParam(required = false) String formName) {
    try {
        List<Form> forms = new ArrayList<Form>();
    
        if (formName == null)
          formRepository.findAll().forEach(forms::add);
        else
          formRepository.findByFormNameContaining(formName).forEach(forms::add);
    
        if (forms.isEmpty()) {
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    
        return new ResponseEntity<>(forms, HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  @PostMapping("/createForm")
    public ResponseEntity<Form> createTutorial(@RequestBody Form form) {
    try {
        Form _form = formRepository.save(new Form(form.getFormName(), form.getSections(), form.getVersion()));
        return new ResponseEntity<>(_form, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


}