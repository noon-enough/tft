import {SESSION} from "../../utils/config";
import {chess, hero, hexes, jobs, races, synergies} from "../../utils/api";
import {heroDetail, historyBack, showToast} from "../../utils/util";

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

    console.log("heroId", heroId, 'session', session, 'options', options)
    console.log('capsuleBarHeight', capsuleBarHeight)
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
      console.log(res)
      let data = res.data ?? []
      if (data) {
        that.setData({
          data: data,
          displayName: data.display_name,
          name: data.name,
          nickname: data.nickname,
        })
      }
    }).catch(err => {
      showToast("拉取数据失败", {icon: "error"})
    }).finally(e => {
      wx.hideLoading()
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
        bgColor: "#101c42"
      })
    } else {
      that.setData({
        title: "",
        bgColor: "transparent"
      })
    }
  }
});
