import axios from '@/libs/api.request'

// 会员列表
export const apiMatchmaker = (params) => {
    return axios.request({
        url: 'matchmaker/queryPage',
        method: 'get',
        params: params
    })
}

// 会员详情
export const apiMatchmakerInfo = (params) => {
    return axios.request({
        url: 'matchmaker/queryById',
        method: 'get',
        params: params
    })
}
