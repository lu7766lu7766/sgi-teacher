<template>
  <div class="p-4">
    <div>
      查詢方式
      <div class="mt-1">
        <label class="mr-3">
          <span class="mr-1"> 依姓名 </span>
          <input type="radio" :value="DispalyType.Personal" v-model="displayType" />
        </label>
        <label>
          <span class="mr-1"> 依所屬區 </span>
          <input type="radio" :value="DispalyType.Dist" v-model="displayType" />
        </label>
      </div>
    </div>
    <div v-if="displayType == DispalyType.Personal" class="mt-4">
      輸入欲查詢姓名: <input type="text" v-model="searchName" class="border rounded w-44 px-2 py-1" placeholder="須與表單填入相符" />
      <table class="mt-1">
        <thead>
          <tr>
            <th class="border whitespace-nowrap px-3 py-1" v-for="title in personalTitles">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="personalData">
            <td class="border text-center" v-for="title in personalTitles" :style="personalData[title] == personalData.max ? 'color: red' : ''">
              {{ personalData[title] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="displayType == DispalyType.Dist" class="mt-4">
      <select v-model="selectedDist" class="w-40 px-2 py-1 border rounded">
        <option value="">所屬區</option>
        <option v-for="distName in distOptions" :value="distName">{{ distName }}</option>
      </select>
      <table class="mt-1">
        <thead>
          <tr>
            <th class="border whitespace-nowrap px-3 py-1" v-for="title in titles">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datas in groupByDistDatas[selectedDist]">
            <td class="text-center border" v-for="(title, index) in titles" :style="datas[title] == datas.max ? 'color: red' : ''">
              {{ datas[title] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"
import { computed, onMounted, ref } from "vue"
import mock from "./mock/work"

const apiKey = "AIzaSyBmkY7UAH1NyNARMwWo89VV75RIV_7Yuvw"
const sheetId = "1tjDvAmJrvxKBUnOHdxLcOlHlh-9wztBH0DFZY_t22JE"
// Sheets 中要取得的資料範圍，格式如下
const range = "表單回應!A1:BK999"
// Sheets API 的 URL
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

const groupIndex = [
  { name: "藝術型", start: 3, end: 13 },
  { name: "研究型", start: 13, end: 23 },
  { name: "實做型", start: 23, end: 33 },
  { name: "企業型", start: 33, end: 43 },
  { name: "社交型", start: 43, end: 53 },
  { name: "常規型", start: 53, end: 63 },
]
const NAME_FIELD_TITLE = "你的名字"
const DIST_FIELD_TITLE = "你所屬的區/組織"
const LIKE_ANSWER = "喜歡"

// data proccess
const sourceDatas = ref<string[][]>([[]])
const basicLength = ref(0)
const titles = computed(() => sourceDatas.value[0].concat(groupIndex.map((x) => x.name)))
const arrayDatas = computed(() =>
  sourceDatas.value.slice(1).map((datas) =>
    datas.concat(
      groupIndex.map((groupInfo) =>
        datas
          .slice(groupInfo.start, groupInfo.end)
          .filter((answer) => answer == LIKE_ANSWER)
          .length.toString()
      )
    )
  )
)
const datas = computed(() => {
  const indexSet = new Set()
  const datas = arrayDatas.value.map((values) => {
    return values.reduce((res, value, index) => Object.assign(res, { [titles.value[index]]: value }), {
      max: Math.max(...values.slice(basicLength.value).map((x) => +x)),
    }) as Record<string, string | number>
  })
  return datas.reduce((res, data) => {
    const lastIndex = _.findLastIndex(datas, (x) => x[NAME_FIELD_TITLE] == data[NAME_FIELD_TITLE])
    if (!indexSet.has(lastIndex)) {
      res.push(datas[lastIndex])
      indexSet.add(lastIndex)
    }
    return res
  }, [] as Record<string, string | number>[])
})

const groupByDistDatas = computed(() => _.groupBy(datas.value, DIST_FIELD_TITLE))

// global
enum DispalyType {
  Personal,
  Dist,
}
const displayType = ref<DispalyType>(DispalyType.Personal)

// personal
const searchName = ref("")
const personalData = computed(() => (searchName.value ? datas.value.find((data) => data[NAME_FIELD_TITLE] == searchName.value) : null))
const personalTitles = computed(() => titles.value.slice(0, 3).concat(titles.value.slice(basicLength.value)))

// dist
const distOptions = computed(() => Object.keys(groupByDistDatas.value))
const selectedDist = ref("")

// fetch
const fetchData = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.values.length <= 1) {
        data.values.push(mock)
      }
      sourceDatas.value = data.values.filter((x: any) => x.length)
      basicLength.value = data.values[0].length
    })
    .catch((error) => {
      alert(`讀取失敗，請從新整理或聯繫管理員。\n錯誤訊息：${error?.message}`)
      console.error("Error:", error)
    })
}

onMounted(() => {
  fetchData()
})
</script>
