import { defineStore } from "pinia"
import { ref } from "vue"

export const useStore = defineStore("index", () => {
  const isConverting = ref(false)
  const isDone = ref(false)
  const setConverting = (val: boolean) => (isConverting.value = val)
  const setDone = (val: boolean) => (isDone.value = val)
  return { isConverting, isDone, setConverting, setDone }
})
