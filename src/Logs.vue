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
    <el-input placeholder="Filter (not remote)" v-model="filter"></el-input>
    <el-table :data="table" stripe style="width: 100%" v-loading="loading" :default-sort="{prop: 'timestamp', order: 'descending'}">
      <el-table-column prop="timestamp" label="timestamp" width="180" sortable></el-table-column>
      <el-table-column prop="log_stream_name" label="log_stream_name" width="180"></el-table-column>
      <el-table-column prop="message" label="message"></el-table-column>
    </el-table>
    <p v-if="logs[group] && !logs[group].length">
      No logs found for {{ group }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { Input, Select, Option, Table, TableColumn } from 'element-ui'

export default {
  name: 'groups',
  components: {
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]:  Table,
    [TableColumn.name]: TableColumn,
  },
  data () {
    return {
      loading: false,
      filter: ''
    }
  },
  computed: {
    ...mapState(['logs', 'groups']),
    ...mapState({
      group: (state) => state.route.query.log_group_name,
    }),
    table () {
      if (this.logs[this.group]) {
        return this.logs[this.group]
          .filter(({ log_stream_name, message }) => !this.filter || log_stream_name.includes(this.filter) || message.includes(this.filter))
          .map(({ log_stream_name, timestamp, message }) => ({
            log_stream_name,
            message,
            timestamp: new Date(timestamp).toLocaleString(),
          }))
      }
    }
  },
  methods: {
    ...mapActions(['fetchGroups', 'fetchLogs']),
    async fetchLogsWithLoading (group) {
      this.loading = true
      try {
        await this.fetchLogs(group)
      } finally {
        this.loading = false
      }
    },
    async handleChangeGroup (value) {
      this.$router.replace({ path: '/logs', query: { log_group_name: value } })
      await this.fetchLogsWithLoading(value)
    }
  },
  async mounted () {
    if (this.group) {
      await this.fetchLogsWithLoading(this.group)
    }
    await this.fetchGroups()
  }
}
</script>
