import axios from '@/libs/api.request'

// 活动列表
export const apiActivityList = (params) => {
    return axios.request({
        url: 'activity/queryPage',
        method: 'get',
        params: params
    })
}
// 会员详情
export const apiVipInfo = (params) => {
    return axios.request({
        url: 'member/queryById',
        params: params,
        method: 'get'
    })
}
