<template>
  <v-app>
    <v-main>
      <v-container fluid px-0>
        <search-engine-table />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SearchEngineTable from '~/components/SearchEngineTable.vue'

export default defineComponent({
  components: {
    SearchEngineTable,
  },
})
</script>

<style lang="scss" scoped>
.v-application {
  width: 640px;
}
</style>
