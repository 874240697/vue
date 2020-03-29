<template>
    <nav>
      <ul>
        <li>
          <router-link to="/showBlog">博客主页</router-link>
          <router-link to="/addBlog">写博客</router-link>
        </li>
      </ul>
    </nav>
</template>

<script>
    export default {
        name: "BlogHeader"
    }
</script>

<style scoped>
*{
  font-size: 24px;
}
  ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
  }
  li{
    display: inline-block;
    margin: 0 10px;
  }
  a{
    text-decoration: none;
    color: white;
    padding: 12px;
    border-radius: 5px;
  }
  nav{
    background: #106dbb;
    padding: 30px 0;
    margin-bottom: 30px;
  }
  .router-link-active{
  background: rgba(255,255,255,0.6);
    color: #444;
  }
</style>
