import tabbar from '../../tabbar';
import {getSessionName} from "../../utils/util";
Page({
    data: {
        list:tabbar,
        data: []
    },

    onLoad: function() {
        wx.setNavigationBarTitle({
            title: getSessionName()
        })
    },

    onShareAppMessage() {

    },

    onRefresh:function(){
    }
});
