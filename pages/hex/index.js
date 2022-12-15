import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {hexes, jobs, races} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";
Page({
    data: {
        list:tabbar,
        races: [],
        jobs: [],
        hexes: {},
        session: "s7"
    },
    onLoad: function (options) {
        let that = this
        races().then(res => {
            console.log(res)
            let data = res.data ?? []
            if (data) {
                that.setData({
                    races: data
                })
                return data
            } else {
                return Promise.reject(res)
            }
        }).then(races => {
            jobs().then(res => {
                console.log(res)
                let data = res.data ?? []
                if (data) {
                    that.setData({
                        jobs: data,
                    })
                } else {
                    return Promise.reject(res)
                }
            }).catch(err => {
                showToast("拉取数据失败，请稍候再试", {icon: "error"})
            })
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this

        that.setData({
            session: session,
        })
    },
    detail(e) {
        let id = e.currentTarget.dataset.heroId
        if (id === 0) {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        heroDetail(id)
    },
    onTabTabBar(e) {
        let activeKey = e.detail.activeKey,
            that = this

        if (activeKey === "hex") {
            hexes(1).then(res => {
                console.log("data", res)
                let data = res.data ?? []
                if (data) {
                    that.setData({
                        hexes: data
                    })
                }
            }).catch(err => {
                showToast("拉取数据失败，请稍候再试", {icon: "error"})
            })
        }
    }
});
