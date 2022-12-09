import {get} from './http'
import {SESSION} from "./config";

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
function chess() {
    let session = wx.getStorageSync(SESSION)

    return get(`/api/chess?version=${session}`)
}

/**
 * 获取英雄详细信息
 * @param id
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function hero(id) {
    return get(`/api/chess/${id}`)
}

/**
 *
 * @param byColor 按照颜色分类
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function hexes(byColor = 1) {
    let session = wx.getStorageSync(SESSION)

    return get(`/api/hexes?version=${session}&byColor=${byColor}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function synergies() {
    let session = wx.getStorageSync(SESSION)

    return get(`/api/strategies?version=${session}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function races(heroes = 1) {
    let session = wx.getStorageSync(SESSION)

    return get(`/api/races?version=${session}&heroes=${heroes}`)
}

/**
 *
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function jobs(heroes = 1) {
    let session = wx.getStorageSync(SESSION)

    return get(`/api/jobs?version=${session}&heroes=${heroes}`)
}

/**
 *
 * @param polymerize
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function equipments(polymerize = 1) {
    let session = wx.getStorageSync(SESSION)
    return get(`/api/equipments?version=${session}&polymerize=${polymerize}`)
}

module.exports = {sessions, chess, hexes, synergies, races, jobs, hero, equipments}
