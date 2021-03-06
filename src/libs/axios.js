import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
// axios.defaults.timeout = 6000;
const addErrorLog = errorInfo => {
    const { statusText, status, request: { responseURL } } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            timeout: 6000,
            headers: {
                //
            }
        }
        // 加一个url判断，非login页面，就从user.token中取token，保存到headers['Authorization']
        if (this.baseUrl !== 'login') {
            if (store.state.user.token) {
                config.headers['Authorization'] = store.state.user.token
            }
        }
        return config
    }
    destroy (url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const { data, status } = res
            return { data, status }
        }, error => {
            this.destroy(url)
            let errorInfo = error.response
            if (!errorInfo) {
                const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
                errorInfo = {
                    statusText,
                    status,
                    request: { responseURL: config.url }
                }
            }
            addErrorLog(errorInfo)
            return Promise.reject(error)
        })
    }
    request (options) {
        const instance = axios.create()
        // options = Object.assign(this.getInsideConfig(), options)
        // 添加 options.url
        options = Object.assign(this.getInsideConfig(options.url), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
