<template>
  <div class="form">
    <el-form :rules="rules" ref="form" :model="form" label-width="100px">
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程等级" prop="level">
        <el-select v-model="form.level" placeholder="请选择课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报名人数" prop="count">
        <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>
      <el-form-item label="上线时间" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="技术栈" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="小程序" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" @click="submitForm('form')" type="primary">创建课程</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Form",
  data() {
    return {
      form: {
        title: "",
        type: "",
        level: "",
        count: "",
        date: ""
      },
      loading: false,
      rules: {
        title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        level: [
          { required: true, message: "请选择课程等级", trigger: "change" }
        ],
        count: [
          { required: true, message: "请输入报名人数", trigger: "blur" },
        ],
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择技术栈",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        this.loading = true
        // 校验成功，发送请求
        if (valid) {
          this.$axios.post(`api/profiles/add`, this.form)
          .then(res => {
            // console.log(res.data);
            this.loading = false;
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            // 添加成功后，重置输入框
            this.resetForm(form);
          })
          .catch(() => {
            this.loading = false;
          })
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  background-color: #fff;
  padding: 20px;
  height: 500px;;
  margin-bottom: 10px;
}
</style>
