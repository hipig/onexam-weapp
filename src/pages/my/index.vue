<template>
  <view class="flex flex-col">
    <view class="px-5">
      <view class="py-2 flex items-center justify-between">
        <view>
          <view class="text-gray-900">欢迎来到 OnExam 题库</view>
          <view class="text-gray-500 text-sm mt-1">登录开始做题，逢考必过！</view>
        </view>
        <view>
          <button class="py-1 px-6 bg-green-500 text-white text-sm rounded-full shadow-sm whitespace-nowrap">立即登录</button>
        </view>
      </view>
      <view class="py-4 grid grid-cols-3 gap-4">
        <view class="py-2_5 bg-white text-center rounded-md shadow">
          <view class="text-gray-900 text-3xl blippo-becker">0</view>
          <view class="text-sm">收藏</view>
        </view>
        <view class="py-2_5 bg-white text-center rounded-md shadow">
          <view class="text-gray-900 text-3xl blippo-becker">0</view>
          <view class="text-sm">笔记</view>
        </view>
        <view class="py-2_5 bg-white text-center rounded-md shadow">
          <view class="text-gray-900 text-3xl blippo-becker">99+</view>
          <view class="text-sm">考试</view>
        </view>
      </view>
    </view>
    <view class="py-2">
      <view class="px-5 flex items-center justify-between">
        <text>最近学习</text>
        <text class="text-sm text-gray-500"><text class="text-gray-900">{{ currentIndex }}</text>/{{ learnRecordList.length }}</text>
      </view>
      <view class="px-5">
        <scroll-view :scroll-x="true" @scroll="handleScroll" class="whitespace-nowrap">
          <view class="py-2 inline-flex" v-for="(item, index) in learnRecordList" :key="index" :class="index === learnRecordList.length-1 ? '' : 'pr-4'">
            <view class="w-64 bg-white px-4 py-3 mx-0_5 rounded-lg shadow record-item">
              <view class="flex items-center justify-between text-sm text-gray-500">
                <text>2021-10-14</text>
                <text><text class="text-gray-900">{{ item.done_num }}</text>/{{ item.total_num }}</text>
              </view>
              <view class="py-1_5 text-gray-900 truncate">{{ item.name }}</view>
              <view class="flex items-center">
                <view class="w-4 h-4 flex items-center justify-center text-xs text-white bg-gradient-to-r rounded-sm" :class="typeMap[item.type].bgColor">{{ typeMap[item.type].text }}</view>
                <text class="ml-1 text-sm text-gray-500">{{ item.subject_name }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="py-2">
      <view class="py-2 px-5 bg-white flex flex-col">
        <view class="py-3 flex items-center justify-between">
          <text>通知公告</text>
          <view class="leading-none">
            <image :src="chevronRightIcon" class="block w-5 h-5" />
          </view>
        </view>
        <view class="py-3 flex items-center justify-between">
          <text>设置</text>
          <view class="leading-none">
            <image :src="chevronRightIcon" class="block w-5 h-5" />
          </view>
        </view>
        <view class="py-3 flex items-center justify-between">
          <text>关于我们</text>
          <view class="leading-none">
            <image :src="chevronRightIcon" class="block w-5 h-5" />
          </view>
        </view>
        <view class="py-3 flex items-center justify-between">
          <text>联系客服</text>
          <view class="leading-none">
            <image :src="chevronRightIcon" class="block w-5 h-5" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getSystemInfo, createSelectorQuery } from "@tarojs/taro"
import chevronRightIcon from "../../assets/img/icons/chevron-right.svg"

const typeMap = {
  exercise: {
    text: '练',
    bgColor: 'from-green-400 to-green-500'
  },
  test: {
    text: '测',
    bgColor: 'from-yellow-400 to-yellow-500'
  },
  exam: {
    text: '考',
    bgColor: 'from-orange-400 to-orange-500'
  }
}

export default {
  data() {
    return {
      chevronRightIcon,
      typeMap,
      learnRecordList: [],
      currentIndex: 1,
      screenWidth: 0,
      recordLeftList: []
    }
  },
  created() {
    this.learnRecordList = [
      {
        name: '第一章 建设工程基本法律知识',
        subject_name: '建设工程法规及相关知识',
        type: 'exercise',
        total_num: 100,
        done_num: 1
      },
      {
        name: '第二节 建设工程施工许可制度',
        subject_name: '建设工程法规及相关知识',
        type: 'test',
        total_num: 30,
        done_num: 1
      },
      {
        name: '第二节 建设工程施工许可制度',
        subject_name: '建设工程法规及相关知识',
        type: 'test',
        total_num: 30,
        done_num: 1
      }
    ]
  },
  onReady() {
    let that = this
    getSystemInfo().then(res => {
      let screenWidth = res.screenWidth
      createSelectorQuery().selectAll(".record-item").boundingClientRect().exec((res) => {
        res[0].forEach((item) => {
          let startW=item.left - (screenWidth - item.width) / 2
          let endW=startW+item.width
          that.recordLeftList.push({ startW, endW })
        })
      })
    })
  },
  methods: {
    handleScroll(e) {
      let scrollLeft = e.detail.scrollLeft
      this.recordLeftList.forEach((item, index) => {
        let inView = scrollLeft > item.startW && scrollLeft <= item.endW
        if(inView) return this.currentIndex = parseInt(index + 1)
      })
    }
  }
}
</script>
