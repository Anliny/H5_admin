<template>
    <div>
        <div class="main clearfix">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="投放位置:" prop="type">
                            <RadioGroup v-model="formValidate.type">
                                <Radio label="0">头部</Radio>
                                <Radio label="1">内容</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="广告名称:" prop="name">
                            <Input
                                v-model="formValidate.name"
                                style="width:200px"
                                placeholder="请输入广告名称"
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="开始日期:" prop="startTime">
                            <DatePicker
                                type="date"
                                placeholder="请选择开始日期"
                                style="width:200px;"
                                v-model="formValidate.startTime"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="结束日期:" prop="endTime">
                            <DatePicker
                                type="date"
                                style="width:200px;"
                                placeholder="请选择结束日期"
                                v-model="formValidate.endTime"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="广告外部链接:" prop="url">
                            <Input
                                v-model="formValidate.url"
                                style="width:200px;"
                                placeholder="请输入图片外部链接地址"
                            ></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="图片地址:" prop="pictureUrl">
                            <img
                                style="width:400px;height:145px;"
                                :src="formValidate.pictureUrl"
                                alt="广告图片地址"
                            >
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <Button style="float:right">取消</Button>&nbsp;
                    </Col>
                    <Col span="12">
                        &nbsp;
                        <Button type="primary" @click="addSave">保存</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="main clearfix">
            <div class="info-item">
                <div class="info-item-group">
                    <label class="btn btn-orange" style="padding:0 10px" for="uploads">选择图片</label>
                    <input
                        type="file"
                        id="uploads"
                        :value="imgFile"
                        style="position:absolute; clip:rect(0 0 0 0);"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="uploadImg($event, 1)"
                    >
                    <Button @click="changeScale(1)">放大</Button>&nbsp;
                    <Button @click="changeScale(-1)">缩小</Button>&nbsp;
                    <Button @click="rotateLeft">左旋转</Button>&nbsp;
                    <Button @click="rotateRight">右旋转</Button>&nbsp;
                    <Button @click="down('blob')">下载</Button>&nbsp;
                    <Button @click="finish('blob')">上传头像</Button>
                </div>

                <div class="line">
                    <div class="cropper-content">
                        <div class="cropper">
                            <vueCropper
                                ref="cropper"
                                :img="option.img"
                                :outputSize="option.size"
                                :outputType="option.outputType"
                                :info="true"
                                :full="option.full"
                                :canMove="option.canMove"
                                :canMoveBox="option.canMoveBox"
                                :original="option.original"
                                :autoCrop="option.autoCrop"
                                :autoCropWidth="option.autoCropWidth"
                                :autoCropHeight="option.autoCropHeight"
                                :fixedBox="option.fixedBox"
                                @realTime="realTime"
                                @imgLoad="imgLoad"
                            ></vueCropper>
                        </div>
                        <div>
                            <div
                                class="show-preview"
                                :style="{'width': '400px','margin-top':'10px','height':'145px',  'overflow': 'hidden'}"
                            >
                                <div :style="previews.div" class="preview">
                                    <img :src="previews.url" :style="previews.img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueCropper from '@/components/vue-cropper/vue-cropper.vue'
import { apiUpload } from '@/api/upload.js' // 此处引入上传函数
import { apiAdvertAdd } from '@/api/advert.js'
import { formatDate } from '@/libs/tools.js'

export default {
    components: {
        VueCropper
    },
    data() {
        return {
            formValidate: {
                type: '',
                name: '',
                pictureUrl: '',
                endTime: '',
                startTime: '',
                url: ''
            },
            ruleValidate: {
                type: [{ required: true, message: '请选择广告位置', trigger: 'change' }],
                name: [{ required: true, message: '请输入广告名称', trigger: 'blur' }],
                endTime: [{ required: true, type: 'date', message: '请输入选择结束日期', trigger: 'change' }],
                startTime: [{ required: true, type: 'date', message: '请输入选择开始日期', trigger: 'change' }],
                url: [{ required: true, message: '请输入广告外部链接', trigger: 'blur' }],
                pictureUrl: [{ required: true, message: '请上传广告图片', trigger: 'blur' }]
            },
            headImg: '',
            //剪切图片上传
            crap: false,
            previews: {},
            option: {
                img: '',
                outputSize: 1, //剪切后的图片质量（0.1-1）
                full: false, //输出原图比例截图 props名full
                outputType: 'jpg',
                canMove: true,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                autoCropWidth: 400,
                autoCropHeight: 145,
                fixedBox: true
            },
            fileName: '', //本机文件地址
            downImg: '#',
            imgFile: '',
            uploadImgRelaPath: '' //上传后的图片的地址（不带服务器域名）
        }
    },

    methods: {
        //放大/缩小
        changeScale(num) {
            console.log('changeScale')
            num = num || 1
            this.$refs.cropper.changeScale(num)
        },
        //坐旋转
        rotateLeft() {
            console.log('rotateLeft')
            this.$refs.cropper.rotateLeft()
        },
        //右旋转
        rotateRight() {
            console.log('rotateRight')
            this.$refs.cropper.rotateRight()
        },
        //上传图片（点击上传按钮）
        finish(type) {
            console.log('finish')
            let _this = this
            let formData = new FormData()
            // 输出
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob(data => {
                    let img = window.URL.createObjectURL(data)
                    this.model = true
                    this.modelSrc = img
                    console.log('压缩前：' + data.size / 1024 + 'k')
                    formData.append('file', data, this.fileName)
                    console.log(data)
                    let isLt2M = data.size / 1024 / 1024 < 2
                    if (!isLt2M) {
                        this.$message.error('上传头像图片大小不能超过 2MB!')
                        return
                    }
                    apiUpload(formData).then(res => {
                        try {
                            let url = res.data
                            if (url.code == '-1') {
                                this.$Message.error('图片上传错误，请从新上传！')
                            } else {
                                this.$Message.success(url.message)
                                this.formValidate.pictureUrl = url.data
                            }
                        } catch (error) {}
                        console.log(res)
                    })
                    // this.$http
                    //     .post(Api.uploadSysHeadImg.url, formData, {
                    //         contentType: false,
                    //         processData: false,
                    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    //     })
                    //     .then(response => {
                    //         var res = response.data
                    //         if (res.success == 1) {
                    //             $('#btn1').val('')
                    //             _this.imgFile = ''
                    //             _this.headImg = res.realPathList[0] //完整路径
                    //             _this.uploadImgRelaPath = res.relaPathList[0] //非完整路径
                    //             _this.$message({
                    //                 //element-ui的消息Message消息提示组件
                    //                 type: 'success',
                    //                 message: '上传成功'
                    //             })
                    //         }
                    //     })
                })
            } else {
                this.$refs.cropper.getCropData(data => {
                    this.model = true
                    this.modelSrc = data
                })
            }
        },
        // 实时预览函数
        realTime(data) {
            console.log('realTime')
            this.previews = data
        },
        //下载图片
        down(type) {
            console.log('down')
            var aLink = document.createElement('a')
            aLink.download = 'author-img'
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob(data => {
                    this.downImg = window.URL.createObjectURL(data)
                    aLink.href = window.URL.createObjectURL(data)
                    aLink.click()
                })
            } else {
                this.$refs.cropper.getCropData(data => {
                    this.downImg = data
                    aLink.href = data
                    aLink.click()
                })
            }
        },
        //选择本地图片
        uploadImg(e, num) {
            console.log('uploadImg')
            var _this = this
            //上传图片
            var file = e.target.files[0]
            _this.fileName = file.name
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
            reader.onload = e => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                if (num === 1) {
                    _this.option.img = data
                } else if (num === 2) {
                    _this.example2.img = data
                }
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
        },
        imgLoad(msg) {
            console.log('imgLoad')
            console.log(msg)
        },
        // 保存图片
        addSave() {
            // console.log(this.formValidate)

            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    let { type, pictureUrl, url, endTime, startTime } = this.formValidate
                    let formatEndTime = formatDate(endTime)
                    let formatStartTime = formatDate(startTime)
                    // console.log(formatEndTime, formatStartTime)
                    let data = { type, pictureUrl, url, endTime: formatEndTime, startTime: formatStartTime }
                    console.log(data)
                    apiAdvertAdd(data).then(res => {
                        try {
                            if (res.data.code == '0') {
                                this.$Message.success('添加成功!')
                                this.$router.push({ path: '/advert' })
                            } else {
                                this.$Message.error(res.data.message)
                            }
                        } catch (error) {}
                    })
                } else {
                    this.$Message.error('Fail!')
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '../page.scss';

.info-item-group {
    padding: 20px 0px;
}
.oper {
    height: 20px;
    width: 20px;
    font-size: 20px;
    margin: 3px 5px;
    line-height: 19px;
}
.info {
    width: 720px;
    margin: 0 auto;
    .oper-dv {
        height: 20px;
        text-align: right;
        margin-right: 100px;
        a {
            font-weight: 500;
            &:last-child {
                margin-left: 30px;
            }
        }
    }
    .info-item {
        margin-top: 15px;
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
        }
        .sel-img-dv {
            position: relative;
            .sel-file {
                position: absolute;
                width: 90px;
                height: 30px;
                opacity: 0;
                cursor: pointer;
                z-index: 2;
            }
            .sel-btn {
                position: absolute;
                cursor: pointer;
                z-index: 1;
            }
        }
    }
}

.cropper-content {
    .cropper {
        width: 800px;
        height: 290px;
    }
    .show-preview {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview {
            overflow: hidden;
            border: 1px solid #cccccc;
            background: #cccccc;
            margin-left: 40px;
        }
    }
}
.cropper-content .show-preview .preview {
    margin-left: 0;
}
</style>