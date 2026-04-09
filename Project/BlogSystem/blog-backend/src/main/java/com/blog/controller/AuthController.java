package com.blog.controller;

import com.blog.entity.User;
import com.blog.security.JwtTokenProvider;
import com.blog.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "用户认证接口")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @Operation(summary = "用户登录")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("=== Login Request ===");
            System.out.println("Username: " + loginRequest.getUsername());
            System.out.println("Password: " + loginRequest.getPassword());
            System.out.println();

            // Check if user exists
            System.out.println("=== Finding User ===");
            User user = userService.findByUsername(loginRequest.getUsername());
            if (user == null) {
                System.out.println("User not found: " + loginRequest.getUsername());
            } else {
                System.out.println("User found: " + user.getUsername());
                System.out.println("Email: " + user.getEmail());
                System.out.println("Role: " + user.getRole());
                System.out.println("Stored password: " + user.getPassword());
                System.out.println("Password matches: " + passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()));
            }
            System.out.println();

            System.out.println("=== Authenticating ===");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            System.out.println("Authentication successful: " + authentication.getName());
            System.out.println("Authorities: " + authentication.getAuthorities());
            System.out.println();

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);
            String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);

            Map<String, String> tokens = new HashMap<>();
            tokens.put("token", token);
            tokens.put("refreshToken", refreshToken);

            System.out.println("=== Login Success ===");
            System.out.println("Token: " + token);
            System.out.println("Refresh Token: " + refreshToken);
            System.out.println();

            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            System.out.println("=== Login Error ===");
            System.out.println("Error message: " + e.getMessage());
            System.out.println("Stack trace:");
            e.printStackTrace();
            System.out.println();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    @Operation(summary = "用户注册")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.findByUsername(registerRequest.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Username already exists");
            }

            User user = userService.register(
                    registerRequest.getUsername(),
                    registerRequest.getPassword(),
                    registerRequest.getEmail(),
                    registerRequest.getNickname()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/refresh")
    @Operation(summary = "刷新 Token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            // TODO: 实现 Token 刷新逻辑
            return ResponseEntity.ok("Token refreshed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid refresh token");
        }
    }

    @GetMapping("/me")
    @Operation(summary = "获取当前用户信息")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = userService.findByUsername(authentication.getName());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not authenticated");
        }
    }

    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String nickname;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }
    }

    static class RefreshTokenRequest {
        private String refreshToken;

        public String getRefreshToken() {
            return refreshToken;
        }

        public void setRefreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
        }
    }

    static class ResetPasswordRequest {
        private String username;
        private String newPassword;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

    @PostMapping("/reset-password")
    @Operation(summary = "重置密码")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        try {
            System.out.println("=== Resetting Password ===");
            System.out.println("Username: " + resetPasswordRequest.getUsername());
            System.out.println("New password: " + resetPasswordRequest.getNewPassword());
            System.out.println();

            boolean success = userService.updatePassword(resetPasswordRequest.getUsername(), resetPasswordRequest.getNewPassword());

            if (success) {
                System.out.println("=== Password Reset Success ===");
                System.out.println("Username: " + resetPasswordRequest.getUsername());
                System.out.println();
                return ResponseEntity.ok("Password reset successful");
            } else {
                System.out.println("=== Password Reset Failed ===");
                System.out.println("User not found: " + resetPasswordRequest.getUsername());
                System.out.println();
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }
        } catch (Exception e) {
            System.out.println("=== Password Reset Error ===");
            System.out.println("Error message: " + e.getMessage());
            System.out.println("Stack trace:");
            e.printStackTrace();
            System.out.println();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Password reset failed: " + e.getMessage());
        }
    }
}
