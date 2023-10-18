import {SESSION, SESSION_FOLDING_MID_PROPHASE, SESSION_SHOW_NICKNAME} from "../../utils/config";
import {chess, hero, hexes, jobs, lineup, races, synergies} from "../../utils/api";
import {heroDetail, historyBack, showToast} from "../../utils/util";

const app = getApp()
Page({
    data: {
        is_show_equipment_mask: false,
        is_folding_mid_prophase: false,
        show_mid_prophase: false,
        id: 0,
        data: {},
        title: "",
        capsuleTitle: "",
        navigationBarHeight: 87,
        show_champion_name: false,
        is_show_mask: false,
        is_show_playbook_mask: false,
        is_show_hex_mask: false,
        galaxy: {},
        playbook: {},
        hex: {},
        equipment: {},
    },
    onLoad: function (options) {
        let id = options.id,
            that = this,
            is_folding_mid_prophase =  !!wx.getStorageSync(SESSION_FOLDING_MID_PROPHASE)

        console.log("lineup-id", id, 'navBarHeight', app.globalData.navBarHeight,
            'is_folding_mid_prophase', is_folding_mid_prophase)
        wx.showLoading()
        that.setData({
            id: id,
            navigationBarHeight: app.globalData.navBarHeight,
            is_folding_mid_prophase: is_folding_mid_prophase,
            show_mid_prophase: is_folding_mid_prophase !== true,
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
            show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME),
            is_folding_mid_prophase= !!wx.getStorageSync(SESSION_FOLDING_MID_PROPHASE)

        console.log('show_nickname', show_nickname)
        that.setData({
            show_champion_name: show_nickname,
            session: session,
            is_folding_mid_prophase: is_folding_mid_prophase,
            show_mid_prophase: is_folding_mid_prophase !== true,
        })
    },
    getDetail: function(id = "") {
        let that = this
        lineup(id).then(res => {
            console.log('lineup', res)
            let data = res.data ?? []
            if (data) {
                that.setData({
                    data: data,
                    title: data.title,
                })
            }
        }).catch(err => {
            showToast("拉取数据失败", {icon: "error"})
        }).finally( ()=> {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
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
        historyBack()
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
                bgColor: "#002a3a"
            })
        } else {
            that.setData({
                capsuleTitle: "",
                bgColor: "#transparent"
            })
        }
    },
    showMask: function(e) {
        console.log('e', e)
        let that = this,
            galaxy = {
                "country": e.currentTarget.dataset.country ?? "",
                "desc": e.currentTarget.dataset.desc ?? "",
                "id": e.currentTarget.dataset.id ?? "",
                "name": e.currentTarget.dataset.name ?? "",
                "logo": e.currentTarget.dataset.logo ?? "",
            }
        that.setData({
            is_show_mask: true,
            galaxy: galaxy,
        })
    },
    changeMask: function (e) {
        let that = this
        that.setData({
            is_show_mask: false,
            is_show_playbook_mask: false,
            is_show_hex_mask: false,
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
            equipment: equipment,
        })
    },
    showHexMask: function(e) {
        let that = this
        that.setData({
            is_show_hex_mask: true,
            hex : {
                image: e.currentTarget.dataset.image ?? "",
                name: e.currentTarget.dataset.name ?? "",
                description: e.currentTarget.dataset.description ?? "",
                id: e.currentTarget.dataset.id ?? "",
            }
        })
    },
    showPlaybookMask: function(e) {
        let that = this

        that.setData({
            is_show_playbook_mask: true,
            playbook : {
                picture: e.currentTarget.dataset.picture ?? "",
                name: e.currentTarget.dataset.name ?? "",
                subname: e.currentTarget.dataset.subname ?? "",
                desc: e.currentTarget.dataset.desc ?? "",
                id: e.currentTarget.dataset.id ?? "",
            }
        })
    },
    onShowHideMidProphase: function(e) {
        let that = this,
            show_mid_prophase = that.data.show_mid_prophase,
            is_show = show_mid_prophase !== true

        that.setData({
            show_mid_prophase: is_show
        })

    },
    onCopyCode: function(e) {
        let that = this,
            code = e.currentTarget.dataset.code ?? ''
        if (code === '') {
            showToast('阵容代码不能为空，复制失败', {icon: 'error'})
            return
        }
        wx.setClipboardData({
            data: code,
            success (res) {
                showToast('口令代码复制成功', {icon: 'success'})
            }
        })
    },
});
