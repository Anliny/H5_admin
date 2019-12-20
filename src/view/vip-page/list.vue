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
            <Table stripe :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="_gender_">
                    <span v-if="row.gender == 1">男</span>
                    <span v-else>女</span>
                </template>
                <template slot-scope="{ row, index }" slot="_grade_">
                    <span v-if="row.grade == 1">普通会员</span>
                    <span v-else-if="row.grade == 2">普通会员</span>
                    <span v-else-if="row.grade == 3">普通会员</span>
                    <span v-else-if="row.grade == 4">普通会员</span>
                    <span v-else>女</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button size="small" @click="handleShow(row)">查看详情</Button>&nbsp;
                    <Button size="small" @click="handleShow(row)">修改会员等级</Button>
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
import { apiVipList } from '@/api/vip.js'
export default {
    components: {},
    data() {
        return {
            queryData: {
                phone: '',
                name: ''
            },
            columns: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '会员号',
                    key: 'memberId'
                },
                {
                    title: '学历',
                    key: 'education'
                },
                {
                    title: '性别',

                    slot: '_gender_'
                },
                {
                    title: '电话',
                    key: 'phone'
                },
                {
                    title: '推荐人',
                    key: ''
                },
                {
                    title: '我的推荐',
                    key: ''
                },
                {
                    title: '角色',
                    slot: '_grade_'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width:'300'
                }
            ],
            data: []
        }
    },
    created() {
        this.getVipList()
    },
    methods: {
        // 获取列表
        getVipList() {
            apiVipList(this.queryData).then(res => {
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
<style lang='css' >
/* .content {
    padding: 10px;
} */
.search,
.main {
    background-color: #fff;
    padding: 10px;
}
.main {
    margin-top: 10px;
}
.formItem .ivu-form-item {
    margin: 0;
}
.pages {
    padding: 10px;
    float: right;
}

.clearfix:after {
    content: ' ';
    display: block;
    clear: both;
    visibility: hidden;
}
</style>
