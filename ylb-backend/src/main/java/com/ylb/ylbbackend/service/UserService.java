package com.ylb.ylbbackend.service;


import com.ylb.ylbbackend.domain.entities.User;
import com.ylb.ylbbackend.repository.UsersRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Resource
    private UsersRepository usersRepository;

    public List<User> findAll() {
        return usersRepository.findAll();
    }

    public User save(User user) {
        return usersRepository.save(user);
    }

    public User update(User user) {
        return usersRepository.save(user); // JPA会自动处理更新
    }

    public void delete(Integer id) {
        usersRepository.deleteById(id);
    }

    public User findByUsername(String username) {
        return usersRepository.findByUsername(username);
    }
}