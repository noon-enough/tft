import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {chess} from "../../utils/api";
import {showToast} from "../../utils/util";

Page({
    data: {
        list:tabbar,
        session: "s7",
        heroData: {
            data: []
        }
    },
    onLoad: function (options) {
        let that = this
        that.getHeroes()
    },
    onShow: function () {
        let session = wx.getStorageSync(SESSION),
            that = this

        that.setData({
            session: session
        })
    },
    getHeroes(){
        let that = this
        chess().then(res => {
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
            showToast("拉去数据失败，请稍候再试", {icon: "error"})
        })
    },
    linchange(e) {
        console.log(e)
    }

});
