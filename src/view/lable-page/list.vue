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
                        >添加标签</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="main clearfix">
            <Tag
                type="border"
                closable
                size="medium"
                color="primary"
                v-for="(item,index) in data"
                :key="index"
                @click="handleEdit(true,item)"
                @on-close="handleDelete(item)"
            >{{item.name}}</Tag>
        </div>
        <Modal v-model="lableModel" :width="800" @on-cancel="handelCancel">
            <div slot="header">
                <h3>{{title}}标签</h3>
            </div>
            <div>
                <Form
                    ref="formValidate"
                    :model="formValidate"
                    :rules="ruleValidate"
                    :label-width="120"
                >
                    <FormItem label="标签名称" prop="name">
                        <Input
                            v-model="formValidate.name"
                            style="width:200px"
                            placeholder="请输入标签名称"
                        ></Input>
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
import { apiLabelList, apiLabelSave } from '@/api/lable.js'
export default {
    components: {},
    data() {
        return {
            title: '编辑',
            data: [],
            queryData: {
                current: 1,
                size: 999
            },
            formValidate: {
                id: '',
                name: ''
            },
            ruleValidate: {
                name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
            },
            lableModel: false
        }
    },
    created() {
        this.getLableList()
    },
    methods: {
        // 获取列表
        getLableList() {
            apiLabelList(this.queryData).then(res => {
                let data = res.data.data
                this.data = data.records
            })
        },
        // 查看会员详情
        handleEdit(title, data) {
            this.formValidate = {
                id: '',
                name: ''
            }
            this.title = title ? '编辑' : '添加'
            this.lableModel = true
            if (title) {
                let { id, name } = data
                this.formValidate = {
                    id,
                    name
                }
            }
        },
        // 保存会员等级
        handelSave(e) {
            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    apiLabelSave(this.formValidate).then(res => {
                        try {
                            if (res.data.code == 0) {
                                this.$Message.success('保存成功')
                                this.lableModel = false
                                this.getLableList()
                            } else {
                                this.$Message.error(res.data.message)
                            }
                        } catch (error) {}
                    })
                } else {
                }
            })
        },
        // 取消标签保存
        handelCancel(e) {
            this.$refs['formValidate'].resetFields()
            this.lableModel = false
        },
        // 删除标签
        handleDelete(lable) {
            let data = {
                id: lable.id,
                deleted: true
            }
            apiLabelSave(data).then(res => {
                try {
                    if (res.data.code == 0) {
                        this.$Message.success('删除成功')
                        this.getLableList()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                } catch (error) {}
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
