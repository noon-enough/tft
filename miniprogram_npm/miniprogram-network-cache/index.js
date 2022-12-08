module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1670465926997, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var cache_operator_1 = require("./cache-operator");
Object.defineProperty(exports, "CacheOperator", { enumerable: true, get: function () { return cache_operator_1.CacheOperator; } });
Object.defineProperty(exports, "defaultKeyBuilder", { enumerable: true, get: function () { return cache_operator_1.defaultKeyBuilder; } });
Object.defineProperty(exports, "isOkResult", { enumerable: true, get: function () { return cache_operator_1.isOkResult; } });
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./cache-operator":1670465926998}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670465926998, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheOperator = exports.isOkResult = exports.defaultKeyBuilder = void 0;
var cache_1 = require("./cache");
/**
 * 删除数组中的元素
 * @param array 数组
 * @param value 值
 */
function arrayRemove(array, value) {
    var index = array.indexOf(value);
    if (index >= 0) {
        array.splice(index, 1);
    }
}
/**
 * 是否为数组中的唯一元素
 * @param array 数组
 * @param value 值
 */
function isEmptyOrOnly(array, value) {
    return array.length === 0 || (array.length === 1 && array[0] === value);
}
/**
 * 默认缓存索引生成函数,
 * 使用 `url`,`method`,`responseType`,`dataType`,`filePath`,`name`参数 + `data`或`formData`构建缓存Key
 * 请求的`header` 默认会被忽略
 * @param opts 请求参数对象
 * @template TOptions 完整请求参数
 * @returns string
 */
function defaultKeyBuilder(opts) {
    /**
     * 缓存的请求字段
     * https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html
     */
    var CACHE_FIELDS = [
        'url',
        'method',
        'responseType',
        'dataType',
        'filePath',
        'name' // upload
        // 'header'
        // 'data'
    ];
    var data = opts.data || opts.formData;
    return JSON.stringify(opts, CACHE_FIELDS) + (data ? JSON.stringify(data) : '');
}
exports.defaultKeyBuilder = defaultKeyBuilder;
/**
 * 是否为2xx数据
 * @param res 完整返回数据
 */
function isOkResult(res) {
    return res && res.statusCode >= 200 && res.statusCode < 300;
}
exports.isOkResult = isOkResult;
/**
 * 缓存操作,
 * 维护缓存结果,自动合并同样请求的并发操作
 * @template TRes 操作结果回调数据类型
 * @template TOptions 参数数据类型
 * @template TTask 微信任务类型
 */
var CacheOperator = /** @class */ (function () {
    /**
     * @param operator 底层操作
     * @param config 默认配置
     */
    function CacheOperator(operator, config) {
        this.cache = new cache_1.Cache();
        /**
         * 正在处理的回调
         */
        this.callbackListMap = {};
        /**
         * 处理完的回调,待删除
         */
        this.completeMap = {};
        this.op = operator;
        this.config = config || {
            expire: 15 * 60 * 1000,
            resultCondition: isOkResult
        };
    }
    /**
     * 快速创建一个
     */
    CacheOperator.createHandler = function (operator, config) {
        var cacheOperator = new CacheOperator(operator, config);
        return cacheOperator.handle.bind(cacheOperator);
    };
    /**
     * 缓存处理
     * @param options - 参数
     */
    CacheOperator.prototype.handle = function (options) {
        var _this = this;
        var keyBuilder = options.keyBuilder || this.config.keyBuilder || defaultKeyBuilder;
        var key = keyBuilder(options);
        if (!key) {
            // 不缓存
            return this.op(options);
        }
        var result = this.cache.get(key);
        if (result) {
            // 缓存命中
            result.cache = (result.cache || 0) + 1;
            try {
                if (options.success) {
                    options.success(result);
                }
            }
            catch (error) {
                this.cache.delete(key);
            }
            if (options.complete) {
                options.complete(result);
            }
        }
        else if (this.callbackListMap[key]) {
            // 请求已发送过
            var callback = this.callbackListMap[key];
            if (options.success) {
                callback.success.push(options.success);
            }
            if (options.fail) {
                callback.fail.push(options.fail);
            }
            if (options.complete) {
                callback.complete.push(options.complete);
            }
        }
        else {
            // 请求未发送过
            var data = __assign(__assign({}, options), { success: function (res) {
                    var expire = options.expire === undefined ? _this.config.expire : options.expire;
                    // 过期时间为0不缓存,但是会合并请求
                    if (expire > 0 && (options.resultCondition || _this.config.resultCondition)(res)) {
                        // 缓存请求结果
                        _this.cache.set(key, res, expire);
                    }
                    _this._getMapBeforeComplete(key).success
                        .forEach(function (v) { v(res); });
                }, fail: function (res) {
                    // fail 回调异步化 (微信实现可能是同步调用)
                    // tslint:disable-next-line: no-floating-promises
                    Promise.resolve(_this._getMapBeforeComplete(key).fail)
                        .then(function (f) { f.forEach(function (v) { v(res); }); });
                }, complete: function (res) {
                    _this.completeMap[key].forEach(function (v) { v(res); });
                    // tslint:disable-next-line: no-dynamic-delete
                    delete _this.completeMap[key];
                } });
            this.callbackListMap[key] = {
                success: options.success ? [options.success] : [],
                fail: options.fail ? [options.fail] : [],
                complete: options.complete ? [options.complete] : [],
                task: {}
            };
            // 微信task同步创建异步调用
            // 防止同步执行fail时 this.callbackListMap[key] 还未赋值
            // 先赋值 this.callbackListMap[key] 再 执行  this.op(data))
            return (this.callbackListMap[key].task = this.op(data));
        }
        // tslint:disable-next-line: no-object-literal-type-assertion
        return {
            abort: function () {
                var cbMap = _this.callbackListMap[key];
                if (cbMap) {
                    if (isEmptyOrOnly(cbMap.success, options.success)
                        && isEmptyOrOnly(cbMap.fail, options.fail)
                        && isEmptyOrOnly(cbMap.complete, options.complete)) {
                        cbMap.task.abort();
                    }
                    else {
                        if (options.success) {
                            arrayRemove(cbMap.success, options.success);
                            var callbackList = [];
                            if (options.fail) {
                                arrayRemove(cbMap.fail, options.fail);
                                callbackList.push(options.fail);
                            }
                            if (options.complete) {
                                arrayRemove(cbMap.complete, options.complete);
                                callbackList.push(options.complete);
                            }
                            var res_1 = { errMsg: 'request:fail abort', source: CacheOperator.name };
                            callbackList.forEach(function (f) { f(res_1); });
                        }
                    }
                }
            },
            onHeadersReceived: function (f) {
                if (_this.callbackListMap[key]) {
                    _this.callbackListMap[key].task.onHeadersReceived(f);
                }
                else {
                    f(_this.cache.get(key) || {});
                }
            },
            onProgressUpdate: function (f) {
                if (_this.callbackListMap[key]) {
                    var task = _this.callbackListMap[key].task;
                    if (task.onProgressUpdate) {
                        task.onProgressUpdate(f);
                    }
                }
                else {
                    f({ progress: 100 });
                }
            }
        };
    };
    /**
     * fixed #10
     * 在回调中再次发起操作前清除任务
     * @param key cacheKey
     */
    CacheOperator.prototype._getMapBeforeComplete = function (key) {
        // remove the MapList from the `callbackMapList`
        var list = this.callbackListMap[key];
        // tslint:disable-next-line: no-dynamic-delete
        delete this.callbackListMap[key];
        this.completeMap[key] = list.complete;
        return list;
    };
    return CacheOperator;
}());
exports.CacheOperator = CacheOperator;
//# sourceMappingURL=cache-operator.js.map
}, function(modId) { var map = {"./cache":1670465926999}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1670465926999, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
/** 缓存管理 */
var Cache = /** @class */ (function () {
    function Cache() {
        this.map = new Map();
    }
    /**
     * 设置缓存
     * @param key - 键
     * @param value - 值
     * @param expire - 有效期(毫秒)
     */
    // tslint:disable-next-line: no-reserved-keywords
    Cache.prototype.set = function (key, value, expire) {
        this.map.set(key, [value, expire > 0 ? Date.now() + expire : 0]);
    };
    /**
     * 获取缓存，不存在返回undefined
     * @param key - 键
     */
    // tslint:disable-next-line: no-reserved-keywords
    Cache.prototype.get = function (key) {
        if (this.map.has(key)) {
            var _a = this.map.get(key), value = _a[0], expireTime = _a[1];
            if (expireTime >= Date.now()) {
                return value;
            }
            else {
                this.map.delete(key);
            }
        }
        return undefined;
    };
    /**
     * 删除缓存，返回是否删除成功
     * @param key - 键
     */
    // tslint:disable-next-line: no-reserved-keywords
    Cache.prototype.delete = function (key) {
        return this.map.delete(key);
    };
    /**
     * 缓存是否存在
     * @param key - 键
     */
    Cache.prototype.has = function (key) {
        if (this.map.has(key)) {
            if (this.map.get(key)[1] > Date.now()) {
                return true;
            }
            this.map.delete(key);
        }
        return false;
    };
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1670465926997);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map