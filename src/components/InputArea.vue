<template>
  <div v-if="isConverting" class="absolute break-all -mt-2">
    {{ props.modelValue }}
  </div>
  <textarea v-else class="input-area absolute" placeholder="點我開始輸入" v-model="note"></textarea>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "@/store"
import { storeToRefs } from "pinia"

const store = useStore()
const { isConverting } = storeToRefs(store)
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: "update:modelValue", newValue: string): void
}>()
const note = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit("update:modelValue", newValue)
  },
})
</script>

<style lang="sass">
.input-area
  @apply bg-[#00000000] border-0
</style>
