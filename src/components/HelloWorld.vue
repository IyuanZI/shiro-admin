<template>
  <div class="container" style=" width:100%;margin:0">
    <div class="card" style=" width:100%;margin:0">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model.number="ruleForm.username"/>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit
          </el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table" style=" width:100%;margin:0">
      <el-table :data="tableData" style=" width:100%;margin:0">
        <el-table-column label="username" prop="username" min-width="10%"/>
        <el-table-column label="permissionId" prop="permissionId" min-width="10%"/>
        <el-table-column label="permissionName" prop="permissionName" min-width="10%"/>
        <el-table-column label="permissionUrl" prop="permissionUrl" min-width="15%"/>
        <el-table-column label="permissionPerms" prop="permissionPerms" min-width="15%"/>
        <el-table-column label="createTime" prop="createTime" min-width="20%"/>
        <el-table-column label="updateTime" prop="updateTime" min-width="20%"/>
        <el-table-column label="lastLoginTime" prop="lastLoginTime" min-width="20%"/>
        <el-table-column label="permissionOwner" prop="permissionOwner" min-width="10%"/>
        <el-table-column label="edit" prop="edit" min-width="30%">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Go to
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >Delete
            </el-button
            >
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, ref, reactive, getCurrentInstance} from 'vue'
import type {FormInstance} from 'element-plus'
import {ElMessage, ElMessageBox} from "element-plus";

defineProps<{ msg: string }>()
const ruleFormRef = ref<FormInstance>()
const count = ref(0)
const {proxy} = getCurrentInstance();

interface permission {
  username: any
  permissionId: any
  permissionName: any
  permissionUrl: any
  createTime: any
  updateTime: any
  lastLoginTime: any
}

const handleEdit = (index: number, row: permission) => {
  proxy.$axios({
    method: 'get',
    url: '/api'+row.permissionUrl,
    // params: {
    //   username: ruleForm.username,
    //   password: ruleForm.pass,
    // }
  }).then((res: any) => {
    console.log(res)
  })

}
const handleDelete = (index: number, row: permission) => {
  console.log(index, row)
}

const tableData = ref([])

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.pass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    if (ruleForm.username !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  username: '',
})

const rules = reactive({
  pass: [
    {
      validator: validatePass,
      trigger: 'blur'
    }
  ],
  username: [
    {
      validator: validatePass2,
      trigger: 'blur'
    }
  ],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
  // 登录
  proxy.$axios({
    method: 'post',
    url: '/api/api/login',
    params: {
      username: ruleForm.username,
      password: ruleForm.pass,
    }
  }).then((res: any) => {
    if (res.data.code == 200) {
      proxy.$axios({
        method: 'get',
        url: '/api/admin/scan',
        params: {
          name: ruleForm.username,
        }
      }).then((res: any) => {
        tableData.value = res.data.data;
      })
    } else {
      ElMessage({
        type: 'erroe',
        message: res.data.message
      })
    }
  });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

div {
  width: 100%;
}
</style>
