<template>
    <div class="top">
        <router-link class="logo" to="/">市辖区智慧教育云平台</router-link>
        <nav>
            <router-link :to="{path:'/indexNotice/inbox'}">收到的通知</router-link>
            <router-link :to="{path:'/indexNotice/outbox'}">发通知</router-link>
        </nav>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
