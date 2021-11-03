<template>
  <view>
    <view>
      <view class="py-3 flex items-center" v-for="(item, index) in options" :key="index" @tap="handleSelect(item.key)">
        <view class="pt-0_5">
          <view class="w-5 h-5 flex items-center justify-center border-2 border-solid rounded-md" :class="[getOptionItemClasses(item.key, item.result)]">
            <view class="w-2_5 h-2_5 rounded-sm bg-gray-900" v-if="!isAnswered && isOptionSelected(item.key)"></view>
            <view class="leading-none" v-if="isAnswered">
              <image :src="checkIcon" v-if="item.result && item.result === 'correct'" class="block h-4 w-4" />
              <image :src="xIcon" v-if="item.result && item.result === 'incorrect'" class="block h-4 w-4" />
            </view>
          </view>
        </view>
        <view class="flex-1 min-w-0 ml-3">
          <text class="text-sm">{{ item.key }}、{{ item.text }}</text>
        </view>
      </view>
    </view>
    <view class="mt-3">
      <button class="inline-flex py-1_5 px-5 bg-green-500 text-white text-sm rounded-md shadow-sm" @tap="handleAnswer">确定</button>
    </view>
  </view>
</template>

<script>
import { eventCenter } from "@tarojs/taro"

import checkIcon from "../../../assets/img/icons/check.svg"
import xIcon from "../../../assets/img/icons/x.svg"

const optionsClassesMap = {
  correct: 'border-green-500 bg-green-500',
  incorrect: 'border-red-500 bg-red-500'
}

export default {
  data() {
    return {
      checkIcon,
      xIcon,
      answer: []
    }
  },
  props: {
    options: Object | null,
    isAnswered: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSelect(key) {
      if (!this.isAnswered) {
        let answer = this.answer
        let index = answer.indexOf(key)
        if(index > -1) {
          answer.splice(index, 1)
        } else {
          answer.push(key)
        }

        this.answer = answer
      }
    },
    handleAnswer() {
      if (!this.isAnswered && this.answer.length > 0) {
        eventCenter.trigger('on.answer.question', this.answer)
      }
    },
    getOptionItemClasses(key, result) {
      let classes = ''
      if(this.isAnswered) {
        classes = optionsClassesMap[result] || 'border-gray-200'
      } else {
        classes = this.isOptionSelected(key) ? 'border-gray-900' : 'border-gray-200'
      }

      return classes
    },
    isOptionSelected(key) {
      return this.answer.indexOf(key) > -1
    }
  }
}
</script>