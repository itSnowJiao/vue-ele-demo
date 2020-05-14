<template>
  <div class="edit-data">
    <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      title="编辑课程"
      :visible.sync="dialog"
    >
      <el-form
        :rules="rules"
        :model="formData"
        ref="form"
        label-width="100px"
        size="small"
        class="form-dialog"
      >
        <el-form-item label="课程名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程等级" prop="level">
          <el-select v-model="formData.level" placeholder="请选择课程等级">
            <el-option label="初级" value="初级"></el-option>
            <el-option label="中级" value="中级"></el-option>
            <el-option label="高级" value="高级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报名人数" prop="count">
          <el-input v-model="formData.count" placeholder="请输入报名人数"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" prop="date">
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            v-model="formData.date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="技术栈" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="vue" name="type"></el-radio>
            <el-radio label="react" name="type"></el-radio>
            <el-radio label="angular" name="type"></el-radio>
            <el-radio label="node" name="type"></el-radio>
            <el-radio label="小程序" name="type"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeDialog')" size="small">取消</el-button>
        <el-button :loading="isLoading" @click="submitForm('form')" size="small" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        title: { required: true, message: "请输入课程名称", trigger: "blur" },
        level: { required: true, message: "请输入课程等级", trigger: "change" },
        count: [
          { required: true, message: "请输入报名人数", trigger: "blur" },
        ],
        date: { required: true, message: "请选择上线时间", trigger: "change" },
        type: { required: true, message: "请选择技术栈", trigger: "change" }
      },
      isLoading: false
    };
  },
  props: ["formData", "dialog"],
  created() {
    //   console.log(this.formData,this.dialog)
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .post(`/api/profiles/edit/${this.formData._id}`,this.formData)
            .then(res => {
              console.log(res.data);
              //   成功后，执行关闭dialog的操作
              this.$emit("closeDialog");
              //   提示
              this.$message({
                message: res.data.msg,
                type: "success"
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>