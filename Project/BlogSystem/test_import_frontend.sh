#!/bin/bash

# 测试前端文章导入功能
BASE_URL="http://localhost:5176"
LOGIN_URL="http://localhost:8080/api/auth/login"
IMPORT_URL="http://localhost:8080/api/articles/import"

# 登录获取token
echo "正在登录..."
RESPONSE=$(curl -s -X POST ${LOGIN_URL} \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "登录成功，token: ${TOKEN:0:20}..."

# 创建测试文章
echo "正在创建测试文章..."
cat > /Users/seven/Study/Study/Project/BlogSystem/test3.md << 'EOF'
# 测试文章3

这是一篇测试文章，用于验证前端文章导入功能是否正常工作。

## 章节一

这是章节一的内容。

## 章节二

这是章节二的内容。

### 子章节

这是子章节的内容。
EOF

# 测试文章导入
echo "正在测试文章导入功能..."
RESULT=$(curl -s -X POST ${IMPORT_URL} \
  -H "Authorization: Bearer ${TOKEN}" \
  -F "file=@/Users/seven/Study/Study/Project/BlogSystem/test3.md")

if [ $? -eq 0 ]; then
  echo "文章导入成功！"
  echo "响应结果：${RESULT}"
else
  echo "文章导入失败！"
  echo "响应结果：${RESULT}"
fi

# 删除测试文件
rm -f /Users/seven/Study/Study/Project/BlogSystem/test3.md