// app.js
import {showToast} from '/utils/util.js'
import {sessions} from "./utils/api"
import {SESSION, SESSION_LIST} from "./utils/config";

App({
  onLaunch(key, data) {
    let navBarHeight = 44
    let navBarHeightNew = navBarHeight * 750 / wx.getSystemInfoSync().windowWidth
    console.log('navBarHeightNew', navBarHeightNew)
    this.globalData.navBarHeight = navBarHeightNew
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
  globalData: {
    navBarHeight: 0,
  },
  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) {
          return
        }
        fn && fn(newVal)
        console.log('APP Observer Global Key:', key, 'Value:', val)
        val = newVal
      },
    })
  }
})
