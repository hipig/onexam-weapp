<template>
  <view>
    <view class="px-5 flex items-center justify-between">
      <view class="py-2 flex items-center" @tap="handleShowTab">
        <view class="leading-none">
          <image :src="notesIcon" class="block h-5 w-5" />
        </view>
        <view class="flex items-center leading-none">
          <text class="text-green-500">{{ current }}</text>
          <text class="text-gray-500 text-xs">/{{ total }}</text>
        </view>
      </view>
      <view class="py-2 flex items-center" @tap="handleCollect">
        <text class="text-xs mr-1" :class="[isCollected ? 'text-green-500' : '']">{{ isCollected ? '已收藏' : '收藏' }}</text>
        <view class="leading-none">
          <image :src="staredIcon" v-if="isCollected" class="block h-5 w-5" />
          <image :src="starIcon" v-else class="block h-5 w-5" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { eventCenter } from "@tarojs/taro"

import notesIcon from "../../assets/img/icons/notes.svg"
import starIcon from "../../assets/img/icons/star.svg"
import staredIcon from "../../assets/img/icons/stared.svg"

export default {
  data() {
    return {
      notesIcon,
      starIcon,
      staredIcon
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    isCollected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCollect() {
      eventCenter.trigger('on.collect.question', !this.isCollected)
    },
    handleShowTab() {
      eventCenter.trigger('on.show.question.tab')
    }
  }
}
</script>
