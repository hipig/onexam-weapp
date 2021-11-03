<template>
  <view class="border-0 border-t border-solid border-gray-100 bg-white">
    <view class="px-5 py-3 flex items-center justify-between">
      <view class="flex items-center px-4">
        <view class="leading-none">
          <image :src="clockIcon" class="block h-7 w-7" />
        </view>
        <text class="ml-1_5 text-gray-700">{{ timeText }}</text>
      </view>
      <view class="px-2">
        <view class="flex rounded-full shadow-sm overflow-hidden">
          <button class="text-center py-1_5 px-5 bg-yellow-500 text-white text-base rounded-none whitespace-nowrap">下次继续</button>
          <button class="text-center py-1_5 px-7 bg-green-500 text-white text-base rounded-none whitespace-nowrap">交卷</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import _ from "lodash"
import { eventCenter } from "@tarojs/taro"

import clockIcon from "../../../assets/img/icons/clock.svg"

export default {
  data() {
    return {
      clockIcon
    }
  },
  props: {
    doneTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timeText() {
      let time = this.duration - this.doneTime
      let timeArr = [
        Math.floor(time / 3600),
        Math.floor(time % 3600 / 60),
        Math.floor(time % 60)
      ]
      timeArr = _.map(timeArr, v => {
        return v >= 10 ? v : "0" + v
      })
      return timeArr.join(':')
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
