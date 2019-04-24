<template>
    <div class="indexProclamation posA posCenter">
        <noticetop></noticetop>
        <div class="content">
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
import top from './top'
export default {
    name:'indexProclamation',
    components:{
        'noticetop':top
    },
    data() {
        return {
            
        }
    },
    methods:{
        
    }
}
</script>

<style>

</style>
