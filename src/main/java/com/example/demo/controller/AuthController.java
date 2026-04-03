package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User saved = userService.register(user);
        if (saved == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        return ResponseEntity.ok(Map.of(
            "message", "Registered successfully",
            "id", saved.getId(),
            "name", saved.getName(),
            "email", saved.getEmail()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        User user = userService.login(email, password);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email or password"));
        }
        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail()
        ));
    }
}