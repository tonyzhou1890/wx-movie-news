// pages/movies/movie-detail/movie-detail.js
const appData = getApp()
const utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
      director: {},
      castsInfo: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id || 305
    const url = appData.globalData.doubanBase + '/v2/movie/subject/' + id
    utils.http(url, this.processDoubanData)
  },

  /**
   * 豆瓣处理函数
   */
  processDoubanData: function(data) {
    if (!data) return
    const director = {
      avatar: '',
      name: '',
      id: ''
    }
    if (data.directors[0]) {
      if (data.directors[0].avatar) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name
      director.id = data.directors[0].id
    }

    const movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      stars: utils.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastInfos(data.casts),
      summary: data.summary
    }
    
    this.setData({
      movie: movie
    })
  },

  /**
   * 点击图片
   */
  viewMoviePostsImg: function(event) {
    const src = this.data.movie.movieImg
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})