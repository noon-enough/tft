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
 * @param session
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function hero(id, session) {
    return get(`/api/chess/${id}?version=1.1&session=${session}`)
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
function synergies({race = 0,
                       job = 0,
                       quality = "ALL",
                       page = 1}) {
    let session = getSessionFromStorage()

    return get(`/api/strategies?version=${session}&race=${race}&job=${job}&quality=${quality}&page=${page}`)
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

function legend() {
    let session = getSessionFromStorage()

    return get(`/api/legend?version=${session}`)
}

function galaxy() {
    let session = getSessionFromStorage()

    return get(`/api/galaxy?version=${session}`)
}

/**
 *
 * @param polymerize
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function equipments(polymerize = 1) {
    let session = getSessionFromStorage()

    return get(`/api/equipments?version=${session}&polymerize=${polymerize}&is_new=1`)
}

function equipmentItem(id = 0) {
    let session = getSessionFromStorage()
    return get(`/api/equipments/${id}?version=${session}`)
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

    return get(`/api/rank?version=${session}&is_new=1`)
}

function rankSort(action = "mb", type = "presence", sort = "desc") {
    let session = getSessionFromStorage()

    return get(`/api/rank/${action}?type=${type}&sort=${sort}&version=${session}`)
}


function legendDetail(id = "") {
    let session = getSessionFromStorage()

    return get(`/api/legend/${id}?version=${session}`)
}

function rankDetail(id = "") {
    let session = getSessionFromStorage()

    return get(`/api/rank/${id}/detail?version=${session}`)
}


function getSet10() {
    return get('/api/set10')
}

module.exports = {sessions, chess, hexes, synergies,
    races, jobs, hero, equipments, lineup, rank,
    legend, galaxy, legendDetail, rankSort,
    equipmentItem, rankDetail, getSet10}
