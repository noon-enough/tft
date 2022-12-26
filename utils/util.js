import {DEFAULT_SESSION, FEEDBACK_APPID, OBJECT, SESSION} from "./config";


/**
 * 跳转
 * @param url
 */
function goto(url) {
    console.log("goto", url)
    wx.navigateTo({
        url: url,
    })
}

/**
 * 跳转到英雄详细页面
 * @param id
 */
function heroDetail(id) {
    goto(`/pages/detail/index?id=${id}`)
}

function lineupDetail(id) {
    goto(`/pages/lineup/index?id=${id}`)
}


function getSessionFromStorage() {
    let session = wx.getStorageSync(SESSION)
    return session ?? DEFAULT_SESSION
}


/**
 * 获取session
 * @param session
 * @returns {string}
 */
function getSessionName(session = "") {
    if (session === "") {
        session = getSessionFromStorage()
    }

    let name = "隐秘之海"
    switch (session) {
        case "s8":
            name = "怪兽入侵"
            break
        case "s7":
            session = "隐秘之海"
            break
        case "s6":
            session = "时空裂痕"
            break
    }

    return name
}


/**
 * 获取session
 * @param name
 * @returns {string}
 */
function getSession(name) {
    let session = "s7"
    switch (name) {
        case "怪兽入侵":
            session = "s8"
            break
        case "隐秘之海":
            session = "s7"
            break
        case "时空裂痕":
            session = "s6"
            break
    }

    return session
}

function gotoFeedback() {
    wx.openEmbeddedMiniProgram({
        appId: FEEDBACK_APPID,
        envVersion: "release",
        extraData: {
            "id": OBJECT
        }
    })
}

/**
 * 弹窗
 * @param msg
 * @param icon
 */
function showToast(msg, {icon = 'success'}) {
    wx.showToast({
        title: msg,
        icon: icon,
    })
}

module.exports = {goto, getSession, getSessionName, heroDetail, gotoFeedback, showToast, lineupDetail, getSessionFromStorage}
