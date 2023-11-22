import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {galaxy, hexes, jobs, legend, races} from "../../utils/api";
import {gotoLegend, heroDetail, rebuildHeroInfo, showToast} from "../../utils/util";

const app = getApp()
Page({
    data: {
        activeKey: "race",
        secondActive: "silver",
        list:tabbar,
        races: [],
        jobs: [],
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
        let that = this,
            top = app.globalData.hex.top ?? "race",
            second = app.globalData.hex.second ?? "silver"

        that.getRaces()
        that.getJobs()

        console.log('app', app.globalData.hex)
        that.setData({
            activeKey: top,
            secondActive: second,
        })
    },
    getRaces: function () {
        let that = this
        races().then(res => {
            console.log('getRaces', res)
            let data = res.data ?? []
            if (data) {
                data = data.map((item) => {
                    item.colors = JSON.parse(item.colors)
                    item.level = item.level.map((lvl) => {
                        lvl.color = item.colors[lvl.level]
                        return lvl
                    })
                    item.races = item.races.map((race) => {
                        race = rebuildHeroInfo(race)
                        return race
                    })
                    return item
                })
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
            console.log('getJobs', res)
            let data = res.data ?? []
            if (data) {
                data = data.map((item) => {
                    item.colors = JSON.parse(item.colors)
                    item.level = item.level.map((lvl) => {
                        lvl.color = item.colors[lvl.level]
                        return lvl
                    })
                    item.jobs = item.jobs.map((job) => {
                        job = rebuildHeroInfo(job)
                        return job
                    })
                    return item
                })
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
    onHexBarChange(e) {
        let activeKey = e.detail.activeKey,
            that = this
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
    }
});
