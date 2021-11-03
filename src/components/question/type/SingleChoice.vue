<template>
  <view :class="[isAnswered ? 'opacity-50 cursor-not-allowed' : '']">
    <view class="py-3 flex items-center" v-for="(item, index) in options" :key="index" @tap="handleSelect(item.key)">
      <view class="pt-0_5">
        <view class="w-5 h-5 flex items-center justify-center border-2 border-solid rounded-full" :class="[getOptionsClasses(item.key, item.result)]">
          <view class="w-2_5 h-2_5 rounded-full bg-gray-900" v-if="!isAnswered && isOptionSelected(item.key)"></view>
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
      optionsClassesMap,
      answer: ''
    }
  },
  props: {
    options: Object | null,
    isAnswered: {
      type: Boolean,
      default: false
    },
    autoSubmit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSelect(answer) {
      this.answer = answer
      this.autoSubmit && this.handleAnswer()
    },
    handleAnswer() {
      if (!this.isAnswered) {
        eventCenter.trigger('on.answer.question', this.answer)
      }
    },
    getOptionsClasses(key, result) {
      let classes = ''
      if (this.isAnswered) {
        classes = optionsClassesMap[result] || 'border-gray-200'
      } else {
        classes = this.isOptionSelected(key) ? 'border-gray-900' : 'border-gray-200'
      }

      return classes
    },
    isOptionSelected(key) {
      return this.answer == key
    }
  }
}
</script>
