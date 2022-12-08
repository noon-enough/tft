import {get} from './http'
import {SESSION} from "./config";

function sessions() {
    return get("/api/sessions")
}

function chess() {
    let session = wx.getStorageSync(SESSION)

    return get(`/api/chess?version=${session}`)
}

module.exports = {sessions, chess}
