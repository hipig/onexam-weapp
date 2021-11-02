<template>
  <view>
    <view class="px-5 flex items-center justify-between">
      <view class="py-2 flex items-center" @tap="isShowTab = true">
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
    <view class="fixed inset-0 flex items-end overflow-hidden duration-500 z-50" :class="[isShowTab ? 'visible' : 'invisible']">
      <view class="absolute inset-0 bg-gray-900 bg-opacity-50 duration-500 ease-in-out" :class="[isShowTab ? 'opacity-100' : 'opacity-0']" @tap="isShowTab = false"></view>
      <view class="w-full h-4__5 px-5 bg-white rounded-t-3xl z-10 transform transition duration-700 ease-in-out" :class="[isShowTab ? 'translate-y-0' : 'translate-y-full']">
        <view class="flex flex-col h-full">
          <view class="py-4 flex items-center justify-between border-0 border-b border-solid border-gray-100">
            <text>选项卡</text>
            <view class="leading-none" @tap="isShowTab = false">
              <image :src="closeIcon" class="block h-5 w-5" />
            </view>
          </view>
          <view class="flex-1 min-h-0">
            <view class="h-full">
              <scroll-view :scroll-y="true" class="h-inherit">
                <view class="py-2">
                  <view class="mb-4">
                    <view class="py-3 text-sm text-gray-900">单项选择(本类题共60题,每小题1分,共60分。每小题的备选项中，只有一个符合题意，多选，错选,不选均不得分)</view>
                    <view class="grid grid-cols-5 gap-9">
                      <view class="border-2 border-solid border-gray-200 rounded-2xl overflow-hidden" v-for="i in 5" :key="i">
                        <view class="w-full pb-full relative">
                          <view class="absolute inset-0 flex items-center justify-center text-gray-500">{{ i }}</view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </view>
          </view>
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
import closeIcon from "../../assets/img/icons/close.svg"

export default {
  data() {
    return {
      notesIcon,
      starIcon,
      staredIcon,
      closeIcon,
      isShowTab: false
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
      eventCenter.trigger('on.collect', !this.isCollected)
    }
  }
}
</script>