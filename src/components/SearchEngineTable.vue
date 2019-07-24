<template>
  <v-data-table
    :headers="headers"
    :items="searchEngines"
    hide-default-footer
    :mobile-breakpoint="0"
  >
    <search-engine-table-row
      slot="item"
      :key="props.item.id"
      slot-scope="props"
      :item="props.item"
    />
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import SearchEngineTableRow from './SearchEngineTableRow'

export default {
  components: {
    SearchEngineTableRow
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Query URL', value: 'url' },
        { text: 'Actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState(['searchEngines'])
  }
}
</script>
