<template>
  <tr class="search-engine-table-row" :class="classes">
    <td @click.stop>
      <v-simple-checkbox
        :value="isSelected"
        :ripple="false"
        @input="handleSelect"
      />
    </td>
    <td :class="nameClasses" v-text="name" />
    <td :class="urlClasses" v-text="url" />
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { SearchEngine } from '~/models'

type Props = {
  item: SearchEngine
  isSelected: boolean
  select: (v: boolean) => void
}

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    select: {
      type: Function,
      required: true,
    },
  },
  setup(props: Props) {
    const classes = computed(() => {
      return props.isSelected ? 'v-data-table__selected' : ''
    })

    const nameClasses = () => {
      return {
        name: true,
        ellipsis: true,
        'grey--text': !props.item.name,
      }
    }
    const urlClasses = () => {
      return {
        url: true,
        ellipsis: true,
        'grey--text': !props.item.url,
      }
    }
    const name = () => {
      return props.item.name || 'Bing'
    }
    const url = () => {
      return props.item.url || 'https://www.bing.com/search?q=%s'
    }

    const handleSelect = (value: boolean) => {
      props.select(value)
    }

    return {
      classes,
      nameClasses,
      urlClasses,
      name,
      url,
      handleSelect,
    }
  },
})
</script>

<style lang="scss" scoped>
.name {
  max-width: 128px;
}
.url {
  max-width: 256px;
}
</style>
