package com.mongodb.quickstart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.quickstart.models.AdministrativePersonnel;
import com.mongodb.quickstart.models.User;
import com.mongodb.quickstart.models.Vendor;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUsernameContaining(String username);
    List<User> findByUserType(String userType);
    Optional<User> findByUsername(String username);
    void deleteByUsername(String userName);
    Optional<Vendor> findVendorByUsername(String formName, String userType);
}
