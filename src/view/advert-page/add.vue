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
                <Col span="12"></Col>
            </Row>
        </Form>
    </div>
</template>

<script>
import config from '@/config'
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
                pictureUrl: [{ validator: validatePassCheck, required: true, trigger: 'change' }]
            }
        }
    },
    mounted() {
        console.log(process.env.BASE_URL)
    },
    computed: {},
    methods: {
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
