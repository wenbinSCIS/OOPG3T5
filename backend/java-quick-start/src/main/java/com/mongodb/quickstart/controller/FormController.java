package com.mongodb.quickstart.controller;

import com.mongodb.quickstart.models.Form;
import com.mongodb.quickstart.repository.FormRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")

public class FormController {

  @Autowired
  FormRepository formRepository;

  @GetMapping("/getAllForms")
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

  @GetMapping("/getFormByName/{formName}")
  public ResponseEntity<Form> getFormByFormName(@PathVariable("formName") String formName) {
    Optional<Form> formData = formRepository.findByFormName(formName);
  
    if (formData.isPresent()) {
      return new ResponseEntity<>(formData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

    @GetMapping("/getFormByNameAndVersion/{formName}/{version}")
    public ResponseEntity<Form> getFormByNameAndVersion(@PathVariable("formName") String formName, @PathVariable("version") double version) {
    Optional<Form> formData = formRepository.findByFormNameAndVersion(formName, version);
    
    if (formData.isPresent()) {
      return new ResponseEntity<>(formData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }


  @GetMapping("/getAllFormsByVersion/{version}")
  public ResponseEntity<List<Form>> findByVersion(@PathVariable("version") double version) {
    try {
      List<Form> forms = formRepository.findByVersion(version);

      if (forms.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(forms, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/createForm")
    public ResponseEntity<Form> createForm(@RequestBody Form form) {
    try {
        Form _form = formRepository.save(new Form(form.getFormName(), form.getSections(), form.getVersion()));
        return new ResponseEntity<>(_form, HttpStatus.CREATED);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //private static final Logger logger = LogManager.getLogger(FormController.class);

  @PutMapping("/updateFormByName/{formName}")
  public ResponseEntity<Form> updateFormByName(@PathVariable("formName") String formName, @RequestBody Form form) {
      Optional<Form> formData = formRepository.findByFormName(formName);

      if (formData.isPresent()) {
          Form existingForm = formData.get();
          existingForm.setFormName(form.getFormName());
          existingForm.setSections(form.getSections());
          existingForm.setVersion(form.getVersion());
          Form updatedForm = formRepository.save(existingForm);
          return new ResponseEntity<>(updatedForm, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  }

  @DeleteMapping("/deleteFormByName/{formName}")
  public ResponseEntity<HttpStatus> deleteForm(@PathVariable("formName") String formName) {
    try {
      formRepository.deleteByFormName(formName);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  


}