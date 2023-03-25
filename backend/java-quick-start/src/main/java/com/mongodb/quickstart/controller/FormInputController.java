package com.mongodb.quickstart.controller;

import com.mongodb.quickstart.models.FormInput;
import com.mongodb.quickstart.repository.FormInputRepository;

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
@RequestMapping("/formInput")

public class FormInputController {

    @Autowired
    FormInputRepository formInputRepository;

    @GetMapping("/getAllFormInput")
    public ResponseEntity<List<FormInput>> getAllFormInput(@RequestParam(required = false) String formName) {
        try {
            List<FormInput> formInput = new ArrayList<FormInput>();

            if (formName == null)
                formInputRepository.findAll().forEach(formInput::add);
            else
                formInputRepository.findByFormNameContaining(formName).forEach(formInput::add);

            if (formInput.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(formInput, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getFormInputByFormName")
    public ResponseEntity<List<FormInput>> getFormInputByFormName(@RequestBody FormInput tempFormInput) {
        try {
            String formName = tempFormInput.getFormName();
            List<FormInput> formInput = new ArrayList<FormInput>();

            if (formName == null) {
                formInputRepository.findAll().forEach(formInput::add);
            } else {
                formInputRepository.findByFormName(formName).forEach(formInput::add);
            }

            if (formInput.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(formInput, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getFormInputByUsername")
    public ResponseEntity<List<FormInput>> getFormInputByUsername(@RequestBody FormInput tempFormInput) {
        try {
            String username = tempFormInput.getUsername();
            List<FormInput> formInput = new ArrayList<FormInput>();

            if (username == null)
                formInputRepository.findAll().forEach(formInput::add);
            else
                formInputRepository.findByUsernameContaining(username).forEach(formInput::add);

            if (formInput.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(formInput, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getFormInputByFormNameFormVersion")
    public ResponseEntity<List<FormInput>> getFormInputByNameAndVersion(@RequestBody FormInput tempFormInput) {
        try {
            String formName = tempFormInput.getFormName();
            double formVersion = tempFormInput.getFormVersion();
            List<FormInput> formInput = new ArrayList<FormInput>();

            if (formName == null)
                formInputRepository.findAll().forEach(formInput::add);
            else
                formInputRepository.findByFormNameAndFormVersion(formName, formVersion).forEach(formInput::add);

            if (formInput.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(formInput, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/getFormInputByFormNameUsernameFormVersion")
    public ResponseEntity<FormInput> getFormInputByFormNameUsernameVersion(@RequestBody FormInput tempFormInput) {
        String formName = tempFormInput.getFormName();
        String username = tempFormInput.getUsername();
        double formVersion = tempFormInput.getFormVersion();
        Optional<FormInput> formInputData = formInputRepository.findByFormNameAndUsernameAndFormVersion(formName,
                username, formVersion);
        if (formInputData.isPresent()) {
            return new ResponseEntity<>(formInputData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createFormInput")
    public ResponseEntity<?> createForm(@RequestBody FormInput formInput) {
        Optional<FormInput> existingForm = formInputRepository.findByFormNameAndUsernameAndFormVersion(
                formInput.getFormName(), formInput.getUsername(), formInput.getFormVersion());
        if (existingForm.isPresent()) {
            return new ResponseEntity<>("Form with the given name and version already exists", HttpStatus.CONFLICT);
        }
        try {
            FormInput _formInput = formInputRepository.save(new FormInput(formInput.getFormName(),
            formInput.getUsername(), formInput.getFormVersion(), formInput.getFormInputData(), formInput.getApproverComments()));
            
            if(formInput.getApproverComments() != null){
                _formInput = formInputRepository.save(new FormInput(formInput.getFormName(),
                formInput.getUsername(), formInput.getFormVersion(), formInput.getFormInputData()));
            }
            return new ResponseEntity<>(_formInput, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // private static final Logger logger =
    // LogManager.getLogger(FormController.class);

    @PutMapping("/updateFormInputData")
    public ResponseEntity<FormInput> updateFormInputData(@RequestBody FormInput tempFormInput) {
        String formName = tempFormInput.getFormName();
        String username = tempFormInput.getUsername();
        double formVersion = tempFormInput.getFormVersion();
        Optional<FormInput> formData = formInputRepository.findByFormNameAndUsernameAndFormVersion(formName, username,
                formVersion);
        if (formData.isPresent()) {
            FormInput existingFormInput = formData.get();
            existingFormInput.setFormInputData(tempFormInput.getFormInputData());
            if(tempFormInput.getApproverComments() != null)
                existingFormInput.setApproverComments(tempFormInput.getApproverComments());
            FormInput updatedForm = formInputRepository.save(existingFormInput);
            return new ResponseEntity<>(updatedForm, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateFormVersion/{newFormVersion}")
    public ResponseEntity<FormInput> updateFormVersion(@RequestBody FormInput tempFormInput,
            @PathVariable("newFormVersion") double newFormVersion) {
        String formName = tempFormInput.getFormName();
        String username = tempFormInput.getUsername();
        double formVersion = tempFormInput.getFormVersion();
        Optional<FormInput> formData = formInputRepository.findByFormNameAndUsernameAndFormVersion(formName, username,
                formVersion);

        if (formData.isPresent()) {
            FormInput existingFormInput = formData.get();
            existingFormInput.setFormVersion(newFormVersion);
            FormInput updatedForm = formInputRepository.save(existingFormInput);
            return new ResponseEntity<>(updatedForm, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteFormByFormNameUsernameFormVersion")
    public ResponseEntity<HttpStatus> deleteForm(@RequestBody FormInput tempFormInput) {
        try {
            String formName = tempFormInput.getFormName();
            String username = tempFormInput.getUsername();
            double formVersion = tempFormInput.getFormVersion();
            formInputRepository.deleteByFormNameAndUsernameAndFormVersion(formName, username, formVersion);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}