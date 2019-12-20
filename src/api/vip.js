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

export const getMessage = () => {
    return axios.request({
        url: 'message/init',
        method: 'get'
    })
}

export const getContentByMsgId = msg_id => {
    return axios.request({
        url: 'message/content',
        method: 'get',
        params: {
            msg_id
        }
    })
}

export const hasRead = msg_id => {
    return axios.request({
        url: 'message/has_read',
        method: 'post',
        data: {
            msg_id
        }
    })
}

export const removeReaded = msg_id => {
    return axios.request({
        url: 'message/remove_readed',
        method: 'post',
        data: {
            msg_id
        }
    })
}

export const restoreTrash = msg_id => {
    return axios.request({
        url: 'message/restore',
        method: 'post',
        data: {
            msg_id
        }
    })
}
