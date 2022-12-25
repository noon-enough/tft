import tabbar from '../../tabbar';
import {heroDetail, lineupDetail, showToast} from "../../utils/util";
import {jobs, synergies} from "../../utils/api";
import {SESSION_SHOW_NICKNAME} from "../../utils/config";

Page({
    data: {
        list:tabbar,
        data: [],
        filterIconPath: "/assets/images/filter-white.png",
        showFilterBody: false,
        show_champion_name: false,
        showFilterIndex: 0,
        showFilter: false,
        jobsData: [],
        filterType: "",
        filterId: ""
    },
    onLoad: function() {
        let that = this
        that.getStrategies()
        that.getJobs()
    },
    onShow() {
        let show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME),
            that = this
        console.log('onShow', 'show_nickname', show_nickname)
        that.setData({
            show_champion_name: show_nickname
        })
    },
    onShareAppMessage(options) {
        let that = this
        return {
            title: `金铲铲云顶上分吃鸡小助手`,
            path: `/pages/home/index`,
        }
    },
    getJobs() {
        let that = this
        jobs().then(res =>{
            let data = res.data ?? []
            if (data) {
                that.setData({
                    jobsData: data,
                })
                console.log('jobs', data)
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
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
    detail(e) {
        let id = e.currentTarget.dataset.id
        if (id === 0) {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        lineupDetail(id)
    },
    filter(e) {
        let that = this,
            isShow = false,
            filterIcon = "/assets/images/filter-white.png"
        if (that.data.showFilterBody === false) {
            isShow = true
            filterIcon = "/assets/images/filter.png"
        }

        that.setData({
            showFilterBody: isShow,
            filterIconPath: filterIcon,
        })
    },
    setFilterPanel(e) {
        let findex = e.currentTarget.dataset.findex ?? 0,
            that = this

        that.setData({
            showFilterIndex: parseInt(findex),
            showFilter: true
        })
    },
    hideFilter(e) {
        let that = this
        that.getStrategies()
        this.setData({
            showFilterIndex: 0,
            showFilter: false
        })
    },
    onFilter(e) {
        let that = this,
            id = e.currentTarget.dataset.id,
            type = e.currentTarget.dataset.type

        that.setData({
            filterType: type,
            filterId: id
        })
        console.log('filterType', type, 'filterId', id)
    }
});

