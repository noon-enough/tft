Component({
    properties: {
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
            type: Object
        },
        isCarry: {
            value: false,
            type: Boolean
        }
    },
    data: {},
    methods: {}
});
