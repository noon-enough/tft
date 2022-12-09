import {SESSION} from "../../utils/config";
import {chess, hero, hexes, jobs, races, synergies} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

Page({
  data: {
    id: 0,
    data: {}
  },
  onLoad: function (options) {
    let heroId = options.id,
        that = this
    console.log("heroId", heroId)
    that.setData({
      id: heroId
    })

    that.getHeroDetail(heroId)
  },
  onShow: function () {
    let session = wx.getStorageSync(SESSION),
        that = this

    that.setData({
      session: session
    })
  },
  getHeroDetail(id) {
    let that = this
    hero(id).then(res => {
      console.log(res)
      let data = res.data ?? []
      if (data) {
        that.setData({
          data: data
        })
      }

    }).catch(err => {
      showToast("拉取数据失败", {icon: "error"})
    })
  }
});
