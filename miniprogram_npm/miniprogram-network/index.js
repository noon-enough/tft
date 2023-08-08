module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1691404939135, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.download = exports.head = exports.patch = exports.del = exports.put = exports.post = exports.get = exports.request = void 0;
var miniprogram_downloader_1 = require("miniprogram-downloader");
var miniprogram_request_1 = require("miniprogram-request");
var miniprogram_uploader_1 = require("miniprogram-uploader");
var miniprogram_request_2 = require("miniprogram-request");
Object.defineProperty(exports, "Http", { enumerable: true, get: function () { return miniprogram_request_2.Http; } });
Object.defineProperty(exports, "REQUEST", { enumerable: true, get: function () { return miniprogram_request_2.REQUEST; } });
Object.defineProperty(exports, "transformRequestResponseOkData", { enumerable: true, get: function () { return miniprogram_request_2.transformRequestResponseOkData; } });
Object.defineProperty(exports, "transformRequestSendDefault", { enumerable: true, get: function () { return miniprogram_request_2.transformRequestSendDefault; } });
Object.defineProperty(exports, "CancelToken", { enumerable: true, get: function () { return miniprogram_request_2.CancelToken; } });
var miniprogram_uploader_2 = require("miniprogram-uploader");
Object.defineProperty(exports, "Uploader", { enumerable: true, get: function () { return miniprogram_uploader_2.Uploader; } });
Object.defineProperty(exports, "UPLOAD", { enumerable: true, get: function () { return miniprogram_uploader_2.UPLOAD; } });
Object.defineProperty(exports, "transformUploadResponseOkData", { enumerable: true, get: function () { return miniprogram_uploader_2.transformUploadResponseOkData; } });
Object.defineProperty(exports, "transformUploadSendDefault", { enumerable: true, get: function () { return miniprogram_uploader_2.transformUploadSendDefault; } });
var miniprogram_downloader_2 = require("miniprogram-downloader");
Object.defineProperty(exports, "Downloader", { enumerable: true, get: function () { return miniprogram_downloader_2.Downloader; } });
Object.defineProperty(exports, "DOWNLOAD", { enumerable: true, get: function () { return miniprogram_downloader_2.DOWNLOAD; } });
Object.defineProperty(exports, "transformDownloadResponseOkData", { enumerable: true, get: function () { return miniprogram_downloader_2.transformDownloadResponseOkData; } });
Object.defineProperty(exports, "transfomDownloadSendDefault", { enumerable: true, get: function () { return miniprogram_downloader_2.transfomDownloadSendDefault; } });
var miniprogram_network_cache_1 = require("miniprogram-network-cache");
Object.defineProperty(exports, "defaultKeyBuilder", { enumerable: true, get: function () { return miniprogram_network_cache_1.defaultKeyBuilder; } });
var cache_1 = require("./cache");
Object.defineProperty(exports, "cacheHttp", { enumerable: true, get: function () { return cache_1.cacheHttp; } });
Object.defineProperty(exports, "cacheGet", { enumerable: true, get: function () { return cache_1.get; } });
Object.defineProperty(exports, "cacheRequest", { enumerable: true, get: function () { return cache_1.request; } });
Object.defineProperty(exports, "cacheDownload", { enumerable: true, get: function () { return cache_1.download; } });
Object.defineProperty(exports, "cacheConfig", { enumerable: true, get: function () { return cache_1.config; } });
var set_config_1 = require("./set-config");
Object.defineProperty(exports, "setConfig", { enumerable: true, get: function () { return set_config_1.setConfig; } });
Object.defineProperty(exports, "delayRetry", { enumerable: true, get: function () { return set_config_1.delayRetry; } });
// ShortLink for Request
/**
 * REQUEST.request
 */
exports.request = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.request.bind(miniprogram_request_1.REQUEST);
/**
 * REQUEST.get
 */
// tslint:disable-next-line: no-reserved-keywords
exports.get = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.get.bind(miniprogram_request_1.REQUEST);
/**
 * REQUEST.post
 */
exports.post = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.post.bind(miniprogram_request_1.REQUEST);
/**
 * REQUEST.put
 */
exports.put = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.put.bind(miniprogram_request_1.REQUEST);
/**
 * REQUEST.delete
 */
exports.del = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.delete.bind(miniprogram_request_1.REQUEST);
/**
 * REQUEST.patch
 */
exports.patch = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.patch.bind(miniprogram_request_1.REQUEST);
/**
 * REQUEST.head
 */
exports.head = 
/*#__PURE__*/
miniprogram_request_1.REQUEST.head.bind(miniprogram_request_1.REQUEST);
// Short Link for Download
/**
 * DOWNLOAD.download
 */
exports.download = 
/*#__PURE__*/
miniprogram_downloader_1.DOWNLOAD.download.bind(miniprogram_downloader_1.DOWNLOAD);
// ShortLink for Upload
/**
 * UPLOAD.upload
 */
exports.upload = 
/*#__PURE__*/
miniprogram_uploader_1.UPLOAD.upload.bind(miniprogram_uploader_1.UPLOAD);
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./cache":1691404939136,"./set-config":1691404939137}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1691404939136, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.get = exports.request = exports.cacheDownloader = exports.cacheHttp = exports.config = void 0;
var miniprogram_downloader_1 = require("miniprogram-downloader");
var miniprogram_network_cache_1 = require("miniprogram-network-cache");
var miniprogram_request_1 = require("miniprogram-request");
/** 缓存配置 */
exports.config = {
    /**
     * 默认缓存时间
     */
    expire: 10 * 60 * 1000,
    /**
     * GET,HEAD,OPTIONS默认缓存
     */
    excludeMethod: ['POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'],
    /**
     * 结果判断条件
     */
    resultCondition: miniprogram_network_cache_1.isOkResult,
    /**
     * 缓存的键构建方式,
     * 默认将不存在于`excludeMethod`采用`defaultKeyBuilder`进行构建(请求header不影响缓存)
     * 修改后`excludeMethod`将失效
     */
    keyBuilder: function (param) { return ((exports.config.excludeMethod.indexOf(param.method) === -1) && miniprogram_network_cache_1.defaultKeyBuilder(param)); }
};
/**
 * 网络缓存
 */
exports.cacheHttp = new miniprogram_request_1.Http(miniprogram_request_1.REQUEST.Defaults, 
/*#__PURE__*/
miniprogram_network_cache_1.CacheOperator.createHandler(miniprogram_request_1.REQUEST.handle, exports.config), 
/*#__PURE__*/
miniprogram_request_1.REQUEST.Listeners);
/**
 * 下载缓存
 */
exports.cacheDownloader = new miniprogram_downloader_1.Downloader(miniprogram_downloader_1.DOWNLOAD.Defaults, 
/*#__PURE__*/
miniprogram_network_cache_1.CacheOperator.createHandler(miniprogram_downloader_1.DOWNLOAD.handle, exports.config), 
/*#__PURE__*/
miniprogram_downloader_1.DOWNLOAD.Listeners);
/**
 * request 缓存
 */
exports.request = 
/*#__PURE__*/
exports.cacheHttp.request.bind(exports.cacheHttp);
/**
 * GET 缓存
 */
// tslint:disable-next-line: no-reserved-keywords
exports.get = 
/*#__PURE__*/
exports.cacheHttp.get.bind(exports.cacheHttp);
/**
 * 下载缓存
 */
exports.download = 
/*#__PURE__*/
exports.cacheDownloader.download.bind(exports.cacheDownloader);
//# sourceMappingURL=cache.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1691404939137, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.delayRetry = exports.setConfig = void 0;
var miniprogram_downloader_1 = require("miniprogram-downloader");
var miniprogram_request_1 = require("miniprogram-request");
var miniprogram_uploader_1 = require("miniprogram-uploader");
function setConfig() {
    if (arguments.length === 2) {
        var key = arguments[0];
        var value = arguments[1];
        miniprogram_request_1.REQUEST.Defaults[key] = value;
        miniprogram_downloader_1.DOWNLOAD.Defaults[key] = value;
        miniprogram_uploader_1.UPLOAD.Defaults[key] = value;
    }
    else if (typeof arguments[0] === 'object') {
        var config_1 = arguments[0];
        Object.keys(config_1)
            .forEach(function (key) {
            miniprogram_request_1.REQUEST.Defaults[key] = config_1[key];
            miniprogram_downloader_1.DOWNLOAD.Defaults[key] = config_1[key];
            miniprogram_uploader_1.UPLOAD.Defaults[key] = config_1[key];
        });
    }
}
exports.setConfig = setConfig;
/**
 * 延迟重试
 * 会在 options.__failure 记录失败的次数
 * @param delay 延时时间 单位ms
 * @param retryTimes 重试次数
 */
function delayRetry(delay, retryTimes) {
    if (retryTimes === void 0) { retryTimes = 1; }
    return function (data, reason) {
        var _this = this;
        this.__failure = (this.__failure || 0) + 1;
        return new Promise(function (resolve, reject) {
            if (_this.__failure > retryTimes) {
                reject(reason);
            }
            else {
                setTimeout(resolve, delay, data); // tslint:disable-line: no-string-based-set-timeout
            }
        });
    };
}
exports.delayRetry = delayRetry;
//# sourceMappingURL=set-config.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1691404939135);
})()
//miniprogram-npm-outsideDeps=["miniprogram-downloader","miniprogram-request","miniprogram-uploader","miniprogram-network-cache"]
//# sourceMappingURL=index.js.map