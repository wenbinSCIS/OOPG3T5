package com.mongodb.quickstart.controller;

import java.util.ArrayList;
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
import com.mongodb.quickstart.models.AdministrativePersonnel.CreatedForm;
import com.mongodb.quickstart.models.AdministrativePersonnel.VendorForm;
import com.mongodb.quickstart.models.Approver;
import com.mongodb.quickstart.models.TempUser;
import com.mongodb.quickstart.models.User;
import com.mongodb.quickstart.models.Vendor;
import com.mongodb.quickstart.models.Vendor.AssignedForm;
import com.mongodb.quickstart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    
    @Autowired
    UserRepository userRepository;

    @PostMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/getUserByName")
    public ResponseEntity<User> getUserByName(@RequestBody TempUser tempUser) {
        Optional<User> userData = userRepository.findByUsername(tempUser.getUsername());
    
        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    @PostMapping("/getUserByUserType")
    public ResponseEntity<List<User>> getUserByUserType(@RequestBody TempUser tempUser) {
        List<User> users = userRepository.findByUserType(tempUser.getUserType());

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
            AdministrativePersonnel newAdmin = new AdministrativePersonnel(tempUser.getUsername(), tempUser.getPasswordString(),tempUser.getCreatedForm(),tempUser.getVendorForm());
            AdministrativePersonnel _user = userRepository.save(newAdmin);
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        }
        else if (userType.equals("Approver"))
        {
            Approver newApprover = new Approver(tempUser.getUsername(), tempUser.getPasswordString(),tempUser.getCreatedForm(),tempUser.getVendorForm());
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
    

//update vendor form for vendor object
    @PutMapping("/updateVendorAssignedForm")
        public ResponseEntity<?> updateVendorAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                existingUser.setAssignedForms(vendor.getAssignedForms());
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

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
            
            ArrayList<VendorForm> currentList = existingUser.getVendorForm();

            for(int i=0;i<currentList.size();i++)
            {
                VendorForm currentForm = currentList.get(i);
                String currentName = currentForm.getFormName();
                double currentVersion = currentForm.getFormVersion();
                if(currentName.equals(updateName) && currentVersion==updateVersion)
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

    @PutMapping("/updateUsername/{username}")
        public ResponseEntity<?> updateUsername(@PathVariable("username") String username, @RequestBody TempUser tempUser) {
            Optional<User> userData = userRepository.findByUsername(username);

            if (userData.isPresent()) {
                User existingUser = userData.get();

                Optional<User> userDataCheck = userRepository.findByUsername(tempUser.getUsername());

                if (userDataCheck.isPresent()) {
                    return new ResponseEntity<>("User with the given username already exists", HttpStatus.CONFLICT);
                }

              // check if the username in the request body matches the username in the URL path parameter

                existingUser.setUsername(tempUser.getUsername());
                userRepository.save(existingUser);

                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

    @PutMapping("/updateUserPassword")
        public ResponseEntity<?> updateUserPassword( @RequestBody TempUser tempUser) {
            Optional<User> userData = userRepository.findByUsername(tempUser.getUsername());

            if (userData.isPresent()) {
                User existingUser = userData.get();
            
              // check if the username in the request body matches the username in the URL path parameter
                if (!existingUser.getUsername().equals(tempUser.getUsername())) {
                    return new ResponseEntity<>("Username in URL path parameter does not match username in request body", HttpStatus.BAD_REQUEST);
                }

                //create a new user object with input password string to 
                //get new hashed password and salt

                User placeholderUser = new User(tempUser.getUsername(), tempUser.getPasswordString(), null);
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


    @DeleteMapping("/deleteUser")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody TempUser tempUser) {
        try {
            userRepository.deleteByUsername(tempUser.getUsername());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/userLogIn")
        public ResponseEntity<?> userLogIn(@RequestBody TempUser tempUser) {
            String username = tempUser.getUsername();
            Optional<User> userData = userRepository.findByUsername(username);

            if (userData.isPresent()) {
                User existingUser = userData.get();

              // check if the username in the request body matches the username in the URL path parameter

                Boolean isCorrectPassword = existingUser.comparePassword(tempUser.getPasswordString());
                if (isCorrectPassword)
                {
                    if (existingUser instanceof Vendor)
                    {
                        Vendor existingVendor = (Vendor) existingUser;
                        Vendor logInUser = new Vendor(existingVendor.getUsername(),existingVendor.getAssignedForms());
                        return new ResponseEntity<>(logInUser,HttpStatus.OK);
                    }
                    else if(existingUser instanceof Approver)
                    {
                        Approver existingApprover = (Approver) existingUser;
                        Approver logInUser = new Approver(existingApprover.getUsername(),existingApprover.getCreatedForm(),existingApprover.getVendorForm());
                        return new ResponseEntity<>(logInUser,HttpStatus.OK);
                    }
                    else if(existingUser instanceof AdministrativePersonnel)
                    {
                        AdministrativePersonnel existingAdministrativePersonnel = (AdministrativePersonnel) existingUser;
                        AdministrativePersonnel logInUser = new AdministrativePersonnel(existingAdministrativePersonnel.getUsername(),existingAdministrativePersonnel.getCreatedForm(),existingAdministrativePersonnel.getVendorForm());
                        return new ResponseEntity<>(logInUser,HttpStatus.OK);
                    }
                }

                return new ResponseEntity<>(isCorrectPassword, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
}
