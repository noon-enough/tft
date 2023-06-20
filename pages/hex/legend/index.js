import {historyBack, showToast} from "../../../utils/util";
import {legendDetail} from "../../../utils/api";

Page({
    data: {
        legend: {},
        name: "",
        id: "",
    },
    onLoad: function (options) {
        if (options === undefined) {
            historyBack()
            return
        }
        let that = this,
            id = options.id ?? ""
        console.log('options', options, id)
        that.setData({
            id: id,
        })

        that.getLegend()
    },
    getLegend: function() {
        let that = this,
            id = that.data.id
        wx.showLoading()
        legendDetail(id).then(res => {
            let data = res.data ?? []
            console.log('legendDetail', res)
            if (data) {
                that.setData({
                    legend: data,
                    name: data.name ?? "",
                })

                wx.setNavigationBarTitle({
                    "title":`${data.name}: ${data.subname}`
                })

                wx.hideLoading()
            }else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    onShareAppMessage(options) {
        let that = this,
            data = that.data.legend,
            title = `${data.name}: ${data.subname}`

        let path = `/pages/hex/legend/index?id=${data.id}`

        console.log('share path', path)
        return {
            title: `金铲铲之战 - 符文大陆 - ${title} 符文强化`,
            path: path,
        }
    },
});
