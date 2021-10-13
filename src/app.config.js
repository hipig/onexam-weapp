export default {
  pages: [
    'pages/index/index',
    'pages/my/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F9FAFB',
    navigationBarTitleText: 'OnExam',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#374151',
    selectedColor: '#10B981',
    borderStyle: 'white',
    list: [
      {
        text: '题库',
        pagePath: 'pages/index/index',
        iconPath: 'assets/img/tabbar/home.png',
        selectedIconPath: 'assets/img/tabbar/home-on.png'
      },
      {
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: 'assets/img/tabbar/my.png',
        selectedIconPath: 'assets/img/tabbar/my-on.png'
      }
    ]
  }
}
