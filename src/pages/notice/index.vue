<template>
  <view class="flex flex-col">
    <view class="px-5 py-4">
      <view class="mb-5" v-for="(item ,index) in noticeList" :key="index">
        <view class="p-4 flex items-start bg-white rounded-lg shadow">
          <view class="mr-2 py-1">
            <view class="w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
              <view class="leading-none">
                <image :src="volumeIcon" class="block w-3_5 h-3_5" />
              </view>
            </view>
          </view>
          <view class="flex-1 min-w-0">
            <view>{{ item.title }}</view>
            <view class="mt-2 text-xs text-gray-500">{{ item.time }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import volumeIcon from "../../assets/img/icons/volume.svg"

export default {
  data() {
    return {
      volumeIcon,
      noticeList: [
        {
          title: 'V1.3.2上线通知',
          time: '2019-11-27 10:27:16'
        },
        {
          title: '二级建造师题库更新提醒',
          time: '2019-05-30 19:42:47'
        }
      ]
    }
  }
}
</script>