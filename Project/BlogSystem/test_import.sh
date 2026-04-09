#!/bin/bash

# 测试文章导入功能
BASE_URL="http://localhost:8080/api"
LOGIN_URL="${BASE_URL}/auth/login"
IMPORT_URL="${BASE_URL}/articles/import"

# 登录获取token
echo "正在登录..."
RESPONSE=$(curl -s -X POST ${LOGIN_URL} \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "登录成功，token: ${TOKEN:0:20}..."

# 测试文章导入
echo "正在测试文章导入功能..."
RESULT=$(curl -s -X POST ${IMPORT_URL} \
  -H "Authorization: Bearer ${TOKEN}" \
  -F "file=@/Users/seven/Study/Study/Project/BlogSystem/test2.md")

if [ $? -eq 0 ]; then
  echo "文章导入成功！"
  echo "响应结果：${RESULT}"
else
  echo "文章导入失败！"
fi

# 删除测试文件
rm -f /Users/seven/Study/Study/Project/BlogSystem/test2.md