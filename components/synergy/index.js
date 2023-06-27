Component({
    properties: {
        iconSize: {
            type: Number,
            value: 80,
        },
        fontSize: {
          type: Number,
          value: 26,
        },
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
        },
        isRank: {
            type:Boolean,
            value: false,
        }
    },
    data: {
    },
    methods: {},
    attached() {
    }
});
