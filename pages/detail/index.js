import {hero} from "../../utils/api";
import {gotoRank, historyBack, rebuildHeroInfo, showToast} from "../../utils/util";

const app = getApp()
Page({
  data: {
    session: "",
    id: 0,
    data: {},
    name: "",
    displayName: "",
    nickname: "",
    navigationBarHeight: 87,
    capsuleBarHeight: 0,
    title: "",
    bgColor: "transparent"
  },
  onLoad: function (options) {
    let heroId = options.id,
        that = this,
        session = options.session,
        capsuleBarHeight = app.globalData.system.navigationBarHeight

    that.setData({
      id: heroId,
      session: session,
      capsuleBarHeight: capsuleBarHeight,
      navigationBarHeight: capsuleBarHeight + 300
    })

    that.getHeroDetail(heroId, session)
  },
  onPullDownRefresh() {
    let that = this ,
        heroId = that.data.id,
        session = that.data.session

    wx.startPullDownRefresh()
    that.getHeroDetail(heroId, session)
    wx.stopPullDownRefresh()

  },
  onShow: function () {
  },
  getHeroDetail(id, session) {
    let that = this
    wx.showLoading()
    hero(id, session).then(res => {
      let data = res.data ?? []
      if (data) {
        console.log('getHeroDetail', data)

        data = rebuildHeroInfo(data, true)

        that.setData({
          data: data,
          displayName: data.display_name,
          name: data.name,
          nickname: data.nickname,
        })

        wx.hideLoading()
      }
    }).catch(err => {
      showToast("拉取数据失败", {icon: "error"})

      wx.hideLoading()
    }).finally(e => {
    })
  },
  onShareAppMessage(options) {
    let that = this,
        data = that.data,
        title = ""
    if (data.nickname) {
      title = `${data.name} ${data.displayName} (${data.nickname})`
    } else {
      title = `${data.name} ${data.displayName}`
    }
    let path = `/pages/detail/index?id=${data.id}&session=${data.session}`

    console.log('share path', path)
    return {
      title: `金铲铲之战 - ${title} 详细资料`,
      path: path,
    }
  },
  back() {
    historyBack()
  },
  onPageScroll(e) {
    let that = this,
        data = that.data,
        title = ""
    if (data.nickname) {
      title = `${data.name} ${data.displayName} (${data.nickname})`
    } else {
      title = `${data.name} ${data.displayName}`
    }

    if (e.scrollTop >= 300) {
      that.setData({
        title: title,
        bgColor: "#1C1533"
      })
    } else {
      that.setData({
        title: "",
        bgColor: "transparent"
      })
    }
  },
  gotoRank: function (e) {
    let that = this,
        type = e.currentTarget.dataset.type ?? "hex"
    gotoRank(type)
  },
  onOpenLOLMiniProc(e) {
    let that = this,
        id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name

    console.log('onOpenLOLMiniProc', e.currentTarget.dataset)
    wx.navigateToMiniProgram({
      appId: 'wx70487acfdf04b312',  //要打开的小程序appid
      path: `/pages/detail/index?id=${id}`,  //要打开另一个小程序的页面和传递的参数
      envVersion: 'release', //打开小程序的版本（体验版trial；开发版develop；正式版release）
      success(res) {}
    })
  },
});
