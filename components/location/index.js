import {heroDetail} from "../../utils/util";

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
    methods: {
        detail(e) {
            let id = e.currentTarget.dataset.heroId
            console.log(e)
            if (id === 0) {
                showToast("无法打开英雄详细页", {icon: "error"})
                return
            }
            heroDetail(id)
        },
    },
    attached(format, data) {
    }
});
