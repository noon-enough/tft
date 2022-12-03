module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1669623945258, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD = void 0;
var uploader_1 = require("./uploader");
var miniprogram_network_life_cycle_1 = require("miniprogram-network-life-cycle");
Object.defineProperty(exports, "CancelToken", { enumerable: true, get: function () { return miniprogram_network_life_cycle_1.CancelToken; } });
var transform_1 = require("./transform");
Object.defineProperty(exports, "transformUploadResponseOkData", { enumerable: true, get: function () { return transform_1.transformUploadResponseOkData; } });
Object.defineProperty(exports, "transformUploadSendDefault", { enumerable: true, get: function () { return transform_1.transformUploadSendDefault; } });
var uploader_2 = require("./uploader");
Object.defineProperty(exports, "Uploader", { enumerable: true, get: function () { return uploader_2.Uploader; } });
/**
 * 预定义全局 Upload 对象
 */
// tslint:disable-next-line: export-name
exports.UPLOAD = new uploader_1.Uploader();
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./uploader":1669623945259,"./transform":1669623945260}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1669623945259, function(require, module, exports) {

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
exports.Uploader = void 0;
var miniprogram_network_life_cycle_1 = require("miniprogram-network-life-cycle");
var transform_1 = require("./transform");
/**
 * 上传管理
 */
var Uploader = /** @class */ (function (_super) {
    __extends(Uploader, _super);
    /**
     * 默认上传请求参数转换函数
     */
    // protected readonly TransformSendDefault = transformUploadSendDefault;
    /**
     * 创建Upload管理
     * @param config 全局配置
     * @param uploader 操作函数,默认使用上传队列
     * @param listeners 上传事件监听通知
     */
    function Uploader(config, uploader, listeners) {
        return _super.call(this, 
        // tslint:disable-next-line: no-use-before-declare
        uploader || wx.uploadFile, config || { transformSend: transform_1.transformUploadSendDefault }, listeners) || this;
    }
    Uploader.prototype.upload = function () {
        var argNum = arguments.length;
        var options = argNum === 1 ? arguments[0] : (arguments[4] || {});
        if (argNum > 1) {
            options.filePath = arguments[0];
            options.name = arguments[1];
            options.url = arguments[2];
            options.data = arguments[3];
        }
        return this.process(options);
    };
    return Uploader;
}(miniprogram_network_life_cycle_1.LifeCycle));
exports.Uploader = Uploader;
//# sourceMappingURL=uploader.js.map
}, function(modId) { var map = {"./transform":1669623945260}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1669623945260, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUploadResponseOkData = exports.transformUploadSendDefault = void 0;
var miniprogram_network_utils_1 = require("miniprogram-network-utils");
/**
 * 构建请求参数
 * baseUrl和dataUrl不同时为空
 * @param data - 完整参数
 */
function transformUploadSendDefault(data) {
    return miniprogram_network_utils_1.getCommonOptions({
        url: miniprogram_network_utils_1.buildParams(data.url || '', data.params, data.baseURL),
        formData: data.data,
        header: data.headers
    }, data, ['filePath', 'name']);
}
exports.transformUploadSendDefault = transformUploadSendDefault;
/**
 * 根据错误码处理数据(会尝试JSON.parse)
 * statusCode 2xx 操作成功仅返回data数据
 * 否则抛出错误(rejected)
 * @param res - 返回结果
 * @param options - 全部配置
 * @returns 反序列化对象
 */
function transformUploadResponseOkData(res, options) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
        if (typeof res.data === 'string') {
            try {
                return JSON.parse(res.data);
            }
            catch (_a) {
                // empty
            }
        }
        return res.data;
    }
    throw res;
}
exports.transformUploadResponseOkData = transformUploadResponseOkData;
//# sourceMappingURL=transform.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1669623945258);
})()
//miniprogram-npm-outsideDeps=["miniprogram-network-life-cycle","miniprogram-network-utils"]
//# sourceMappingURL=index.js.map