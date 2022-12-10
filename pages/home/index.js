import tabbar from '../../tabbar';
import {getSessionName, showToast} from "../../utils/util";
import {synergies} from "../../utils/api";
Page({
    data: {
        list:tabbar,
        data: []
    },

    onLoad: function() {
        this.getStrategies()
    },

    onShow() {
        console.log('show')
    },

    onShareAppMessage() {

    },

    onRefresh:function(){
    },
    getStrategies() {
        let that = this
        synergies().then(res=> {
            let data = res.data ?? []
            if (data) {
               that.setData({
                   data: data,               })
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("数据拉取失败，请稍候再试", {icon: "error"})
        })
    }
});

