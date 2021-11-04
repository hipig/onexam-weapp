<template>
  <view class="px-5">
    <view class="mb-2">
      <view class="py-3">
        <view class="inline-block mr-1">
          <view class="px-1 text-xs rounded-sm" :class="[typeClasses]">{{ typeText }}</view>
        </view>
        <text class="text-gray-900 text-base">{{ title }}</text>
      </view>
      <view class="py-2">
        <single-choice-option v-if="questionType == 1" :is-answered="isAnsweredAndExercise" :options="options"></single-choice-option>
        <multiple-choice-option v-if="questionType == 2" :auto-submit="!isExercise" :is-answered="isAnsweredAndExercise" :options="options"></multiple-choice-option>
        <fill-blank-option v-if="questionType == 4" :auto-submit="!isExercise" :is-answered="isAnsweredAndExercise" :options="options"></fill-blank-option>
        <short-answer-option v-if="questionType == 5" :auto-submit="!isExercise" :is-answered="isAnsweredAndExercise"></short-answer-option>
      </view>
    </view>
    <view class="duration-300 ease-in-out" :class="[isRecite || isAnsweredAndExercise || isShowAnswer ? 'opacity-100' : 'opacity-0']">
      <view class="py-2">
        <view class="py-2 px-3 bg-gray-100 rounded">
          <view class="text-lg" :class="[isAnswerCorrect ? 'text-green-500' : 'text-red-500']" v-if="isAnswered">{{ isAnswerCorrect ? '回答正确' : '回答错误' }}</view>
          <view class="py-1 flex mt-1">
            <view class="mr-4">答案</view>
            <view class="flex-1 min-w-0">
              <text class="text-green-500 font-bold">{{ correctAnswerText }}</text>
            </view>
          </view>
          <view class="flex mt-1" v-if="!isAnswerCorrect && isAnswered">
            <view class="mr-4">你的答案</view>
            <view class="flex-1 min-w-0">
              <text class="text-gray-900 font-bold">{{ answerText }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="py-3 flex">
        <view class="mr-4 text-gray-500">解析</view>
        <view class="flex-1 min-w-0">
          <view v-html="parse"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import SingleChoiceOption from "./type/SingleChoice.vue"
import MultipleChoiceOption from "./type/MultipleChoice.vue"
import FillBlankOption from "./type/FillBlank.vue"
import ShortAnswerOption from "./type/ShortAnswer.vue"

const questionTypeMap = {
  1: {
    colorClasses: 'bg-green-500 text-white',
    text: '单选'
  },
  2: {
    colorClasses: 'bg-yellow-500 text-white',
    text: '多选'
  },
  3: {
    colorClasses: 'bg-gray-500 text-white',
    text: '判断'
  },
  4: {
    colorClasses: 'bg-blue-500 text-white',
    text: '填空'
  },
  5: {
    colorClasses: 'bg-purple-500 text-white',
    text: '简答'
  }
}

export default {
  data() {
    return {}
  },
  components: {
    SingleChoiceOption,
    MultipleChoiceOption,
    FillBlankOption,
    ShortAnswerOption
  },
  props: {
    mode: {
      type: String,
      default: 'exercise'
    },
    title: String,
    questionType: {
      type: Number,
      default: 1
    },
    options: Object | null,
    // optionsClasses: Object | null,
    correctAnswer: {
      type: String | Array,
      default: ''
    },
    answer: {
      type: String | Array,
      default: ''
    },
    parse: {
      type: String,
      default: ''
    },
    isRecite: {
      type: Boolean,
      default: false
    },
    isAnswered: {
      type: Boolean,
      default: false
    },
    isAnswerCorrect: {
      type: Boolean,
      default: false
    },
    isShowAnswer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isExercise() {
      return this.mode === 'exercise'
    },
    isAnsweredAndExercise() {
      return this.isAnswered && this.isExercise
    },
    typeClasses() {
      return questionTypeMap[this.questionType].colorClasses
    },
    typeText() {
      return questionTypeMap[this.questionType].text
    },
    answerText() {
      return this.formatAnswer(this.answer)
    },
    correctAnswerText() {
      return this.formatAnswer(this.correctAnswer)
    }
  },
  methods: {
    formatAnswer(answer) {
      switch(this.questionType) {
        case 2:
          return answer.join(', ')
        case 4:
          return answer.join('，')
      }

      return answer
    }
  }
}
</script>
