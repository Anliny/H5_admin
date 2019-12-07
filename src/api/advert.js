import axios from '@/libs/api.request'

// 广告列表
export const apiAdvertList = (params) => {
    return axios.request({
        url: 'api/advertisement/queryList',
        method: 'get',
        params: params
    })
}
// 会员详情
export const apiAdvertAdd = (data) => {
    return axios.request({
        url: 'api/advertisement/save',
        data: data,
        method: 'post'
    })
}
