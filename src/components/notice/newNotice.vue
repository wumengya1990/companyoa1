<template>
    <div class="newNotice">
        <div class="newNoticeM">
            <el-form ref="form" :model="form" :label-position="labelPosition" label-width="120px">
                <el-form-item label="通知标题">
                    <el-input v-model="form.title" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="通知类型">
                    <el-select v-model="form.noticeType" placeholder="请选择活动区域">
                        <el-option label="校文件" value="1"></el-option>
                        <el-option label="局文件" value="2"></el-option>
                        <el-option label="内部文件" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件重要性">
                    <el-select v-model="form.importance" placeholder="请选择活动区域">
                        <el-option label="一般" value="1"></el-option>
                        <el-option label="重要" value="2"></el-option>
                        <el-option label="紧急" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收人员">
                   <div class="peoList">
                       <a class="choPeo" @click="dialogVisible = true"><i class="icon iconfont iconrenyuanzengjia"></i></a>
                   </div>
                </el-form-item>
                <el-form-item label="通知正文">
                </el-form-item>
            </el-form>
            <div class="clear"></div>
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor"
                :options="editorOption" 
                @blur="onEditorBlur($event)" 
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
            <div class="bts"><el-button type="primary">提交</el-button><el-button>取消</el-button></div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
            <div class="layerBox">
                <div class="shuttleBox">
                    
                    <div class="leftBox">
                        <div class="topbar">
                            <el-cascader :options="mechanismList" change-on-select style="width:100%;" size="small"></el-cascader>
                        </div>
                        
                        <div class="shuttleBoxN">
                            <div class="searchBox"><el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText"></el-input></div>
                            <div class="peoList">
                            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
                            <div  class="peoListM">
                            <el-checkbox-group v-model="checkedPeo" @change="handleCheckedPeoChange">
                                <el-checkbox v-for="peo in peoList" :label="peo.uid" :key="peo.uid"><span style="display:inline-block; width:60px;">{{peo.peoName}}</span>({{peo.schoolName}}-{{peo.gradeName}}-{{peo.groupName}})</el-checkbox>
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
                            <div class="searchBox"><el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText"></el-input></div>
                            <div class="peoList">
                                <div class="peoListM">
                                    <el-checkbox-group v-model="hcheckedPeo" @change="handleCheckedPeoChangeBack">
                                        <el-checkbox v-for="hpeo in havepeoList" :label="hpeo.uid" :key="hpeo.uid"><span style="display:inline-block; width:60px;">{{hpeo.peoName}}</span>({{hpeo.schoolName}}-{{hpeo.gradeName}}-{{hpeo.groupName}})</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
            content:'',
            editorOption:{},
            labelPosition:'right',
            dialogVisible:false,
            form:{
                title:'',
                noticeType:'',
                importance:'',
                receiver:''
            },
            filterText: '',
            mechanismList:[             //机构列表
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
            checkedPeo: [],
            hcheckedPeo:[],
            peoList:{},
            huancunPeoList:[],
            havepeoList:[],
            anniuLX:'',
            anniuRX:'',
            isIndeterminate: false,

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
        this.setData();
    },
    methods:{
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
        choPeo(){
            let that = this;
            let c = that.havepeoList.concat(that.huancunPeoList);
            that.havepeoList = c;
            that.anniuRX = '';
            for(var i=0; i < that.havepeoList.length; i++){
                var hzhid = that.havepeoList[i].zhid;
                console.log(hzhid+"已选");
                that.dropLeft(hzhid);
                
                // for(var n=0 ; i<that.peoList.length;n++){
                //     // debugger
                //     let yuid=that.peoList[n].uid;
                //     let yqjgid = that.peoList[n].qjgid;
                //     let yxjgid = that.peoList[n].xjgid;
                //     let ynxjgid = that.peoList[n].nxjgid;
                //     console.log(yuid+"未选");
                //     if( huid==yuid && hqjgid==yqjgid && hxjgid==yxjgid && hnxjgid==ynxjgid){
                //         that.peoList.splice(n,1);
                //     }
                // }
                
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
            
        },
        isNull(obg){
            
        },
        
        handleCheckedPeoChange(value) {
            let me = this;
            console.log(value);
            me.huancunPeoList=[];
            let checkedCount = value.length;
            for(var i=0,len=value.length;i<len;i++){
                let csid = value[i];
                for(var j = 0, lenn=me.peoList.length;j<lenn;j++){
                    if(csid==me.peoList[j].uid){
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
            // let checkedCount = value.length;
            console.log(checkedCount);
            for(var i=0,len=value.length;i<len;i++){
                let csid = value[i];
                
                for(var j = 0, lenn=me.havepeoList.length;j<lenn;j++){
                    if(csid==me.havepeoList[j].uid){
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
             console.log(me.huancunPeoList+"哈哈");
        }

    }
}
</script>

<style>

</style>
