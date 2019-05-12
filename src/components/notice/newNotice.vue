<template>
    <div class="newNotice">
        <div class="newNoticeM">
            <el-form ref="form" :model="form" :label-position="labelPosition" label-width="120px">
                <el-form-item label="通知标题">
                    <el-input v-model="form.title" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="通知类型">
                    <el-select v-model="form.typeId" placeholder="请选择活动区域">
                        <el-option label="校文件" value="1"></el-option>
                        <el-option label="局文件" value="2"></el-option>
                        <el-option label="内部文件" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件重要性">
                    <el-select v-model="form.noticeImportance" placeholder="请选择活动区域">
                        <el-option label="一般" value="1"></el-option>
                        <el-option label="重要" value="2"></el-option>
                        <el-option label="紧急" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收人员">
                   <div class="peoList">
                       <span v-for="(m,index) in form.noticeUsers" :key="m.uid">
                           {{m.userName}}
                           <em @click="dropPeo(index)">关闭</em>
                        </span>
                       <a class="choPeo" @click="openLayer"><i class="icon iconfont iconrenyuanzengjia"></i></a>
                   </div>
                </el-form-item>
                <el-form-item label="通知正文">
                    <quill-editor 
                        v-model="form.content"
                        class="textearMesBox"
                        ref="myQuillEditor"
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" 
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="上传文件">
                    <div class="fileBox">
                        <input type="file" name="filr" id="file" multiple @change="fileCho($event)">
                        <ul>
                            <li v-for="(fl,index) in filesListsss" v-bind:key="index">
                                <a>{{fl.name}}</a>
                                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUpImg(index)"></el-button></li>
                        </ul>
                    </div>
                </el-form-item>
            </el-form>
            <div class="clear"></div>
            
            <div class="bts"><el-button type="primary" @click="xinjian">提交</el-button><el-button @click="backPage">取消</el-button></div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        
            <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="所有人员" name="allPeople">
                        <div class="layerBox">
                            <div class="shuttleBox">
                                        <div class="leftBox">
                                            <div class="topbar">
                                                <el-cascader :options="mechanismList" change-on-select style="width:100%;" @change="lianjiCho" size="small"></el-cascader>
                                            </div>
                                            
                                            <div class="shuttleBoxN">
                                                <div class="searchBox"><el-input placeholder="输入关键字进行过滤" size="small" @change="leftSearch" v-model="filterTextL"></el-input></div>
                                                <div class="peoList">
                                                
                                                <div  class="peoListM">
                                                <el-checkbox-group v-model="checkedPeo" @change="handleCheckedPeoChange">
                                                    <el-checkbox v-for="peo in peoList" :label="peo.userId" :key="peo.userId"><span style="display:inline-block; width:60px;">{{peo.userName}}</span>({{peo.unitName}}-{{peo.deptName}})</el-checkbox>
                                                </el-checkbox-group>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bts">
                                            <el-button :type="anniuLX" round icon="el-icon-arrow-left" @click="uchoPeo"></el-button>
                                            <el-button :type="anniuRX" round icon="el-icon-arrow-right" @click="choPeo"></el-button>
                                        </div>
                                        <div class="rightBox">
                                            <div class="topbar"><h3>已选内容</h3></div>
                                            <div class="shuttleBoxN">
                                                <div class="searchBox"><el-input placeholder="输入关键字进行过滤" size="small" v-model="filterTextR"></el-input></div>
                                                <div class="peoList">
                                                    <div class="peoListM">
                                                        <el-checkbox-group v-model="hcheckedPeo" @change="handleCheckedPeoChangeBack">
                                                            <el-checkbox v-for="hpeo in havepeoList" :label="hpeo.userId" :key="hpeo.userId"><span style="display:inline-block; width:60px;">{{hpeo.userName}}</span>({{hpeo.unitName}}-{{hpeo.deptName}})</el-checkbox>
                                                        </el-checkbox-group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="自定义组" name="customize">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-tab-pane>
                    
                </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="tijiao">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>

import {quillEditor} from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
    name:'newNotice',
    components:{
        quillEditor
    },
    data() {
        return {
             checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            activeName:'allPeople',
            content:'cacacaca',
            editorOption:{},
            labelPosition:'right',
            dialogVisible:false,
            form:{
                title:'',
                typeId:'',
                noticeImportance:'',
                noticeUsers:[],
                content:''
            },
            filesList: [],
            filesListss:[],
            filesListsss:[],
            mechanismList:[                     //机构列表
                {
                    label:'徐州市第二中学',value:'qjg01',jgid:'qjg01',
                    children:[
                        {
                            label:'高一年级组',value:'xjg01',jgid:'xjg01',
                            children:[
                                {label:'语文组',value:'njg01',jgid:'njg01'},
                                {label:'数学组',value:'njg02',jgid:'njg02'},
                                {label:'英语组',value:'njg03',jgid:'njg02'}
                            ]
                        }
                        
                    ]
                },
                {
                    label:'徐州市第一中学',value:'qjg01',jgid:'qjg01',
                    children:[
                        {
                            label:'高二年级组',value:'xjg01',jgid:'xjg01',
                            children:[
                                {label:'语文组',value:'njg01',jgid:'njg01'},
                                {label:'数学组',value:'njg02',jgid:'njg02'},
                                {label:'英语组',value:'njg03',jgid:'njg02'}
                            ]
                        }
                        
                    ]
                }
            ],
            checkAll: false,
            lianjizancun:'',                //联机框选择的内容
            filterTextL: '',                //左侧搜索框搜索内容
            filterTextR: '',                //右侧搜索框搜索内容
            checkedPeo: [],                 //全部人员点击多选框返回内容
            hcheckedPeo:[],                 //已选人员点击多选框返回内容
            peoList:[],                     //弹层左侧人员列表
            huancunPeoList:[],              //暂存的人员
            havepeoList:[],                 //弹层右侧已选人员列表        
            anniuLX:'',                     //向左按钮类型
            anniuRX:'',                     //向右按钮类型
            showPeoList:[],                 //在接收人员框内的人员列表
            isIndeterminate: false,         //多选框组内确定样式配置
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted() {
        // this.setData();
    },
    methods:{
        handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        backPage(){
            this.$router.back(-1)
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        onEditorBlur(quill){
            // console.log(quill)
        },
        onEditorFocus(quill){
            // console.log(quill)
        },
        onEditorChange(quill){
            // console.log(quill)
            // console.log(this.content);
        },
        onSubmit(){

        },
        handleClose(done){
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        setData(){
            // console.log(peoOptions);
            for(var i=0, len=peoOptions.length;i<len; i++){
                peoOptions[i].zhid = peoOptions[i].uid+peoOptions[i].qjgid+peoOptions[i].xjgid+peoOptions[i].nxjgid;
            }
            this.peoList = peoOptions;
            // console.log(this.peoList);

        },

        ////////筛选框开始
        
        openLayer() {
        let me = this;
        me.dialogVisible = true;
        let url = "/base/query/users";
        let param = { unitId:'1',unitType:'School'};
        me.$ajax
            .post(url, param)
            .then(out => {
            me.hw_result(out.data, true, me, () => {
                console.log(out);
                me.peoList = out.data.result;
            });
            })
            .catch(error => {});
        },
        lianjiCho(value){                               //左侧联机框筛选内容
            let that = this;
            that.lianjizancun = value[value.length-1];
            console.log(that.lianjizancun);
            that.filterTextL='';
            that.loadAllPeopleLeft();
        },
        leftSearch(value){
            let that = this;
            console.log(that.common.isNullorNull(value))
        },
        loadAllPeopleLeft(){

        },
        choPeo(){
            let that = this;
            let c = that.havepeoList.concat(that.huancunPeoList);
            that.havepeoList = c;
            that.anniuRX = '';
            that.checkedPeo=[];
            that.hcheckedPeo=[];
            for(var i=0; i < that.havepeoList.length; i++){
                var hzhid = that.havepeoList[i].zhid;
                // console.log(hzhid+"已选");
                that.dropLeft(hzhid);
            }
        },
        dropLeft(cid){                  //删除左侧
            let me = this;
            for(var n=0; n<me.peoList.length; n++){
                if(cid == me.peoList[n].zhid){
                    me.peoList.splice(n,1);
                }
            }
        },
        uchoPeo(){
            let me = this;
            let xinh = new Array();
            if(me.common.isNullorNull(me.lianjizancun) && me.common.isNullorNull(me.lianjizancun)){
                xinh = me.peoList.concat(me.huancunPeoList);
            }
            me.peoList = xinh;
            me.anniuLX = '';
            console.log(me.checkedPeo);
            me.checkedPeo=[];
            me.hcheckedPeo=[];
            for(var i=0; i < me.peoList.length; i++){
                var hzhid = me.peoList[i].zhid;
                console.log(hzhid+"已选");
                me.dropRight(hzhid);
            }
            
            
        },
        dropRight(cid){                  //删除右侧
            let me = this;
            for(var n=0; n<me.havepeoList.length; n++){
                if(cid == me.havepeoList[n].zhid){
                    me.havepeoList.splice(n,1);
                }
            }
        },
        handleCheckedPeoChange(value) {
            let me = this;
            console.log(value);
            me.huancunPeoList=[];
            let checkedCount = value.length;
            for(var i=0,len=value.length;i<len;i++){
                let csid = value[i];
                for(var j = 0, lenn=me.peoList.length;j<lenn;j++){
                    if(csid==me.peoList[j].userId){
                        me.huancunPeoList.push(me.peoList[j]);
                    }
                }
            }
            let sd = new Set(me.huancunPeoList)
            me.huancunPeoList=[];
            me.huancunPeoList.push(...sd);
           

            if(me.huancunPeoList.length!=0){
                me.anniuRX = 'primary';
            }else{
                me.anniuRX = '';
            }
             console.log(me.huancunPeoList);
        },

        handleCheckedPeoChangeBack(value) {
           
            let me = this;
            
            me.huancunPeoList=[];
            let checkedCount = value.length;
            console.log(checkedCount);
            for(var i=0,len=value.length;i<len;i++){
                let csid = value[i];
                
                for(var j = 0, lenn=me.havepeoList.length;j<lenn;j++){
                    if(csid==me.havepeoList[j].userId){
                        me.huancunPeoList.push(me.havepeoList[j]);
                    }
                }
            }
            let sd = new Set(me.huancunPeoList)
            me.huancunPeoList=[];
            me.huancunPeoList.push(...sd);
           

            if(me.huancunPeoList.length!=0){
                me.anniuLX = 'primary';
            }else{
                me.anniuLX = '';
            }
             console.log(me.huancunPeoList);
        },
        tijiao(){
            let people = {}
            for(let i in this.havepeoList){
                people.userId = this.havepeoList[i].userId;
                people.userName = this.havepeoList[i].userName;
                people.userDeptId = this.havepeoList[i].deptId;
                people.userDeptName = this.havepeoList[i].deptName;
                people.deptOrgId = this.havepeoList[i].unitId;
                people.deptOrgName = this.havepeoList[i].unitName;
                this.form.noticeUsers.push(people);
            }
            console.log(this.form.noticeUsers);
            this.dialogVisible = false;
        },
        dropPeo(suoyin){
            let that = this;
            that.showPeoList.splice(suoyin,1);
        },
        ////////筛选框结束

        // 上传内容
        fileCho(event){
            this.filesListss = event.target.files;
            for(let i=0; i<this.filesListss.length; i++){
                this.filesListsss.push(this.filesListss[i]);
            }
            console.log(this.filesListsss);

        },
        // 上传图片

        // 取消上传的图片
        removeUpImg(suoyin){
            let me = this;
            console.log(suoyin);
            me.filesListsss.splice(suoyin,1);
        },
        // 取消上传的图片
        //最后上传按钮
        xinjian(){                  
            let me = this;
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            let url = '/notice/manage/add';
            // let ccc = me.bean("noticeBean",me.form);
            let forms = new FormData();
            let bean = {};
            bean.title = me.form.title;
            bean.typeId = me.form.typeId;
            bean.noticeImportance = me.form.noticeImportance;
            bean.noticeUsers = me.form.noticeUsers;
            bean.content = me.form.content;

            forms.append("noticeBean",JSON.stringify(bean));
            
            for(let i in me.filesListsss){
                let file = me.filesListsss[i];
                data.append("files",file);
            }
            me.$ajax
            .post(url,forms,config)
            .then(out => {
            me.hw_result(out.data, true, me, () => {
                console.log(out);
                // me.peoList = out.data.result;
                });
            })
            .catch(error => {});

        }
        

    }
}
</script>

<style>
.textearMesBox{ height: 200px; margin: 0 0 60px; }
.textearMesBox .ql-formats span{line-height: normal;}
</style>
