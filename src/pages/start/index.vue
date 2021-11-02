<template>
  <view class="flex flex-col h-screen relative">
    <view class="border-0 border-b border-solid border-gray-100 bg-white">
      <view class="py-1 flex justify-center">
        <view class="flex items-center">
          <view class="w-20 h-7 border border-solid flex items-center justify-center rounded-l-full" :class="[!isRecite ? 'bg-green-500 text-white border-green-500 text-sm' : 'border-gray-100 text-gray-700 text-xs']" @tap="handleOnRecite(false)">答题模式</view>
          <view class="w-20 h-7 border border-solid flex items-center justify-center rounded-r-full" :class="[isRecite ? 'bg-green-500 text-white border-green-500 text-sm' : 'border-gray-100 text-gray-700 text-xs']" @tap="handleOnRecite(true)">背题模式</view>
        </view>
      </view>
      <topbar :current="currentIndex+1" :total="questionList.length" :is-collected="currentQuestion.isCollected"></topbar>
    </view>
    <view class="flex-1 min-h-0 flex flex-col">
      <swiper :current="currentIndex" class="flex-1" @change="handleChange">
        <swiper-item class="h-full" v-for="(question, index) in questionList" :key="index">
          <scroll-view :scroll-y="true" class="h-inherit">
            <question-item :title="question.title"
              :question-type="question.type"
              :options="question.options"
              :correct-answer="question.answer"
              :answer="question.selfAnswer"
              :is-answered="question.isAnswered"
              :is-show-answer="question.isShowAnswer"
              :parse="question.parse">
            </question-item>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <exercise-toolbar :is-answered="currentQuestion.isAnswered" :is-show-answer="currentQuestion.isShowAnswer"></exercise-toolbar>
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
                <view class="py-3">
                  <view class="mb-4">
                    <view class="text-sm text-gray-900 hidden">单项选择(本类题共60题,每小题1分,共60分。每小题的备选项中，只有一个符合题意，多选，错选,不选均不得分)</view>
                    <view class="py-3 grid grid-cols-5 gap-9">
                      <view class="border-2 border-solid rounded-2xl overflow-hidden" v-for="(question, index) in questionList" :key="index" :class="[currentIndex == index ? 'border-gray-900' : 'border-gray-200', question.isAnswered ? 'bg-gray-200' : '']" @tap="handleToIndex(index)">
                        <view class="w-full pb-full relative">
                          <view class="absolute inset-0 flex items-center justify-center text-gray-500">{{ index+1 }}</view>
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
import _ from "lodash"
import { eventCenter, showToast } from "@tarojs/taro"
import { mapGetters, mapActions } from "vuex"

import questionItem from "../../components/question/Item.vue"
import topbar from "../../components/start/Topbar.vue"
import exerciseToolbar from "../../components/start/toolbar/Exercise.vue"

import closeIcon from "../../assets/img/icons/close.svg"

export default {
  data() {
    return {
      closeIcon,
      currentIndex: 0,
      questionList: [],
      isShowTab: false
    }
  },
  components: {
    topbar,
    questionItem,
    exerciseToolbar
  },
  mounted() {
    // 触发事件：答题
    eventCenter.on('on.answer', key => {
      console.log('event.answer: ', key)
      this.$set(this.currentQuestion, 'selfAnswer', key)
      this.$set(this.currentQuestion, 'isAnswered', true)
    })
    // 触发事件：收藏
    eventCenter.on('on.collect', status => {
      console.log('event.collect: ', status)
      showToast({
        title: status ? '收藏成功' : '取消收藏',
        icon: 'none'
      })
      this.$set(this.currentQuestion, 'isCollected', status)
    })
    // 触发事件：打开选项卡
    eventCenter.on('on.show.question.tab', _ => {
      console.log('event.show.question.tab: ')
      this.isShowTab = true
    })
    // 触发事件：纠错
    eventCenter.on('on.report.error', _ => {
      console.log('event.report.error: ')
    })
    // 触发事件：记笔记
    eventCenter.on('on.take.note', _ => {
      console.log('event.take.note: ')
    })
    // 触发事件：显示/隐藏答案
    eventCenter.on('on.show.answer', status => {
      console.log('event.show.answer: ', status)
      this.$set(this.currentQuestion, 'isShowAnswer',status)
    })
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
      item.isCollected = false
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
    ...mapGetters({
      'isRecite': 'basic/reciteStatus'
    }),
    currentQuestion() {
      return this.questionList[this.currentIndex]
    }
  },
  methods: {
    ...mapActions({
      'setReciteStatus': 'basic/setReciteStatus'
    }),
    handleOnRecite(status) {
      this.setReciteStatus(status)
    },

    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleToIndex(index) {
      this.currentIndex = index
      this.isShowTab = false
    }
  }
}
</script>
