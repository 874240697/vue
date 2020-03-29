<template>
  <div id="show-blog">
    <h6>博客总览</h6>
    <input v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlogs" class="single-blog">
      <router-link v-bind:to="'/singleBlog/'+blog.id">
        <h3 v-rainbow>{{blog.title | to-uppercase}}</h3>
      </router-link>

      <article v-limit>{{blog.content}}</article>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'show-blog',
    data(){
      return{
        blogs:[],
        search :'',
      }
    },
    created() {
      this.$http.get('https://blog-fd629.firebaseio.com/posts.json')
        .then(function (data) {
            // this.blogs = data.body.slice(0,10);
          return data.json();
        })
        .then(function (data) {
          var blogsArray = [];
          for (let key in data){
            data[key].id =key;
            blogsArray.push(data[key]);
          }
          this.blogs = blogsArray;
        })
    },
    computed:{
      //实现查找功能
      filteredBlogs:function () { //获取的信息
        return this.blogs.filter((val)=>{
          return val.title.match(this.search);
        })
      }
    },
    //局部定义指令
    // directives:{
    //   'rainbow':{   //这里指令名称
    //     bind(el,binding,vnode){
    //       el.style.color = '#' + Math.random().toString(16).slice(2,8);
    //     }
    //   }
    // }

    //局部过滤器，只在当前组件可用
    // filters:{
    //   'to-uppercase':function (val) {
    //     return val.toUpperCase();
    //   }
    // }
  }
</script>

<style scoped>
  *{
    font-size: 16px;
  }
#show-blog{
  max-width: 800px;
  margin: 0 auto;
}
  .single-blog{
    padding: 20px;
    margin: 20px  0;
    box-sizing: border-box;
    background: #eee;
    border: 1px dotted #aaa;
  }
#show-blog a{
  color: #444;
  text-decoration: none;
}
  input[type='text']{
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
</style>

