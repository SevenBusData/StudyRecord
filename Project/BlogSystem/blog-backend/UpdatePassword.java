import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class UpdatePassword {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/blog?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true";
            String username = "root";
            String password = "12345678";
            String newEncryptedPassword = "$2a$10$o.WZVHk3AQpQ2IlqTarsuO30oyaVLaN5MvDeczjxKibAf6trzVswO";

            try (Connection connection = DriverManager.getConnection(url, username, password)) {
                String sql = "UPDATE user SET password = ? WHERE username = 'admin'";
                try (PreparedStatement statement = connection.prepareStatement(sql)) {
                    statement.setString(1, newEncryptedPassword);
                    int rowsUpdated = statement.executeUpdate();
                    System.out.println("Rows updated: " + rowsUpdated);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
