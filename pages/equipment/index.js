import tabbar from '../../tabbar';
import {equipmentItem, equipments} from "../../utils/api";
import {getSessionFromStorage, showToast} from "../../utils/util";
Page({
    data: {
        list: tabbar,
        activeKey: "basic",
        data: [],
        formation: {
            type3: {},
            type4: {},
            type5: {},
            type6: {},
        },
        selectedEid: 0,
        equipment: [],
    },
    onLoad: function (options) {
        let that = this,
            session = getSessionFromStorage()
        equipments().then(res => {
            let data = res.data ?? [],
                is_s95 = session === "s9.5",
                setData = {}
            if (data) {
                setData = {
                    session: session,
                    data: data,
                    selectedEid: data.type1[0].id,
                    formation: {
                        type3: data.type3[0],
                        type4: data.type4[0],
                        type5: data.type5[0],
                    }
                }

                if (is_s95 === true) {
                    setData.formation.type6 = data.type6[0]
                }
                that.setData(setData)

                console.log('data', data, 'type1', data.type1)
                that.getEquipmentItem()
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    getEquipmentItem() {
        let that = this,
            selectedEid = that.data.selectedEid
        equipmentItem(selectedEid).then(res => {
            console.log('equipmentItem', res)
            let data = res.data ?? []
            if (data) {
                that.setData({
                    equipment: data,
                })
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            showToast("拉取数据失败，请稍候再试", {icon: "error"})
        })
    },
    getType(type = ""){
        if (type === "basic") {
            return "type1"
        }
        if (type === "normal") {
            return "type2"
        }
        if (type === "race") {
            return "type3"
        }
        if (type === "special") {
            return "type4"
        }
        if (type === "halo") {
            return "type5"
        }
        if (type === "support") {
            return "type6"
        }
    },
    showFormation(e) {
        let dataset = e.currentTarget.dataset
        let type = dataset.type,
            idx = dataset.idx,
            that = this,
            id = dataset.id,
            data = {},
            needUri = false
        console.log('change', type, idx, id, that.data.data[type])
        if (type === "type1" || type === "type2") {
            needUri = true
            data.selectedEid = id
        } else {
            data = {
                [`formation.${type}`]: that.data.data[type][idx],
                selectedEid: id,
            }
        }
        that.setData(data)
        if (needUri) {
            that.getEquipmentItem()
        }
    },
    onTabTabBar(e) {
        let that = this,
            {activeKey, currentIndex} = e.detail,
            type = that.getType(activeKey),
            id = that.data.data[type][0].id
        console.log('onTabTabBar', e, type, id)
        that.setData({
            activeKey: activeKey,
            selectedEid: id,
        })

        // 重新加载数据？
        that.getEquipmentItem()
    },
});
