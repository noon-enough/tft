module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1687547469737, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.DOWNLOAD = void 0;
var miniprogram_network_life_cycle_1 = require("miniprogram-network-life-cycle");
Object.defineProperty(exports, "CancelToken", { enumerable: true, get: function () { return miniprogram_network_life_cycle_1.CancelToken; } });
var downloader_1 = require("./downloader");
Object.defineProperty(exports, "Downloader", { enumerable: true, get: function () { return downloader_1.Downloader; } });
var transform_1 = require("./transform");
Object.defineProperty(exports, "transfomDownloadSendDefault", { enumerable: true, get: function () { return transform_1.transfomDownloadSendDefault; } });
Object.defineProperty(exports, "transformDownloadResponseOkData", { enumerable: true, get: function () { return transform_1.transformDownloadResponseOkData; } });
var downloader_2 = require("./downloader");
/**
 * 预定义全局Download
 */
// tslint:disable-next-line: export-name
exports.DOWNLOAD = new downloader_2.Downloader();
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./downloader":1687547469738,"./transform":1687547469739}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1687547469738, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Downloader = void 0;
var miniprogram_network_life_cycle_1 = require("miniprogram-network-life-cycle");
var transform_1 = require("./transform");
/**
 * 下载封装
 * @template T 扩展参数类型
 */
var Downloader = /** @class */ (function (_super) {
    __extends(Downloader, _super);
    /**
     * 新建 Http实列
     * @param config 全局默认配置
     * @param downloader 下载处理方法，默认使用下载队列处理
     * @param listeners 下载事件监听回调
     */
    function Downloader(config, downloader, listeners) {
        return _super.call(this, 
        // tslint:disable-next-line: no-use-before-declare
        downloader || wx.downloadFile, 
        // tslint:disable-next-line: no-object-literal-type-assertion
        config || { transformSend: transform_1.transfomDownloadSendDefault }, listeners) || this;
    }
    Downloader.prototype.download = function () {
        var isMultiParam = typeof arguments[0] === 'string';
        // tslint:disable-next-line: no-unsafe-any
        var options = isMultiParam ? (arguments[2] || {}) : arguments[0];
        if (isMultiParam) {
            options.url = arguments[0];
            options.filePath = arguments[1];
        }
        return this.process(options);
    };
    return Downloader;
}(miniprogram_network_life_cycle_1.LifeCycle));
exports.Downloader = Downloader;
//# sourceMappingURL=downloader.js.map
}, function(modId) { var map = {"./transform":1687547469739}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1687547469739, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDownloadResponseOkData = exports.transfomDownloadSendDefault = void 0;
var miniprogram_network_utils_1 = require("miniprogram-network-utils");
/**
 * 默认下载请求参数构建方法
 * @param data - 完整配置参数
 */
function transfomDownloadSendDefault(data) {
    return miniprogram_network_utils_1.getCommonOptions({
        url: miniprogram_network_utils_1.buildParams(data.url, data.params, data.baseURL),
        header: data.headers
    }, data, ['filePath']);
}
exports.transfomDownloadSendDefault = transfomDownloadSendDefault;
/**
 * 正确返回返回数据处理方式
 * @param res - 返回结果
 * @param config - 完整参数
 */
function transformDownloadResponseOkData(res, options) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
        return res.tempFilePath;
    }
    throw res;
}
exports.transformDownloadResponseOkData = transformDownloadResponseOkData;
//# sourceMappingURL=transform.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1687547469737);
})()
//miniprogram-npm-outsideDeps=["miniprogram-network-life-cycle","miniprogram-network-utils"]
//# sourceMappingURL=index.js.map