<template>
  <view class="flex flex-col">
    <view class="px-5 py-2 bg-white">
      <view class="py-1 flex items-center justify-between text-sm">
        <view class="text-gray-500">当前考试</view>
        <view class="flex items-center text-green-500" @tap="switchSubjectCategory">
          <text>切换考试</text>
          <view class="leading-none">
            <image :src="chevronRightIcon" class="block h-4 w-4" />
          </view>
        </view>
      </view>
      <view class="py-4 flex justify-center text-sm">
        <view class="flex flex-col items-center">
          <view class="w-5 h-5 border-2 border-solid border-gray-900"></view>
          <view class="mt-2 text-gray-900">二级建造师</view>
        </view>
      </view>
    </view>
    <view class="px-5 py-4 bg-white mt-3">
      <view class="flex flex-col">
        <view class="py-1 text-sm text-gray-500">专业科目</view>
        <view class="text-sm text-gray-900">
          <view class="py-2_5">
            <view class="py-3 text-center bg-gray-100 rounded-full">技术综合能力</view>
          </view>
          <view class="py-2_5">
            <view class="py-3 text-center bg-gray-100 rounded-full">技术实务</view>
          </view>
          <view class="py-2_5">
            <view class="py-3 text-center bg-gray-100 rounded-full">案例分析</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { navigateTo } from "@tarojs/taro"
import chevronRightIcon from "../../assets/img/icons/chevron-right-primary.svg"

export default {
  data() {
    return {
      chevronRightIcon
    }
  },
  methods: {
    switchSubjectCategory() {
      navigateTo({
        url: '/pages/subject/category/index'
      })
    }
  }
}
</script>
