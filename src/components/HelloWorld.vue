<template>
  <div class="container" style=" width:100%;margin:0">
    <el-button type="primary" @click="register"
    >register
    </el-button
    >
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
          <el-input v-model.number="ruleForm.username" prop="username"/>
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
        <el-table-column label="username" prop="username" min-width="30%"/>
        <el-table-column label="permissionId" prop="permissionId" min-width="30%"/>
        <el-table-column label="permissionName" prop="permissionName" min-width="30%"/>
        <el-table-column label="permissionUrl" prop="permissionUrl" min-width="35%"/>
        <el-table-column label="permissionPerms" prop="permissionPerms" min-width="35%"/>
        <!--        <el-table-column label="createTime" prop="createTime" min-width="20%"/>-->
        <!--        <el-table-column label="updateTime" prop="updateTime" min-width="20%"/>-->
        <!--        <el-table-column label="lastLoginTime" prop="lastLoginTime" min-width="20%"/>-->
        <el-table-column label="permissionOwner" prop="permissionOwner" min-width="30%"/>
        <el-table-column label="Modify" prop="Modify" min-width="30%">
          <template #default="scope">
            <!-- :disabled=!scope.row.permissionOwner-->
            <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
            >Modify
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

  <!-- 弹出注册界面 -->
  <el-dialog v-model="dialogFormVisible" title="Welcome">
    <el-form :model="registForm" :rules="regRule" ref="registFormRef">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="userId">
        <el-input v-model="registForm.userId" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="registForm.username" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="registForm.password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="email" :label-width="formLabelWidth" prop="email">
        <el-input v-model="registForm.email" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="registForm.phone" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="registForm.sex" placeholder="Select One" @change="handleSexSelect">
          <el-option label="GG" value="1"/>
          <el-option label="MM" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="age" :label-width="formLabelWidth">
        <el-input v-model="registForm.age" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="状态码" :label-width="formLabelWidth">
        <el-input v-model="registForm.status" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="registReq"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 弹出修改权限界面 -->
  <el-dialog v-model="dialogForm2Visible" title="Modify">
    <el-form :model="registForm" :rules="regRule" ref="registFormRef">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="userId">
        <el-input v-model="registForm.userId" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="registForm.username" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="registForm.password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="email" :label-width="formLabelWidth" prop="email">
        <el-input v-model="registForm.email" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="registForm.phone" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="registForm.sex" placeholder="Select One" @change="handleSexSelect">
          <el-option label="GG" value="1"/>
          <el-option label="MM" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="age" :label-width="formLabelWidth">
        <el-input v-model="registForm.age" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="状态码" :label-width="formLabelWidth">
        <el-input v-model="registForm.status" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="registReq"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>
<script setup lang="ts">
import {computed, ref, reactive, getCurrentInstance, provide} from 'vue'
import type {FormInstance} from 'element-plus'
import {ElMessage, ElMessageBox} from "element-plus";
import {FormItemProp} from "element-plus/es/components/form/src/form-item";

const formLabelWidth = '140px'
defineProps<{ msg: string }>()

const ruleFormRef = ref<FormInstance>()
const registFormRef = ref<FormInstance>()

const {proxy} = getCurrentInstance();
const tableData = ref([])

const dialogFormVisible = ref(false)
const dialogForm2Visible = ref(false)

const registForm = reactive({
  userId: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  sex: '',
  age: '',
  status: '',
})

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
  dialogForm2Visible.value = true;
}
const handleDelete = (index: number, row: permission) => {
  console.log(index, row)
  proxy.$axios({
    method: 'get',
    url: '/api/user/movePerm',
    params: {
      username: ruleForm.username,
      permId: row.permissionId,
    }
  }).then((res: any) => {
    console.log(res)
    tableData.value = res.data.data;
  })
}


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
const regRule = reactive({
  userId: [
    {required: true, message: '必填', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '必填', trigger: 'blur'},
    {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},

  ],
  password: [
    {required: true, message: '必填', trigger: 'blur'},
    {min: 8, max: 16, message: '8~16位长度', trigger: 'blur'},
    {pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\S]{8,16}', message: '必须包含大小写字母和数字', trigger: 'blur'},

  ],
  email: [
    {required: true, message: '必填', trigger: 'blur'},
    {type: 'email', message: '请输入正确有效的邮箱地址', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '必填', trigger: 'blur'},
    {pattern: '^1[3|4|5|7|8]\\d{9}$', message: '请输入正确有效的手机号码', trigger: 'blur'},
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
    url: '/api/login',
    params: {
      username: ruleForm.username,
      password: ruleForm.pass,
    }
  }).then((res: any) => {
    if (res.data.code == 200) {
      proxy.$axios({
        method: 'get',
        url: '/api/user/scanPerms',
        params: {
          name: ruleForm.username,
        }
      }).then((res: any) => {
        tableData.value = res.data.data;
      })
    } else {
      console.log(res.data)
      ElMessage({
        type: 'error',
        message: res.data.message
      })
    }
  });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const handleSexSelect = (val: any) => {
  registForm.sex = val;
}
const register = () => {
  dialogFormVisible.value = true;
}
const registReq = () => {
  registFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      dialogFormVisible.value = false;
      proxy.$axios({
        method: 'post',
        url: '/api/regist',
        params: {
          registForm
        }
      }).then((res: any) => {
        console.log(res.data)
        tableData.value = res.data.data;
      })
    } else {
      console.log("填全了吗，就nm注册")
    }
  })

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
