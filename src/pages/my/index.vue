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
          <view class="text-green-500 text-2xl font-bold">0</view>
          <view class="text-sm">收藏</view>
        </view>
        <view class="py-2_5 bg-white text-center rounded-md shadow">
          <view class="text-green-500 text-2xl font-bold">0</view>
          <view class="text-sm">笔记</view>
        </view>
        <view class="py-2_5 bg-white text-center rounded-md shadow">
          <view class="text-green-500 text-2xl font-bold">0</view>
          <view class="text-sm">考试</view>
        </view>
      </view>
    </view>
    <view class="py-4">
      <view class="px-5 py-2 flex items-center justify-between">
        <text>最近练习</text>
        <view class="text-sm text-gray-500"><text class="text-gray-900">1</text>/5</view>
      </view>
    </view>
    <view class="py-4">
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
import chevronRightIcon from "../../assets/img/icons/chevron-right.svg"

export default {
  data() {
    return {
      chevronRightIcon
    }
  }
}
</script>
