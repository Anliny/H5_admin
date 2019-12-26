<!--  -->
<template>
    <div class="main">
        <Row :gutter="10">
            <Col span="4">
                <div class="img-warp">
                    <img class="image" :src="vipInfo.userAvatar">
                </div>
            </Col>
            <Col span="10">
                <div class="wrapper">
                    <div class="title">
                        {{vipInfo.nickName}}
                        <small>({{grade}})</small>
                    </div>
                    <div class="item">会员账号：{{vipInfo.memberId}}</div>
                    <div class="item">手机号码：{{vipInfo.phone}}</div>
                    <div class="item">微信号码：{{vipInfo.wechatNumber}}</div>
                    <div class="item">推荐人：</div>
                </div>
            </Col>
            <Col span="10">
                <div class="wrapper">
                    <div class="title">资产状况</div>
                    <div class="item">收入：{{vipInfo.income}}</div>
                    <div class="item">住房情况：{{vipInfo.housing}}</div>
                    <div class="item">是否有车：{{vipInfo.vehicle}}</div>
                </div>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="8">
                <div class="wrapper">
                    <div class="title">基本信息</div>
                    <div class="item">真实姓名：{{vipInfo.name}}</div>
                    <div class="item">身份证号：{{vipInfo.idCare}}</div>
                    <div class="item">性别：{{vipInfo.gender == 1 ? "男":"女"}}</div>
                    <div class="item">年龄：{{vipInfo.age}}</div>
                    <div class="item">出生日期：{{vipInfo.birthday}}</div>
                    <div class="item">身高：{{vipInfo.height}}</div>
                    <div class="item">民族：{{vipInfo.nation}}</div>
                    <div class="item">体重：{{vipInfo.weight}}</div>
                    <div class="item">学历：{{vipInfo.education}}</div>
                </div>
            </Col>
            <Col span="8">
                <div class="wrapper">
                    <div class="title">其他信息</div>
                    <div class="item">职位：{{vipInfo.position}}</div>
                    <div class="item">籍贯：{{nativePlace}}</div>
                    <div class="item">现住地址：{{currentAddress}}</div>
                    <div class="item">行业：{{vipInfo.industry}}</div>
                    <div class="item">是否结婚：{{isMarry}}</div>
                    <div class="item">是否有小孩：{{vipInfo.isChild ? "没有" :"有"}}</div>
                </div>
            </Col>
            <Col span="8">
                <div class="wrapper">
                    <div class="title">择偶条就</div>
                    <div class="item">年龄：{{vipInfo.partnerAge}}</div>
                    <div class="item">身高：{{vipInfo.partnerHeight}}</div>
                    <div class="item">学历：{{vipInfo.partnerEducation}}</div>
                    <div class="item">民族：{{vipInfo.partnerNation}}</div>
                    <div class="item">是否结婚：{{partnerIsMarry}}</div>
                    <div class="item">其他择偶标准：{{vipInfo.otherStandards}}</div>
                </div>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="24">
                <div class="wrapper">
                    <div class="title">自我介绍</div>
                    <div class="item">爱情宣言：{{vipInfo.declaration}}</div>
                    <div class="item">兴趣爱好：{{vipInfo.hobby}}</div>
                    <div class="item">选择标签：{{vipInfo.otherStandardsId}}</div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import { apiVipInfo } from '@/api/vip.js'
export default {
    components: {},
    data() {
        return {
            vipInfo: {}
        }
    },
    props: {
        id: ''
    },
    computed: {
        grade() {
            let { grade } = this.vipInfo
            if (grade == 1) {
                return '普通会员'
            }
            if (grade == 2) {
                return '银卡会员'
            }
            if (grade == 3) {
                return '金卡会员'
            }
            if (grade == 4) {
                return '砖石会员'
            }
            if (grade == 5) {
                return '黑卡会员'
            }
            return ''
        },
        isMarry() {
            let { isMarry } = this.vipInfo
            if (isMarry == 1) {
                return '未婚'
            }
            if (isMarry == 2) {
                return '离异'
            }
            if (isMarry == 3) {
                return '丧偶'
            }
            return ''
        },
        partnerIsMarry() {
            let { partnerIsMarry } = this.vipInfo
            if (partnerIsMarry == 1) {
                return '未婚'
            }
            if (partnerIsMarry == 2) {
                return '离异'
            }
            if (partnerIsMarry == 3) {
                return '丧偶'
            }
            return ''
        },
        nativePlace() {
            if (!this.vipInfo.nativePlace) return ''
            let nativePlace = JSON.parse(this.vipInfo.nativePlace)
            return `${nativePlace.province}${nativePlace.city}${nativePlace.town}`
        },
        currentAddress() {
            if (!this.vipInfo.currentAddress) return ''
            let currentAddress = JSON.parse(this.vipInfo.currentAddress)
            return `${currentAddress.province}${currentAddress.city}${currentAddress.town}`
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            if (!this.id) return
            apiVipInfo({ id: this.id }).then(res => {
                this.vipInfo = res.data.data
            })
        }
    }
}
</script>
<style lang='scss'>
.img-warp {
    width: 180px;
    overflow: hidden;
    .image {
        width: 100%;
    }
}
.wrapper {
    .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 40px;
    }
    .item {
        font-size: 14px;
        line-height: 30px;
    }
}
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
