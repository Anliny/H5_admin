import axios from '@/libs/api.request'

// 会员等级列表
export const apiVipList = () => {
    return axios.request({
        url: 'api/grade/queryPage',
        method: 'get',
    })
}
// 保存会员等级、修改会员等级
export const apiSevaGrade = (data) => {
    return axios.request({
        url: 'api/grade/save',
        data: data,
        method: 'post',
    })
}
