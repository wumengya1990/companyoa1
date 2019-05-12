<template>
    <div class="inbox" ref="mianHeight">
        <div class="inboxM">
            <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick">
                <el-tab-pane label="全部" name="2">
                    <div class="tabContent">
                        <div class="topTool">
                            <el-input v-model="queryParam" style="width:300px; margin:0 5px 0 0;" size="small" placeholder="请输入要搜索的标题、标签、发布信息" clearable></el-input>
                            <el-date-picker
                                v-model="yearList"
                                align="right"
                                type="year"
                                size="small"
                                placeholder="选择年">
                            </el-date-picker>
                            <el-button size="small" @click="searchNotice" type="primary">搜索</el-button>
                        </div>
                        <div class="listMain" :style="{height:scHeight}">
                            <ul>
                                <li v-for="(n,index) in noticeList" :key="index" @click="intdetails(n.noticeUserId)">
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>通知标题</span></h3>
                                        <h4>{{n.title}}</h4>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>通知标签</span></h3>
                                        <dl><dt>类型：</dt>
                                        <dd>{{n.typeName}}</dd>
                                        </dl>
                                        <dl><dt>重要性：</dt>
                                        <dd>
                                            <span class="importance" style="color:#01a0d2;" v-if="n.noticeImportance==1">一般</span>
                                            <span class="importance" style="color:#ff9001;" v-else-if="n.noticeImportance==2">重要</span>
                                            <span class="importance" style="color:#F30;" v-else>紧急<i class="icon iconfont iconyujing"></i></span>
                                        </dd>
                                        </dl>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>发布信息</span></h3>
                                        <dl><dt>发布部门：</dt><dd>{{n.pubDeptName}}</dd></dl>
                                        <dl><dt>发布人：</dt><dd>{{n.pubUserName}}</dd></dl>
                                        <dl><dt>发布时间：</dt><dd>{{n.pubTime}}</dd></dl>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>状态</span></h3>
                                        <span class="readState" v-if="n.isRead">已读</span>
                                        <span class="readState unRead" v-else>未读</span>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>操作</span></h3>
                                        <div class="bts">
                                             <el-button size="small" type="danger" @click="dropNotice(n.noticeId)">删除</el-button>
                                        </div>
                                    </div>
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
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagingobg.pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="pagingobg.totalNum">
                            </el-pagination>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="未读" name="0">
                    <div class="tabContent">
                        <div class="topTool">
                            <el-input v-model="queryParam" style="width:300px; margin:0 5px 0 0;" size="small" placeholder="请输入内容" clearable></el-input>
                            <el-date-picker
                                v-model="yearList"
                                align="right"
                                type="year"
                                size="small"
                                placeholder="选择年">
                            </el-date-picker>
                            <el-button size="small" type="primary">搜索</el-button>
                        </div>
                        <div class="listMain" :style="{height:scHeight}">
                            <ul>
                                <li v-for="(n,index) in noticeList" :key="index" @click="intdetails">
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>通知标题</span></h3>
                                        <h4>{{n.title}}</h4>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>通知标签</span></h3>
                                        <dl><dt>类型：</dt>
                                        <dd>{{n.typeName}}</dd>
                                        </dl>
                                        <dl><dt>重要性：</dt>
                                        <dd>
                                            <span class="importance" style="color:#01a0d2;" v-if="n.noticeImportance==1">一般</span>
                                            <span class="importance" style="color:#ff9001;" v-else-if="n.noticeImportance==2">重要</span>
                                            <span class="importance" style="color:#F30;" v-else>紧急<i class="icon iconfont iconyujing"></i></span>
                                        </dd>
                                        </dl>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>发布信息</span></h3>
                                        <dl><dt>发布部门：</dt><dd>{{n.pubDeptName}}</dd></dl>
                                        <dl><dt>发布人：</dt><dd>{{n.pubUserName}}</dd></dl>
                                        <dl><dt>发布时间：</dt><dd>{{n.pubTime}}</dd></dl>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>状态</span></h3>
                                        <span class="readState" v-if="n.isRead">已读</span>
                                        <span class="readState unRead" v-else>未读</span>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>操作</span></h3>
                                        <div class="bts">
                                             <el-button size="small" type="danger" @click="dropNotice(n.noticeId)">删除</el-button>
                                        </div>
                                    </div>
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
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagingobg.pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="pagingobg.totalNum">
                            </el-pagination>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="已读" name="1">
                    <div class="tabContent">
                        <div class="topTool">
                            <el-input v-model="queryParam" style="width:300px; margin:0 5px 0 0;" size="small" placeholder="请输入内容" clearable></el-input>
                            <el-date-picker
                                v-model="yearList"
                                align="right"
                                type="year"
                                size="small"
                                placeholder="选择年">
                            </el-date-picker>
                            <el-button size="small" type="primary">搜索</el-button>
                        </div>
                        <div class="listMain" :style="{height:scHeight}">
                            <ul>
                                <li v-for="(n,index) in noticeList" :key="index" @click="intdetails">
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>通知标题</span></h3>
                                        <h4>{{n.title}}</h4>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>通知标签</span></h3>
                                        <dl><dt>类型：</dt>
                                        <dd>{{n.typeName}}</dd>
                                        </dl>
                                        <dl><dt>重要性：</dt>
                                        <dd>
                                            <span class="importance" style="color:#01a0d2;" v-if="n.noticeImportance==1">一般</span>
                                            <span class="importance" style="color:#ff9001;" v-else-if="n.noticeImportance==2">重要</span>
                                            <span class="importance" style="color:#F30;" v-else>紧急<i class="icon iconfont iconyujing"></i></span>
                                        </dd>
                                        </dl>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>发布信息</span></h3>
                                        <dl><dt>发布部门：</dt><dd>{{n.pubDeptName}}</dd></dl>
                                        <dl><dt>发布人：</dt><dd>{{n.pubUserName}}</dd></dl>
                                        <dl><dt>发布时间：</dt><dd>{{n.pubTime}}</dd></dl>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>状态</span></h3>
                                        <span class="readState" v-if="n.isRead">已读</span>
                                        <span class="readState unRead" v-else>未读</span>
                                    </div>
                                    <div class="listBox">
                                        <h3 v-if="index==0"><span>操作</span></h3>
                                        <div class="bts">
                                             <el-button size="small" type="danger" @click="dropNotice(n.noticeId)">删除</el-button>
                                        </div>
                                    </div>
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
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagingobg.pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="pagingobg.totalNum">
                            </el-pagination>
                        </div>

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'inbox',
    data() {
        return {
            activeName:'2',
            tabPosition:'left',
            queryParam:'',
            currentPage:1,
            scHeight:'',
            yearList:'',
            tabRead:'',
            noticeList:[
                {
                    noticeId:'1',
                    noticeUserId:'1',
                    title:'名称名称名称名称名称名称名称',
                    typeName:'1',
                    noticeImportance:'1',
                    pubDeptName:'1',
                    pubUserName:'1',
                    pubTime:'1',
                    isRead:true,
                },{
                    noticeId:'tz2',
                    noticeUserId:'1',
                    title:'名称名称名称名称名称名称名称',
                    typeName:'1',
                    noticeImportance:'1',
                    pubDeptName:'1',
                    pubUserName:'1',
                    pubTime:'1',
                    isRead:true,
                }
            ],
            unReadList:[],
            haveReadList:[],
            pagingobg:{
                totalNum:200,                     //总条数
                currentPage:1,
                pageSize:10,                    //默认加载十条
            }
        }
    },
    mounted() {
        this.setheight();
        this.Initialization();
        this.loadList();
    },
    methods:{
        
        handleSizeChange(val) {
            let me = this;
            // console.log(`每页 ${val} 条`);
            me.pagingobg.pageSize = val;
            me.loadList();
        
      },
      handleCurrentChange(val) {            //每页多少条展示
           let me = this;
            // console.log(`当前页: ${val}`);
            me.pagingobg.currentPage = val;
            me.loadList();
      },
      handleClick(tab,event){
          console.log(tab.name);
          let me = this;
          me.tabRead = tab.name
          me.loadList();
      },
      setheight:function(){                         //设置页面高度
          let me = this;
        //   let thisheight = this.$refs.mianHeight.style.offsetHeight;
          let thisheight= window.getComputedStyle(me.$refs.mianHeight).height;
          let scHeight = parseInt(thisheight)-150+"px";
          me.scHeight = scHeight;    
      },
      Initialization:function(){
          let me = this;
           let daten = new Date()
           let year = daten.getFullYear();
           me.yearList = year.toString();
           
      },
      loadList(){
          let me = this;
        //   let url = '/noticeList';
          let url = '/receive/notice/manage/query';
          let param = {page:me.pagingobg.currentPage, size:me.pagingobg.pageSize, queryParam:me.queryParam, isRead:me.tabRead, year:me.yearList};
          me.$http.post(url,param,res=>{
             console.log(res)
             me.noticeList = res.result.list;
             me.pagingobg.totalNum = res.result.total;  
         })
         
          
      },
      searchNotice(){
          this.loadList();
      },
      dropNotice(nid){
          let me = this;
          let url = '/receive/notice/manage/delete';
          let param = {noticeId:nid,noticeUserId:me.noticeUserId,year:me.yearList};
        me.$http.post(url,param,res=>{
            console.log(res)    

        })
      },
      intdetails(nuid){
          this.$router.push({
              name:'inboxdetails',
              params:{noticeUserId:"张三",year:'2019'}
          })
      }
    }
}
</script>

<style>

</style>
