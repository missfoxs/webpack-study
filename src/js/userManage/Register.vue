<template>
    <div>
        这是注册页面
        <div class="touxiang"><img src="../../images/touxiang.jpg" alt="touxiang"></div>


        <div v-for="item in tableData" :key="item">
            <div v-if="item.id == 1"></div>
        </div>
    </div>
</template>
<script>
</script>