import axios from '@/libs/api.request'

// 会员列表
export const apiMatchmaker = (params) => {
    return axios.request({
        url: 'api/matchmaker/queryPage',
        method: 'get',
        params: params
    })
}

// 会员详情
export const apiMatchmakerInfo = (params) => {
    return axios.request({
        url: 'api/matchmaker/queryById',
        method: 'get',
        params: params
    })
}

// 保存红娘
export const apiMatchmakerSave = (data) => {
    return axios.request({
        url: 'api/matchmaker/save',
        method: 'post',
        data: data
    })
}
