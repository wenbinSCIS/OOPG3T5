package com.mongodb.quickstart.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.quickstart.models.AdministrativePersonnel;
import com.mongodb.quickstart.models.Approver;
import com.mongodb.quickstart.models.TempUser;
import com.mongodb.quickstart.models.User;
import com.mongodb.quickstart.models.Vendor;
import com.mongodb.quickstart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class VendorController {

    
    @Autowired
    UserRepository userRepository;

    @PutMapping("/updateCompanyInfo")
    public ResponseEntity<?> updateCompanyInfo(@RequestBody Vendor vendor) {
        Optional<User> userData = userRepository.findByUsername(vendor.getUsername());

        if (userData.isPresent()) {
            Vendor existingUser = (Vendor) userData.get();
            existingUser.setCompanyInfo(vendor.getCompanyInfo());
            userRepository.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
