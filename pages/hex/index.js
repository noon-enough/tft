import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {galaxy, hexes, jobs, legend, races} from "../../utils/api";
import {gotoLegend, heroDetail, showToast} from "../../utils/util";
Page({
    data: {
        list:tabbar,
        races: [],
        jobs: [],
        legend: {},
        galaxy: {},
        hexes: {
            type1: [],
            type2: [],
            type3: [],
            type4: [],
        },
        hexesBackup: {
            type1: [],
            type2: [],
            type3: [],
            type4: [],
        },
        session: "s7"
    },
    onLoad: function (options) {
        let that = this
        that.getRaces()
        that.getJobs()
        that.getLegend()
        that.getGalaxy()
    },
    getRaces: function () {
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
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    getJobs: function() {
        let that = this
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
    },
    getLegend: function() {
        let that = this
        legend().then(res => {
            console.log("getLegend", res)

            let data = res.data ?? []
            if (data) {
                that.setData({
                    legend: data,
                })
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    getGalaxy: function() {
        let that = this
        galaxy().then(res => {
            console.log("getGalaxy", res)

            let data = res.data ?? []
            if (data) {
                that.setData({
                    galaxy: data,
                })
            } else {
                return Promise.reject(res)
            }
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
        let id = e.currentTarget.dataset.heroId,
            session = e.currentTarget.dataset.heroSession
        if (id === 0 || session === "") {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        heroDetail(id, session)
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
                        hexes: {
                            type1: data.type1,
                            type2: data.type2,
                            type3: data.type3,
                            type4: data.type4,
                        },
                        hexesBackup: {
                            type1: data.type1,
                            type2: data.type2,
                            type3: data.type3,
                            type4: data.type4,
                        },
                    })
                }
            }).catch(err => {
                showToast("拉取数据失败，请稍候再试", {icon: "error"})
            })
        }
    },
    searchConfirm(e) {
        let q = e.detail.value ?? ""
        if (q === "") {
            return
        }
        let type = e.currentTarget.dataset.type ?? ''
        this.searchHexesBackup(q, type)
    },
    searchClear(e) {
        let that = this,
            type = e.currentTarget.dataset.type ?? ''
        console.log('e', e);
        if (type === "silver") {
            console.log('that.data.hexesBackup.type1', that.data.hexesBackup)
            that.setData({
                ["hexes.type1"]: that.data.hexesBackup.type1,
            })
        }
        if (type === "gold") {
            that.setData({
                ["hexes.type2"]: that.data.hexesBackup.type2,
            })
        }
        if (type === "colorful") {
            that.setData({
                ["hexes.type3"]: that.data.hexesBackup.type3,
            })
        }
        if (type === "hero") {
            that.setData({
                ["hexes.type4"]: that.data.hexesBackup.type4,
            })
        }
    },
    searchChange(e){
        let q = e.detail.value ?? ""
        if (q === "") {
            return
        }
        let type = e.currentTarget.dataset.type ?? ''
        let that = this
        that.searchHexesBackup(q, type)
    },
    searchHexesBackup(q, type) {
        let that = this


        if (type === "silver") {
            let data = []
            that.data.hexesBackup.type1.forEach(item => {
                if (item.name.indexOf(q) >= 0) {
                    data.push(item)
                }
            })
            that.setData({
                ["hexes.type1"]: data,
            })
            return
        }
        if (type === "gold") {
            let data = []
            that.data.hexesBackup.type2.forEach(item => {
                if (item.name.indexOf(q) >= 0) {
                    data.push(item)
                }
            })
            that.setData({
                ["hexes.type2"]: data,
            })
            return
        }
        if (type === "colorful") {
            let data = []
            that.data.hexesBackup.type3.forEach(item => {
                if (item.name.indexOf(q) >= 0) {
                    data.push(item)
                }
            })
            that.setData({
                ["hexes.type3"]: data,
            })
            return
        }
        if (type === "hero") {
            let data = []
            that.data.hexesBackup.type4.forEach(item => {
                if (item.name.indexOf(q) >= 0) {
                    data.push(item)
                }
            })
            that.setData({
                ["hexes.type4"]: data,
            })
        }
    },
    gotoLegend: function(e) {
        console.log('gotoLegend', e)
        let that = this ,
            id = e.currentTarget.dataset.id ?? ""

        gotoLegend(id)
    }
});
