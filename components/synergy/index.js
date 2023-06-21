Component({
    properties: {
        avatar: {
            type: String,
            value: ""
        },
        name: {
            type: String,
            value: ""
        },
        count: {
            type: Number,
            value: 0
        },
        level: {
            type: Number,
            value: 1
        },
        size: {
            type: Number,
            value: 40,
        }
    },
    data: {
    },
    methods: {},
    attached() {
        // const that = this
        // let level = Math.ceil(that.properties.count / 2)
        // that.setData({
        //     level: level
        // })
    }
});
