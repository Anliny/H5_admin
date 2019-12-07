<!--  -->
<template>
    <div class="main">
        <Row :gutter="10">
            <Col span="4">
                <div class="img-warp">
                    <img class="image" :src="matchmakerInfo.userAvatar">
                </div>
            </Col>
            <Col span="10">
                <div class="wrapper">
                    <div class="title">
                        {{matchmakerInfo.name}}
                        <Tag v-if="matchmakerInfo.state == 1" color="primary">审核中</Tag>
                        <Tag v-if="matchmakerInfo.state == 2" color="success">通过</Tag>
                        <Tag v-if="matchmakerInfo.state == 3" color="error">未通过</Tag>
                        <!-- <Tag color="gold">钱包</Tag>
                        <Tag color="cyan">服务人数</Tag>-->
                    </div>
                    <div
                        class="item"
                    >{{matchmakerInfo.age}} | {{matchmakerInfo.gender == 1 ? "男":"女"}} | {{matchmakerInfo.workingLife}}</div>
                    <div class="item">手机号码：{{matchmakerInfo.phone}}</div>
                    <div class="item">微信号码：{{matchmakerInfo.wechatNumber}}</div>
                    <div class="item">籍贯：{{nativePlace}}</div>
                    <div class="item">服务地区：{{workingAddress}}</div>
                    <div class="item"></div>
                </div>
            </Col>
            <Col span="10">
                <div class="wrapper">
                    <div class="title">其他</div>

                    <div class="item">
                        <Tag color="gold">钱包</Tag>
                        <Tag color="cyan">服务人数</Tag>
                    </div>
                </div>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="8">
                <div class="wrapper">
                    <div class="title">擅长领域</div>
                    <div class="item">{{matchmakerInfo.field}}</div>
                </div>
            </Col>
            <Col span="8">
                <div class="wrapper">
                    <div class="title">情感箴言</div>
                    <div class="item">{{matchmakerInfo.motto}}</div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import { apiMatchmakerInfo } from '@/api/matchmaker.js'
export default {
    components: {},
    data() {
        return {
            matchmakerInfo: {}
        }
    },
    props: {
        id: ''
    },
    computed: {
        nativePlace() {
            if (!this.matchmakerInfo.nativePlace) return ''
            let nativePlace = JSON.parse(this.matchmakerInfo.nativePlace)
            return `${nativePlace.province}${nativePlace.city}${nativePlace.town}`
        },
        currentAddress() {
            if (!this.matchmakerInfo.currentAddress) return ''
            let currentAddress = JSON.parse(this.matchmakerInfo.currentAddress)
            return `${currentAddress.province}${currentAddress.city}${currentAddress.town}`
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            if (!this.id) return
            apiMatchmakerInfo({ id: this.id }).then(res => {
                this.matchmakerInfo = res.data.data
            })
        }
    }
}
</script>
<style lang='scss'>
@import '../page.scss';
</style>
