<!--  -->
<template>
    <div class="content">
        <div class="search">
            <Form :model="queryData" :label-width="100">
                <Row :gutter="16">
                    <Col span="6" class="formItem">
                        <FormItem label="广告位置">
                            <Select v-model="queryData.type" clearable>
                                <Option
                                    v-for="item in selectList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" class="formItem">
                        <FormItem label="地区">
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
            <Row :gutter="16" v-for="(item,index) in tableData" :key="index">
                <Col span="8">
                    <img :src="item.pictureUrl" style="width:400px" alt srcset>
                </Col>
                <Col span="16">
                    <Row :gutter="16">
                        <Col span="12">广告名称：{{item.name}}</Col>
                        <Col span="12">投放日期：{{item.rawAddTime}}</Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">开始日期：{{item.startTime}}</Col>
                        <Col span="12">结束日期：{{item.endTime}}</Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">广告位置：{{item.type == 0 ?"头部":'列表'}}</Col>
                        <Col span="12">广告链接地址：{{item.url}}</Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">状态：{{!item.deleted ? "正常":'删除'}}</Col>
                        <Col span="12">操作：-</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import { apiAdvertList } from '@/api/advert.js'
import { formatQsData } from '@/libs/tools.js'

export default {
    components: {},
    data() {
        return {
            selectList: [
                {
                    value: 0,
                    label: '头部'
                },
                {
                    value: 1,
                    label: '列表'
                }
            ],
            queryData: {
                type: '',
                region: ''
            },
            columns: [
                {
                    title: '缩略图',
                    slot: 'pictureUrl'
                },
                {
                    title: '广告名称',
                    key: 'name'
                },

                {
                    title: '投放地区',
                    key: 'region'
                },
                {
                    title: '开始日期',
                    key: 'startTime'
                },
                {
                    title: '结束日期',
                    key: 'endTime'
                },
                {
                    title: '广告链接',
                    key: 'url'
                },
                {
                    title: '广告位置',
                    slot: '_type_'
                },
                {
                    title: '状态',
                    slot: 'action'
                },
                {
                    title: '操作',
                    slot: 'action'
                }
            ],
            tableData: []
        }
    },
    created() {
        this.getAdvertList()
    },
    methods: {
        // 获取列表
        getAdvertList() {
            let queryData = formatQsData(this.queryData)
            apiAdvertList(queryData).then(res => {
                console.log(res)
                let data = res.data.data
                this.tableData = data
            })
        },
        // 搜索查询
        handleSearch() {
            this.queryData.current = 1
            this.getAdvertList()
        },
        // 点击分页
        handleChagePage(index) {
            this.queryData.current = index
            this.getAdvertList()
        },
        // 查看会员详情
        handleShow(data) {
            this.$router.push({ path: 'vip_info', query: { id: data.id } })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../page.scss';
</style>
