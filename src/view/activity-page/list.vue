<!--  -->
<template>
    <div class="content">
        <div class="search">
            <Form :model="queryData" :label-width="100">
                <Row :gutter="16">
                    <Col span="5" class="formItem">
                        <FormItem label="发布人">
                            <Input clearable v-model="queryData.name" placeholder="请输入发布人姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="5" class="formItem">
                        <FormItem label="关键字">
                            <Input clearable v-model="queryData.phone" placeholder="请输入关键字"></Input>
                        </FormItem>
                    </Col>
                    <Col span="5" class="formItem">
                        <FormItem label="开始日期">
                            <Input clearable v-model="queryData.phone" placeholder="请输选择开始日期"></Input>
                        </FormItem>
                    </Col>
                    <Col span="5" class="formItem">
                        <FormItem label="结束日期">
                            <Input clearable v-model="queryData.phone" placeholder="请选择结束日期"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" class="formItem">
                        <Button type="primary" @click="addActivity">添加活动</Button>&nbsp;
                        <Button type="primary" @click="handleSearch">搜索</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="main clearfix">
            <div class="listItem" v-for="(item,index) in data" :key="index">
                <div class="header">
                    <div class="header-image">
                        <img :src="userAvatar(item.userAvatar)" alt srcset>
                    </div>
                    <div class="title">
                        <h3>
                            {{item.name}}
                            <Tag v-if="item.state == 1" color="primary">审核中···</Tag>
                            <Tag v-if="item.state == 2" color="success">审核通过</Tag>
                        </h3>
                        <span>{{item.rawAddTime}}</span>
                    </div>
                    <div class="btnWraper">
                        <Button
                            type="primary"
                            v-if="item.state==1"
                            icon="ios-happy"
                            size="small"
                            ghost
                            @click="handleChange(item,2)"
                        >确认通过</Button>&nbsp;
                        <Button
                            type="error"
                            icon="ios-trash-outline"
                            size="small"
                            ghost
                            @click="handleMoveActivity(item)"
                        >删除动态</Button>
                    </div>
                </div>

                <div class="text">{{item.content}}</div>
                <div class="photo">
                    <img
                        v-for="(imageItem,i) in pictureUrl(item.pictureUrl)"
                        :key="i"
                        class="photo-img"
                        :src="imageItem"
                        alt
                        srcset
                    >
                </div>
                <div class="time">活动日期：{{item.startTime}} 到 {{item.endTime}}</div>
                <div class="time">报名截止日期：{{item.startTime}}</div>
                <Alert class="alert" banner type="warning">
                    本次活动报名人数：{{item.activityNumber}}人，已经有
                    <span class="span">{{item.partakes}}</span>人参加！
                </Alert>
            </div>
            <div class="pages">
                <Page
                    :total="queryData.total"
                    :page-size="queryData.size"
                    @on-change="handleChagePage"
                />
            </div>
        </div>

        <!-- 添加会员 -->
        <Modal v-model="activityModel" :width="800">
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
                    <FormItem label="活动标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="请输入活动标题"></Input>
                    </FormItem>
                    <FormItem label="参与人数" prop="activityNumber">
                        <InputNumber
                            :min="1"
                            style="width:300px"
                            v-model="formValidate.activityNumber"
                        ></InputNumber>
                    </FormItem>
                    <FormItem label="活动日期" prop="timeList">
                        <DatePicker
                            type="datetimerange"
                            v-model="formValidate.timeList"
                            placement="bottom-end"
                            placeholder="请选择开始日期和结束日期"
                            style="width:300px"
                        ></DatePicker>
                    </FormItem>
                    <FormItem label="活动内容" prop="content">
                        <Input
                            v-model="formValidate.content"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入活动内容"
                        ></Input>
                    </FormItem>
                    <FormItem label="图片上传" prop="activityNumber">
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon
                                        type="ios-eye-outline"
                                        @click.native="handleView(item.url)"
                                    ></Icon>
                                    <Icon
                                        type="ios-trash-outline"
                                        @click.native="handleRemove(item)"
                                    ></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress
                                    v-if="item.showProgress"
                                    :percent="item.percentage"
                                    hide-info
                                ></Progress>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            :action="baseUrl"
                            style="display: inline-block;width:118px;"
                        >
                            <div style="width: 118px;height:118px;line-height: 118px;">
                                <Icon type="ios-camera" size="40"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="handelCancel">取消</Button>
                <Button type="primary" @click="handelSave">保存</Button>
            </div>
        </Modal>
        <Modal title="View Image" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
import { apiActivityList, apiActivitySave } from '@/api/activity.js'
import { formatQsData, formatDateTime } from '@/libs/tools.js'
import config from '@/config'
import avatar from '@/assets/admin.jpg'
export default {
    components: {},
    data() {
        return {
            baseUrl: config.baseUrl.dev + 'api/common/multiUpload',
            activityModel: false,
            queryData: {
                addressId: '',
                title: '',
                current: 1
            },
            data: [],
            formValidate: {
                title: '',
                activityNumber: 0,
                timeList: [],
                content: ''
            },
            ruleValidate: {},

            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: []
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList
    },
    created() {
        this.getActivityList()
    },
    methods: {
        // 获取列表
        getActivityList() {
            let queryData = formatQsData(this.queryData)
            apiActivityList(queryData).then(res => {
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
        // 审核活动
        handleChange(data, index) {
            this.$Modal.warning({
                title: '提示',
                content: '确认审核通过该条活动！',
                onOk: () => {
                    let info = {
                        id: data.id,
                        state: index
                    }
                    apiActivitySave(info).then(res => {
                        try {
                            this.$Message.success('保存成功')
                            this.getActivityList()
                        } catch (error) {}
                    })
                }
            })
        },
        // 删除活动
        handleMoveActivity(data) {
            this.$Modal.warning({
                title: '提示',
                content: '确认删除该条活动！',
                onOk: () => {
                    let info = {
                        id: data.id,
                        deleted: true
                    }
                    apiActivitySave(info).then(res => {
                        try {
                            this.$Message.success('删除成功')
                            this.getActivityList()
                        } catch (error) {}
                    })
                }
            })
        },
        // 列表头像处理
        userAvatar(url) {
            if (url) return url
            return avatar
        },
        // 格式化图片
        pictureUrl(imgList) {
            if (imgList.indexOf('[') != -1) {
                return JSON.parse(imgList)
            } else {
                return [imgList]
            }
        },
        // 添加活动
        addActivity() {
            this.formValidate = {
                title: '',
                activityNumber: 0,
                timeList: [],
                content: ''
            }
            this.activityModel = true
        },
        // 取消保存活动
        handelCancel() {
            this.activityModel = false
        },
        // 保存活动
        handelSave() {
            let avatorImgPath = this.$store.state.user.avatorImgPath
            let type = this.$store.state.user.type
            let userName = this.$store.state.user.userName
            let userId = this.$store.state.user.userId
            let { activityNumber, content, title, timeList } = this.formValidate

            let startTime = formatDateTime(timeList[0])
            let endTime = formatDateTime(timeList[1])
            let userAvatar = avatorImgPath
            let name = userName ? userName : 'admin'
            let state = type == 3 ? 1 : 2
            let pictureUrl = []
            this.uploadList.forEach(item => {
                pictureUrl.push(item.response.data)
            })

            let info = {
                userAvatar,
                title,
                addressId: '',
                content,
                activityNumber,
                startTime,
                endTime,
                name,
                state,
                pictureUrl: JSON.stringify(pictureUrl)
            }
            apiActivitySave(info).then(res => {
                try {
                    if (res.data.code == '0') {
                        this.$Message.success('活动添加成功！')
                        this.activityModel = false
                        this.getActivityList()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                } catch (error) {}
            })
        },

        // 图片上传的方法
        handleView(name) {
            this.imgName = name
            this.visible = true
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        },
        handleSuccess(res, file) {
            file.url = file.response.data
            file.name = file.name
        },
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
        handleBeforeUpload() {
            const check = this.uploadList.length < 5
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                })
            }
            return check
        }
    }
}
</script>
<style lang='scss' >
@import '../page.scss';
.demo-upload-list {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}
.demo-upload-list img {
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}
.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
