import axios from '@/libs/api.request'

// 会员列表
export const apiLabelList = (params) => {
    return axios.request({
        url: 'api/label/queryPage',
        method: 'get',
        params: params
    })
}

// 会员详情
export const apiLabelSave = (data) => {
    return axios.request({
        url: 'api/label/save',
        method: 'post',
        data: data
    })
}
