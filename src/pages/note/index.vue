<template>
  <view class="flex flex-col">
    <view class="px-4 py-2 bg-white flex items-center justify-between">
      <picker mode="selector" :range="categoryNameList" @change="handleChange">
        <view class="flex items-center">
          <view class="leading-none">
            <image :src="filterIcon" class="block w-5 h-5" />
          </view>
          <text class="text-sm">{{ categoryList[selectedIndex].name || '全部' }}({{ categoryList[selectedIndex].count || 0 }})</text>
        </view>
      </picker>
    </view>
    <view class="py-2">
      <view class="py-2" v-for="(item, index) in noteList" :key="index">
        <view class="px-4 py-1 bg-white">
          <view class="py-1">
            <view class="py-1 text-gray-900">{{ item.content }}</view>
            <view class="mt-3 p-2 text-xs bg-gray-50 border border-solid border-gray-100 rounded-sm">
              <view class="flex items-start">
                <view class="pt-0_5 mr-1">
                  <view class="px-1 rounded-sm" :class="[questionTypeMap[item.question.type].colorClasses]">{{ questionTypeMap[item.question.type].text }}</view>
                </view>
                <text class="flex-1 min-w-0 text-sm text-gray-900">{{ item.question.title }}</text>
              </view>
              <view class="mt-2">
                <text class="text-gray-500 mr-1">来源</text>
                <text class="text-gray-700">{{ item.bank.name }}</text>
              </view>
            </view>
            <view class="py-2 flex items-center justify-between text-xs text-gray-500">
              <view>删除</view>
              <view>{{ item.created_at }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import filterIcon from "../../assets/img/icons/filter.svg"

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
    return {
      filterIcon,
      questionTypeMap,
      categoryList: [],
      noteList: [],
      selectedIndex: 0
    }
  },
  created() {
    this.categoryList = [
      {
        name: '中级会计师',
        count: 3
      },
      {
        name: '二级建造师',
        count: 2
      },
      {
        name: '一级消防工程师',
        count: 1
      }
    ]
    this.noteList = [
      {
        content: '这是一个测试笔记',
        question: {
          type: 2,
          title: '下列有关招标投标的法律文件中，法律效力最高的是（　）。'
        },
        bank: {
          name: '第一章 建设工程基本法律知识'
        },
        created_at: '2021-11-08 11:56:09'
      },
      {
        content: '采购员的代理行为属于委托代理，代理产生的后果由委托人承担。',
        question: {
          type: 1,
          title: '甲公司授权其采购员到乙公司购买一批电视机，并交给该采购员一份已盖公司公章的空白合同书，该采购员用此合同书与乙公司订立了购买电视机的合同。乙公司按时交货后未收到货款，双方发生纠纷后，乙公司应（　）'
        },
        bank: {
          name: '第二节 建设工程法人制度'
        },
        created_at: '2021-11-01 09:01:45'
      }
    ]

    let firstCount = 0
    this.categoryList.forEach(item => {
      firstCount += item.count
    })

    this.categoryList.unshift({
      name: '全部',
      count: firstCount
    })
  },
  computed: {
    categoryNameList() {
      return this.categoryList.map(item => {
        return item.name
      })
    }
  },
  methods: {
    handleChange(e) {
      this.selectedIndex = e.detail.value
    }
  }
}
</script>