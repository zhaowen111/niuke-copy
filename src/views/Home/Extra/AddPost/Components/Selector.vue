<script>
export default {
  props: {
    options: [Object, Array],
    value: [String, Number],
  },
  emits: ['select'],

  methods: {
    handleClick(option) {
      this.$emit('select', option.value)
    },
  },
}
</script>
<template>
  <div class="my-2 flex h-10 items-center">
    <div
      @click="handleClick(option)"
      class="border-1 mr-1 box-border rounded-[0.5rem] bg-[#eee] px-4 py-2 text-sm text-[#0fb188]"
      v-for="option in options"
      :key="option.value"
      :class="option.value === value ? 'border-[#0fb188]' : 'border-transparent'">
      {{ option.text }}
    </div>
  </div>
</template>
<style></style>
