import {SESSION} from "../../utils/config";
import {rank} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

Page({
    data: {
        hero: {},
        equipment: {}
    },
    onLoad: function (options) {
        let that = this
        rank().then(res => {
            let data = res.data ?? []
            console.log('data', data)
            if (data) {
                that.setData({
                    hero: data.hero,
                    equipment: data.equipment,
                })
            }
        }).catch(err => {
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this

        that.setData({
            session: session
        })
    },
    detail(e) {
        let id = e.currentTarget.dataset.heroId,
            session = e.currentTarget.dataset.heroSession
        if (id === 0 || session === "") {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        heroDetail(id, session)
    },
    onShareAppMessage(options) {
        let that = this
        return {
            title: `金铲铲之战-英雄、装备、羁绊数据排行统计`,
            path: `/pages/rank/index`,
        }
    },
});
