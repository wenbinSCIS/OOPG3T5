package com.mongodb.quickstart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.quickstart.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUsernameContaining(String username);
    List<User> findByUserType(String userType);
    Optional<User> findByUsername(String username);
    void deleteByUsername(String userName);
}
