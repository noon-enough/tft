Component({
    properties: {
        location: {
            type: Array,
            value: [],
        },
        detail: {
            type: Boolean,
            value: false
        },
        desc: {
            type: String,
            value: ""
        }
    },
    data: {
        // position: []
    },
    methods: {},
    attached(format, data) {
        // let location = this.properties.location,
        //     position = []
        // location.forEach(item => {
        //     item["position"] = item["location"].replace(",", "-")
        //     position.push(item)
        // })
        // this.setData({
        //     position: position
        // }, data)
        // console.log('got position data', position, this.properties.detail, this.properties.location)
    }
});
