<template>
  <div class="">
    <el-button type="primary" @click="login">Login</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {},
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', this.loginForm)
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style scoped lang="scss"></style>
