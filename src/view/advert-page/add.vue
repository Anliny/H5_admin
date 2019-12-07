<!--  -->
<template>
    <div class="main">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Row :gutter="16">
                <Col span="12">
                    <div>
                        <FormItem label="广告位置:" prop="type">
                            <RadioGroup v-model="formValidate.type">
                                <Radio label="0">头部</Radio>
                                <Radio label="1">内容列表</Radio>
                            </RadioGroup>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="广告位置:" prop="pictureUrl">
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                type="drag"
                                :action="handleSuccessUrl"
                                style="display: inline-block;width:300px;"
                            >
                                <div style="width: 300px;height:200px;line-height: 200px;">
                                    <Icon
                                        v-if="!formValidate.pictureUrl"
                                        type="ios-image-outline"
                                        size="200"
                                    />
                                    <img
                                        v-else
                                        style="width:100%;height:auto"
                                        :src="formValidate.pictureUrl"
                                        alt
                                        srcset
                                    >
                                </div>
                            </Upload>
                        </FormItem>
                    </div>
                </Col>
                <Col span="12">
                    <div>
                        <FormItem label="广告名称:" prop="name">
                            <Input v-model="formValidate.name" placeholder="请输入广告名称"/>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="开始时间:" prop="startTime">
                            <DatePicker
                                v-model="formValidate.startTime"
                                type="date"
                                placeholder="请选择开始时间"
                            ></DatePicker>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="结束时间:" prop="endTime">
                            <DatePicker
                                v-model="formValidate.endTime"
                                type="date"
                                placeholder="请选择结束时间"
                            ></DatePicker>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="广告链接:" prop="url">
                            <Input v-model="formValidate.url" placeholder="请输入广告名称"/>
                        </FormItem>
                    </div>
                </Col>
            </Row>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { apiAdvertAdd } from '@/api/advert.js'
export default {
    components: {},
    data() {
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请上传广告图片'))
            } else {
                callback()
            }
        }
        return {
            //  process.env.BASE_URL  本机地址
            handleSuccessUrl: process.env.BASE_URL + 'api/common/multiUpload',
            formValidate: {
                type: '',
                name: '',
                region: '',
                pictureUrl: '',
                startTime: '',
                endTime: '',
                url: ''
            },
            ruleValidate: {
                type: [{ required: true, message: '请选择广告位置', trigger: 'change' }],
                startTime: [{ required: true, type: 'date', message: '请选择开始日期', trigger: 'change' }],
                endTime: [{ required: true, type: 'date', message: '请选择结束日期', trigger: 'change' }],
                name: [{ required: true, message: '请填写广告名称', trigger: 'blur' }],
                url: [{ required: true, message: '请填写外部链接', trigger: 'blur' }],
                pictureUrl: [{ validator: validatePassCheck, required: true, trigger: 'change' }]
            }
        }
    },
    computed: {},
    methods: {
        // 保存
        handleSubmit(name) {
            console.log(this.formValidate.startTime.toLocaleString().split(' ')[0])
            this.$refs[name].validate(valid => {
                if (valid) {
                    let { type, name, region, pictureUrl, startTime, endTime, url } = this.formValidate
                    let data = {
                        type,
                        name,
                        region,
                        pictureUrl,
                        startTime: startTime.toLocaleString().split(' ')[0],
                        endTime: endTime.toLocaleString().split(' ')[0],
                        url
                    }

                    apiAdvertAdd(data).then(res => {
                        console.log(res)
                    })
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        // 取消
        handleReset(name) {
            this.$refs[name].resetFields()
        },
        // 图片上传
        handleSuccess(res, file) {
            this.formValidate.pictureUrl = res.data
        },
        // 上传错误
        handleFormatError(file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            })
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            })
        },
        handleBeforeUpload(e) {
            // const check = this.uploadList.length < 5
            // if (!check) {
            //     this.$Notice.warning({
            //         title: 'Up to five pictures can be uploaded.'
            //     })
            // }
            // return check
            console.log(e)
            return true
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../page.scss';
</style>
