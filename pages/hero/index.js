import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {chess} from "../../utils/api";
import {heroDetail, showToast} from "../../utils/util";
Page({
    data: {
        list:tabbar,
        data: [],
        backupData: [],
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
    getHeroes(query = "") {
        let that = this
        wx.showLoading()
        chess(query).then(res => {
            console.log("data", res)
            let data = res.data ?? []
            if (data) {
                that.setData({
                    data: data,
                    backupData: data
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
        let q = e.detail.value ?? ""
        if (q === "") {
            return
        }
        this.searchBackupData(q)
    },
    searchClear(e) {
        let that = this
        that.setData({
            data: that.data.backupData,
        })
    },
    searchChange(e){
        let q = e.detail.value ?? ""
        if (q === "") {
            return
        }
        let that = this
        that.searchBackupData(q)
    },
    searchBackupData(q) {
        let that = this,
            data = []
        that.data.backupData.forEach(item => {
            if (item.name.indexOf(q) >=0 || item.display_name.indexOf(q) >= 0) {
                data.push(item)
            }
        })

        that.setData({
            data: data,
        })
    },
    onPullDownRefresh() {
        let that = this;

        that.getHeroes()
        wx.stopPullDownRefresh()
    }
});
