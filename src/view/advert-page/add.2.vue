<template>
    <div id="cropper">
        <VueCropper
            ref="cropper"
            :img="url"
            :info="option.info"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :canMove="option.canMove"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :original="option.original"
            :infoTrue="option.infoTrue"
            :centerBox="option.centerBox"
            :canMoveBox="option.canMoveBox"
            :canScale="option.canScale"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
        ></VueCropper>
        <Button type="primary" @click="chooseImg">选择图片</Button>
        <input type="file" @change="getFile" accept="image/*" ref="imginput" id="img-input">
        <Button type="primary" @click="startCrop">开始截图</Button>
        <!-- <el-progress :percentage="percentage"></el-progress> -->
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { apiUpload } from '@/api/upload.js' // 此处引入上传函数
export default {
    data() {
        return {
            //https://github.com/xyxiao001/vue-cropper/文档地址
            // 安装 npm install vue-cropper -S
            option: {
                outputSize: 1, // 裁剪生成图片的质量 0.1 - 1
                outputType: 'jepg', //	裁剪生成图片的格式 jpeg || png || webp
                canScale: true, // 图片是否允许滚轮缩放 默认true
                autoCrop: true, // 是否默认生成截图框 默认false
                canMove: true, //上传图片是否可以移动 默认true
                autoCropWidth: 750, //默认生成截图框宽度	容器的80%	0~max
                autoCropHeight: 256, //默认生成截图框高度	容器的80%	0~max
                // fixedBox: true, // 固定截图框大小 不允许改变	false	true | false
                fixed: true, //是否开启截图框宽高固定比例
                original: false, // 上传图片按照原始比例渲染	false	true | false
                infoTrue: true, // 为展示真实输出图片宽高 false 展示看到的截图框宽高	false	true | false
                centerBox: true, // 截图框是否被限制在图片里面	false	true | false
                canMoveBox: true, //截图框能否拖动	true	true | false
                fixedNumber: [750, 256] // 截图框的宽高比例 [宽度, 高度]
            },
            url: '',
            cropperSrc: '',
            param: {
                // 上传参数
                originalFilename: '',
                contentType: 'image/jpeg',
                base64: '' // 我们接口要求不要data:image/png;base64,
            },
            flag: true,
            percentage: 0 // 上传进度
        }
    },
    components: {
        VueCropper
    },
    methods: {
        // 点击选择图片
        chooseImg() {
            this.$refs.imginput.click()
        },
        // 开始截图
        startCrop() {
            if (!this.flag) return false
            this.flag = false
            this.$refs.cropper.getCropData(data => {
                // do something
                this.cropperSrc = data
                console.log(data.replace('data:image/png;base64,', ''))
                this.param.base64 = data.replace('data:image/png;base64,', '')
                this.upload(this.param)
            })
        },
        // 进度条展示
        showProgress(res) {
            this.$nextTick(() => {
                this.percentage = Math.floor((res.loaded / res.total) * 100)
            })
        },
        // 图片上传
        upload(param) {
            let fd = new FormData()
            // fd.append('base64', param.base64)
            for (let k in param) {
                fd.append(k, param[k])
            }
            console.log(fd)
            apiUpload(fd)
                .then(res => {
                    console.log(res)
                    // this.url = this.cropperSrc
                    this.url = res.data.result.url
                    this.flag = true
                    // 清空input值
                    this.$refs.imginput.value = ''
                })
                .catch(() => {
                    this.flag = true
                    // 清空input值
                    this.$refs.imginput.value = ''
                })
        },
        // input选择图片
        getFile(e) {
            var vm = this
            // let file = this.$refs.imginput.files[0]
            let file = e.target.files[0]
            if (!/image\/\w+/.test(file.type)) {
                this.$message({
                    message: '请选择图片',
                    type: 'warning'
                })
                // 清空input值
                this.$refs.imginput.value = ''
                return false
            }
            this.param.originalFilename = file.name
            // 创建文件读取对象
            var reader = new FileReader()
            reader.readAsDataURL(file)
            // 文件读取结束
            reader.onload = function(e) {
                // 此处this === reader
                vm.url = this.result
            }
        }
    }
}
</script>

 
 
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#cropper {
    margin: 0 auto;
    height: 350px;
    width: 850px;
}
#img-input {
    display: none;
}
</style>