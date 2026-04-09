package com.blog.service;

import com.blog.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

public interface UserService extends IService<User> {

    User findByUsername(String username);

    User register(String username, String password, String email, String nickname);

    User login(String username, String password);
    boolean updatePassword(String username, String newPassword);
}
