import {showToast, heroDetail} from "../../utils/util";

Component({
    properties: {
        heroId: {
            value: 0,
            type: Number
        },
        name: {
          value: "",
          type: String
        },
        showName: {
            value: false,
            type: Boolean
        },
        cost: {
            value: 1,
            type: Number
        },
        avatar: {
            value: "",
            type: String
        },
        star: {
            value: 1,
            type: Number
        },
        showStar: {
            value: true,
            type: Number
        },
        size: {
            value: 90,
            type: Number
        },
        equipments: {
            value: [],
            type: Array
        },
        isCarry: {
            value: false,
            type: Boolean,
        },
        isMonster: {
            value: false,
            type: Boolean,
        },
        isVanguard: {
            value: false,
            type: Boolean,
        },
        session: String,
        borderSize: {
            value: 4,
            type: Number,
        }
    },
    data: {
        monster: "",
        vanguard: "",
    },
    methods: {
        detail(e) {
            let id = e.currentTarget.dataset.heroId,
                session = e.currentTarget.dataset.heroSession
            id = parseInt(id)
            if (id === 0 || session === "") {
                showToast("无法打开英雄详细页", {icon: "error"})
                return
            }
            heroDetail(id, session)
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {},
        hide: function () {},
        resize: function () {},
    },
    attached() {
        let monster = "",
            that = this,
            vanguard = ""
        if (that.properties.isMonster === true) {
            monster = "monster"
        }
        if (that.properties.isVanguard === true) {
            vanguard = "vanguard"
        }
        that.setData({
            monster: monster,
            vanguard: vanguard,
        })
        console.log('isVanguard', vanguard)
    }
});
