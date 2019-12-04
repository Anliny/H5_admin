<!--  -->
<template>
    <div class="content">
        <div class="search">
            <Form :model="queryData" :label-width="100">
                <Row :gutter="16">
                    <Col span="6" class="formItem">
                        <FormItem label="姓名">
                            <Input clearable v-model="queryData.name" placeholder="请输入姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6" class="formItem">
                        <FormItem label="电话号码">
                            <Input clearable v-model="queryData.phone" placeholder="请输入电话号码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6" class="formItem">
                        <Button type="primary">搜索</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="main">
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
import { apiVipList } from '@/api/vip.js'
export default {
  components: {},
  data () {
    return {
      queryData: {
        phone: '',
        name: ''
      },
      columns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'age'
        },
        {
          title: '会员号',
          key: 'age'
        },
        {
          title: '电话',
          key: 'address'
        },
        {
          title: '推荐人',
          key: 'address'
        },
        {
          title: '我的推荐',
          key: 'address'
        },
        {
          title: '角色',
          key: 'address'
        },
        {
          title: '操作',
          key: 'address'
        }
      ],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  created () {
    this.getVipList()
  },
  methods: {
    getVipList () {
      apiVipList({}).then(res => {
        console.log(res)
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
</style>
