<!--  -->
<template>
    <div class="content">
        <div class="search">
            <Form :model="queryData" :label-width="100">
                <Row :gutter="16">
                    <Col span="6" class="formItem">
                        <FormItem label="姓名">
                            <Input clearable v-model="queryData.name" placeholder="请输入姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6" class="formItem">
                        <FormItem label="电话号码">
                            <Input clearable v-model="queryData.phone" placeholder="请输入电话号码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6" class="formItem">
                        <Button type="primary" @click="handleSearch">搜索</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="main clearfix">
            <div class="listItem" v-for="(item,index) in data" :key="index">
                <div class="header">
                    <div class="header-image">
                        <img :src="userAvatar(item.userAvatar)" alt srcset>
                    </div>
                    <div class="title">
                        <h3>
                            {{item.title}}
                            <Tag v-if="item.state == 1" color="primary">审核中···</Tag>
                            <Tag v-if="item.state == 2" color="success">审核通过</Tag>
                        </h3>
                        <span>{{item.rawAddTime}}</span>
                    </div>
                    <div class="btnWraper">
                        <Button
                            type="primary"
                            v-if="item.state==1"
                            icon="ios-happy"
                            size="small"
                            ghost
                        >确认通过</Button>&nbsp;
                        <Button type="error" icon="ios-trash-outline" size="small" ghost>删除动态</Button>
                    </div>
                </div>
                <Alert class="alert" banner type="warning">
                    本次活动报名人数：{{item.activityNumber}}人，已经有
                    <span class="span">{{item.partakes}}</span>人参加！
                </Alert>
                <div class="text">{{item.content}}</div>
                <div class="photo">
                    <img
                        v-for="(imageItem,i) in pictureUrl(item.pictureUrl)"
                        :key="i"
                        class="photo-img"
                        :src="imageItem"
                        alt
                        srcset
                    >
                </div>
                <div class="time">活动日期：{{item.startTime}} 到 {{item.endTime}}</div>
                <div class="time">报名截止日期：{{item.startTime}}</div>
            </div>
            <div class="pages">
                <Page
                    :total="queryData.total"
                    :page-size="queryData.size"
                    @on-change="handleChagePage"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { apiActivityList } from '@/api/activity.js'
export default {
    components: {},
    data() {
        return {
            queryData: {
                addressId: '',
                title: ''
            },
            data: []
        }
    },
    computed: {},
    created() {
        this.getActivityList()
    },
    methods: {
        // 获取列表
        getActivityList() {
            apiActivityList(this.queryData).then(res => {
                console.log(res)
                let { current, pages, records, size, total } = res.data.data
                this.queryData.current = current
                this.queryData.pages = pages
                this.queryData.size = size
                this.queryData.total = total
                this.data = records
            })
        },
        // 搜索查询
        handleSearch() {
            this.queryData.current = 1
            this.getMatchmakerList()
        },
        // 点击分页
        handleChagePage(index) {
            this.queryData.current = index
            this.getMatchmakerList()
        },
        // 列表头像处理
        userAvatar(url) {
            if (url) return url
            return 'https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=62d3ca5e6ed9f2d320442ce999dca62b/34fae6cd7b899e511694cfab4ea7d933c8950d72.jpg'
        },
        // 格式化图片
        pictureUrl(imgList) {
            console.log(imgList)
            let bool = imgList.indexOf('[') != -1 ? true : false
            if (bool) {
                return JSON.parse(imgList)
            } else {
                return [imgList]
            }
        }
    }
}
</script>
<style lang='scss' >
@import '../page.scss';
</style>
