import axios from '@/libs/api.request'

// 活动列表
export const apiActivityList = (params) => {
    return axios.request({
        url: 'api/activity/queryPage',
        method: 'get',
        params: params
    })
}

// 保存修改活动
export const apiActivitySave = (data) => {
    return axios.request({
        url: 'api/activity/save',
        method: 'post',
        data: data
    })
}
