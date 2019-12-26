import axios from '@/libs/api.request'

// 活动列表
export const apiUpload = (params) => {
    return axios.request({
        url: 'api/common/multiUpload',
        method: 'get',
        params: params
    })
}

