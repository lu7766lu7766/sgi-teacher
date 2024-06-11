<template>
  <div>
    <div>
      Display Type
      <div>
        <label>
          Personal
          <input type="radio" :value="DispalyType.Personal" v-model="displayType" />
        </label>
        <label>
          Dist
          <input type="radio" :value="DispalyType.Dist" v-model="displayType" />
        </label>
      </div>
    </div>
    <div v-if="displayType == DispalyType.Personal">
      Name: <input type="text" v-model="searchName" class="border" />
      <table class="border" v-if="personalData">
        <thead>
          <tr>
            <th class="border whitespace-nowrap px-3 py-1" v-for="title in personalTitles">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border text-center" v-for="title in personalTitles" :style="personalData[title] == personalData.max ? 'color: red' : ''">
              {{ personalData[title] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="displayType == DispalyType.Dist">
      <select v-model="selectedDist">
        <option value="">所屬區</option>
        <option v-for="distName in distOptions" :value="distName">{{ distName }}</option>
      </select>
      <table>
        <thead>
          <tr>
            <th class="border whitespace-nowrap px-3 py-1" v-for="title in titles">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datas in groupByAreaDatas[selectedDist]">
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
// 使用 fetch 打 API
const sourceDatas = ref<string[][]>([[]])
const basicLength = ref(0)
const titles = computed(() => sourceDatas.value[0].concat(groupIndex.map((x) => x.name)))
const arrayDatas = computed(() =>
  sourceDatas.value.slice(1).map((datas) =>
    datas.concat(
      groupIndex.map((groupInfo) =>
        datas
          .slice(groupInfo.start, groupInfo.end)
          .filter((y) => y == "喜歡")
          .length.toString()
      )
    )
  )
)
const datas = computed<any[]>(() =>
  arrayDatas.value.map((values) => {
    return values.reduce((res, value, index) => Object.assign(res, { [titles.value[index]]: value }), {
      max: Math.max(...values.slice(basicLength.value).map((x) => +x)),
    })
  })
)
const groupByAreaDatas = computed<any>(() => _.groupBy(datas.value, "你所屬的區/組織"))
enum DispalyType {
  Personal,
  Dist,
}

const displayType = ref<DispalyType>(DispalyType.Personal)
const searchName = ref("")
const personalData = computed(() => (searchName.value ? datas.value.find((data) => data["你的名字"] == searchName.value) : null))
const personalTitles = computed(() => titles.value.slice(0, 3).concat(titles.value.slice(basicLength.value)))

const distOptions = computed(() => Object.keys(groupByAreaDatas.value))
const selectedDist = ref("")

const fetchData = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.values.push(mock)
      sourceDatas.value = data.values
      console.log(groupByAreaDatas.value)
      basicLength.value = data.values[0].length
    })
    .catch((error) => console.error("Error:", error))
}

onMounted(() => {
  fetchData()
})
</script>
