<template>
  <div>
    <el-input placeholder="Group name filter (not remote)" v-model="filter"></el-input>
    <ul v-loading="loading && !groups.length">
      <li v-for="group in filteredGroups">
        <router-link :to="{ path: '/streams', query: { log_group_name: group} }">{{ group }}</router-link>
        [<router-link :to="{ path: '/logs', query: { log_group_name: group} }">logs</router-link>]
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { Input } from 'element-ui'

export default {
  name: 'groups',
  components: {
    [Input.name]: Input
  },
  data () {
    return {
      loading: false,
      filter: ''
    }
  },
  computed: {
    ...mapState(['groups']),
    filteredGroups () {
      return this.groups.filter((group) => group.includes(this.filter))
    }
  },
  methods: {
    async fetchGroups () {
      this.loading = true
      try {
        await this.$store.dispatch('fetchGroups')
      } finally {
        this.loading = false
      }
    }
  },
  async mounted () {
    await this.fetchGroups()
  }
}
</script>
