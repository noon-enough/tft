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
            let id = e.currentTarget.dataset.heroId,
                session = e.currentTarget.dataset.heroSession
            console.log(e)
            if (id === 0 || session === "") {
                showToast("无法打开英雄详细页", {icon: "error"})
                return
            }
            heroDetail(id, session)
        },
    },
    attached(format, data) {
    }
});
