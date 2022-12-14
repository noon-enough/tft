import tabbar from '../../tabbar';
import {SESSION} from "../../utils/config";
import {getSessionName, getSession, gotoFeedback} from "../../utils/util";

Page({
    data: {
        session: "",
        list:tabbar,
        sessions: ['怪兽入侵', '隐秘之海', '时空裂痕']
    },
    onLoad: function (options) {
        let session = wx.getStorageSync(SESSION)
        console.log('session', session)
        this.setData({
            session: getSessionName(session)
        })
    },
    gotoFeedback(e) {
        gotoFeedback()
    },
    onShareAppMessage(options) {
        let that = this
        return {
            title: `TFT金铲铲之战小助手`,
            path: `/pages/home/index`,
        }
    },
    actionSheet(e){
        let that = this
        wx.showActionSheet({
            alertText: "选择对弈赛季",
            itemList: that.data.sessions,
            success: function (res) {
                if (!res.cancel) {
                    let idx = res.tapIndex,
                        session = ""
                    switch (idx){
                        case 0:
                            session = "怪兽入侵"
                            break
                        case 1:
                            session = "隐秘之海"
                            break
                        case 2:
                            session = "时空裂痕"
                            break
                    }
                    let name = getSession(session)
                    that.setData({
                        session: session
                    })

                    wx.setStorageSync(SESSION, name)
                }
            }
        })
    }
});

