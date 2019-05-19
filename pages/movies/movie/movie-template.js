Component({
  properties: {
    movieInfo: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onMovieTap: function(event) {
      wx.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail?id=' + this.properties.movieInfo.movieId
      })
    }
  }
})