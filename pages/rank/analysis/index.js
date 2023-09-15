import {heroDetail, historyBack, showToast} from "../../../utils/util";
import {rankDetail} from "../../../utils/api";
import string from "../../../miniprogram_npm/lin-ui/common/async-validator/validator/string";

Page({
    data: {
        detail: {},
        id: "",
    },
    onLoad: function (options) {
        let that = this,
            id = options.id ?? ""

        console.log('options', options)
        if (id === "") {
            showToast('非法操作，请返回重试', {icon: 'error'})
            setTimeout(function() {
                historyBack()
            }, 2000)
        }

        that.setData({
            id : id,
        })

        wx.showLoading()
        that.getDetail()
    },
    getDetail() {
        let that = this,
            id = that.data.id
        rankDetail(id).then(res => {
            let data = res.data,
                message = res.message,
                code = res.code
            if (code !== 200) {
                showToast(message, {icon: "error"})
                return
            }
            data.sub = data.sub.map((item) => {
                item.synergy = item.synergy.map((synergy) => {
                    synergy.level = synergy.info.colors[synergy.count]
                    return synergy
                })

                item.vp1 = (item.vp1).toFixed(1)
                item.vp2 = (item.vp2).toFixed(1)
                item.vp3 = (item.vp3).toFixed(1)
                item.vp4 = (item.vp4).toFixed(1)
                item.vp5 = (item.vp5).toFixed(1)
                item.vp6 = (item.vp6).toFixed(1)
                return item
            })
            data.average = (data.average * 100).toFixed(1)
            data.fourth = (data.fourth * 100).toFixed(1)
            data.presence = (data.presence * 100).toFixed(1)
            data.top = (data.top * 100).toFixed(1)

            data.info = data.info.map((item) => {
                item.level = item.info.colors[item.count]
                return item
            })
            data.counter = data.counter.map((item) => {
                item.win = (item.win * 100).toFixed(1)
                item.data = item.data.map((i, idx) => {
                    i.level = i.info.colors[i.count]
                    return i
                })
                return item
            })
            console.log('rankDetail.data', data)
            that.setData({
                detail: data,
            })
            wx.hideLoading()
        }).catch(err => {
            console.log('err', err)
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
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
    onTabChange(e) {},
});
