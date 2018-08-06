<template>
    <div>
        欢迎登陆
        <router-link class="begin" :to="{ path: '/users'}">点击开始</router-link>
    </div>
</template>
<script>
export default{

}
</script>
<style lang="scss" scoped>
.begin{
    color: skyblue;
    font-size: 20px;
}
</style>

