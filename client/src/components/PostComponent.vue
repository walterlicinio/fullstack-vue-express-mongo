<template>
  <div class="container">
    <div class="test">
      <h1>Latest Posts</h1>

      <!--CREATING POSTS-->
      <div class="create-post">
        <label for="create-post">Say Something... </label>
        <input type="text" id="create-post" v-model="text" placeholder="Create a post">
        <button v-on:click="createPost">Post</button>
      </div>

      <!--POSTS BEING SHOWN -->
      <hr>
      <p class="error" v-if="error">{{ error }}</p> 

      <div class="posts-container">
        <div class="post" 
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
          
          v-on:dblclick="deletePost(post._id)">

          {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
          <p class="text"> {{ post.text }} </p>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
//import the PostService
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {  //just like react state
    return {
      posts:[], //empty array
      error:'', //empty string
      text:''
    }
  },
  async created() { //runs automatically when component is initialized
    try {
      //tries to get the posts with axios from PostService.js
      this.posts = await PostService.getPosts()
    }
    catch(err){
      //if can't, show the message from the err object
      this.error = err.message 

    }

    
  },

  methods: { //custom methods
      async createPost() {
        await PostService.insertPost(this.text) //text bound to the input
        this.posts = await PostService.getPosts(0)
      },
      async deletePost(id) {
        await PostService.deletePost(id) //text bound to the input
        this.posts = await PostService.getPosts(0)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.create-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
