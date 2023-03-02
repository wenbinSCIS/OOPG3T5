package com.mongodb.quickstart.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.quickstart.models.AdministrativePersonnel;
import com.mongodb.quickstart.models.Approver;
import com.mongodb.quickstart.models.TempUser;
import com.mongodb.quickstart.models.User;
import com.mongodb.quickstart.models.Vendor;
import com.mongodb.quickstart.models.AdministrativePersonnel;
import com.mongodb.quickstart.models.Approver;
import com.mongodb.quickstart.models.TempUser;
import com.mongodb.quickstart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/getUserByName/{username}")
    public ResponseEntity<User> getUserByName(@PathVariable("username") String username) {
        Optional<User> userData = userRepository.findByUsername(username);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUserByUserType/{userType}")
    public ResponseEntity<List<User>> getUserByUserType(@PathVariable("userType") String userType) {
        List<User> users = userRepository.findByUserType(userType);

        if (!users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody TempUser tempUser) {
        Optional<User> existingUser = userRepository.findByUsername(tempUser.getUsername());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("User with the given username already exists", HttpStatus.CONFLICT);
        }
        try {
        String userType = tempUser.getUserType();

        if (userType.equals("AdministrativePersonnel"))
        {
            AdministrativePersonnel newAdmin = new AdministrativePersonnel(tempUser.getUsername(), tempUser.getPasswordString());
            AdministrativePersonnel _user = userRepository.save(newAdmin);
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        }
        else if (userType.equals("Approver"))
        {
            Approver newApprover = new Approver(tempUser.getUsername(), tempUser.getPasswordString());
            Approver _user = userRepository.save(newApprover);
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        }
        else if (userType.equals("Vendor"))
        {
            Vendor newVendor = new Vendor(tempUser.getUsername(), tempUser.getPasswordString(), tempUser.getAssignedForms());
            Vendor _user = userRepository.save(newVendor);
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    


    @PutMapping("/updateVendorForm/{username}")
        public ResponseEntity<?> updateVendorForm(@PathVariable String username, @RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(username,"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
            
              // check if the username in the request body matches the username in the URL path parameter
                if (!existingUser.getUsername().equals(vendor.getUsername())) {
                    return new ResponseEntity<>("Username in URL path parameter does not match username in request body", HttpStatus.BAD_REQUEST);
                }

                existingUser.setAssignedForms(vendor.getAssignedForms());

                
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

    @PutMapping("/updateUserType/{username}")
    //Only for changing between administrative personnel and approver. Will not add new field for
    //assigned forms. Anyway a vendor will probably not become admin/approver and vice versa.
        public ResponseEntity<?> updateUserType(@PathVariable String username, @RequestBody TempUser tempUser) {
            Optional<User> userData = userRepository.findByUsername(username);

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

    @PutMapping("/updateUsername/{username}/{newUsername}")
        public ResponseEntity<?> updateUsername(@PathVariable("username") String username, @RequestBody TempUser tempUser,@PathVariable("newUsername") String newUsername) {
            Optional<User> userData = userRepository.findByUsername(username);

            if (userData.isPresent()) {
                User existingUser = userData.get();
            
              // check if the username in the request body matches the username in the URL path parameter
                if (!existingUser.getUsername().equals(tempUser.getUsername())) {
                    return new ResponseEntity<>("Username in URL path parameter does not match username in request body", HttpStatus.BAD_REQUEST);
                }

                existingUser.setUsername(newUsername);
                userRepository.save(existingUser);

                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

    @PutMapping("/updateUserPassword/{username}")
        public ResponseEntity<?> updateUserPassword(@PathVariable String username, @RequestBody TempUser tempUser) {
            Optional<User> userData = userRepository.findByUsername(username);

            if (userData.isPresent()) {
                User existingUser = userData.get();
            
              // check if the username in the request body matches the username in the URL path parameter
                if (!existingUser.getUsername().equals(tempUser.getUsername())) {
                    return new ResponseEntity<>("Username in URL path parameter does not match username in request body", HttpStatus.BAD_REQUEST);
                }

                //create a new user object with input password string to 
                //get new hashed password and salt

                User placeholderUser = new User(username, tempUser.getPasswordString(), null);
                String newHashedPassword = placeholderUser.getHashedPassword();
                byte[] newPasswordSalt = placeholderUser.getPasswordSalt();

                existingUser.setHashedPassword(newHashedPassword);
                existingUser.setPasswordSalt(newPasswordSalt);
                userRepository.save(existingUser);

                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }


    @DeleteMapping("/deleteUser/{username}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("username") String username) {
        try {
            userRepository.deleteByUsername(username);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
