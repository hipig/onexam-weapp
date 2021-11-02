<template>
  <view class="px-5">
    <view>
      <view class="py-3">
        <view class="inline-block mr-1">
          <view class="px-1 text-xs rounded-sm" :class="[typeClasses]">{{ typeText }}</view>
        </view>
        <text class="text-gray-900">{{ title }}</text>
      </view>
      <view class="py-2">
        <view class="py-3 flex items-center" v-for="(text, key) in options" :key="key" @tap="handleAnswer(key)">
          <view class="pt-0_5">
            <view class="w-5 h-5 flex items-center justify-center border-2 border-solid border-gray-200 rounded-full" :class="[optionsClasses[key] || '']">
              <view class="leading-none" v-if="isAnswered">
                <image :src="checkIcon" v-if="checkCorrectOption(key)" class="block h-4 w-4" />
                <image :src="xIcon" v-if="checkInCorrectOption(key)" class="block h-4 w-4" />
              </view>
            </view>
          </view>
          <view class="flex-1 min-w-0 ml-3">
            <text class="text-sm">{{ key }}、{{ text }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="duration-300 ease-in-out" :class="[isRecite || isAnswered || isShowAnswer ? 'opacity-100' : 'opacity-0']">
      <view class="py-4">
        <text class="text-lg" :class="[checkCorrectOption(answer) ? 'text-green-500' : 'text-red-500']" v-if="isAnswered">{{ checkCorrectOption(answer) ? '回答正确' : '回答错误' }}</text>
      </view>
      <view class="py-1 flex">
        <view class="mr-3">答案</view>
        <view class="flex-1 min-w-0">
          <text class="text-green-500">{{ correctAnswer }}</text>
        </view>
      </view>
      <view class="py-3 flex">
        <view class="mr-3">解析</view>
        <view class="flex-1 min-w-0">
          <view v-html="parse"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { eventCenter } from "@tarojs/taro"
import { mapGetters } from "vuex"

import checkIcon from "../../assets/img/icons/check.svg"
import xIcon from "../../assets/img/icons/x.svg"

const questionTypeMap = {
  1: {
    colorClasses: 'bg-green-500 text-white',
    text: '单选'
  },
  2: {
    colorClasses: 'bg-yellow-500 text-white',
    text: '多选'
  }
}

export default {
  data() {
    return {
      checkIcon,
      xIcon
    }
  },
  props: {
    title: String,
    questionType: {
      type: Number,
      default: 1
    },
    options: Object | null,
    optionsClasses: Object | null,
    correctAnswer: {
      type: String | Array,
      default: ''
    },
    answer: {
      type: String | Array,
      default: ''
    },
    parse: {
      type: String,
      default: ''
    },
    isAnswered: {
      type: Boolean,
      default: false
    },
    isShowAnswer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      'isRecite': 'basic/reciteStatus'
    }),
    typeClasses() {
      return questionTypeMap[this.questionType].colorClasses
    },
    typeText() {
      return questionTypeMap[this.questionType].text
    }
  },
  methods: {
    handleAnswer(key) {
      if (!this.isRecite && !this.isAnswered && !this.isShowAnswer) {
        eventCenter.trigger('on.answer', key)
      }
    },
    checkCorrectOption(key) {
      switch(this.questionType) {
        case 1:
          return key == this.correctAnswer
      }
    },
    checkInCorrectOption(key) {
      switch(this.questionType) {
        case 1:
          return key == this.answer && key != this.correctAnswer
      }
    }
  }
}
</script>