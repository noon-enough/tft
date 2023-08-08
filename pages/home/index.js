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
        jobsDefaultSelect: -1,
        jobsDefaultData: {},
        jobsIsActive: false,
        jobsDefaultDataShow: false,
        raceData: [],
        raceDefaultSelect: -1,
        raceDefaultData: {},
        raceIsActive: false,
        raceDefaultDataShow: false,
        qualityData: [],
        qualityDefaultSelect: "ALL",
        qualityDefaultData: {},
        qualityDefaultDataShow: false,
        qualityIsActive: false,
        filterType: "",
        filterId: "",
        loadmore: false,
        page: 1,
        isLast: false
    },
    onLoadJob() {
        let that = this,
            jobData = app.globalData.jobData,
            jobsDefaultData= {},
            jobsDefaultSelect = that.data.jobsDefaultSelect
        jobData.forEach((item) => {
            if (item.key === jobsDefaultSelect) {
                jobsDefaultData = {...item}
            }
        })
        console.log('onLoadJob', jobData, 'jobsDefaultData', jobsDefaultData)
        that.setData({
            jobsData: jobData,
            jobsDefaultData: jobsDefaultData,
        })
    },
    onLoadRace() {
        let that = this,
            raceData = app.globalData.raceData,
            raceDefaultData = {},
            raceDefaultSelect = that.data.raceDefaultSelect
        raceData.forEach((item) => {
            if (item.key === raceDefaultSelect) {
                raceDefaultData = {...item}
            }
        })

        console.log('onLoadRace', raceData, 'raceDefaultData', raceDefaultData)
        that.setData({
            raceData: raceData,
            raceDefaultData: raceDefaultData
        })
    },
    onLoadQuality() {
        let that = this,
            qualityData = app.globalData.qualityData,
            qualityDefaultSelect = that.data.qualityDefaultSelect,
            qualityDefaultData =  {}
        qualityData.forEach((item) => {
            if (item.key === qualityDefaultSelect) {
                qualityDefaultData = {...item}
            }
        })

        console.log('onLoadQuality', qualityData, 'qualityDefaultData', qualityDefaultData)
        that.setData({
            qualityData: qualityData,
            qualityDefaultData: qualityDefaultData,
        })
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
    getStrategies() {
        let that = this,
            page = that.data.page,
            oldData = that.data.data,
            query = {
                race: that.data.raceDefaultSelect,
                job: that.data.jobsDefaultSelect,
                quality: that.data.qualityDefaultSelect,
                page: page
            }
        that.setData({
            loadmore: true
        })

        if (page === 1) {
            oldData = []
        }

        console.log("getStrategies", query)
        synergies(query).then(res=> {
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
        let data = {
            top: "hex",
            second: "legend",
        }
        console.log('gotoGalaxy', data)
        app.globalData.hex = data

        gotoHex()
    },
    gotoLegend: function() {
        let data = {
            top: "galaxy",
            second: "",
        }
        console.log('gotoGalaxy', data)
        app.globalData.hex = data
        gotoHex()
    },
    openClose(e) {
        let that = this,
            type = e.currentTarget.dataset.type ?? "job",
            data = {}

        if (type === "job") {
            data.jobsDefaultDataShow = !that.data.jobsDefaultDataShow
        } else if (type === 'race') {
            data.raceDefaultDataShow = !that.data.raceDefaultDataShow
        } else if (type === "quality") {
            data.qualityDefaultDataShow = !that.data.qualityDefaultDataShow
        }

        console.log('type', type, 'data', data)
        that.setData(data)
    },
    onFilterBoxChange(e) {
        let that = this,
            {id, name, type} =  e.currentTarget.dataset,
            data = {}

        if (type === "job") {
            id = parseInt(id)
            data.jobsDefaultSelect = id
            data.jobsDefaultDataShow = false
            data.jobsIsActive = id !== -1
            that.data.jobsData.forEach((item) => {
                if (item.key === id) {
                    data.jobsDefaultData = {...item}
                }
            })
        } else if (type === "race") {
            id = parseInt(id)
            data.raceDefaultSelect = id
            data.raceDefaultDataShow = false
            data.raceIsActive = id !== -1
            that.data.raceData.forEach((item) => {
                if (item.key === id) {
                    data.raceDefaultData = {...item}
                }
            })
        } else if (type === "quality") {
            data.qualityDefaultSelect = id
            data.qualityDefaultDataShow = false
            data.qualityIsActive = id !== -1
            that.data.qualityData.forEach((item) => {
                if (item.key === id) {
                    data.qualityDefaultData = {...item}
                }
            })
        }
        console.log('onFilterBoxChange', 'data', data)
        that.setData(data)
        that.getStrategies()
    }
});

