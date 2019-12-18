<!--  -->
<template>
    <div class="content">
        <div class="search">
            <Form :model="queryData" :label-width="100">
                <Row :gutter="16">
                    <Col span="24" class="formItem">
                        <Button
                            style="float:right"
                            type="primary"
                            @click="handleEdit(false,{})"
                        >添加会员等级</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="main clearfix">
            <Table type="expand" stripe :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button size="small" @click="handleEdit(true,row)">编辑</Button>
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
        <Modal v-model="gradeModel" :width="800" @on-ok="handelSave" @on-cancel="handelCancel">
            <div slot="header">
                <h3>{{title}}会员等级</h3>
            </div>
            <div>
                <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                >
                    <FormItem label="会员等级名称" prop="gradeName">
                        <Input
                            v-model="formValidate.gradeName"
                            style="width:200px"
                            placeholder="请输入会员等级名称"
                        ></Input>
                    </FormItem>
                    <FormItem label="原价" prop="originalPrice">
                        <InputNumber
                            :min="0"
                            :max="10000"
                            style="width:200px"
                            v-model="formValidate.originalPrice"
                        ></InputNumber>
                    </FormItem>
                    <FormItem label="现价" prop="presentPrice">
                        <InputNumber
                            :min="0"
                            :max="10000"
                            style="width:200px"
                            v-model="formValidate.presentPrice"
                        ></InputNumber>
                    </FormItem>
                    <FormItem label="说明" prop="illustrate">
                        <Input
                            v-model="formValidate.illustrate"
                            type="textarea"
                            :autosize="{minRows: 2,maxRows: 5}"
                            placeholder="请输入购买会员等级说明"
                        ></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
import { apiVipList, apiSevaGrade } from '@/api/grade.js'
export default {
    components: {},
    data() {
        return {
            title: '编辑',
            queryData: {
                phone: '',
                name: ''
            },
            formValidate: {
                id: '',
                gradeName: '',
                originalPrice: 0,
                presentPrice: 0,
                illustrate: ''
            },
            ruleValidate: {},
            gradeModel: false,
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h('div', {
                            domProps: {
                                innerHTML: `说明：` + params.row.illustrate
                            }
                        })
                    }
                },
                {
                    title: '会员等级名称',
                    key: 'gradeName',
                    align: 'center'
                },
                {
                    title: '原价',
                    key: 'originalPrice',
                    align: 'center'
                },
                {
                    title: '现价',
                    key: 'presentPrice',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
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
            apiVipList().then(res => {
                let data = res.data.data
                this.data = data.records
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
        handleEdit(title, data) {
            this.formValidate = {
                id: '',
                gradeName: '',
                originalPrice: 0,
                presentPrice: 0,
                illustrate: ''
            }
            this.title = title ? '编辑' : '添加'
            this.gradeModel = true
            if (title) {
                let { id, gradeName, illustrate, originalPrice, presentPrice } = data
                this.formValidate = {
                    id,
                    gradeName,
                    illustrate,
                    originalPrice: originalPrice ? Number(originalPrice) : 0,
                    presentPrice: presentPrice ? Number(presentPrice) : 0
                }
            }
        },
        // 保存会员等级
        handelSave(e) {
            apiSevaGrade(this.formValidate).then(res => {
                try {
                    if (res.data.code == 0) {
                        this.$Message.success('保存成功')
                        this.getVipList()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                } catch (error) {}
            })
        },
        // 取消保存会员等级
        handelCancel(e) {
            console.log(e)
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
