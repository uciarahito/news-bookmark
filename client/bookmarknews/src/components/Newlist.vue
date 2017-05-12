<template>
<div class="newlist">
  <div class="container">
    <div class="panel- panel-default">
      <div class="panel-heading">
        <h3>Add Book</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addBook">
          <div class="form-group">
            <label for="bookTitle">Title:</label>
            <input type="text" id="bookTitle" class="form-control" v-model="newBook.title">
          </div>
          <div class="form-group">
            <label for="bookSource">Source:</label>
            <input type="text" id="bookSource" class="form-control" v-model="newBook.source">
          </div>
          <div class="form-group">
            <label for="bookDescription">Description:</label>
            <input type="text" id="bookDescription" class="form-control" v-model="newBook.description">
          </div>
          <div class="form-group">
            <label for="bookUrl">Url:</label>
            <input type="text" id="bookUrl" class="form-control" v-model="newBook.url">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Book">
        </form>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>
                      Bookmark News List
                  </h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Description</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
              <td><a v-bind:href="book.url">{{book.title}}</a>
              </td>
              <td>{{book.source}}</td>
              <td>{{book.description}}</td>
              <td>
                <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Hapus Bookmark" v-on:click="removeBook(book)">
                                      <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                  </button>
                <button type="button" class="btn btn-info" data-toggle="tooltip" data-placement="right" title="Kirim Ke Email" v-on:click="sendEmail(book)">
                                      <span class="glyphicon glyphicon-send" aria-hidden="true"></span>
                                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="container">
    <ul class="media-list">
      <li class="media" v-for="article in articles">
        <div class="media-left">
          <a v-bind:href="article.url" target="_blank">
            <img class="media-object" v-bind:src="article.urlToImage" alt="Image">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">
              <a v-bind:href="article.url" target="_blank">{{article.title}}</a>
            </h4>
          <h5><i>by {{article.author}}</i></h5>
          <p>{{article.description}}</p>
          <button type="button" class="btn btn-primary" @click="bookmarknews(article,source)">
              <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span> Bookmark
            </button>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import toastr from 'toastr'
import Firebase from 'firebase'
let config = {
  apiKey: "AIzaSyDm62qXOJUoUY511E0PwxQ9Iwwi5FMZC9c",
  authDomain: "newsfire-65bf2.firebaseapp.com",
  databaseURL: "https://newsfire-65bf2.firebaseio.com",
  projectId: "newsfire-65bf2",
  storageBucket: "newsfire-65bf2.appspot.com",
  messagingSenderId: "947187379647"
};
let app = Firebase.initializeApp(config);
let db = app.database()
let booksRef = db.ref('books')

export default {

  name: 'newlist',
  props: ['source'],
  firebase: {
    books: booksRef
  },
  data() {
    return {
      articles: [],
      newBook: {
        title: '',
        source: '',
        description: '',
        url: ''
      }
    }
  },
  methods: {
    updateSource: function(source) {
      this.$http.get(`https://newsapi.org/v1/articles?source=${source}&apiKey=8b8441d3403c4f73896ea3b0e039595b`)
        .then(response => {
          this.articles = response.data.articles
        })
    },
    bookmarknews(article, source) {
      var data = {
        title: article.title,
        source: source,
        description: article.description,
        url: article.url
      }
      this.axios.get('http://localhost:3000/api/getDecoded',
        { headers: { token: localStorage.getItem('token') }})
        .then(response => {
          // console.log('+++++++');
          // console.log(response);
          // booksRef.push(this.newBook)
          Firebase.database().ref('books/' + response.data._id + '/' + this.newBook.title).set({data})
          toastr.options.closeButton = true;
          toastr.success(`Berita ${this.newBook.title} berhasil ditambah`)
          data = {}
        })
        .catch(error => {
          console.log(error)
        })
      //   console.log(source)

      // Firebase.database().ref('books/' + response.data._id).set({data})
      // console.log('-----------');
      // console.log(booksRef);
      // toastr.options.closeButton = true;
      // toastr.success(`Berita '${data.title}' berhasil ditambah`)
      // data = {}
    },
    addBook: function() {
      this.axios.get('http://localhost:3000/api/getDecoded',
        { headers: { token: localStorage.getItem('token') }})
        .then(response => {
          // console.log('+++++++');
          // console.log(response);
          // booksRef.push(this.newBook)
          Firebase.database().ref('books/' + response.data._id + '/' + this.newBook.title).set({
            title: this.newBook.title,
            source: this.newBook.source,
            description: this.newBook.description,
            url: this.newBook.url
          })
          toastr.options.closeButton = true;
          toastr.success(`Berita ${this.newBook.title} berhasil ditambah`)
          this.newBook.title = ''
          this.newBook.source = ''
          this.newBook.description = ''
          this.newBook.url = ''
        })

    },
    sendEmail: function(book) {
      let self = this
      // alert(book.title)
      this.axios.post(`http://localhost:3000/api/sendEmail`,{
                    title : book.title,
                    source : book.source,
                    description : book.description,
                    url : book.url,
                    token: localStorage.getItem('token')
                })
        .then((response) => {
          toastr.options.closeButton = true;
          toastr.success(`${response.data.message}`)
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeBook: function(book) {
      if (confirm('Apa anda ingin menghapus link berita ini?')) {
        booksRef.child(book['.key']).remove()
        toastr.options.closeButton = true;
        toastr.success("Bookmark Berhasil Dihapus")
      }
    }
  },
  created: function() {
    this.updateSource(this.source)
  },
  watch: {
    source: function(val) {
      this.updateSource(val)
    }
  }
}
</script>

<style scoped>
.media-object {
  width: 128px;
  padding: 10px;
}

.media {
  border-top: 1px solid lightgrey;
  padding-top: 20px;
}
</style>
