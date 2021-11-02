<template>
  <view class="flex flex-col">
    <view class="px-5 py-3">
      <view class="mb-3" v-for="(item, index) in bankList" :key="index">
        <view class="w-full flex items-center bg-white py-4 rounded-sm">
          <view class="px-3 flex-1 min-w-0">
            <view class="text-gray-900">{{ item.name }}</view>
            <view class="text-xs text-gray-500">
              <view class="py-1 flex items-center">
                <text class="mr-3">{{ item.done_num + '/' + item.total_num }}</text>
                <text class="mr-3">总分：{{ item.total_score }}分</text>
                <text>时长：{{ item.total_duration }}分钟</text>
              </view>
              <view class="relative w-32 h-1 bg-gray-100 rounded overflow-hidden">
                <view class="absolute inset-y-0 left-0 bg-green-500" :style="{width: (item.done_num / item.total_num * 100) + '%'}"></view>
              </view>
            </view>
          </view>
          <view class="px-3">
            <button class="px-5 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm rounded-md shadow-sm whitespace-nowrap" @tap="handleStart">考试</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bankList: []
    }
  },
  created() {
    this.bankList = [
      {
        name: '二级建造师《建设工程法规及相关知识》测试卷三',
        total_score: 100,
        total_duration: 150,
        total_num: 80,
        done_num: 6
      },
      {
        name: '二级建造师《建设工程法规及相关知识》测试卷二',
        total_score: 100,
        total_duration: 150,
        total_num: 80,
        done_num: 0
      },
      {
        name: '二级建造师《建设工程法规及相关知识》测试卷一',
        total_score: 100,
        total_duration: 150,
        total_num: 80,
        done_num: 0
      }
    ]
  },
  methods: {
    handleStart() {
      
    }
  }
}
</script>
