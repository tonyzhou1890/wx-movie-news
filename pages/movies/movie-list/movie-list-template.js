Component({
  properties: {
    movies: {
      type: Array,
      value: []
    },
    type: {
      type: String,
      value: ''
    }
  },
  methods: {
    onMoreTap(event) {
      wx.navigateTo({
        url: '/pages/movies/more-movie/more-movie?type=' + this.properties.type
      })
    }
  }
})