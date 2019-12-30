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
                    <span v-else-if="row.grade == 2">银卡会员</span>
                    <span v-else-if="row.grade == 3">金卡会员</span>
                    <span v-else-if="row.grade == 4">钻石会员</span>
                    <span v-else>黑卡会员</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button size="small" @click="handleShow(row)">查看详情</Button>&nbsp;
                    <Button size="small" @click="handleEdit(row)">修改会员等级</Button>&nbsp;
                    <Button size="small" @click="handleMove(row)">删除</Button>
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
        <Modal v-model="vipModel" :width="800">
            <div slot="header">
                <h3>会员等级</h3>
            </div>
            <div>
                <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                >
                    <FormItem label="会员等级名称" prop="gradeName">
                        <Select v-model="formValidate.grade" clearable style="width:200px">
                            <Option
                                v-for="(item,index) in vipList"
                                :value="item.val"
                                :key="index"
                            >{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="handelCancel">取消</Button>
                <Button type="primary" @click="handelSave">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { apiVipList, apiVipSave } from '@/api/vip.js'
import qs from 'qs'
import { formatQsData } from '@/libs/tools.js'

export default {
    components: {},
    data() {
        return {
            queryData: {
                phone: '',
                name: '',
                current: 1
            },
            formValidate: {
                grade: ''
            },
            ruleValidate: {},
            vipModel: false,
            vipList: [
                { val: 1, label: '普通会员' },
                { val: 2, label: '银卡会员' },
                { val: 3, label: '金卡会员' },
                { val: 4, label: '砖石会员' },
                { val: 5, label: '黑卡会员' }
            ],
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
                    width: '300'
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
            let queryData = formatQsData(this.queryData)
            apiVipList(queryData).then(res => {
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
        },
        // 修改会员等级
        handleEdit(data) {
            this.vipModel = true
            this.formValidate.id = data.id
            this.formValidate.grade = data.grade
        },
        // 取消保存
        handelCancel() {
            this.vipModel = false
        },
        // 确认修改
        handelSave() {
            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    apiVipSave(this.formValidate).then(res => {
                        try {
                            if (res.data.code == 0) {
                                this.$Message.success('保存成功')
                                this.vipModel = false
                                this.getVipList()
                            } else {
                                this.$Message.error(res.data.message)
                            }
                        } catch (error) {}
                    })
                } else {
                }
            })
        },
        // 删除会员
        handleMove(data) {
            console.log(data)

            this.$Modal.warning({
                title: '提示',
                content: '确认删除该会员？',
                onOk: () => {
                    let info = {
                        id: data.id,
                        deleted: true
                    }
                    apiVipSave(info).then(res => {
                        try {
                            if (res.data.code == 0) {
                                this.$Message.success('删除成功')
                                this.vipModel = false
                                this.getVipList()
                            } else {
                                this.$Message.error(res.data.message)
                            }
                        } catch (error) {}
                    })
                }
            })
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
