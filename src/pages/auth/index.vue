<template>
  <view class="flex flex-col min-h-screen">
    <view class="flex-1 min-h-0 px-5">
      <view class="py-6">
        <text class="text-2xl text-gray-900">验证码登录</text>
      </view>
      <view class="flex flex-col">
        <view class="mb-4">
          <input class="py-3_5 text-sm border-0 border-b border-solid border-gray-100" placeholder="输入手机号码" />
        </view>
        <view class="relative">
          <input class="py-3_5 pr-28 text-sm border-0 border-b border-solid border-gray-100" placeholder="输入验证码" />
          <view class=" absolute right-0 inset-y-0 flex items-center">
            <button class="w-24 text-center px-3 py-1_5 text-sm bg-transparent text-green-500 border border-solid border-green-500 rounded-md shadow-sm">获取验证码</button>
          </view>
        </view>
        <view class="mt-7">
          <button class="px-5 py-2 text-center text-lg bg-green-500 text-white border border-solid border-green-500 rounded-lg shadow opacity-75">验证码登录</button>
        </view>
      </view>
    </view>
    <view class="px-5">
      <view class="py-1">
        <view class="py-2">
          <view class="h-px bg-gray-100 flex items-center justify-center leading-none">
            <text class="px-3 text-sm text-gray-500 bg-gray-50 overflow-hidden">快捷登录</text>
          </view>
        </view>
        <view class="py-5">
          <button class="px-5 py-2 text-center text-lg bg-green-500 text-white border border-solid border-green-500 rounded-lg shadow">微信登录</button>
        </view>
      </view>
      <view class="py-3 flex justify-center items-center">
        <view class="w-3 h-3 border-2 border-solid border-gray-200 rounded-full"></view>
        <view class="text-xs text-gray-700 ml-1">
          <text>已阅读同意</text>
          <text class="text-green-500">《用户服务协议》</text>
          <text>和</text>
          <text class="text-green-500">《隐私政策》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>