// app.js
import {showToast} from '/utils/util.js'
import {sessions} from "./utils/api"
import {SESSION, SESSION_LIST} from "./utils/config";


App({
  onLaunch(key, data) {
    sessions().then(r => {
      let data = r.data ?? []
      if (data) {
        wx.setStorageSync(SESSION_LIST, data)
        for (const datum of data) {
          if (datum.is_default === 1) {
            wx.setStorageSync(SESSION, datum.version)
          }
        }
      }
    }).catch(err => {
      showToast("数据拉取失败", {icon: "error"})
    })
  },
  globalData: {},
})
