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
            <Table stripe :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="_gender_">
                    <span v-if="row.gender == 1">男</span>
                    <span v-else>女</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button size="small" @click="handleShow(row)">查看详情</Button>
                </template>
            </Table>
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
import { apiAdvertList } from '@/api/advert.js'
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
                    key: 'type'
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
            data: []
        }
    },
    created() {
        this.getAdvertList()
    },
    methods: {
        // 获取列表
        getAdvertList() {
            apiAdvertList(this.queryData).then(res => {
                console.log(res)
                // let { current, pages, records, size, total } = res.data.data
                // this.queryData.current = current
                // this.queryData.pages = pages
                // this.queryData.size = size
                // this.queryData.total = total
                // this.data = records
            })
        },
        // 搜索查询
        handleSearch() {
            this.queryData.current = 1
            this.getVipList()
        },
        // 点击分页
        handleChagePage(index) {
            this.queryData.current = index
            this.getVipList()
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
