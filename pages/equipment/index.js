import tabbar from '../../tabbar';
import {equipments} from "../../utils/api";
import {showToast} from "../../utils/util";
Page({
    data: {
        list: tabbar,
        data: [],
        formation: {
            type1: [],
            type2: {},
            type3: {},
            type4: {},
            type5: {}
        }
    },
    onLoad: function (options) {
        let that = this
        equipments().then(res => {
            let data = res.data ?? []
            if (data) {
                that.setData({
                    data: data,
                    formation: {
                        type1: data.type1[0].formation,
                        type2: data.type2[0],
                        type3: data.type3[0],
                        type4: data.type4[0],
                        type5: data.type5[0]
                    }
                })

                console.log('data', data, this.data.formation)
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    showFormation(e) {
        let dataset = e.currentTarget.dataset
        let type = dataset.type,
            idx = dataset.idx,
            that = this,
            id = dataset.id

        console.log('change', type, idx, id)
        if (type === "type1") {
            that.setData({
                ["formation.type1"]: that.data.data.type1[idx].formation
            })
        }
        if (type === "type2") {
            that.setData({
                ["formation.type2"]: that.data.data.type2[idx]
            })
        }
        if (type === "type3") {
            that.setData({
                ["formation.type3"]: that.data.data.type3[idx]
            })
        }
        if (type === "type4") {
            that.setData({
                ["formation.type4"]: that.data.data.type4[idx]
            })
        }
        if (type === "type5") {
            that.setData({
                ["formation.type5"]: that.data.data.type5[idx]
            })
        }
    },
});
