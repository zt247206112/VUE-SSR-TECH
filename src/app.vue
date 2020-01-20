<template>
  <div id="text">{{text}}</div>
</template>

<script>
export default {
    data () {
        return {
            text: 'abc'
        }
    }
}
</script>

<style scoped>
#text {
    color: red;
}
</style>