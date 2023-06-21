import tabbar from '../../tabbar';
import {SESSION, SESSION_FOLDING_MID_PROPHASE, SESSION_SHOW_NICKNAME} from "../../utils/config";
import {getSessionName, getSession, gotoFeedback} from "../../utils/util";

Page({
    data: {
        session: "",
        list:tabbar,
        sessions: ['符文大陆', '金铲铲市危机', '怪兽入侵', '隐秘之海', '时空裂痕'],
        show_nickname: false,
        is_folding_mid_prophase: false,
    },
    onLoad: function (options) {
        let session = wx.getStorageSync(SESSION),
            show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME),
            that = this,
            is_folding_mid_prophase = !!wx.getStorageSync(SESSION_FOLDING_MID_PROPHASE)

        that.setData({
            session: getSessionName(session),
            show_nickname: show_nickname,
            is_folding_mid_prophase: is_folding_mid_prophase,
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
            checked = e.detail.value,
            type = e.currentTarget.dataset.type ?? "hero"
        console.log('checked', checked, e)

        if (type === "hero") {
            wx.setStorageSync(SESSION_SHOW_NICKNAME, checked)
            that.setData({
                show_nickname: checked,
            })
        } else if (type === "mid_prophase") {
            wx.setStorageSync(SESSION_FOLDING_MID_PROPHASE, checked)
            that.setData({
                is_folding_mid_prophase: checked,
            })
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

