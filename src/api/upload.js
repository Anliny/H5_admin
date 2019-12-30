import axios from '@/libs/api.request'

// 活动列表
export const apiUpload = (data) => {
    return axios.request({
        url: 'api/common/multiUpload',
        method: 'post',
        processData: false,
        contentType: 'multipart/form-data;boundary = ' + new Date().getTime(),
        data: data
    })
}

