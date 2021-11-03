<template>
  <view class="flex flex-col h-screen relative">
    <view class="border-0 border-b border-solid border-gray-100 bg-white">
      <view class="py-1 flex justify-center" v-if="isExercise">
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
            <question-item :mode="mode"
              :title="question.title"
              :question-type="question.type"
              :options="question.options"
              :correct-answer="question.answer"
              :answer="question.selfAnswer"
              :is-recite="isRecite"
              :is-answered="question.isAnswered"
              :is-answer-correct="question.isAnswerCorrect"
              :is-show-answer="question.isShowAnswer"
              :parse="question.parse">
            </question-item>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <toolbar-exercise v-if="isExercise" :is-recite="isRecite" :is-answered="currentQuestion.isAnswered" :is-show-answer="currentQuestion.isShowAnswer"></toolbar-exercise>
    <toolbar-test v-if="isTest" :done-time="doneTime"></toolbar-test>
    <toolbar-exam v-if="isExam" :done-time="doneTime" :duration="120*60"></toolbar-exam>
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
                      <view class="border-2 border-solid rounded-2xl overflow-hidden" v-for="(question, index) in questionList" :key="index" :class="getTabItemClasses(question, index)" @tap="handleToIndex(index)">
                        <view class="w-full pb-full relative">
                          <view class="absolute inset-0 flex items-center justify-center">{{ index+1 }}</view>
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

import QuestionItem from "../../components/question/Item.vue"
import Topbar from "../../components/start/Topbar.vue"
import ToolbarExercise from "../../components/start/toolbar/Exercise.vue"
import ToolbarTest from "../../components/start/toolbar/Test.vue"
import ToolbarExam from "../../components/start/toolbar/Exam.vue"

import closeIcon from "../../assets/img/icons/close.svg"

export default {
  data() {
    return {
      closeIcon,
      currentIndex: 0,
      questionList: [],
      mode: 'exam',
      isShowTab: false,
      isRecite: false,
      isPause: false,
      doneTime: 0,
      countdownText: '00:00:00'
    }
  },
  components: {
    Topbar,
    QuestionItem,
    ToolbarExercise,
    ToolbarTest,
    ToolbarExam
  },
  mounted() {
    // 触发事件：答题
    eventCenter.on('on.answer.question', answer => {
      console.log('event.answer.question: ', answer)
      this.handleAnswer(answer)
    })
    // 触发事件：收藏题目
    eventCenter.on('on.collect.question', status => {
      console.log('event.collect.question: ', status)
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
  beforeDestroy() {
    eventCenter.off('on.answer.question')
    eventCenter.off('on.collect.question')
    eventCenter.off('on.show.question.tab')
    eventCenter.off('on.answer.question')
    eventCenter.off('on.report.error')
    eventCenter.off('on.take.note')
    eventCenter.off('on.show.answer')
  },
  created() {
    let questionList = [
      {
        id: 1,
        type: 1,
        title: "甲公司授权其采购员到乙公司购买一批电视机，并交给该采购员一份已盖公司公章的空白合同书，该采购员用此合同书与乙公司订立了购买电视机的合同。乙公司按时交货后未收到货款，双方发生纠纷后，乙公司应（　）",
        answer: 'D',
        options: [
          {
            key: 'A',
            text: '要求甲公司支付电视机货款'
          },
          {
            key: 'B',
            text: '要求该采购员支付电视机货款'
          },
          {
            key: 'C',
            text: '中止合同并要求甲公司退货'
          },
          {
            key: 'D',
            text: '换货后要求甲公司支付电视机货款'
          }
        ],
        parse: "采购员的代理行为属于委托代理，代理产生的后果由委托人承担。"
      },
      {
        id: 2,
        type: 2,
        title: "下列有关招标投标的法律文件中，法律效力最高的是（　）。",
        answer: ['B', 'C'],
        options: [
          {
            key: 'A',
            text: '《招标投标法》'
          },
          {
            key: 'B',
            text: '《建筑业企业资质管理规定》'
          },
          {
            key: 'C',
            text: '《北京市招标投标条例》'
          },
          {
            key: 'D',
            text: '《工程建设项目施工招标投标办法》'
          }
        ],
        parse: "<p>本题考查的是法的效力层级。《招标投标法》属于法律的层面，大于其他几个法律形式。</p>"
      },
      {
        id: 4,
        type: 4,
        title: "下列有关招标投标的法律文件中，法律效力最高的是（　）。",
        answer: ['test', 'test'],
        options: [],
        parse: "<p>本题考查的是法的效力层级。《招标投标法》属于法律的层面，大于其他几个法律形式。</p>"
      }
    ]

    this.questionList = _.map(questionList, (item) => {
      item.selfAnswer = []
      item.isCollected = false
      item.isAnswered = false
      item.isAnswerCorrect = false
      item.isShowAnswer = false
      item.options = _.map(item.options, option => {
        option.result = ''
        return option
      })

      return item
    })

    this.intervalEvent()
  },
  computed: {
    isExercise() {
      return this.mode === 'exercise'
    },
    isTest() {
      return this.mode === 'test'
    },
    isExam() {
      return this.mode === 'exam'
    },
    currentQuestion() {
      return this.questionList[this.currentIndex]
    }
  },
  methods: {
    intervalEvent() {
      setInterval(_ => {
        if (!this.isPause) this.doneTime++
      }, 1000)
    },
    handleOnRecite(status) {
      this.isRecite = status
    },
    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleAnswer(answer) {
      this.$set(this.currentQuestion, 'selfAnswer', answer)
      this.$set(this.currentQuestion, 'isAnswered', true)
      this.calculateAnswerResult(answer)
    },
    calculateAnswerResult(answer) {
      let options = this.currentQuestion.options
      let correctAnswer = this.currentQuestion.answer
      let questionType = this.currentQuestion.type

      switch(questionType) {
        // 单选
        case 1:
          _.forEach(options, (option, index) => {
            let result = ''
            if (option.key == correctAnswer) {
              result = 'correct'
            } else if (option.key == answer) {
              result = 'incorrect'
            }
            this.$set(this.currentQuestion.options[index], 'result', result)
          })
          this.$set(this.currentQuestion, 'isAnswerCorrect', answer == correctAnswer)
          break
        // 多选
        case 2:
          _.forEach(options, (option, index) => {
            let result = ''
            if (correctAnswer.indexOf(option.key) > -1) {
              result = 'correct'
            } else if (answer.indexOf(option.key) > -1) {
              result = 'incorrect'
            }
            this.$set(this.currentQuestion.options[index], 'result', result)
          })
          this.$set(this.currentQuestion, 'isAnswerCorrect', answer.sort().toString() === correctAnswer.sort().toString())
          break
      }
    },
    handleToIndex(index) {
      this.currentIndex = index
      this.isShowTab = false
    },
    getTabItemClasses(question, index) {
      let bgClass = '', borderClass = ''
      let noCurrentBorderClass = 'border-gray-200', currentBorderClass = 'border-gray-900'
      if (question.isAnswered) {
        bgClass = 'bg-gray-200 text-gray-700'
        if (this.mode === 'exercise') {
          bgClass = question.isAnswerCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          currentBorderClass = question.isAnswerCorrect ? 'border-green-600' : 'border-red-600'
          noCurrentBorderClass = question.isAnswerCorrect ? 'border-green-500' : 'border-red-500'
        }
      }
      borderClass = this.currentIndex === index ? currentBorderClass : noCurrentBorderClass

      return [bgClass, borderClass]
    }
  }
}
</script>
