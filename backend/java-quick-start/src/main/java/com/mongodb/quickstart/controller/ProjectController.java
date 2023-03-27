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

import com.mongodb.quickstart.models.AssignedForm;
import com.mongodb.quickstart.models.Project;
import com.mongodb.quickstart.models.Vendor;
import com.mongodb.quickstart.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class ProjectController {

    
    @Autowired
    UserRepository userRepository;

//update project list for vendor
    @PutMapping("/updateProjectList")
        public ResponseEntity<?> updateProjectList(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> newProjectList = vendor.getProject();

                existingUser.setProject(newProjectList);
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    @PutMapping("/appendProject")
        public ResponseEntity<?> appendProject(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);
                Project addProject = new Project(newProject.getProjectName(), newProject.getAssignedForm(), newProject.getStatus());
                projectList.add(addProject);
                existingUser.setProject(projectList);
                userRepository.save(existingUser);
                return new ResponseEntity<>(existingUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("/updateProject")
        public ResponseEntity<?> updateProject(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);

                for(int i=0;i<projectList.size();i++)
                {
                    Project curProject = projectList.get(i);

                    if (curProject.getProjectId().equals(newProject.getProjectId())&&curProject.getProjectName().equals(newProject.getProjectName()))
                    {
                        projectList.set(i, newProject);
                        existingUser.setProject(projectList);
                        userRepository.save(existingUser);
                        return new ResponseEntity<>(existingUser, HttpStatus.OK);
                    }
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("/deleteProject")
        public ResponseEntity<?> deleteProject(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);

                for(int i=0;i<projectList.size();i++)
                {
                    Project curProject = projectList.get(i);

                    if (curProject.getProjectId().equals(newProject.getProjectId())&&curProject.getProjectName().equals(newProject.getProjectName()))
                    {
                        projectList.remove(i);
                        existingUser.setProject(projectList);
                        userRepository.save(existingUser);
                        return new ResponseEntity<>(existingUser, HttpStatus.OK);
                    }
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

//update assigned form list of a project of a vendor
    @PutMapping("/updateAssignedFormList")
        public ResponseEntity<?> updateAssignedFormList(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);

                for(int i=0;i<projectList.size();i++)
                {
                    Project curProject = projectList.get(i);

                    if (curProject.getProjectId().equals(newProject.getProjectId())&&curProject.getProjectName().equals(newProject.getProjectName()))
                    {
                        curProject.setAssignedForm(newProject.getAssignedForm());;
                        userRepository.save(existingUser);
                        return new ResponseEntity<>(existingUser, HttpStatus.OK);
                    }
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

    @PutMapping("/appendAssignedForm")
        public ResponseEntity<?> appendAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);
                AssignedForm newAssignedForm = newProject.getAssignedForm().get(0);

                for(int i=0;i<projectList.size();i++)
                {
                    Project curProject = projectList.get(i);

                    if (curProject.getProjectId().equals(newProject.getProjectId())&&curProject.getProjectName().equals(newProject.getProjectName()))
                    {
                        curProject.getAssignedForm().add(newAssignedForm);
                        existingUser.setProject(projectList);
                        userRepository.save(existingUser);
                        return new ResponseEntity<>(existingUser, HttpStatus.OK);
                    }
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("/updateAssignedForm")
        public ResponseEntity<?> updateAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);
                AssignedForm newAssignedForm = newProject.getAssignedForm().get(0);

                for(int i=0;i<projectList.size();i++)
                {
                    Project curProject = projectList.get(i);

                    if (curProject.getProjectId().equals(newProject.getProjectId())&&curProject.getProjectName().equals(newProject.getProjectName()))
                    {
                        for(int j=0;j<curProject.getAssignedForm().size();j++)
                        {
                            AssignedForm curAssignedForm = curProject.getAssignedForm().get(j);

                            if(curAssignedForm.getFormName().equals(newAssignedForm.getFormName()))
                            {
                                curProject.getAssignedForm().set(j, newAssignedForm);
                                existingUser.setProject(projectList);
                                userRepository.save(existingUser);
                                return new ResponseEntity<>(existingUser, HttpStatus.OK);
                            }
                        }
                    }
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PutMapping("/deleteAssignedForm")
        public ResponseEntity<?> deleteAssignedForm(@RequestBody Vendor vendor) {
            Optional<Vendor> userData = userRepository.findVendorByUsername(vendor.getUsername(),"Vendor");

            if (userData.isPresent()) {
                Vendor existingUser = userData.get();
                ArrayList<Project> projectList = existingUser.getProject();
                Project newProject = vendor.getProject().get(0);
                AssignedForm newAssignedForm = newProject.getAssignedForm().get(0);

                for(int i=0;i<projectList.size();i++)
                {
                    Project curProject = projectList.get(i);

                    if (curProject.getProjectId().equals(newProject.getProjectId())&&curProject.getProjectName().equals(newProject.getProjectName()))
                    {
                        for(int j=0;j<curProject.getAssignedForm().size();j++)
                        {
                            AssignedForm curAssignedForm = curProject.getAssignedForm().get(j);

                            if(curAssignedForm.getFormName().equals(newAssignedForm.getFormName())&&curAssignedForm.getFormVersion()==newAssignedForm.getFormVersion())
                            {
                                curProject.getAssignedForm().remove(j);
                                existingUser.setProject(projectList);
                                userRepository.save(existingUser);
                                return new ResponseEntity<>(existingUser, HttpStatus.OK);
                            }
                        }
                    }
                }
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
