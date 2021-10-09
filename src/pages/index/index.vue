<template>
  <view class="flex flex-col">
    <view class="bg-white px-5 py-1">
      <view class="flex items-center justify-between">
        <view class="flex-1 min-w-0">
          <view class="truncate">
            <text class="text-gray-900 text-2xl">建设工程法规及相关知识</text>
          </view>
          <view class="mt-2">
            <view class="text-xs text-gray-500">已学750题/共6156题（12%）</view>
            <view class="relative mt-1 w-full h-2 bg-gray-100 rounded overflow-hidden">
              <view class="absolute inset-y-0 left-0 bg-green-500" style="width: 12%"></view>
            </view>
          </view>
        </view>
        <view class="pl-4">
          <button class="py-1 px-3_5 bg-gray-50 text-green-500 text-sm font-bold rounded-full whitespace-nowrap">切换科目</button>  
        </view>  
      </view>
      <view class="grid grid-cols-4 py-2_5 text-xs text-gray-600">
        <view class="flex items-center">
          <text class="text-lg text-gray-900 font-bold">162</text>
          <text class="ml-1">收藏</text>
        </view>
        <view class="flex items-center">
          <text class="text-lg text-gray-900 font-bold">99</text>
          <text class="ml-1">错题</text>
        </view>
        <view class="flex items-center">
          <text class="text-lg text-gray-900 font-bold">20</text>
          <text class="ml-1">笔记</text>
        </view>
        <view class="flex items-center justify-end">
          <view>分享</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
