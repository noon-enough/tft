import tabbar from '../../tabbar';
import {getSessionName} from "../../utils/util";
Page({
    data: {
        list:tabbar,
        data: []
    },

    onLoad: function() {
    },

    onShow() {
        console.log('show')

    },

    onShareAppMessage() {

    },

    onRefresh:function(){
    }
});
