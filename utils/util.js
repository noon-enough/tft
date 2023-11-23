import {
    DEFAULT_SESSION,
    FEEDBACK_APPID,
    OBJECT,
    SESSION,
    SESSION_SET,
    SESSION_SHOW_NICKNAME,
    SESSION_SHOW_ORIGIN_SKIN
} from "./config";

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

function gotoHex() {
    wx.switchTab({
        url: `/pages/hex/index`
    })
}


function gotoRank(type = "mb") {
    goto(`/pages/rank/index?type=${type}`)
}
/**
 * 跳转到英雄详细页面
 * @param id
 * @param session
 */
function heroDetail(id, session) {
    goto(`/pages/detail/index?id=${id}&session=${session}`)
}

/**
 * lineup阵容详情
 * @param id
 */
function lineupDetail(id) {
    goto(`/pages/lineup/index?id=${id}`)
}

/**
 *
 * @returns {any|string}
 */
function getSessionFromStorage() {
    return "s10"
    let session = wx.getStorageSync(SESSION)
    return session ?? DEFAULT_SESSION
}

/**
 * 0 系统设置
 * 1 我的菜单里面设置
 * 系统设置只有更新的时候才生效
 * @returns {any|number}
 */
function getSessionSet() {
    let set = wx.getStorageSync(SESSION_SET)
    return set === undefined || set === "" ? 0 : set
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
        case "s9.5":
            name = "志逐天际"
            break;
        case "s9":
            name = "符文大陆"
            break;
        case "s8.5":
            name = "金铲铲市危机"
            break;
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
    let session = DEFAULT_SESSION
    switch (name) {
        case "志逐天际":
            session = "s9.5"
            break
        case "符文大陆":
            session = "s9"
            break
        case "金铲铲市危机":
            session = "s8.5"
            break
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

/**
 * 打开意见反馈
 */
function gotoFeedback() {
    wx.openEmbeddedMiniProgram({
        appId: FEEDBACK_APPID,
        envVersion: "release",
        extraData: {
            "id": OBJECT
        }
    })
}

function historyBack(success = function (){} ) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
        wx.navigateBack({
            delta: 1,
            success: success,
        })
    } else {
        wx.switchTab({
            url: "/pages/home/index"
        })
    }
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

function gotoLegend(id) {
    goto(`/pages/hex/legend/index?id=${id}`)
}

function gotoHeroAnalysisRank(id) {
    goto(`/pages/rank/analysis/index?id=${id}`)
}

function rebuildHeroInfo(hero = {}, isDetail = false) {
    if (isEmpty(hero)) {
        return {}
    }
    let is_show_origin_skin = !!wx.getStorageSync(SESSION_SHOW_ORIGIN_SKIN),
        show_nickname = !!wx.getStorageSync(SESSION_SHOW_NICKNAME)

    hero.synergies = hero.synergies === '' ? 0 : parseInt(hero.synergies)
    hero.lol_info = hero.lol_info ?? {}
    if (is_show_origin_skin && !isEmpty(hero.lol_info)) {
        hero.avatar = hero.lol_info.avatar ?? hero.avatar
        hero.original_image = hero.lol_info.original_image ?? hero.original_image
    }
    if (show_nickname && isDetail === false) {
        // 获取 nickname
        hero.name = hero.lol_info.alias ? hero.lol_info.alias : (hero.nickname ? hero.nickname : hero.display_name)
    }

    delete hero.lol_info
    return hero
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 *
 * @type {{goto: goto, heroDetail: heroDetail, getSessionName: (function(string=): string), showToast: showToast, getSession: (function(*): string), gotoFeedback: gotoFeedback, getSessionFromStorage: (function(): *), lineupDetail: lineupDetail}}
 */
module.exports = {historyBack, goto, getSession, getSessionName,
    getSessionSet, gotoRank, gotoHex,
    heroDetail, gotoFeedback, showToast, lineupDetail,
    getSessionFromStorage, gotoLegend, gotoHeroAnalysisRank, rebuildHeroInfo, isEmpty}
