import {heroDetail, showToast} from "../../utils/util";
import {chess} from "../../utils/api";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        session: {
            type: String,
            value: "s7"
        }
    },
    data: {
        data: []
    },
    /**
     * 组件的方法列表
     */
    methods: {
        heroDetail: function(e){
            heroDetail(1)
        },
        getHeroes(){
            let that = this
            chess().then(res => {
                console.log("data", res)
                let data = res.data ?? []
                if (data) {
                    that.setData({
                        data: data
                    })
                }
            }).catch(err => {
                showToast("拉去数据失败，请稍候再试", {icon: "error"})
            })
        }
    },
    attached() {
        let that = this
        that.getHeroes()
    }

})
