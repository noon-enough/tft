import tabbar from '../../tabbar';
import {heroDetail, lineupDetail, showToast} from "../../utils/util";
import {synergies} from "../../utils/api";
import {SESSION_SHOW_NICKNAME} from "../../utils/config";

Page({
    data: {
        list:tabbar,
        data: [],
        show_champion_name: false
    },

    onLoad: function() {
        this.getStrategies()
    },
    onShow() {
        let show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME),
            that = this
        console.log('show_nickname', show_nickname)
        that.setData({
            show_nickname: show_nickname
        })
    },

    onShareAppMessage() {

    },

    onRefresh:function(){
    },
    getStrategies() {
        let that = this
        synergies().then(res=> {
            let data = res.data ?? []
            if (data) {
               that.setData({
                   data: data,
               })
                console.log('data', data)
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
        wx.stopPullDownRefresh()
    },
    onPullDownRefresh() {
        let that = this
        wx.startPullDownRefresh()
        that.getStrategies()
        wx.stopPullDownRefresh()
    },
    detailHero(e) {
        let id = e.currentTarget.dataset.heroId
        if (id === 0) {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        heroDetail(id)
    },
    detail(e) {
        let id = e.currentTarget.dataset.id
        if (id === 0) {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        lineupDetail(id)
    },
    filter(e) {
        console.log(e)
    }
});

