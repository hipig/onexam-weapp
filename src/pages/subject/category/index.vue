<template>
  <view class="flex flex-col h-screen overflow-hidden">
    <view class="h-12 flex items-center bg-white px-5">
      <view class="w-full relative">
        <input type="text" placeholder="搜索" class="pl-8 pr-3 py-1 text-sm bg-gray-100 rounded-md" />
        <view class="absolute left-0 inset-y-0 w-8 flex items-center justify-center">
          <image :src="searchIcon" class="block w-5 h-5" />
        </view>
      </view>
    </view>
    <view class="flex-1 min-h-0 flex">
      <view class="w-28 bg-white h-full">
        <view class="text-sm text-center text-gray-500">
          <view class="py-3_5" :class="[currentIndex === 0 ? 'bg-gray-50 text-green-500' : 'text-gray-500']" @tap="handleNavTap(0)">推荐</view>
          <view class="py-3_5" v-for="(item, index) in 10" :key="index" :class="[currentIndex === parseInt(index+1) ? 'bg-gray-50 text-green-500' : 'text-gray-500']" @tap="handleNavTap(parseInt(index+1))">建筑类</view>
        </view>
      </view>
      <view class="flex-1 min-w-0 py-1">
        <scroll-view :scroll-y="true" :scroll-with-animation="true" :scroll-into-view="scrollViewId" style="height: calc(100vh - 3rem)" @scroll="handleScroll">
          <view class="px-3 pb-64">
            <view class="mb-3 category-item" id="category-item-0">
              <view class="text-sm text-gray-900 py-2_5">推荐</view>
              <view class="grid grid-cols-2 gap-3">
                <view class="bg-white px-1 py-3 text-center rounded-md shadow-sm">
                  <view class="py-1_5 leading-none">
                    <view class="inline-block w-5 h-5 border-2 border-solid border-gray-900"></view>
                  </view>
                  <view class="text-xs text-gray-900">中级会计师</view>
                </view>
                <view class="bg-white px-1 py-4 text-center rounded-md shadow-sm">
                  <view class="py-1_5 leading-none">
                    <view class="inline-block w-5 h-5 border-2 border-solid border-gray-900"></view>
                  </view>
                  <view class="text-xs text-gray-900">二级建造师</view>
                </view>
              </view>
            </view>
            <view class="mb-3 category-item" :id="'category-item-'+parseInt(index+1)" v-for="(item, index) in 10" :key="index">
              <view class="text-sm text-gray-900 py-2_5">建筑类</view>
              <view class="grid grid-cols-2 gap-3">
                <view class="bg-white px-1 py-3 text-center rounded-md shadow-sm">
                  <view class="py-1_5 leading-none">
                    <view class="inline-block w-5 h-5 border-2 border-solid border-gray-900"></view>
                  </view>
                  <view class="text-xs text-gray-900">中级会计师</view>
                </view>
                <view class="bg-white px-1 py-4 text-center rounded-md shadow-sm">
                  <view class="py-1_5 leading-none">
                    <view class="inline-block w-5 h-5 border-2 border-solid border-gray-900"></view>
                  </view>
                  <view class="text-xs text-gray-900">二级建造师</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { createSelectorQuery } from "@tarojs/taro"

import searchIcon from "../../../assets/img/icons/search.svg"

export default {
  data() {
    return {
      searchIcon,
      currentIndex: 0,
      scrollViewId: '',
      categoryTopList: [],
      clickFlag: true
    }
  },
  onReady() {
    const query = createSelectorQuery()
    let that = this
    query.selectAll(".category-item").boundingClientRect().exec((res) => {
      res[0].forEach((item) => {
        let startH=item.top - 45
        let endH=startH+item.height
        that.categoryTopList.push({ startH, endH })
      })
    })
  },
  methods: {
    handleScroll(e) {
      let scrollTop = e.detail.scrollTop
      if (this.clickFlag) {
        this.categoryTopList.forEach((item, index) => {
          let inView = scrollTop > item.startH && scrollTop <= item.endH
          if(inView) return this.currentIndex = index
        })
      }
    },
    handleNavTap(index) {
      this.clickFlag = false
      this.currentIndex = index
      this.scrollViewId = 'category-item-'+index
      setTimeout(() => {
        this.clickFlag = true
      }, 300)
    }
  }
}
</script>
