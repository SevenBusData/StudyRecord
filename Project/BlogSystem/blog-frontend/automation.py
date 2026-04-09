from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

def main():
    # 设置 Chrome 驱动
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    try:
        # 打开登录页面
        driver.get("http://localhost:5175/login")
        time.sleep(2)

        # 输入用户名和密码
        username_input = driver.find_element(By.ID, "username")
        password_input = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), '登录')]")

        # 打印输入框属性
        print("用户名输入框属性：")
        print("  可见性：", username_input.is_displayed())
        print("  可点击性：", username_input.is_enabled())
        print("  标签：", username_input.tag_name)
        print("  属性：", username_input.get_attribute("outerHTML"))

        print("\n密码输入框属性：")
        print("  可见性：", password_input.is_displayed())
        print("  可点击性：", password_input.is_enabled())
        print("  标签：", password_input.tag_name)
        print("  属性：", password_input.get_attribute("outerHTML"))

        print("\n登录按钮属性：")
        print("  可见性：", login_button.is_displayed())
        print("  可点击性：", login_button.is_enabled())
        print("  标签：", login_button.tag_name)
        print("  属性：", login_button.get_attribute("outerHTML"))

        username_input.send_keys("admin")
        password_input.send_keys("admin123")
        login_button.click()
        time.sleep(5)

        # 等待页面加载完成
        time.sleep(2)

        # 打印页面标题
        print("\n页面标题：", driver.title)

        # 打印当前 URL
        print("当前 URL：", driver.current_url)

        # 打印浏览器控制台日志
        print("\n浏览器控制台日志：")
        for entry in driver.get_log('browser'):
            print(f"[{entry['level']}] {entry['message']}")

        # 截图保存
        driver.save_screenshot("login_result.png")
        print("截图已保存为 login_result.png")

        # 打印页面源代码
        print("\n页面源代码片段：")
        print(driver.page_source[:1000])

        # 验证登录是否成功
        if "localhost:5175/" == driver.current_url or "localhost:5175" in driver.current_url and not "login" in driver.current_url:
            print("登录成功！")
        else:
            print("登录失败！")
            return

        # 打开文章管理页面
        driver.get("http://localhost:5175/admin/articles")
        time.sleep(2)

        # 验证文章管理页面是否正常加载
        if "articles" in driver.current_url:
            print("文章管理页面加载成功！")

            # 检查是否显示文章数据
            no_articles_text = driver.find_elements(By.XPATH, "//td[contains(text(), '暂无文章')]")
            if no_articles_text:
                print("文章管理页面显示暂无文章！")
            else:
                print("文章管理页面显示文章数据！")

                # 打印文章标题
                articles = driver.find_elements(By.XPATH, "//tbody/tr/td[1]")
                for i, article in enumerate(articles, 1):
                    print(f"文章 {i}: {article.text}")
        else:
            print("文章管理页面加载失败！")

    except Exception as e:
        print(f"自动化操作失败：{e}")
    finally:
        # 关闭浏览器
        driver.quit()

if __name__ == "__main__":
    main()
