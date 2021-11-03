<template>
  <view class="flex items-center justify-around py-0_5 border-0 border-t border-solid border-gray-100 bg-white">
    <view class="text-center text-xs text-gray-700" @tap="handleReportError">
      <view class="leading-none">
        <image :src="fileAlertIcon" class="inline-block h-6 w-6" />
      </view>
      <view>纠错</view>
    </view>
    <view class="text-center text-xs text-gray-700" @tap="handleTakeNote">
      <view class="leading-none">
        <image :src="editCircleIcon" class="inline-block h-6 w-6" />
      </view>
      <view>写笔记</view>
    </view>
    <view class="text-center text-xs text-gray-700" v-if="!isRecite" @tap="handleShowAnswer">
      <view class="leading-none">
        <image :src="eyeOffIcon" v-if="isShowAnswer" class="inline-block h-6 w-6" />
        <image :src="eyeIcon" v-else class="inline-block h-6 w-6" />
      </view>
      <view :class="[isShowAnswer ? 'text-green-500' : '']">{{ isShowAnswer ? '隐藏答案' : '看答案' }}</view>
    </view>
  </view>
</template>

<script>
import { eventCenter } from "@tarojs/taro"

import fileAlertIcon from "../../../assets/img/icons/file-alert.svg"
import editCircleIcon from "../../../assets/img/icons/edit-circle.svg"
import eyeIcon from "../../../assets/img/icons/eye.svg"
import eyeOffIcon from "../../../assets/img/icons/eye-off.svg"

export default {
  data() {
    return {
      fileAlertIcon,
      editCircleIcon,
      eyeIcon,
      eyeOffIcon
    }
  },
  props: {
    isRecite: {
      type: Boolean,
      default: false
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
  methods: {
    handleReportError() {
      eventCenter.trigger('on.report.error')
    },
    handleTakeNote() {
      eventCenter.trigger('on.take.note')
    },
    handleShowAnswer() {
      if (!this.isAnswered) {
        eventCenter.trigger('on.show.answer', !this.isShowAnswer)
      }
    }
  }
}
</script>