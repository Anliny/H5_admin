<!--  -->
<template>
    <div class="main">努力研发中···</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    computed: {},
    methods: {}
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
