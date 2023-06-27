import {SESSION, SESSION_SHOW_NICKNAME} from "../../utils/config";
import {rank, rankSort} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";

Page({
    data: {
        sortData: {
            mb: {
                presence: true,
                fourth: true,
                top: true,
            },
            hero: {
                presence: true,
                fourth: true,
                top: true,
            },
            equipment: {
                presence: true,
                fourth: true,
                top: true,
            },
        },
        activeSort: 'mb-presence',
        hero: [],
        equipment: [],
        mb: [],
        defaultAction: "hex",
        is_show_equipment_mask: false,
        show_nickname: false,
        maskEquipment: {},
    },
    onLoad: function (options) {
        let that = this,
            defaultAction = options.type ?? "hex",
            show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME)

        that.setData({
            defaultAction: defaultAction,
            show_nickname: show_nickname,
        })

        rank().then(res => {
            let data = res.data ?? []
            console.log('onLoad', data)
            if (data) {
                let equipment = data.equipment.map((item) => {
                    item.average = (item.average * 100).toFixed(1)
                    item.fourth = (item.fourth * 100).toFixed(1)
                    item.presence = (item.presence * 100).toFixed(1)
                    item.top = (item.top * 100).toFixed(1)

                    return item
                })
                let hero = data.hero.map((item) => {
                    item.average = (item.average * 100).toFixed(1)
                    item.fourth = (item.fourth * 100).toFixed(1)
                    item.presence = (item.presence * 100).toFixed(1)
                    item.top = (item.top * 100).toFixed(1)

                    return item
                })
                let mb = data.mb.map((item) => {
                    item.average = (item.average * 100).toFixed(1)
                    item.fourth = (item.fourth * 100).toFixed(1)
                    item.presence = (item.presence * 100).toFixed(1)
                    item.top = (item.top * 100).toFixed(1)
                    item.data = item.data.map((item) => {
                        let raw = item.data,
                            level = 1,
                            count = item.count,
                            rawLevel = {}

                        rawLevel = JSON.parse(raw.level.replace(/\n/g, ""))
                        let index = Object.keys(rawLevel).indexOf(count);
                        level = index + 1
                        item.level = level
                        return item
                    })
                    return item
                })
                that.setData({
                    hero: hero,
                    equipment: equipment,
                    mb: mb,
                })
            }
        }).catch(err => {
            console.log('err', err)
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this

        that.setData({
            session: session
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
    onShareAppMessage(options) {
        let that = this
        return {
            title: `金铲铲之战-英雄、装备、羁绊数据排行统计`,
            path: `/pages/rank/index`,
        }
    },
    changeMask: function (e) {
        let that = this
        that.setData({
            is_show_equipment_mask: false,
        })
    },
    showEquipmentMask: function(e) {
        let that = this,
            formulaId = e.currentTarget.dataset.formulaId ?? [],
            equipment = {
                name: e.currentTarget.dataset.name ?? "",
                effect: e.currentTarget.dataset.effect ?? "",
                image: e.currentTarget.dataset.image ?? "",
                formula: e.currentTarget.dataset.formula ?? {},
            }

        if (Array.isArray(formulaId) === true) {
            equipment.formula = formulaId.map((id) => {
                return equipment.formula[id] ?? {}
            })
        }
        that.setData({
            is_show_equipment_mask: true,
            maskEquipment: equipment,
        })
    },
    rankSorter: function(e) {
        let that = this,
            type = e.currentTarget.dataset.type ?? 'presence',
            action = e.currentTarget.dataset.action ?? 'mb',
            sortRouter = that.data.sortRouter,
            tap = "",
            isDown = !that.data.sortData[action][type],
            sort = isDown === true ? "DESC" : "ASC"

        console.log('isDown', isDown)
        let updateData = {
            [`sortData.${action}.${type}`] : isDown,
            activeSort: `${action}-${type}`,
        }

        console.log('update', updateData)

        wx.showLoading()
        rankSort(action, type, sort).then(res => {
            let data = res.data ?? []
            console.log('rankSort', data)
            if (data) {
                data = data.map((item) => {
                    item.average = (item.average * 100).toFixed(1)
                    item.fourth = (item.fourth * 100).toFixed(1)
                    item.presence = (item.presence * 100).toFixed(1)
                    item.top = (item.top * 100).toFixed(1)
                    return item
                })
                updateData.sortRouter = tap
                switch (action) {
                    case 'mb':
                        data = data.map((item) => {
                            item.data = item.data.map((item) => {
                                let raw = item.data,
                                    level = 1,
                                    count = item.count,
                                    rawLevel = {}

                                rawLevel = JSON.parse(raw.level.replace(/\n/g, ""))
                                let index = Object.keys(rawLevel).indexOf(count);
                                level = index + 1
                                item.level = level
                                return item
                            })

                            return item
                        })
                        updateData.mb = data
                        break
                    case 'equipment':
                        updateData.equipment = data
                        break
                    case 'hero':
                        updateData.hero = data
                }
                that.setData(updateData)
            }
        }).catch(res => {
            showToast("操作失败", {icon : "error"})
        }).finally(() => {
            wx.hideLoading()
        })
    },
    onTabChange: function(e) {
        let that = this,
            activeKey = e.detail.activeKey ?? 'mb',
            defaultSort = "mb-presence"

        switch (activeKey) {
            case "mb":
                defaultSort = "mb-presence"
                break
            case "hero":
                defaultSort = "hero-top"
                break
            case "equipment":
                defaultSort = "equipment-top"
                break
        }
        that.setData({
            activeSort: defaultSort,
        })
    },
});
