<template>
  <img src="/bg_02.png" class="w-full" />
  <InputArea class="left-[13vw] top-[28vw] w-[78vw] h-[20vw]" placeholder="點我開始輸入" lsKey="bg02-01" v-model="initData.note1"></InputArea>
  <InputArea class="left-[13vw] top-[79vw] w-[78vw] h-[18vw]" placeholder="點我開始輸入" lsKey="bg02-02" v-model="initData.note2"></InputArea>
  <InputArea class="left-[28vw] top-[122vw] w-[58vw] h-[17vw]" placeholder="點我開始輸入" lsKey="bg02-03" v-model="initData.note3"></InputArea>
</template>

<script setup>
import { reactive } from "vue"
import InputArea from "./InputArea.vue"
const initData = reactive({
  note1: "",
  note2: "",
  note3: "",
})
</script>
