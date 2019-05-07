<template>
  <v-data-table
    :headers="headers"
    :items="searchEngines"
    class="search-engine-table"
    hide-actions
  >
    <search-engine-table-header-row
      slot="headers"
      slot-scope="props"
      :headers="props.headers"
    />
    <search-engine-table-row
      slot="items"
      :key="props.item.id"
      slot-scope="props"
      :item="props.item"
    />
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import SearchEngineTableHeaderRow from './SearchEngineTableHeaderRow'
import SearchEngineTableRow from './SearchEngineTableRow'

export default {
  components: {
    SearchEngineTableHeaderRow,
    SearchEngineTableRow
  },
  data() {
    return {
      headers: [{ text: 'Name' }, { text: 'Query URL' }, { text: 'Actions' }]
    }
  },
  computed: {
    ...mapState(['searchEngines'])
  }
}
</script>
