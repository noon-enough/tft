import {REQUEST} from "miniprogram-request";
import {API_DOMAIN} from "./config";


REQUEST.Defaults.headers = {
    "Content-Type": "application/json"
}
// 除了method,url，data 和 cancelToken不能设置其他均可设置
REQUEST.Defaults.baseURL = API_DOMAIN
REQUEST.Listeners.onSend.push(console.log)

/**
 * Get 取数据
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function get(uri, params = {}) {
    console.log(log("Request"), log("GET"), uri, log(JSON.stringify(params)))

    return REQUEST.get(uri, {}, undefined).then(res => {
        if (res.statusCode === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res.data)
        }
    })
}

/**
 * Post请求
 * @param uri
 * @param params
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function post(uri, params = {}) {
    console.log(log("Request"), log("POST"), uri, log(JSON.stringify(params)))

    return REQUEST.post(uri, JSON.parse(params), {
        headers: {
            'X-HTTP-Method-Override': 'POST',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.statusCode === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res.data)
        }
    })
}

/**
 * put方法
 * @param uri
 * @param params
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function put(uri, params = {}) {
    console.log(log("Request"), log("PUT"), uri, log(JSON.stringify(params)))

    return REQUEST.post(uri, JSON.parse(params), {
        headers: {
            'X-HTTP-Method-Override': 'PUT',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.statusCode === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res.data)
        }
    })
}

/**
 * Delete方法
 * @param uri
 * @param params
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function d(uri, params = {}) {
    console.log(log("Request"), log("DELETE"), uri, log(JSON.stringify(params)))

    return REQUEST.post(uri, JSON.parse(params), {
        headers: {
            'X-HTTP-Method-Override': 'DELETE',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.statusCode === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res.data)
        }
    })
}


/**
 * 日志
 * @param msg
 * @returns {string}
 */
function log(msg = "") {
    return `-------${msg}--------`
}

/**
 *
 * @type {{post: (function(*, {}=): Promise<SuccessParam<wx.RequestOption>>), d: (function(*, {}=): Promise<SuccessParam<wx.RequestOption>>), get: (function(*, {}=): Promise<SuccessParam<wx.RequestOption>>), put: (function(*, {}=): Promise<SuccessParam<wx.RequestOption>>)}}
 */
module.exports = {get, post, put, d}
