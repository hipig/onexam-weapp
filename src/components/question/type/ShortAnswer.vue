<template>
  <view :class="[isAnswered ? 'opacity-50 cursor-not-allowed' : '']">
    <view class="w-full">
      <textarea v-model="answer" class="w-initial px-3_5 py-2_5 text-sm bg-white border-2 border-solid border-gray-200 rounded-md" style="min-height: 5rem" placeholder="请输入答案" :auto-height="true" @input="handleInput" :disabled="isAnswered" />
    </view>
    <view class="mt-3" v-if="!autoSubmit">
      <button class="inline-flex py-1_5 px-5 bg-green-500 text-base text-white rounded-md shadow-sm" @tap="handleAnswer">确定</button>
    </view>
  </view>
</template>

<script>
import { eventCenter } from "@tarojs/taro"

export default {
  data() {
    return {
      answer: ""
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
  methods: {
    handleInput() {
      this.autoSubmit && this.handleAnswer()
    },
    handleAnswer() {
      if (!this.isAnswered && this.answer.length !== 0) {
        eventCenter.trigger('on.answer.question', this.answer)
      }
    }
  }
}
</script>
