package com.mongodb.quickstart.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.quickstart.models.Vendor;
import com.mongodb.quickstart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class VendorController {

    
    @Autowired
    UserRepository userRepository;

//update vendor form for vendor object
    @PutMapping("/updateVendorAssignedForm")
        public ResponseEntity<?> updateVendorAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                existingUser.setProject(vendor.getProject());
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
/*
        @PutMapping("/appendVendorAssignedForm")
        public ResponseEntity<?> appendVendorAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<AssignedForm> appendFormList = vendor.getAssignedForms();
                ArrayList<AssignedForm> currentList = existingUser.getAssignedForms();

                for(int i=0;i<appendFormList.size();i++)
                {
                    currentList.add(appendFormList.get(i));
                }
                existingUser.setAssignedForms(currentList);
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("/deleteSingleVendorAssignedForm")
        public ResponseEntity<?> deleteSingleVendorAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<AssignedForm> appendFormList = vendor.getAssignedForms();
                AssignedForm deleteForm = appendFormList.get(0);
                String deleteName = deleteForm.getFormName();
                double deleteVersion = deleteForm.getFormVersion();
                
                ArrayList<AssignedForm> currentList = existingUser.getAssignedForms();

                for(int i=0;i<currentList.size();i++)
                {
                    AssignedForm currentForm = currentList.get(i);
                    String currentName = currentForm.getFormName();
                    double currentVersion = currentForm.getFormVersion();
                    if(currentName.equals(deleteName) && currentVersion==deleteVersion)
                    {
                        currentList.remove(i);
                        break;
                    }
                }
                existingUser.setAssignedForms(currentList);
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("/updateVendorAssignedFormStatus")
        public ResponseEntity<?> updateVendorAssignedFormStatus(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<AssignedForm> appendFormList = vendor.getAssignedForms();
                AssignedForm updateForm = appendFormList.get(0);
                String updateName = updateForm.getFormName();
                double updateVersion = updateForm.getFormVersion();
                String updateStatus = updateForm.getStatus();
                
                ArrayList<AssignedForm> currentList = existingUser.getAssignedForms();

                for(int i=0;i<currentList.size();i++)
                {
                    AssignedForm currentForm = currentList.get(i);
                    String currentName = currentForm.getFormName();
                    double currentVersion = currentForm.getFormVersion();
                    if(currentName.equals(updateName) && currentVersion==updateVersion)
                    {
                        currentForm.setStatus(updateStatus);
                        break;
                    }
                }
                existingUser.setAssignedForms(currentList);
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
 */
}
