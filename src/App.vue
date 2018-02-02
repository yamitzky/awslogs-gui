<template>
  <div>
    <el-menu mode="horizontal" :default-active="$route.path" router>
      <el-menu-item index="/">Groups</el-menu-item>
      <el-menu-item index="/streams">Streams</el-menu-item>
      <el-menu-item index="/logs">Logs</el-menu-item>
    </el-menu>
    <div class="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'element-ui'

export default {
  name: 'app',
  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .router-container {
    padding-top: 1em;
  }
</style>
