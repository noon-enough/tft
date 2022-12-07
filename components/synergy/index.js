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
        }
    },
    data: {
        level: 0
    },
    methods: {},
    attached() {
        const that = this
        let level = Math.ceil(that.properties.count / 2)
        that.setData({
            level: level
        })
    }
});
