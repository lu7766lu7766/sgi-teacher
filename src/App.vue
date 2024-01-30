<template>
  <!-- <header>
    <select v-model="initData.choice">
      <option v-for="item in initData.options" :value="item.value" :key="item.value">模板{{ item.value }}</option>
    </select>
  </header> -->

  <div class="relative" ref="containerRef">
    <img src="/bg0.png" class="w-full" />
    <textarea class="input-area absolute w-[55vw] left-[21vw] top-[21vw] h-[35vw]" placeholder="click me to type" v-model="initData.note1"></textarea>
    <textarea class="input-area absolute w-[55vw] left-[23vw] top-[86vw] h-[35vw]" placeholder="click me to type" v-model="initData.note2"></textarea>
  </div>
  <div class="flex justify-center">
    <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded" @click="exportImage">Export</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { toPng } from "html-to-image"
import download from "downloadjs"

const containerRef = ref(null)
const initData = reactive({
  // options: [
  //   { value: 1, bg: "/bg1.png", x: "10%", y: "10%" },
  //   { value: 2, bg: "/bg2.png", x: "10%", y: "10%" },
  //   { value: 3, bg: "/bg3.png", x: "10%", y: "10%" },
  // ],
  // choice: 1,
  note1: "",
  note2: "",
  // template: computed(() => initData.options.find((x) => x.value == initData.choice)),
  // bgCss: computed(() => `url(${initData.template.bg})`),
})

const exportImage = async () => {
  const dataUrl = await toPng(containerRef.value)
  download(dataUrl, "sgi-teacher.png")
}
</script>

<style scoped lang="sass">

.input-area
  @apply bg-[#00000000] border
  //  w-full
  // padding-left: 10%// v-bind('initData.template.x')
  // padding-right: 10%// v-bind('initData.template.x')
  // padding-top: 10%// v-bind('initData.template.y')
  // padding-bottom: 10%// v-bind('initData.template.y')
</style>
