import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true,
                    icon: 'md-home'
                },
                component: () => import('@/view/single-page/home')
            }
        ]
    }, {
        path: '/message',
        name: 'message',
        component: Main,
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        children: [
            {
                path: 'message_page',
                name: 'message_page',
                meta: {
                    icon: 'md-notifications',
                    title: '消息中心'
                },
                component: () => import('@/view/single-page/message/index.vue')
            }
        ]
    }, {
        path: '/i18n',
        name: 'i18n',
        meta: {
            hideInBread: true
        },
        component: Main,
        children: [
            {
                path: 'i18n_page',
                name: 'i18n_page',
                meta: {
                    icon: 'md-planet',
                    title: 'i18n - {{ i18n_page }}'
                },
                component: () => import('@/view/i18n/i18n-page.vue')
            }
        ]
    },
    {
        path: '/vip_page',
        name: 'vip_page',
        meta: {
            icon: 'ios-contact',
            title: '会员管理'
        },
        component: Main,
        children: [
            {
                path: 'vip_list',
                name: 'vip_list',
                meta: {
                    icon: 'ios-contact',
                    title: '会员列表'
                },
                component: () => import('@/view/vip-page/list.vue')
            }, {
                path: 'vip_info',
                name: 'vip_info',
                meta: {
                    hideInMenu: true,
                    icon: 'ios-contact',
                    title: '会员详情'
                },
                props: (route) => ({
                    id: route.query.id
                }),
                component: () => import('@/view/vip-page/info.vue')
            }, {
                path: 'vip_dynamic',
                name: 'vip_dynamic',
                meta: {
                    icon: 'ios-contact',
                    title: '会员动态'
                },
                component: () => import('@/view/vip-page/dynamic.vue')
            }
        ]
    },
    {
        path: '/member',
        name: 'member',
        meta: {
            icon: 'ios-contacts',
            title: '会员卡管理',
            access: ['super_admin'],
        },
        component: Main,
        children: [
            {
                path: 'member_list',
                name: 'member_list',
                meta: {
                    icon: 'ios-contacts',
                    title: '会员等级列表'
                },
                component: () => import('@/view/member-page/list.vue')
            }
        ]
    }, {
        path: '/lable',
        name: 'lable',
        meta: {
            icon: 'ios-contacts',
            title: '标签管理',
            access: ['super_admin'],
        },
        component: Main,
        children: [
            {
                path: 'lable_list',
                name: 'lable_list',
                meta: {
                    icon: 'ios-contacts',
                    title: '标签列表'
                },
                component: () => import('@/view/lable-page/list.vue')
            }
        ]
    },
    {
        path: '/matchmaker',
        name: 'matchmaker',
        meta: {
            icon: 'ios-contacts',
            title: '红娘管理',
            access: ['super_admin'],
        },
        component: Main,
        children: [
            {
                path: 'matchmaker_list',
                name: 'matchmaker_list',
                meta: {
                    icon: 'ios-contacts',
                    title: '红娘列表'
                },
                component: () => import('@/view/matchmaker-page/list.vue')
            }, {
                path: 'matchmaker_info',
                name: 'matchmaker_info',
                meta: {
                    hideInMenu: true,
                    icon: 'ios-contacts',
                    title: '红娘详情'
                },
                props: (route) => ({
                    id: route.query.id
                }),
                component: () => import('@/view/matchmaker-page/info.vue')
            }, {
                path: 'matchmaker_add',
                name: 'matchmaker_add',
                meta: {
                    icon: 'ios-contacts',
                    title: '添加红娘'
                },
                component: () => import('@/view/matchmaker-page/add.vue')
            }
        ]
    },
    {
        path: '/activity',
        name: 'activity',
        meta: {
            icon: 'ios-aperture',
            title: '活动管理'
        },
        component: Main,
        children: [
            {
                path: 'activity_list',
                name: 'activity_list',
                meta: {
                    icon: 'ios-aperture',
                    title: '活动列表'
                },
                component: () => import('@/view/activity-page/list.vue')
            }
        ]
    },
    {
        path: '/advert',
        name: 'advert',
        meta: {
            icon: 'logo-youtube',
            title: '广告管理'
        },
        component: Main,
        children: [
            {
                path: 'advert_list',
                name: 'advert_list',
                meta: {
                    icon: 'logo-youtube',
                    title: '广告列表'
                },
                component: () => import('@/view/advert-page/list.vue')
            }, {
                path: 'advert_add',
                name: 'advert_add',
                meta: {
                    icon: 'logo-youtube',
                    title: '添加广告'
                },
                component: () => import('@/view/advert-page/add.vue')
            }
        ]
    },
    {
        path: '/error_logger',
        name: 'error_logger',
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: 'error_logger_page',
                name: 'error_logger_page',
                meta: {
                    icon: 'ios-bug',
                    title: '错误收集'
                },
                component: () => import('@/view/single-page/error-logger.vue')
            }
        ]
    },
    {
        path: '/argu',
        name: 'argu',
        meta: {
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: 'params/:id',
                name: 'params',
                meta: {
                    icon: 'md-flower',
                    title: route => `{{ params }}-${route.params.id}`,
                    notCache: true,
                    beforeCloseName: 'before_close_normal'
                },
                component: () => import('@/view/argu-page/params.vue')
            },
            {
                path: 'query',
                name: 'query',
                meta: {
                    icon: 'md-flower',
                    title: route => `{{ query }}-${route.query.id}`,
                    notCache: true
                },
                component: () => import('@/view/argu-page/query.vue')
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    }
]
