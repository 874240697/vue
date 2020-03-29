<template>
  <div id="app">
<!--  <add-blog></add-blog>-->
<!--    <show-blog></show-blog>-->
    <blog-header></blog-header>
    <router-view></router-view>

  </div>
</template>

<script>
  import addBlog from './components/addBlog.vue'
  import showBlog from './components/showBlog.vue'
  import BlogHeader from './components/BlogHeader.vue'
  import singleBlog from './components/singleBlog.vue'
export default {
  name: 'App',
  components:{
    addBlog,
    showBlog,
    BlogHeader,
    singleBlog
  }
}
</script>

<style>

</style>
