<template>
    <div class="top">
        <router-link class="logo" to="/">市辖区智慧教育云平台</router-link>
        <nav>
            <router-link :to="{path:'/indexSystem/authority'}">权限设置</router-link>
            <router-link :to="{path:'/indexSystem/messageType'}">通知类型</router-link>
            <router-link :to="{path:'/indexSystem/custom'}">自定义数组</router-link>
        </nav>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
