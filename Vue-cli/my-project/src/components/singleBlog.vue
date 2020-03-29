<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p>作者：{{blog.author}}</p>
    <p>分类:</p>
    <ul>
      <li v-for="cate in blog.categories">{{cate}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "singleBlog",
    data() {
      return {
        id: this.$route.params.id,
        blog: {}
      }
    },
    created() {
      this.$http.get('https://blog-fd629.firebaseio.com/posts/' + this.id + '.json'
      ).then(function (data) {
        return data.json();
      }).then(function (data) {
        this.blog = data;
      })
      
    }
  }
</script>

<style scoped>
  * {
    font-size: 16px;
  }

  #single-blog {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border: 1px dotted #aaa;
  }

</style>
