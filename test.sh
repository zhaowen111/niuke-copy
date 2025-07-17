#!/bin/bash

# 定义目标目录
TARGET_DIR="src/views/Home/Children"

# 创建目录（如果不存在）
mkdir -p "$TARGET_DIR"

# 要创建的文件列表（基于你的路由数据）
FILES=(
  "Attention.vue" "Recommend.vue" "AutumnRecruitment.vue" "HotList.vue"
  "InternalReferral.vue" "Workplace.vue" "JobHunting.vue" "KnowledgeSharing.vue"
  "Salary.vue" "Interview.vue" "FrontEnd.vue" "Java.vue" "Cpp.vue"
  "ProductManager.vue" "Algorithm.vue" "Operation.vue" "Testing.vue"
  "DataAnalyst.vue" "WebFrontEnd.vue" "Finance.vue" "DevOps.vue"
  "BackEnd.vue" "Android.vue" "Automation.vue" "BigDataDev.vue"
)

# 为每个文件创建基础模板
for file in "${FILES[@]}"; do
  # 提取路由名字（去掉.vue扩展名）
  route_name="${file%.vue}"
  
  # 写入文件内容
  cat > "$TARGET_DIR/$file" <<EOF
<script>
export default {
  props: {},
  data() {
    return {}
  },
}
</script>

<template>
  <div>$route_name</div>
</template>

<style scoped></style>
EOF

  echo "Created: $TARGET_DIR/$file"
done

echo "All Vue files created successfully!"