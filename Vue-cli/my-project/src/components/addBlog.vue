<template>
  <div id="add-blog">
    <h6 v-if="!submmited">添加博客</h6>
    <form v-if="!submmited">
      <label>博客标题</label>
      <input v-model="blog.title" type="text" required/>
      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories">
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories">
      </div>
      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="author in authors">{{author}}</option>
      </select>
      <button v-on:click.prevent="post">添加博客</button>
    </form>

    <div v-if="submmited">
      <h3>您的博客发布成功！</h3>
    </div>

    <div id="preview" v-if="submmited">
      <h6>博客总览</h6>
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>
      <p>博客分类：</p>
      <ul>
        <li v-for="item in blog.categories">{{item}}</li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'add-blog',
    data () {
      return {
        blog:{
          title: '', //标题
          content:'', //文本内容
          categories:[], //多选框存值
          author:'' //作者
        },
        authors:['Tom','Jack','Stone'], //可选作者名字
        submmited:false,
      }
    },
    methods:{
      post:function () {//提交post发送出去
        // this.$http.post('https://blog-fd629.firebaseio.com/posts.json',{
        //   //写入要提交的相关信息
        //   // title:this.blog.title,
        //   // content:this.blog.content,
        //
        // })
        this.$http.post('https://blog-fd629.firebaseio.com/posts.json',this.blog)
          .then(function (data) { //处理post成功后要做的事
            console.log(data);
            this.submmited = true;
          })
      }
    }
  }
</script>

<style scoped>
#add-blog *{
  box-sizing: border-box;
  font-size: 16px;
}
  #add-blog{
    margin: 20px auto;
    max-width: 800px;
    padding: 20px;
  }
  label{
    display: block;
    margin: 20px 0 10px;
  }
  input[type='text'],select,textarea{
    display: block;
    width: 100%;
    padding: 8px;
  }
  #checkboxes label{
    display: inline-block;
    margin-top: 0;
  }
  textarea{
    height: 200px;
  }
  #checkboxes input{
    display: inline-block;
    margin-right: 10px;
  }
  button{
    display: block;
    margin: 20px 0;
    background: crimson;
    color: white;
    border: 0;
    padding: 14px;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
  }
  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
  }
  h6{
    margin-top: 10px;
  }
  ul{
    list-style-type: none;
  }
</style>
