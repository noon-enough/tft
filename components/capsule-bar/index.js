import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
import validator from "../../miniprogram_npm/lin-ui/behaviors/validator"
import eventUtil from "../../miniprogram_npm/lin-ui/core/utils/event-util"

Component({
    options: { multipleSlots: !0 },
    behaviors: [validator],
    externalClasses: ["l-title-class"],
    properties: {
        bgColor: { type: String, value: "white" },
        statusBarColor: { type: String, value: "transparent" },
        titleBarColor: { type: String, value: "transparent" },
        titleColor: { type: String, value: "black" },
        capsuleColor: { type: String, value: "black", options: ["white", "black"] },
        disableBack: { type: Boolean, value: !1 },
        disableHome: { type: Boolean, value: !1 },
        hiddenCapsule: { type: Boolean, value: !1 },
        homePage: { type: String, value: "" },
        title: { type: String, value: "" },
        hasPadding: { type: Boolean, value: !0 },
        hiddenTitle: { type: Boolean, value: !1 },
        capsuleLeftIconPath: { type: String, value: null },
        capsuleLeftIconWidth: { type: Number, value: null },
        capsuleLeftIconHeight: { type: Number, value: null },
        capsuleRightIconPath: { type: String, value: null },
        capsuleRightIconWidth: { type: Number, value: null },
        capsuleRightIconHeight: { type: Number, value: null }
    },
    data: {
        titleBarHeight: deviceUtil.getTitleBarHeight(),
        statusBarHeight: deviceUtil.getStatusBarHeight(),
        capsuleButtonInfo: null
    },
    lifetimes: {
        ready: function () {
            this.setData({ capsuleButtonInfo: this.getCapsuleButtonInfo() });
        }
    },
    methods: {
        getCapsuleButtonInfo() {
            const t = wx.getSystemInfoSync().screenWidth,
                e = wx.getMenuButtonBoundingClientRect();
            return (e.left = t - e.right), (e.right = e.left + e.width), e;
        },
        onTapLeftButton() {
            eventUtil.emit(this, "linlefttap"),
            this.data.disableBack
        },
        onLongPressLeftButton() {
            eventUtil.emit(this, "linleftlongpress");
        },
        async onTapRightButton() {
            eventUtil.emit(this, "linrighttap");
            const t = this.data.homePage;
            this.data.disableHome ||
            wx.switchTab({
                url: t,
                fail() {
                    wx.navigateTo({ url: t });
                }
            });
        },
        onLongPressRightButton() {
            eventUtil.emit(this, "linrightlongpress");
        }
    }
});
