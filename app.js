import deviceUtil from "/miniprogram_npm/lin-ui/utils/device-util";
// app.js
import {getSessionSet, showToast} from '/utils/util.js'
import {jobs, races, sessions} from "./utils/api"
import {SESSION, SESSION_LIST} from "./utils/config";
import CustomHook from 'spa-custom-hooks';

let globalData = {
      navBarHeight: 0,
      system: {
        width: 0,
        height: 0,
        navigationBarHeight: 0,
        statusBarHeight: 0,
        titleBarHeight: 0,
      },
      hex: {
        top: "race",
        second: "silver",
      },
      raceData: [],
      jobData: [],
      qualityData: [{
        key: "ALL",
        name: "全部质量",
      }, {
        key: "S",
        name: "S",
      }, {
        key: "A",
        name: "A",
      }, {
        key: "B",
        name: "B",
      }, {
        key: "C",
        name: "C",
      }],
      priceData: [{
        key: -1,
        name: '费用'
      }, {
        key: 0,
        name: '1 金币'
      }, {
        key: 1,
        name: '2 金币'
      }, {
        key: 2,
        name: '3 金币'
      },{
        key: 3,
        name: '4 金币'
      },{
        key: 4,
        name: '5 金币'
      }],
    }

CustomHook.install({
  'Job': {
    name: 'jobData',
    watchKey: 'jobData',
    onUpdate(jobData) {
      return jobData.length >= 1
    }
  },
  'Race': {
    name: 'raceData',
    watchKey: 'raceData',
    onUpdate(raceData) {
      return raceData.length >= 1
    }
  },
  'Price': {
    name: 'priceData',
    watchKey: 'priceData',
    onUpdate(priceData) {
      return priceData.length >= 1
    }
  },
  'Quality': {
    name: 'qualityData',
    watchKey: 'qualityData',
    onUpdate(qualityData) {
      return qualityData.length >= 1
    }
  }
}, globalData)

App({
  globalData,
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

    races().then(res => {
      let data = res.data ?? []
      if (data) {
        data = data.map((item) => {
          return {
            key: item.id,
            name: item.name
          }
        })

        data.unshift({
          name: "种族",
          key: -1,
        })

        console.log('getRaces', data)
        that.globalData.raceData = data
      }
    }).catch(err => {
      showToast("数据拉取失败，请稍候再试", {icon: "error"})
    })

    jobs().then(res =>{
      let data = res.data ?? []
      if (data) {
        data = data.map((item) => {
          return {
            key: item.id,
            name: item.name
          }
        })
        data.unshift({
          name: "职业",
          key: -1,
        })

        console.log('getJobs', data)

        that.globalData.jobData = data
      }
    }).catch(err => {
      showToast("数据拉取失败，请稍候再试", {icon: "error"})
    })

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
