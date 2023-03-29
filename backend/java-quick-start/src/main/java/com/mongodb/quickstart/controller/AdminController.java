package com.mongodb.quickstart.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.quickstart.models.AdministrativePersonnel;
import com.mongodb.quickstart.models.AdministrativePersonnel.CreatedForm;
import com.mongodb.quickstart.models.AdministrativePersonnel.VendorForm;
import com.mongodb.quickstart.models.TempUser;
import com.mongodb.quickstart.models.User;
import com.mongodb.quickstart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class AdminController {

    
    @Autowired
    UserRepository userRepository;

//update created form for admin and approver
    @PutMapping("/updateCreatedForm")
    public ResponseEntity<?> updateCreatedForm(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            existingUser.setCreatedForm(admin.getCreatedForm());
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/appendCreatedForm")
    public ResponseEntity<?> appendCreatedForm(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            ArrayList<CreatedForm> appendFormList = admin.getCreatedForm();
            ArrayList<CreatedForm> currentList = existingUser.getCreatedForm();

            for(int i=0;i<appendFormList.size();i++)
            {
                currentList.add(appendFormList.get(i));
            }
            existingUser.setCreatedForm(currentList);
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/deleteSingleCreatedForm")
    public ResponseEntity<?> deleteSingleCreatedForm(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            ArrayList<CreatedForm> appendFormList = admin.getCreatedForm();
            CreatedForm deleteForm = appendFormList.get(0);
            String deleteName = deleteForm.getFormName();
            double deleteVersion = deleteForm.getFormVersion();
            
            ArrayList<CreatedForm> currentList = existingUser.getCreatedForm();

            for(int i=0;i<currentList.size();i++)
            {
                CreatedForm currentForm = currentList.get(i);
                String currentName = currentForm.getFormName();
                double currentVersion = currentForm.getFormVersion();
                if(currentName.equals(deleteName) && currentVersion==deleteVersion)
                {
                    currentList.remove(i);
                    break;
                }
            }
            existingUser.setCreatedForm(currentList);
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//Update Vendor Form for admin and approver
    @PutMapping("/updateAdminVendorForm")
    public ResponseEntity<?> updateAdminVendorForm(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            existingUser.setVendorForm(admin.getVendorForm());
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/appendAdminVendorForm")
    public ResponseEntity<?> appendAdminVendorForm(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            ArrayList<VendorForm> appendFormList = admin.getVendorForm();
            ArrayList<VendorForm> currentList = existingUser.getVendorForm();

            for(int i=0;i<appendFormList.size();i++)
            {
                currentList.add(appendFormList.get(i));
            }
            existingUser.setVendorForm(currentList);
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/deleteSingleAdminVendorForm")
    public ResponseEntity<?> deleteSingleAdminVendorForm(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            ArrayList<VendorForm> appendFormList = admin.getVendorForm();
            VendorForm deleteForm = appendFormList.get(0);
            String deleteName = deleteForm.getFormName();
            double deleteVersion = deleteForm.getFormVersion();
            
            ArrayList<VendorForm> currentList = existingUser.getVendorForm();

            for(int i=0;i<currentList.size();i++)
            {
                VendorForm currentForm = currentList.get(i);
                String currentName = currentForm.getFormName();
                double currentVersion = currentForm.getFormVersion();
                if(currentName.equals(deleteName) && currentVersion==deleteVersion)
                {
                    currentList.remove(i);
                    break;
                }
            }
            existingUser.setVendorForm(currentList);
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/updateAdminVendorFormStatus")
    public ResponseEntity<?> updateAdminVendorFormStatus(@RequestBody AdministrativePersonnel admin) {
        Optional<User> userData = userRepository.findByUsername(admin.getUsername());

        if (userData.isPresent()) {
            AdministrativePersonnel existingUser = (AdministrativePersonnel) userData.get();
            ArrayList<VendorForm> appendFormList = admin.getVendorForm();
            VendorForm updateForm = appendFormList.get(0);
            String updateName = updateForm.getFormName();
            double updateVersion = updateForm.getFormVersion();
            String updateStatus = updateForm.getStatus();
            String updateCompanyName = updateForm.getVendorName();
            
            ArrayList<VendorForm> currentList = existingUser.getVendorForm();

            for(int i=0;i<currentList.size();i++)
            {
                VendorForm currentForm = currentList.get(i);
                String currentName = currentForm.getFormName();
                double currentVersion = currentForm.getFormVersion();
                String compnayName = currentForm.getVendorName();
                if(currentName.equals(updateName) && currentVersion==updateVersion && compnayName.equals(updateCompanyName))
                {
                    currentForm.setStatus(updateStatus);
                    break;
                }
            }
            existingUser.setVendorForm(currentList);
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateUserType")
    //Only for changing between administrative personnel and approver. Will not add new field for
    //assigned forms. Anyway a vendor will probably not become admin/approver and vice versa.
        public ResponseEntity<?> updateUserType(@RequestBody TempUser tempUser) {
            Optional<User> userData = userRepository.findByUsername(tempUser.getUsername());

            if (userData.isPresent()) {
                User existingUser = userData.get();
            
              // check if the username in the request body matches the username in the URL path parameter
                if (!existingUser.getUsername().equals(tempUser.getUsername())) {
                    return new ResponseEntity<>("Username in URL path parameter does not match username in request body", HttpStatus.BAD_REQUEST);
                }

                existingUser.setUserType(tempUser.getUserType());
                userRepository.save(existingUser);

                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }