import {getSet10} from "../../utils/api";
import {showToast} from "../../utils/util";

Page({
    data: {
        isRefresh: false,
        loadingProps: {
            size: '50rpx',
        },
        traits: [],
        champions: [],
    },
    onLoad: function (options) {
        let that = this
        that.onLoadData()
    },
    onLoadData() {
        let that = this
        wx.showLoading()
        getSet10().then(res => {
            console.log('getSet10', res)
            let code = res.code,
                data = res.data
            if (code !== 200) {
                showToast('数据加载失败', {icon: 'error'})
                wx.hideLoading()
                return false
            }

            that.setData({
                champions: data.champions ?? [],
                traits: data.traits ?? [],
                isRefresh: false,
            })
            wx.hideLoading()
        })
    },
    onPullDownRefresh() {
        let that = this
        that.setData({
            isRefresh: true,
        })
        that.onLoadData()
    },
    onScroll(e) {},
    onScrollToBottom(e) {},
});
