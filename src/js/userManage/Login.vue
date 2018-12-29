<template>
    <div>
        这是登录页面
        <div class="huzi"></div>
    </div>
</template>
<script>
</script>
<!--scoped会将此样式只作用于本vue文件之内-->
<!--原理：为最上面的div提供一个额外的class-->
<style lang="scss" scoped>
    body{
        div{
            color: red;
        }
    }
</style>