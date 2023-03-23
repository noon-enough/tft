import {SESSION} from "../../utils/config";
import {chess, hero, hexes, jobs, races, synergies} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

const app = getApp()
Page({
  data: {
    session: "",
    id: 0,
    data: {},
    name: "",
    navigationBarHeight: 87,
  },
  onLoad: function (options) {
    let heroId = options.id,
        that = this,
        session = options.session

    console.log("heroId", heroId, 'session', session)
    that.setData({
      id: heroId,
      session: session
    })

    that.getHeroDetail(heroId, session)

    let { statusBarHeight } = wx.getSystemInfoSync(); // 当前设备信息
    let { height, top } = wx.getMenuButtonBoundingClientRect(); // 胶囊状态信息

    // 判断是否为iPhone设备，是：比值为3，否：比值为2
    let isIOSRatio = 2 //model.match(/iPhone/) ? 3 : 2; // 比值

    // 自定义标题栏的高度 =
    // 状态栏的高度 +
    // 状态栏与标题栏之间的缝隙（根据设备不同乘上对应的比值） +
    // 胶囊的高度
    let navigationBarHeight = statusBarHeight + (top - statusBarHeight) * isIOSRatio + height;
    that.setData({
      navigationBarHeight: navigationBarHeight,
    })
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
    // let session = wx.getStorageSync(SESSION),
    //     that = this
    //
    // that.setData({
    //   session: session
    // })
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
          name: data.display_name,
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
        data = that.data
    return {
      title: `金铲铲之战-${data.name} 详细资料`,
      path: `/pages/detail/index?id=${data.id}&${data.session}`,
    }
  },
  back() {
    wx.navigateBack()
  }
});
