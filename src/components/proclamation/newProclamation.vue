<template>
    <div class="newNotice">
        <div class="newNoticeM">
            <el-form ref="form" :model="form" :label-position="labelPosition" label-width="120px">
                <el-form-item label="公告标题">
                    <el-input v-model="form.title" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="公告类型">
                    <el-select v-model="form.noticeType" placeholder="请选择活动区域">
                        <el-option label="校周计划" value="1"></el-option>
                        <el-option label="校内新闻" value="2"></el-option>
                        <el-option label="校长推荐" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="clear"></div>
            <div class="wenbenyu">
            <h4><span>通知正文</span></h4>
            <quill-editor 
                v-model="content" 
                ref="myQuillEditor"
                :options="editorOption" 
                @blur="onEditorBlur($event)" 
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
            </div>
            <div class="uploadBox">
                <h4><span>上传附件</span></h4>
            <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </div>
            <div class="bts"><el-button type="primary">提交</el-button><el-button @click="backpage">取消</el-button></div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <div class="layerBox">
                <div class="shuttleBox">
                    <div class="leftBox">
                        <div class="topbar"><el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText"></el-input></div>
                        <!-- 
                            filter-node-methods筛选框内容 
                            default-expand-al默认打开全部的节点
                            node-key每个树节点用来作为唯一标识的属性，整棵树应该是唯一的

                        -->
                        <div class="shuttleBoxN">
                            <el-tree class="filter-tree" 
                            :data="data2" 
                            :props="defaultProps" 
                            default-expand-all
                            node-key="id" 
                            :filter-node-method="filterNode" 
                            show-checkbox 
                            ref="tree">
                            </el-tree>
                        </div>
                    </div>
                    <div class="bts">
                        <el-button type="primary" round icon="el-icon-arrow-left" @click="getCheckedNodes"></el-button>
                        <el-button type="primary" round icon="el-icon-arrow-right" @click="uchoPeo"></el-button>
                    </div>
                    <div class="rightBox">
                        <div class="topbar"><h3>已选内容</h3></div>
                        <div class="shuttleBoxN">

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
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            data2: [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                id: 9,
                label: '三级 1-1-1'
                }, {
                id: 10,
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2',
                children:[
                    {
                        id:611,
                        label:'三级2-2-1'
                    }
                ]
            }]
            }, {
            id: 3,
            label: '一级 3',
            children: [{
                    id: 7,
                    label: '二级 3-1'
                }]
            }],
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
        getCheckedNodes(){
            console.log(this.$refs.tree.getCheckedNodes());
        },
        uchoPeo(){
            
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      backpage(){
          this.$router.go(-1);//返回上一层
      }
    }
}
</script>

<style>

</style>
