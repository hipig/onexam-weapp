<template>
  <view class="flex flex-col min-h-screen bg-white">
    <view class="px-5 py-2">
      <view class="flex flex-col">
        <view class="mb-4" v-for="(item, index) in filterOptions" :key="index">
          <view class="py-3 flex items-center justify-between">
            <text class="text-sm text-gray-500">{{ item.label }}</text>
            <text class="text-xs text-green-500" v-if="item.value === 'range'">清除练习记录</text>
          </view>
          <view class="grid gap-3 text-sm" :class="[item.value === 'type' ? 'grid-cols-2' : 'grid-cols-3']">
            <view v-for="(option, i) in item.options"
              :key="i"
              class="p-2 text-center rounded-md"
              :class="[filterValue[item.value] == option.value ? 'bg-green-500 text-white' : 'bg-gray-100']"
              @tap="switchOption(item.value, option.value)"
            >{{ option.label }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="fixed bottom-0 inset-x-0">
      <view class="px-5 py-4">
        <view class="grid grid-cols-2 gap-4">
          <button type="button" class="w-full py-3 px-3 bg-green-500 text-white rounded-md shadow-sm whitespace-nowrap" @tap="handleStart('exercise')">练习模式</button>
          <button type="button" class="w-full py-3 px-3 bg-yellow-500 text-white rounded-md shadow-sm whitespace-nowrap" @tap="handleStart('test')">考试模式</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { navigateTo } from "@tarojs/taro"

export default {
  data() {
    return {
      filterOptions: [
        {
          label: '类型',
          value: 'range',
          options: [
            {
              label: '全部',
              value: 'all'
            },
            {
              label: '未做',
              value: 'undone'
            },
            {
              label: '已做',
              value: 'done'
            },
            {
              label: '错题',
              value: 'error'
            }
          ]
        },
        {
          label: '题型',
          value: 'type',
          options: [
            {
              label: '全部',
              value: 0
            },
            {
              label: '单选题（0）',
              value: 1
            },
            {
              label: '多选题（0）',
              value: 2
            },
            {
              label: '判断题（0）',
              value: 3
            },
            {
              label: '填空题（0）',
              value: 4
            },
            {
              label: '问答题（0）',
              value: 5
            }
          ]
        },
        {
          label: '数量',
          value: 'number',
          options: [
            {
              label: '5',
              value: 5
            },
            {
              label: '10',
              value: 10
            },
            {
              label: '20',
              value: 20
            },
            {
              label: '30',
              value: 30
            },
            {
              label: '50',
              value: 50
            },
            {
              label: '100',
              value: 100
            },
          ]
        }
      ],
      filterValue: {
        range: 'all',
        type: 0,
        number: 5
      }
    }
  },
  methods: {
    switchOption(key, value) {
      this.filterValue[key] = value
    },
    handleStart(mode) {
      navigateTo({
        url:'/pages/start/index?mode=' + mode
      })
    }
  }
}
</script>
