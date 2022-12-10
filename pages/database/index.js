import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {chess, equipments, hexes, jobs, races, synergies} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

Page({
    data: {
        list: tabbar,
        session: "s7",
        races: [],
        jobs: [],
        heroData: {
            data: []
        },
        equipmentData: {
            data: [],
            formation: {
                type1: [],
                type2: {},
                type3: {},
                type4: {},
                type5: {},
            },
        },
        synergyData: {
            races: [],
            jobs: [],
        },
        hexData: {
            session: "s7",
            data: [],
        }
    },
    onLoad: function (options) {
        let that = this
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this

        that.setData({
            session: session,
            hexData: {
                session: session
            }
        })

        that.getHeroes()
    },
    getHeroes(query = "") {
        let that = this
        chess(query).then(res => {
            console.log("data", res)
            let data = res.data ?? []
            if (data) {
                that.setData({
                    heroData: {
                        data: data
                    }
                })
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    onTabTabBar(e) {
        let activeKey = e.detail.activeKey,
            that = this
        if (activeKey === "equipment") {
            equipments().then(res => {
                let data = res.data ?? []
                if (data) {
                    that.setData({
                        equipmentData: {
                            data: data,
                            formation: {
                                type1: data.type1[0].formation,
                                type2: data.type2[0],
                                type3: data.type3[0],
                                type4: data.type4[0],
                                type5: data.type5[0]
                            }
                        }
                    })

                    console.log('data', data, this.data.formation)
                } else {
                    return Promise.reject(res)
                }
            }).catch(err => {
                showToast("拉取数据失败，请稍候再试", {icon: "error"})
            })
        }
        if (activeKey === "synergy") {
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
                            synergyData: {
                                jobs: data,
                                races: races
                            }
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
        }
        if (activeKey === "hex") {
            hexes(1).then(res => {
                console.log("data", res)
                let data = res.data ?? []
                if (data) {
                    that.setData({
                        hexData: {
                            data: data,
                            session: that.data.session,
                        }
                    })
                }
            }).catch(err => {
                showToast("拉取数据失败，请稍候再试", {icon: "error"})
            })
        }
    },
    detail(e) {
        let id = e.currentTarget.dataset.heroId
        if (id === 0) {
            showToast("无法打开英雄详细页", {icon: "error"})
            return
        }
        heroDetail(id)
    },
    showFormation(e) {
        let dataset = e.currentTarget.dataset
        let type = dataset.type,
            idx = dataset.idx,
            that = this,
            id = dataset.id

        console.log('change', type, idx, id)
        if (type === "type1") {
            that.setData({
                ["equipmentData.formation.type1"]: that.data.equipmentData.data.type1[idx].formation
            })
        }
        if (type === "type2") {
            that.setData({
                ["equipmentData.formation.type2"]: that.data.equipmentData.data.type2[idx]
            })
        }
        if (type === "type3") {
            that.setData({
                ["equipmentData.formation.type3"]: that.data.equipmentData.data.type3[idx]
            })
        }
        if (type === "type4") {
            that.setData({
                ["equipmentData.formation.type4"]: that.data.equipmentData.data.type4[idx]
            })
        }
        if (type === "type5") {
            that.setData({
                ["equipmentData.formation.type5"]: that.data.equipmentData.data.type5[idx]
            })
        }
    },
    searchConfirm(e) {
        let q = e.detail.value ?? ""
        if (q === "") {
            return
        }
        let that = this
        that.getHeroes(q)
    },
    searchClear(e) {
        let that = this
        that.getHeroes()
    },
    searchChange(e){
        let q = e.detail.value ?? ""
        if (q === "") {
            return
        }
        let that = this
        that.getHeroes(q)
    }
});
