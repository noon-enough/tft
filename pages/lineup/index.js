import {SESSION, SESSION_SHOW_NICKNAME} from "../../utils/config";
import {chess, hero, hexes, jobs, lineup, races, synergies} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

const app = getApp()
Page({
    data: {
        id: 0,
        data: {},
        title: "",
        capsuleTitle: "",
        navigationBarHeight: 87,
        show_champion_name: false,
    },
    onLoad: function (options) {
        let id = options.id,
            that = this
        console.log("lineup-id", id, 'navBarHeight', app.globalData.navBarHeight)
        that.setData({
            id: id,
            navigationBarHeight: app.globalData.navBarHeight
        })
        that.getDetail(id)
    },
    onPullDownRefresh() {
        let that = this ,
            id = that.data.id
        wx.startPullDownRefresh()
        that.getDetail(id)
        wx.stopPullDownRefresh()
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this,
            show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME)

        console.log('show_nickname', show_nickname)
        that.setData({
            show_champion_name: show_nickname,
            session: session
        })
    },
    getDetail(id) {
        let that = this
        lineup(id).then(res => {
            console.log(res)
            let data = res.data ?? []
            if (data) {
                that.setData({
                    data: data,
                    title: data.title,
                })
            }
        }).catch(err => {
            showToast("拉取数据失败", {icon: "error"})
        })
    },
    onShareAppMessage(options) {
        let that = this,
            data = that.data
        return {
            title: `金铲铲之战-${data.title} 详细资料`,
            path: `/pages/lineup/index?id=${data.id}`,
        }
    },
    back() {
        wx.navigateBack()
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
    onPageScroll(e) {
        let that = this
        if(e.scrollTop >= 150) {
            that.setData({
                capsuleTitle: that.data.title,
                bgColor: "#101c42"
            })
        } else {
            that.setData({
                capsuleTitle: "",
                bgColor: "#transparent"
            })
        }
    }
});
