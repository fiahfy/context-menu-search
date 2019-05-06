<template>
  <tr class="search-engine-table-header-row">
    <th v-for="header in headers" :key="header.text" class="text-xs-left">
      {{ header.text }}
    </th>
  </tr>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    }
  }
}
</script>
