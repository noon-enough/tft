import {SESSION} from "../../utils/config";

Page({
    data: {
        session: "s7",
        data: {}
    },
    onLoad: function (options) {
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this

        that.setData({
            session: session
        })
    },
});
