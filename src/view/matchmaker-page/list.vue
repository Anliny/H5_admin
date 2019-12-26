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
                <template slot-scope="{ row, index }" slot="_role_">
                    <span v-if="row.state == 1">红娘</span>
                    <span v-else>管理员</span>
                </template>
                <template slot-scope="{ row, index }" slot="_state_">
                    <Tag v-if="row.state == 1" color="primary">审核中···</Tag>
                    <Tag v-if="row.state == 2" color="success">审核通过</Tag>
                    <Tag v-if="row.state == 3" color="error">未通过</Tag>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button size="small" @click="handleShow(row)">查看详情</Button>&nbsp;
                    <Button v-if="row.state != 2" size="small" @click="handleExamine(row,2)">确认审核</Button>&nbsp;
                    <Button
                        v-if="row.state != 3"
                        type="error"
                        size="small"
                        @click="handleExamine(row,3)"
                    >取消通过</Button>&nbsp;
                    <Button size="small" @click="handleDelete(row)">删除用户</Button>
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
import { apiMatchmaker, apiMatchmakerSave } from '@/api/matchmaker.js'
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'

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
                    title: '性别',

                    slot: '_gender_'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '工作年限',
                    key: 'workingLife'
                },
                {
                    title: '手机号',
                    key: 'phone'
                },

                {
                    title: '微信号',
                    key: 'wechatNumber'
                },

                {
                    title: '角色',
                    slot: '_role_'
                },
                {
                    title: '状态',
                    slot: '_state_',
                    width: 120
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 300
                }
            ],
            data: []
        }
    },
    created() {
        this.getMatchmakerList()
        this.access = this.$store.state.user.access
        // console.log(this.$store.state.user.access)
    },
    methods: {
        // 获取列表
        getMatchmakerList() {
            apiMatchmaker(this.queryData).then(res => {
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
        // 查看会员详情
        handleShow(data) {
            this.$router.push({ path: 'matchmaker_info', query: { id: data.id } })
        },
        // 确认审核
        handleExamine(data, index) {
            let saveData = {
                id: data.id,
                state: index
            }
            apiMatchmakerSave(saveData).then(res => {
                try {
                    this.$Message.success('修改成功！')
                    this.getMatchmakerList()
                } catch (e) {}
            })
        },
        // 删除用户
        handleDelete(data) {
            let saveData = {
                id: data.id,
                deleted: true
            }
            apiMatchmakerSave(saveData).then(res => {
                try {
                    this.$Message.success('删除成功！')
                    this.getMatchmakerList()
                } catch (e) {}
            })
        }
    }
}
</script>
<style lang='css' >
@import '../page.scss';
</style>
