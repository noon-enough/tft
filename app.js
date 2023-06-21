import deviceUtil from "/miniprogram_npm/lin-ui/utils/device-util";
// app.js
import {getSessionSet, showToast} from '/utils/util.js'
import {sessions} from "./utils/api"
import {SESSION, SESSION_LIST} from "./utils/config";

App({
  onLaunch(key, data) {
    let width = wx.getSystemInfoSync().windowWidth,
        height = wx.getSystemInfoSync().windowHeight,
        that = this,
        navigationBarHeight = deviceUtil.getNavigationBarHeight(),
        statusBarHeight = deviceUtil.getStatusBarHeight(),
        titleBarHeight = deviceUtil.getTitleBarHeight()

    that.globalData.system = {
      width: width,
      height: height,
      navigationBarHeight: navigationBarHeight,
      statusBarHeight: statusBarHeight,
      titleBarHeight: titleBarHeight,
    }

    let sessionSet = getSessionSet()
    sessions().then(r => {
      let data = r.data ?? []
      console.log('got Sessions', SESSION_LIST, data, 'sessionSet', sessionSet)
      if (data) {
        wx.setStorageSync(SESSION_LIST, data)
        for (const datum of data) {
          if (datum.is_default === 1 && sessionSet === 0) {
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
    system: {
      width: 0,
      height: 0,
      navigationBarHeight: 0,
      statusBarHeight: 0,
      titleBarHeight: 0,
    }
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
