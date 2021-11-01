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
            <text class="text-green-500">{{ currentIndex+1 }}</text>
            <text class="text-gray-500 text-xs">/{{ questionList.length }}</text>
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
      <swiper :current="currentIndex" class="flex-1" @change="handleChange">
        <swiper-item class="h-full" v-for="(question, index) in questionList" :key="index">
          <scroll-view :scroll-y="true" class="h-inherit">
            <view class="px-5">
              <view>
                <view class="py-3">
                  <view class="inline-block mr-1">
                    <view class="px-1 text-xs rounded-sm" :class="[getType(question.type).colorClasses ]">{{ getType(question.type).text }}</view>
                  </view>
                  <text class="text-gray-900">{{ question.title }}</text>
                </view>
                <view class="py-2">
                  <view class="py-3 flex items-center" v-for="(text, key) in question.options" :key="key" @tap="handleAnswer(key)">
                    <view class="pt-0_5">
                      <view class="w-5 h-5 flex items-center justify-center border-2 border-solid border-gray-200 rounded-full" :class="[question.optionsClasses[key] || '']">
                        <view class="leading-none" v-if="question.isAnswered">
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
              <view v-if="isRecite || question.isAnswered || question.isShowAnswer">
                <view class="py-4">
                  <text class="text-lg" :class="[checkCorrectOption(question.selfAnswer) ? 'text-green-500' : 'text-red-500']" v-if="question.isAnswered">{{ checkCorrectOption(question.selfAnswer) ? '回答正确' : '回答错误' }}</text>
                </view>
                <view class="py-1 flex">
                  <view class="mr-3">答案</view>
                  <view class="flex-1 min-w-0">
                    <text class="text-green-500">{{ question.answer }}</text>
                  </view>
                </view>
                <view class="py-3 flex">
                  <view class="mr-3">解析</view>
                  <view class="flex-1 min-w-0">
                    <view v-html="question.parse"></view>
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
          <image :src="eyeOffIcon" v-if="questionList[currentIndex].isShowAnswer" class="inline-block h-6 w-6" />
          <image :src="eyeIcon" v-else class="inline-block h-6 w-6" />
        </view>
        <view :class="[questionList[currentIndex].isShowAnswer ? 'text-green-500' : '']">{{ questionList[currentIndex].isShowAnswer ? '隐藏答案' : '看答案' }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import _ from "lodash"

import notesIcon from "../../../assets/img/icons/notes.svg"
import starIcon from "../../../assets/img/icons/star.svg"
import fileAlertIcon from "../../../assets/img/icons/file-alert.svg"
import editCircleIcon from "../../../assets/img/icons/edit-circle.svg"
import eyeIcon from "../../../assets/img/icons/eye.svg"
import eyeOffIcon from "../../../assets/img/icons/eye-off.svg"
import checkIcon from "../../../assets/img/icons/check.svg"
import xIcon from "../../../assets/img/icons/x.svg"

const typeMap = {
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
      notesIcon,
      starIcon,
      fileAlertIcon,
      editCircleIcon,
      eyeIcon,
      eyeOffIcon,
      checkIcon,
      xIcon,
      currentIndex: 0,
      questionList: [],
      optionClasses: {},
      isRecite: false
    }
  },
  created() {
    let questionList = [
      {
        id: 1,
        type: 1,
        title: "甲公司授权其采购员到乙公司购买一批电视机，并交给该采购员一份已盖公司公章的空白合同书，该采购员用此合同书与乙公司订立了购买电视机的合同。乙公司按时交货后未收到货款，双方发生纠纷后，乙公司应（　）",
        answer: 'D',
        options: {
          A: "要求甲公司支付电视机货款",
          B: "要求该采购员支付电视机货款",
          C: "中止合同并要求甲公司退货",
          D: "换货后要求甲公司支付电视机货款"
        },
        parse: "采购员的代理行为属于委托代理，代理产生的后果由委托人承担。"
      },
      {
        id: 2,
        type: 1,
        title: "下列有关招标投标的法律文件中，法律效力最高的是（　）。",
        answer: 'D',
        options: {
          A: "《招标投标法》",
          B: "《建筑业企业资质管理规定》",
          C: "《北京市招标投标条例》",
          D: "《工程建设项目施工招标投标办法》"
        },
        parse: "<p>本题考查的是法的效力层级。《招标投标法》属于法律的层面，大于其他几个法律形式。</p>"
      }
    ]

    this.questionList = _.map(questionList, (item) => {
      item.selfAnswer = []
      item.isAnswered = false
      item.isShowAnswer = false
      let optionsClasses = {}
      _.forEach(item.options, (_, key) => {
        optionsClasses[key] = ''
      })
      item.optionsClasses = optionsClasses

      return item
    })
  },
  computed: {
    currentQuestion() {
      return this.questionList[this.currentIndex]
    }
  },
  methods: {
    getType(type) {
      return typeMap[type]
    },
    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleAnswer(key) {
      if (!this.isRecite && !this.currentQuestion.isAnswered && !this.currentQuestion.isShowAnswer) {
        this.$set(this.currentQuestion, 'selfAnswer', key)
        this.$set(this.currentQuestion, 'isAnswered', true)
        this.calculateOptionClass(key)
      }
    },
    calculateOptionClass(key) {
      _.forEach(this.currentQuestion.options, (_, key) => {
        let classes = ''
        if (this.checkCorrectOption(key)) {
          classes = 'bg-green-500 border-green-500'
        }
        if (this.checkInCorrectOption(key)) {
          classes = 'bg-red-500 border-red-500'
        }
        this.$set(this.currentQuestion.optionsClasses, key, classes)
      })
    },
    checkCorrectOption(key) {
      return key == this.currentQuestion.answer
    },
    checkInCorrectOption(key) {
      return key == this.currentQuestion.selfAnswer && !this.checkCorrectOption(key)
    },
    handleShowAnswer() {
      if (!this.currentQuestion.isAnswered) {
        this.$set(this.currentQuestion, 'isShowAnswer', !this.currentQuestion.isShowAnswer)
      }
    }
  }
}
</script>
