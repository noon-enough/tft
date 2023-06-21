import {SESSION} from "../../utils/config";
import {rank} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

Page({
    data: {
        hero: {},
        equipment: {},
        mb: [],
    },
    onLoad: function (options) {
        let that = this
        rank().then(res => {
            let data = res.data ?? []
            console.log('data', data)
            if (data) {
                let mb = data.mb.map((item) => {
                    item.average = (item.average * 100).toFixed(1)
                    item.fourth = (item.fourth * 100).toFixed(1)
                    item.presence = (item.presence * 100).toFixed(1)
                    item.top = (item.top * 100).toFixed(1)
                    item.data = item.data.map((item) => {
                        let raw = item.data,
                            level = 1,
                            count = item.count,
                            rawLevel = {}

                        rawLevel = JSON.parse(raw.level.replace(/\n/g, ""))
                        let index = Object.keys(rawLevel).indexOf(count);
                        level = index + 1
                        item.level = level
                        return item
                    })
                    return item
                })
                that.setData({
                    hero: data.hero,
                    equipment: data.equipment,
                    mb: mb,
                })
            }
        }).catch(err => {
            console.log('err', err)
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
