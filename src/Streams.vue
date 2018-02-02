<template>
  <div>
    <el-select :value="group" placeholder="Select group name" filterable @change="handleChangeGroup">
      <el-option
        v-for="group in groups"
        :key="group"
        :label="group"
        :value="group"
        >
      </el-option>
    </el-select>
    <ul v-loading="loading">
      <li v-for="stream in streams[group]">{{ stream }}</li>
    </ul>
    <p v-if="streams[group] && !streams[group].length">
      No stream found for {{ group }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { Select, Option } from 'element-ui'

export default {
  name: 'streams',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState(['streams', 'groups']),
    ...mapState({
      group: (state) => state.route.query.log_group_name,
    })
  },
  methods: {
    ...mapActions(['fetchGroups', 'fetchStreams']),
    async fetchStreamsWithLoading (group) {
      this.loading = true
      try {
        await this.fetchStreams(group)
      } finally {
        this.loading = false
      }
    },
    async handleChangeGroup (value) {
      this.$router.replace({ path: '/streams', query: { log_group_name: value } })
      await this.fetchStreamsWithLoading(value)
    }
  },
  async mounted () {
    if (this.group) {
      await this.fetchStreamsWithLoading(this.group)
    }
    await this.fetchGroups()
  }
}
</script>
