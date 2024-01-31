<template>
  <img src="/bg0.png" class="w-full" />
  <textarea class="input-area absolute w-[55vw] left-[21vw] top-[21vw] h-[35vw]" placeholder="click me to type" v-model="initData.note1"></textarea>
  <textarea class="input-area absolute w-[55vw] left-[23vw] top-[86vw] h-[35vw]" placeholder="click me to type" v-model="initData.note2"></textarea>
</template>

<script setup>
import { reactive } from "vue"
const initData = reactive({
  note1: "",
  note2: "",
})
</script>
