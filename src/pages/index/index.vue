<template>
  <view class="flex flex-col">
    <view class="px-5 pb-2 bg-white hidden">
      <view class="bg-gray-100 py-1_5 flex items-center rounded">
        <view class="px-2 leading-none">
          <image :src="searchIcon" class="block w-5 h-5" />
        </view>
        <text class="text-gray-500">搜索题目</text>
      </view>
    </view>
    <view class="px-5 py-1">
      <view class="flex items-center justify-between">
        <view class="flex-1 min-w-0">
          <view class="truncate">
            <text class="text-gray-900 text-2xl">建设工程法规及相关知识</text>
          </view>
          <view class="mt-2">
            <view class="text-xs text-gray-500">已学750题/共6156题（12%）</view>
            <view class="relative mt-1 w-48 h-2 bg-gray-100 rounded overflow-hidden">
              <view class="absolute inset-y-0 left-0 bg-green-500" style="width: 12%"></view>
            </view>
          </view>
        </view>
        <view class="pl-4">
          <button class="py-1 px-3_5 bg-white text-green-500 text-sm font-bold rounded-full whitespace-nowrap shadow-sm" @tap="switchSubject">切换科目</button>
        </view>
      </view>
      <view class="grid grid-cols-4 py-3 text-xs text-gray-600">
        <view class="flex items-center">
          <text class="text-xl text-gray-900 blippo-becker">162</text>
          <text class="ml-1">收藏</text>
        </view>
        <view class="flex items-center">
          <text class="text-xl text-gray-900 blippo-becker">99</text>
          <text class="ml-1">错题</text>
        </view>
        <view class="flex items-center">
          <text class="text-xl text-gray-900 blippo-becker">20</text>
          <text class="ml-1">笔记</text>
        </view>
        <view class="flex items-center justify-end">
          <image :src="shareIcon" class="block w-5 h-5" />
          <view class="ml-1">分享</view>
        </view>
      </view>
    </view>
    <view class="px-5 py-2">
      <view class="px-5 py-3 bg-white rounded-md">
        <view class="flex justify-between">
          <view>
            <view class="text-xl text-green-500 font-bold">免费在线刷题中心</view>
            <view class="text-sm text-green-400 font-bold italic mt-2">科学通关 · 考证必备</view>
          </view>
          <view class="leading-none">
            <image :src="heroCover" mode="heightFix" class="block h-14" />
          </view>
        </view>
      </view>
    </view>
    <view class="px-5 py-4">
      <view class="grid grid-cols-2 gap-4">
        <button class="w-full flex items-center justify-center py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-lg shadow-sm">
          <view class="leading-none">
            <image :src="mockIcon" class="block h-6 w-6" />
          </view>
          <text class="ml-1">模拟试卷</text>
        </button>
        <button class="w-full flex items-center justify-center py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-lg shadow-sm">
          <view class="leading-none">
            <image :src="oldIcon" class="block h-6 w-6" />
          </view>
          <text class="ml-1">历年真题</text>
        </button>
      </view>
    </view>
    <view class="px-5 py-3">
      <view class="text-lg text-gray-900 font-bold mb-1">章节练习</view>
      <view class="flex flex-col">
        <view class="py-3" v-for="(item, index) in subjectList" :key="index">
          <view class="bg-white rounded-lg shadow-md pl-10 pr-4" @tap="toggleActive(index)">
            <view>
              <view class="relative">
                <view class="flex items-center justify-between">
                  <view class="py-4 flex-1 flex flex-col border-0" :class="item.active ? 'border-b border-solid border-gray-100' : ''">
                    <text class="text-base text-gray-900">{{ item.name }}</text>
                    <view class="mt-1">
                      <view class="text-xs text-gray-500">{{ item.done_num + '/' + item.total_num }}</view>
                      <view class="relative mt-2 w-36 h-2 bg-gray-100 rounded overflow-hidden">
                        <view class="absolute inset-y-0 left-0 bg-green-500"></view>
                      </view>
                    </view>
                  </view>
                  <view class="pl-4">
                    <button class="px-5 py-1 bg-green-500 text-white text-sm rounded-md shadow-sm" @tap="handleQuiz">练习</button>
                  </view>
                </view>
                <view class="absolute top-4_5 bottom-0 -left-5">
                  <view class="relative h-full">
                    <view class="h-full" style="width:2px" :class="item.active ? 'bg-gray-100' : 'bg-transparent'"></view>
                    <view class="absolute top-0 left-1_2 transform -translate-x-1_2">
                      <view class="pb-0_5 bg-white leading-none">
                        <image v-if="!item.active" :src="plusSquareIcon" class="block w-5 h-5" />
                        <image v-else :src="minusSquareIcon" class="block w-5 h-5" />
                      </view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="flex flex-col" v-if="item.active">
                <view class="relative" v-for="(value, key) in item.children" :key="key">
                  <view class="flex items-center justify-between" :class="key === item.children.length-1 ? '' : 'border-0 border-b border-solid border-gray-100'">
                    <view class="py-4 flex-1 flex flex-col">
                      <text class="text-sm text-gray-900">{{ value.name }}</text>
                      <view class="mt-1">
                        <view class="text-xs text-gray-500">{{ value.done_num + '/' + value.total_num }}</view>
                        <view class="relative mt-2 w-36 h-2 bg-gray-100 rounded overflow-hidden">
                          <view class="absolute inset-y-0 left-0 bg-green-500"></view>
                        </view>
                      </view>
                    </view>
                    <view class="pl-4">
                      <button class="px-5 py-1 bg-green-500 text-white text-sm rounded-md shadow-sm" @tap="handleQuiz">练习</button>
                    </view>
                  </view>
                  <view class="absolute top-0 -left-5" :class="key === item.children.length-1 ? 'h-4' : 'bottom-0'">
                    <view class="relative h-full">
                      <view class="h-full bg-gray-100" style="width:2px"></view>
                      <view class="absolute top-4 left-1_2 transform -translate-x-1_2">
                        <view class="bg-white leading-none">
                          <view class="w-5 h-5 flex items-center justify-center">
                            <view class="border-2 border-solid border-gray-200 rounded-sm" style="width: 3px; height: 3px"></view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { navigateTo, showToast } from "@tarojs/taro"

import searchIcon from "../../assets/img/icons/search.svg"

import shareIcon from "../../assets/img/icons/share.svg"

import plusSquareIcon from "../../assets/img/icons/plus-square.svg"
import minusSquareIcon from "../../assets/img/icons/minus-square.svg"

import heroCover from "../../assets/img/home/hero.png"

import mockIcon from "../../assets/img/icons/mock.png"
import oldIcon from "../../assets/img/icons/old.png"

export default {
  data () {
    return {
      searchIcon,
      shareIcon,
      plusSquareIcon,
      minusSquareIcon,
      heroCover,
      mockIcon,
      oldIcon,
      subjectList: []
    }
  },
  created() {
    this.subjectList = [
      {
        name: '第一章 建设工程基本法律知识',
        total_num: 156,
        done_num: 0,
        children: [
          {
            name: '第一节 建设工程施工许可制度',
            total_num: 42,
            done_num: 0,
          },
          {
            name: '第二节 建设工程法人制度',
            total_num: 61,
            done_num: 0,
          },
          {
            name: '第三节 建设工程代理制度',
            total_num: 36,
            done_num: 0,
          }
        ]
      },
      {
        name: '第二章 施工许可法律制度',
        total_num: 194,
        done_num: 0,
        children: [
          {
            name: '第一节 建设工程招标投标制度',
            total_num: 42,
            done_num: 0,
          },
          {
            name: '第二节 建设工程承包制度',
            total_num: 61,
            done_num: 0,
          },
          {
            name: '第三节 建设市场信用体系建设',
            total_num: 36,
            done_num: 0,
          }
        ]
      }
    ]
  },
  methods: {
    toggleActive(index) {
      this.$set(this.subjectList[index], 'active', !this.subjectList[index].active)
    },
    switchSubject() {
      navigateTo({
        url: '/pages/subject/index'
      })
    },
    handleQuiz(e) {
      e.stopPropagation()
      showToast({
        title: '开始练习',
        icon: 'none'
      })
    }
  }
}
</script>
