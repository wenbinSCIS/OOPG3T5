package com.mongodb.quickstart.controller;

import com.mongodb.quickstart.models.AdministrativePersonnel;
import com.mongodb.quickstart.models.Approver;
import com.mongodb.quickstart.models.TempUser;
import com.mongodb.quickstart.models.User;
import com.mongodb.quickstart.models.Vendor;
import com.mongodb.quickstart.repository.UserRepository;

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

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/user")

public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/getAllUser")
  public ResponseEntity<List<User>> getAllUser(@RequestParam(required = false) String username) {
    try {
        List<User> users = new ArrayList<User>();
        userRepository.findAll().forEach(users::add);
        if (users.isEmpty()) {
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @GetMapping("/getUserByName/{username}")
  public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
    Optional<User> userData = userRepository.findByUsername(username);
  
    if (userData.isPresent()) {
      return new ResponseEntity<>(userData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/getUserByUserType/{userType}")
  public ResponseEntity<List<User>> getUserByUserType(@PathVariable("userType") String userType) {
    try {
      List<User> userList = userRepository.findByUserType(userType);

      if (userList.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      else{
        return new ResponseEntity<>(userList, HttpStatus.OK);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/forceCreateUser")
    public ResponseEntity<User> forceCreateUser(@RequestBody TempUser tempUser) {
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
          Vendor newVendor = new Vendor(tempUser.getUsername(), tempUser.getPasswordString());
          Vendor _user = userRepository.save(newVendor);
          return new ResponseEntity<>(_user, HttpStatus.CREATED);
        }

    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return null;
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
          Vendor newVendor = new Vendor(tempUser.getUsername(), tempUser.getPasswordString());
          Vendor _user = userRepository.save(newVendor);
          System.out.println(newVendor.getHashedPassword());
          return new ResponseEntity<>(_user, HttpStatus.CREATED);
        }
      } catch (Exception e) {
          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @DeleteMapping("/deleteUserByUsername/{username}")
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable("username") String username) {
    try {
      userRepository.deleteByUsername(username);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  


}