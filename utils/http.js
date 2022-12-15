import {Http, REQUEST} from "miniprogram-request";
import {API_DOMAIN} from "./config";

REQUEST.Defaults.headers = {
    "Content-Type": "application/json"
}
//除了method,url，data 和cancelToken不能设置其他均可设置
REQUEST.Defaults.baseURL = API_DOMAIN

/**
 * Get 取数据
 * @returns {Promise<SuccessParam<wx.RequestOption>>}
 */
function get(uri, params = {}) {
    console.log("-----Request-----", uri, "params", params)

    return REQUEST.get(uri, undefined, undefined).then(res => {
        if (res.statusCode === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res.data)
        }
    })
}

module.exports = {get}
