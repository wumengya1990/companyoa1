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
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action=""
                        :on-change="onUploadChange"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="form.files"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadSectionFile">上传到服务器</el-button> -->
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="clear"></div>
            
            <div class="bts"><el-button type="primary" @click="xinjian">提交</el-button><el-button @click="backPage">取消</el-button></div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
            <div class="layerBox">
                <div class="shuttleBox">
                    
                    <div class="leftBox">
                        <div class="topbar">
                            <el-cascader :options="mechanismList" change-on-select style="width:100%;" @change="lianjiCho" size="small"></el-cascader>
                        </div>
                        
                        <div class="shuttleBoxN">
                            <div class="searchBox"><el-input placeholder="输入关键字进行过滤" size="small" @change="leftSearch" v-model="filterTextL"></el-input></div>
                            <div class="peoList">
                            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
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
const peoOptions = [
        {peoName:'张洋', uid:'u01', qjgid:'qjg01', xjgid:'xjg01',nxjgid:'njg01', schoolName:'徐州市第一中学',gradeName:'高一年级', groupName:'语文组'},     //uid:用户ID； qjgid:校ID；xjgid：学校年级ID；nxjgid：学科组ID
        {peoName:'王帅', uid:'u02', qjgid:'qjg01',xjgid:'xjg01',nxjgid:'njg01', schoolName:'徐州市第一中学',gradeName:'高一年级', groupName:'语文组'},
        {peoName:'赵承罡', uid:'u03', qjgid:'qjg01',xjgid:'xjg01',nxjgid:'njg01', schoolName:'徐州市第一中学',gradeName:'高一年级', groupName:'语文组'},
        {peoName:'孙政', uid:'u04', qjgid:'qjg01',xjgid:'xjg01',nxjgid:'njg01', schoolName:'徐州市第一中学',gradeName:'高一年级', groupName:'语文组'}
        ];
export default {
    name:'newNotice',
    components:{
        quillEditor
    },
    data() {
        return {
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
        backPage(){
            this.$router.back(-1)
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        onEditorBlur(quill){
            console.log(quill)
        },
        onEditorFocus(quill){
            console.log(quill)
        },
        onEditorChange(quill){
            console.log(quill)
            console.log(this.content);
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
        // openLayer(){
        //     let me = this;
        //     me.dialogVisible = true;
        //     let url='/base/query/users';
        //     let param = {unitId:'1',unitType:'School'};
        //     me.$http.post(url,JSON.stringify(param),res=>{
        //         console.log(res);
        //         me.peoList = res.result;
        //         console.log(me.peoList);
        //     })

        // },
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
                console.log(hzhid+"已选");
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
            this.form.noticeUsers = this.havepeoList;
            this.dialogVisible = false;
        },
        dropPeo(suoyin){
            let that = this;
            that.showPeoList.splice(suoyin,1);
        },
        ////////筛选框结束

        //上传功能开始
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleAvatarSuccess(res, file){
            console.log(res);
            console.log(file);
        },
        onUploadChange(file,fileList){
            console.log(fileList);
            this.filesList = fileList;
        },

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
            bean.title = '';
            bean.typeId = '';
            bean.noticeImportance = '';
            bean.noticeUsers = [];
            bean.content = '';

            forms.append("noticeBean",JSON.stringify(bean));
            for(let i in me.filesList) {
                forms.append("files",me.filesList[i]);
            }
           
           
            
            // let param=JSON.stringify(params);
            console.log(forms);
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
</style>
