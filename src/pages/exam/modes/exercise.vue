<template>
  <view class="flex flex-col h-screen">
    <view class="border-0 border-b border-solid border-gray-100 bg-white">
      <view class="py-1 flex justify-center">
        <view class="flex items-center">
          <view class="w-20 h-7 border border-solid flex items-center justify-center rounded-l-full" :class="[!isRecite ? 'bg-green-500 text-white border-green-500 text-sm' : 'border-gray-100 text-gray-700 text-xs']" @tap="isRecite = false">答题模式</view>
          <view class="w-20 h-7 border border-solid flex items-center justify-center rounded-r-full" :class="[isRecite ? 'bg-green-500 text-white border-green-500 text-sm' : 'border-gray-100 text-gray-700 text-xs']" @tap="isRecite = true">背题模式</view>
        </view>
      </view>
      <view class="px-5 py-2 flex items-center justify-between">
        <view class="flex items-center">
          <view class="leading-none">
            <image :src="notesIcon" class="block h-5 w-5" />
          </view>
          <view class="flex items-center leading-none">
            <text class="text-green-500">1</text>
            <text class="text-gray-500 text-xs">/5</text>
          </view>
        </view>
        <view class="flex items-center">
          <text class="text-xs mr-1">收藏</text>
          <view class="leading-none">
            <image :src="starIcon" class="block h-5 w-5" />
          </view>
        </view>
      </view>
    </view>
    <view class="flex-1 min-h-0 flex flex-col">
      <swiper class="flex-1">
        <swiper-item class="h-full">
          <scroll-view :scroll-y="true" class="h-inherit">
            <view class="px-5">
              <view>
                <view class="py-3">
                  <view class="inline-block mr-1">
                    <view class="px-1 bg-green-500 text-white text-xs rounded-sm">单选</view>
                  </view>
                  <text class="text-gray-900">根据增值税法律制度的规定，一般纳税人提供下列应税服务，可以选择适用简易计税方法计税的有（　）。</text>
                </view>
                <view class="py-2">
                  <view class="py-3 flex items-center" v-for="(label, index) in ['A', 'B', 'C', 'D']" :key="index" @tap="handleAnswer">
                    <view class="pt-0_5">
                      <view class="w-5 h-5 flex items-center justify-center border-2 border-solid border-gray-200 rounded-full">
                        <view class="leading-none" v-if="isAnswered">
                          <image :src="checkIcon" v-if="true" class="lock h-4 w-4" />
                          <image :src="xIcon" v-else class="lock h-5 w-5" />
                        </view>
                      </view>
                    </view>
                    <view class="flex-1 min-w-0 ml-3">
                      <text class="text-sm">{{ label }}、安全第一，预防为主</text>
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="isRecite || isAnswered || isShowAnswer">
                <view class="py-4">
                  <text class="text-lg text-red-500" v-if="isAnswered">回答错误</text>
                </view>
                <view class="py-1 flex">
                  <view class="mr-3">答案</view>
                  <view class="flex-1 min-w-0">
                    <text class="text-green-500">C</text>
                  </view>
                </view>
                <view class="py-3 flex">
                  <view class="mr-3">解析</view>
                  <view class="flex-1 min-w-0">
                    <text>自2019年4月1日起，一般纳税人适用9%税率的行业和应税行为如下：一、交通运输、邮政、基础电信、建筑、不动产租赁服务，销售不动产，转让土地使用权;二、销售或者进口下列货物，税率为9%：粮食等农产品、食用植物油、食用盐;自来水、暖气、冷气、热水、煤气、石油液化气、天然气、二甲醚、沼气、居民用煤炭制品;图书、报纸、杂志、音像制品、电子出版物;饲料、化肥、农药、农机、农膜;国务院规定的其他货物。</text>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <view class="flex items-center justify-around py-0_5 border-0 border-t border-solid border-gray-100 bg-white">
      <view class="text-center text-xs text-gray-700">
        <view class="leading-none">
          <image :src="fileAlertIcon" class="inline-block h-6 w-6" />
        </view>
        <view>纠错</view>
      </view>
      <view class="text-center text-xs text-gray-700">
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
  </view>
</template>

<script>
import notesIcon from "../../../assets/img/icons/notes.svg"
import starIcon from "../../../assets/img/icons/star.svg"
import fileAlertIcon from "../../../assets/img/icons/file-alert.svg"
import editCircleIcon from "../../../assets/img/icons/edit-circle.svg"
import eyeIcon from "../../../assets/img/icons/eye.svg"
import eyeOffIcon from "../../../assets/img/icons/eye-off.svg"
import checkIcon from "../../../assets/img/icons/check.svg"
import xIcon from "../../../assets/img/icons/x.svg"
export default {
  data() {
    return {
      notesIcon,
      starIcon,
      fileAlertIcon,
      editCircleIcon,
      eyeIcon,
      eyeOffIcon,
      checkIcon,
      xIcon,
      isRecite: false,
      isAnswered: false,
      isShowAnswer: false
    }
  },
  methods: {
    handleAnswer() {
      if(!this.isAnswered) {
        this.isAnswered = true
      }
    },
    handleShowAnswer() {
      if(!this.isAnswered) {
        this.isShowAnswer = !this.isShowAnswer
      }
    }
  }
}
</script>