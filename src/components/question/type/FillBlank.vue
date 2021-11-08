<template>
  <view :class="[isAnswered ? 'opacity-50 cursor-not-allowed' : '']">
    <view>
      <view class="py-2 flex items-center" v-for="(option, index) in options" :key="index">
        <input type="text" v-model="answer[index]" class="w-full px-3_5 py-2_5 text-sm bg-white border-2 border-solid border-gray-200 rounded-md" :class="[optionsClasses[index] || 'border-gray-200']" placeholder="请输入答案" @input="handleInput" @focus="handleFocus(index)" @blur="handleBlur(index)" :disabled="isAnswered" />
      </view>
    </view>
    <view class="mt-3" v-if="!autoSubmit">
      <button class="inline-flex py-1_5 px-5 bg-green-500 text-base text-white rounded-md shadow-sm" @tap="handleAnswer">确定</button>
    </view>
  </view>
</template>

<script>
import { eventCenter } from "@tarojs/taro"

const optionsClassesMap = {
  correct: 'border-green-500',
  incorrect: 'border-red-500'
}

export default {
  data() {
    return {
      answer: [],
      optionsClasses: []
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
      default: false
    }
  },
  watch: {
    isAnswered(val) {
      if (val) {
        this.options.forEach((option, index) => {
          this.optionsClasses[index] = optionsClassesMap[option.result] || 'border-gray-200'
        })
      }
    }
  },
  methods: {
    handleFocus(index) {
      this.optionsClasses[index] = 'border-gray-900'
    },
    handleBlur(index) {
      this.optionsClasses[index] = 'border-gray-200'
    },
    handleInput() {
      this.autoSubmit && this.handleAnswer()
    },
    handleAnswer() {
      if (!this.isAnswered && this.answer.length === this.options.length) {
        eventCenter.trigger('on.answer.question', this.answer)
      }
    }
  }
}
</script>
