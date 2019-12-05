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
export const apiVipInfo = (params) => {
    return axios.request({
        url: 'api/member/queryById',
        params: params,
        method: 'get'
    })
}
