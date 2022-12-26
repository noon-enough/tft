import {get} from './http'
import {getSessionFromStorage} from "./util";

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function sessions() {
    return get("/api/sessions")
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function chess(q = "") {
    let session = getSessionFromStorage()

    q = encodeURIComponent(q)
    return get(`/api/chess?version=${session}&q=${q}`)
}

/**
 * 获取英雄详细信息
 * @param id
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function hero(id) {
    return get(`/api/chess/${id}?version=1.1`)
}

/**
 *
 * @param byColor 按照颜色分类
 * @param q 搜索关键词
 * @param type 搜索类型
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function hexes(byColor = 1, q = "", type = 1) {
    let session = getSessionFromStorage()

    return get(`/api/hexes?version=${session}&byColor=${byColor}&q=${encodeURI(q)}&type=${type}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function synergies() {
    let session = getSessionFromStorage()

    return get(`/api/strategies?version=${session}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function races(heroes = 1) {
    let session = getSessionFromStorage()

    return get(`/api/races?version=${session}&heroes=${heroes}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function jobs(heroes = 1) {
    let session = getSessionFromStorage()

    return get(`/api/jobs?version=${session}&heroes=${heroes}`)
}

/**
 *
 * @param polymerize
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function equipments(polymerize = 1) {
    let session = getSessionFromStorage()

    return get(`/api/equipments?version=${session}&polymerize=${polymerize}`)
}

/**
 *
 * @param id
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function lineup(id) {
    return get(`/api/strategies/${id}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function rank() {
    let session = getSessionFromStorage()

    return get(`/api/rank?version=${session}`)
}

module.exports = {sessions, chess, hexes, synergies, races, jobs, hero, equipments, lineup, rank}
