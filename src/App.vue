<template>
  <!-- <header>
    <select v-model="initData.choice">
      <option v-for="item in initData.options" :value="item.value" :key="item.value">模板{{ item.value }}</option>
    </select>
  </header> -->

  <div id="downPoster" class="relative" ref="containerRef">
    <img src="/bg0.png" class="w-full" />
    <textarea class="input-area absolute w-[55vw] left-[21vw] top-[21vw] h-[35vw]" placeholder="click me to type" v-model="initData.note1"></textarea>
    <textarea class="input-area absolute w-[55vw] left-[23vw] top-[86vw] h-[35vw]" placeholder="click me to type" v-model="initData.note2"></textarea>
  </div>
  <div class="flex justify-center">
    <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded" @click="exportImage">Export</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
// import { toPng } from "html-to-image"
// import download from "downloadjs"
import html2canvas from "html2canvas"
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

const exportImage = () => {
  // const dataUrl = await toPng(containerRef.value)
  // console.log(dataUrl)
  // download(dataUrl, "sgi-teacher.png")
  html2canvas(document.querySelector("#downPoster"), { useCORS: true }).then((canvas: any) => {
    const base64 = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")
    const base64img = `data:image/png;base64,${base64}`
    downloadBase64(base64img, "sgi-teacher.png")
  })
}

/** 下载图片 */
const downloadBase64 = (content: string, fileName: string) => {
  var base64ToBlob = function (code: any) {
    let parts = code.split(";base64,")
    let contentType = parts[0].split(":")[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {
      type: contentType,
    })
  }
  let aLink = document.createElement("a")
  let blob = base64ToBlob(content)
  aLink.download = fileName + ".png"
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
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
