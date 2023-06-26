import tabbar from '../../tabbar';
import selection from "../../selection";
import {goto, gotoHex, heroDetail, lineupDetail, showToast} from "../../utils/util";
import {jobs, races, synergies} from "../../utils/api";
import {DEFAULT_SESSION, DEFAULT_SESSION_NAME, SESSION, SESSION_SET, SESSION_SHOW_NICKNAME} from "../../utils/config";

const app = getApp()
Page({
    data: {
        show_new_session: false,
        selection: selection,
        list:tabbar,
        data: [],
        filterIconPath: "/assets/images/filter-white.png",
        showFilterBody: false,
        show_champion_name: false,
        showFilterIndex: 0,
        showFilter: false,
        jobsData: [],
        raceData: [],
        filterType: "",
        filterId: "",
        loadmore: false,
        page: 1,
        isLast: false
    },
    onLoad: function() {
        let that = this

        let newSession = wx.getStorageSync(SESSION_SET)
        newSession = parseInt(newSession)
        that.setData({
            page: 1,
            data: [],
            show_new_session: newSession !== 1,
        })

        that.getStrategies()
        that.getJobs()
        that.getRaces()
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
    getRaces() {
        let that = this
        races().then(res => {
            let data = res.data ?? []
            if (data) {
                that.setData({
                    raceData: data,
                })
                console.log('races', data)
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
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
        let that = this,
            filterId = that.data.filterId,
            filterType = that.data.filterType,
            race = 0,
            job = 0,
            quality = "ALL",
            page = that.data.page,
            oldData = that.data.data
        that.setData({
            loadmore: true
        })

        if (page === 1) {
            oldData = []
        }

        console.log('filterType', filterType, 'filterId', filterId)
        if (filterType === "job") {
            job = parseInt(filterId)
        } else if (filterType === 'race') {
            race = parseInt(filterId)
        } else if (filterType === "quality") {
            quality = filterId
        }
        synergies({race: race,
            job: job,
            quality: quality,
            page: page
        }).then(res=> {
            let data = res.data ?? [],
                totalPage = res.extra.totalPage ?? 1,
                isLast = false

            data = oldData.concat(data)
            if (page > totalPage) {
                isLast = true
            }
            if (data) {
               that.setData({
                   isLast: isLast,
                   data: data,
                   loadmore: false
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
    onPullDownRefresh: function() {
        let that = this
        wx.startPullDownRefresh()
        that.setData({
            page: 1,
        })
        that.getStrategies()
        wx.stopPullDownRefresh()
    },
    onReachBottom: function() {
        let that = this,
            page = that.data.page,
            nextPage = page + 1,
            isLast = that.data.isLast

        if (isLast === true) {
            console.log('isLast', isLast, 'page', page)
            return
        }

        that.setData({
            page: nextPage
        })
        that.getStrategies()
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
        let type = e.currentTarget.dataset.type ?? 0,
            that = this
        let filterId = 0
        if (type === 'quality') {
            filterId = "ALL"
        }

        that.setData({
            showFilterIndex: type,
            showFilter: true
        })
    },
    hideFilter(e) {
        let that = this
        that.getStrategies()
        this.setData({
            showFilterIndex: 0,
            showFilter: false,
            filterId: 0,
            filterType: "",
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
    },
    selectionTap(e) {
        console.log('e', e)
        let uri = e.currentTarget.dataset.targetUri ?? ""
        if (uri === "") {
            return false
        }

        goto(uri)
    },
    onNewSession(e) {
        let that = this,
            sessionName = DEFAULT_SESSION_NAME

        showToast(`新赛季切换成功`, {icon: "success"})
        wx.setStorageSync(SESSION_SET, 1)
        wx.setStorageSync(SESSION, DEFAULT_SESSION)

        that.setData({
            show_new_session: false,
        })

        that.onLoad()
    },
    changeMask() {
        let that = this
        that.onNewSession()
    },
    gotoGalaxy: function() {
        app.globalData.hex = {
            top: "galaxy",
            second: "",
        }
        gotoHex()
    },
    gotoLegend: function() {
        app.globalData.hex = {
            top: "hex",
            second: "legend",
        }
        gotoHex()
    }
});

