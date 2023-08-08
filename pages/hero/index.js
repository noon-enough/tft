import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {chess} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";
const app = getApp()
Page({
    data: {
        list:tabbar,
        data: [],
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
        priceData: [],
        priceDefaultSelect: -1,
        priceDefaultData: {},
        priceIsActive: false,
        priceDefaultDataShow: false,
        q: "",
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
    onLoadPrice() {
        let that = this,
            priceData = app.globalData.priceData,
            priceDefaultData = {},
            priceDefaultSelect = that.data.priceDefaultSelect
        priceData.forEach((item) => {
            if (item.key === priceDefaultSelect) {
                priceDefaultData = {...item}
            }
        })

        console.log('onLoadPrice', priceData, 'priceDefaultData', priceDefaultData)
        that.setData({
            priceData: priceData,
            priceDefaultData: priceDefaultData
        })
    },
    onLoad: function (options) {
        let session = wx.getStorageSync(SESSION),
            that = this

        console.log('session', session)
        that.setData({
            session: session,
            hexData: {
                session: session
            }
        })

        that.getHeroes()
    },
    getHeroes() {
        let that = this,
            query = {
                price: -1,
                job: -1,
                race: -1,
                q: "",
            },
            price = that.data.priceDefaultSelect,
            job = that.data.jobsDefaultSelect,
            race = that.data.raceDefaultSelect,
            q = that.data.q
        wx.showLoading()

        query.price = price
        query.q = q
        query.job = job
        query.race = race

        chess(JSON.stringify(query)).then(res => {
            console.log("data", res)
            let data = res.data ?? []
            data = data.map((item) => {
                item.synergies = item.synergies === '' ? 0 : parseInt(item.synergies)
                return item
            })
            if (data) {
                that.setData({
                    data: data,
                })
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        }).finally(wx.hideLoading)
    },
    detail(e) {
        let id = e.currentTarget.dataset.heroId,
            session = e.currentTarget.dataset.heroSession
        id = parseInt(id)
        if (id === 0 || session === "") {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        heroDetail(id, session)
    },
    searchConfirm(e) {
        let q = e.detail.value ?? "",
            that = this

        that.setData({
            q: q,
        })
        that.getHeroes()
    },
    searchClear(e) {
        let that = this
        that.setData({
            q: "",
        })
        that.getHeroes()
    },
    searchChange(e){
        let q = e.detail.value ?? "",
            that = this

        that.setData({
            q: q
        })
        that.getHeroes(q)
    },
    onPullDownRefresh() {
        let that = this;

        that.getHeroes()
        wx.stopPullDownRefresh()
    },
    openClose(e) {
        let that = this,
            type = e.currentTarget.dataset.type ?? "job",
            data = {}

        if (type === "job") {
            data.jobsDefaultDataShow = !that.data.jobsDefaultDataShow
        } else if (type === 'race') {
            data.raceDefaultDataShow = !that.data.raceDefaultDataShow
        } else if (type === "price") {
            data.priceDefaultDataShow = !that.data.priceDefaultDataShow
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
        } else if (type === "price") {
            data.priceDefaultSelect = id
            data.priceDefaultDataShow = false
            data.priceIsActive = id !== -1
            that.data.priceData.forEach((item) => {
                if (item.key === id) {
                    data.priceDefaultData = {...item}
                }
            })
        }
        console.log('onFilterBoxChange', 'data', data)
        that.setData(data)
        that.getHeroes()
    }
});
