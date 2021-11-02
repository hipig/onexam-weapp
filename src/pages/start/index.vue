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
              :options-classes="question.optionsClasses || {}"
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
  </view>
</template>

<script>
import _ from "lodash"
import { eventCenter, showToast } from "@tarojs/taro"
import { mapGetters, mapActions } from "vuex"

import questionItem from "../../components/question/Item.vue"
import topbar from "../../components/start/Topbar.vue"
import exerciseToolbar from "../../components/start/toolbar/Exercise.vue"

export default {
  data() {
    return {
      currentIndex: 0,
      questionList: []
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
      this.calculateOptionClass(key)
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
    }
  }
}
</script>
