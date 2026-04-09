package com.blog.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class UpdatePassword {

    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/blog?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
        String username = "root";
        String password = "12345678";

        try {
            // 加载 MySQL 驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立数据库连接
            Connection connection = DriverManager.getConnection(url, username, password);

            // 先查询当前密码
            System.out.println("查询当前密码：");
            String selectSql = "SELECT password FROM user WHERE username = ?";
            PreparedStatement selectStmt = connection.prepareStatement(selectSql);
            selectStmt.setString(1, "admin");
            var result = selectStmt.executeQuery();
            if (result.next()) {
                System.out.println("当前密码：" + result.getString("password"));
            }
            selectStmt.close();

            // 更新密码
            String updateSql = "UPDATE user SET password = ? WHERE username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(updateSql);
            String newPassword = "$2a$10$r7UllZvMboXMmFpCHjWwqeQcTfLR6UhKZx2jpJOT7JifxxsabmPQa";
            preparedStatement.setString(1, newPassword);
            preparedStatement.setString(2, "admin");
            int affectedRows = preparedStatement.executeUpdate();
            System.out.println("密码更新成功，影响行数：" + affectedRows);

            // 再次查询密码，验证更新是否成功
            System.out.println("\n验证密码更新：");
            selectStmt = connection.prepareStatement(selectSql);
            selectStmt.setString(1, "admin");
            result = selectStmt.executeQuery();
            if (result.next()) {
                System.out.println("更新后的密码：" + result.getString("password"));
                System.out.println("密码匹配：" + result.getString("password").equals(newPassword));
            }
            selectStmt.close();

            // 关闭资源
            preparedStatement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
