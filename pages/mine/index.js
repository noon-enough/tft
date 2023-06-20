import tabbar from '../../tabbar';
import {SESSION, SESSION_SHOW_NICKNAME} from "../../utils/config";
import {getSessionName, getSession, gotoFeedback} from "../../utils/util";

Page({
    data: {
        session: "",
        list:tabbar,
        sessions: ['符文大陆', '金铲铲市危机', '怪兽入侵', '隐秘之海', '时空裂痕'],
        show_nickname: false,
    },
    onLoad: function (options) {
        let session = wx.getStorageSync(SESSION),
            show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME),
            that = this

        that.setData({
            session: getSessionName(session),
            show_nickname: show_nickname,
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
    onChange(e) {
        let that = this,
            checked = e.detail.value
        console.log('checked', checked)
        wx.setStorageSync(SESSION_SHOW_NICKNAME, checked)

        that.setData({
            show_nickname: checked,
        })
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
                            session = "符文大陆"
                            break;
                        case 1:
                            session = "金铲铲市危机"
                            break;
                        case 2:
                            session = "怪兽入侵"
                            break
                        case 3:
                            session = "隐秘之海"
                            break
                        case 4:
                            session = "时空裂痕"
                            break
                    }
                    let name = getSession(session)
                    that.setData({
                        session: session
                    })
                    console.log('get session', session, 'name', name)
                    wx.setStorageSync(SESSION, name)
                }
            }
        })
    }
});

