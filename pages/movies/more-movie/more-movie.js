// pages/movies/more-movie/more-movie.js
const utils = require('../../../utils/util.js')
const appData = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    requestUrl: '',
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.setData({
      type
    })
    wx.setNavigationBarTitle({
      title: type
    })


    let dataUrl = ''
    switch(type) {
      case "正在热映":
        dataUrl = appData.globalData.doubanBase + '/v2/movie/in_theaters'
        break
      case "即将上映":
        dataUrl = appData.globalData.doubanBase + '/v2/movie/coming_soon'
        break
      case "豆瓣Top250":
        dataUrl = appData.globalData.doubanBase + '/v2/movie/top250'
        break
      default:
        break
    }
    if (dataUrl) {
      this.setData({
        requestUrl: dataUrl
      })
      utils.http(dataUrl, this.processDoubanData)
      wx.showNavigationBarLoading()
    }
  },

  /**
   * 请求回调
   */
  processDoubanData(data) {
    const movies = []
    data.subjects.map((item, index) => {
      const title = item.title.length >= 6 ? item.title.substring(0, 6) + '……' : item.title
      const temp = {
        stars: utils.convertToStarsArray(item.rating.stars),
        title,
        average: item.rating.average,
        coverageUrl: item.images.large,
        movieId: item.id
      }
      movies.push(temp)
    })

    this.data.totalCount += data.subjects.length
    this.setData({
      movies: this.data.movies.concat(movies)
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  /**
   * 触底
   */
  toBottom(event) {
    if (!this.data.requestUrl) return
    const nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    utils.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  /**
   * 到达底部
   */
  onReachBottom: function() {
    this.toBottom()
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function(event) {
    const refreshUrl = this.data.requestUrl
    this.setData({
      movies: [],
      totalCount: 0
    })
    utils.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  }
})