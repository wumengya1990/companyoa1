<template>
    <div class="see" ref="mianHeight">
        <div class="seeM">
            <div class="tabContent">
                        <div class="topTool">
                            <em>学期：</em>
                            <el-input style="width:200px;" v-model="searchBox" size="small" placeholder="请输入内容"></el-input>
                            <em>公告类型：</em>
                            <el-select v-model="ggtype" size="small" placeholder="请选择周次">
                                <el-option
                                v-for="item in ggTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button size="small" type="primary">搜索</el-button>
                        </div>
                        <div class="listMain" :style="{height:scHeight}">
                            <ul>
                                <li v-for="(n,index) in noticeList" :key="index" @click="intdetails">
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>标题</span></h3>
                                        <h4>{{n.title}}</h4>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>类型</span></h3>
                                        <span class="singleMes">{{n.typeName}}</span>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>发布信息</span></h3>
                                        <!-- <dl><dt>发布部门：</dt><dd>校办公室</dd></dl> -->
                                        <dl><dt>发布人：</dt><dd>{{n.pubUserName}}</dd></dl>
                                        <dl><dt>发布时间：</dt><dd>{{n.pubTime}}</dd></dl>
                                    </div>
                                    
                                    <!-- <div class="listBox">
                                        <h3 v-if="index==0"><span>操作</span></h3>
                                        <div class="bts">
                                             <el-button size="small" @click.stop="dropMes(index)" type="danger">删除</el-button>
                                        </div>
                                    </div> -->
                                    <div class="clear"></div>
                                </li>
                            </ul>

                            
                        </div>
                        <div class="paging">
                            <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
                            </el-pagination>
                        </div>

                    </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'receive',
    data() {
        return {
            activeName:'first',
            tabPosition:'left',
            searchBox:'',
            ggtype:'',
            currentPage:1,
            scHeight:'',
            optionsSemester:[
                {value:'s1', label:'2018~2019第一学期'},
                {value:'s2', label:'2018~2019第二学期'},
                {value:'s3', label:'2019~2020第一学期'},
                {value:'s4', label:'2019~2020第二学期'}
            ],
            ggTypeList:[
                {value:'t1', label:'校周计划'},
                {value:'t2', label:'校内新闻'},
                {value:'t3', label:'校长推荐'},
                {value:'t4', label:'其他信息'}
            ],
            noticeList:[]
        }
    },
    mounted() {
        this.setheight();
        this.loadgonggao();
    },
    methods:{
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      loadgonggao(){
          let me = this;
          let url = '/gonggaoLIst';
          let param = ''
          me.$http.post(url,param,res=>{
            //   console.log(res);
              me.noticeList = res.data.noticeList
              console.log(me.noticeList)
          })
      },
      setheight:function(){
          let me = this;
        //   let thisheight = this.$refs.mianHeight.style.offsetHeight;
          let thisheight= window.getComputedStyle(me.$refs.mianHeight).height;
          let scHeight = parseInt(thisheight)-150+"px";
          me.scHeight = scHeight;    
      },
      intdetails(){
          this.$router.push({
              name:'receivedetails'
          })
      }
    }
}
</script>

<style>

</style>
