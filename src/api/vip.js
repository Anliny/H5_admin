import axios from '@/libs/api.request'

// 会员列表
export const apiVipList = (params) => {
    return axios.request({
        url: 'api/common/member/queryPage',
        method: 'get',
        params: params
    })
}
// 会员详情
export const apiVipInfo = (params) => {
    return axios.request({
        url: 'api/member/queryBackById',
        params: params,
        method: 'get'
    })
}

// 保存修改会员信息
export const apiVipSave = (data) => {
    return axios.request({
        url: 'api/member/save',
        data: data,
        method: 'post'
    })
}
