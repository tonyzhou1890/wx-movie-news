// pages/posts/movies/movies.js
const utils = require('../../utils/util.js')
const appData = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    searchPanelShow: false,
    searchResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const inTheatersUrl = '/v2/movie/in_theaters?start=0&count=3'
    const comingSoonUrl = '/v2/movie/coming_soon?start=0&count=3'
    const top250Url = '/v2/movie/top250?start=0&count=3'
    this.getMovieListData(appData.globalData.doubanBase + inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieListData(appData.globalData.doubanBase + comingSoonUrl, 'comingSoon', '即将上映')
    this.getMovieListData(appData.globalData.doubanBase + top250Url, 'top250', '豆瓣Top250')
  },

  /**
   * 请求数据
   */
  getMovieListData: function (url, key, type) {
    const _self = this
    wx.request({
      url,
      method: 'GET',
      header: {
        "Content-Type": 'json'
      },
      success: (res) => {
        _self.processDoubanData(res.data.subjects || [], key, type)
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },

  /**
   * 处理数据
   */
  processDoubanData: function (data, key, type) {
    const movies = []
    data.map((item, index) => {
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
    const readyData = {}
    readyData[key] = {movies, type}
    this.setData(readyData)
  },

  /**
   * focus
   */
  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  /**
   * 关掉搜索
   */
  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: []
    })
  },

  /**
   * change
   */
  onBindConfirm(event) {
    const text = event.detail.value
    const searchUrl = appData.globalData.doubanBase + '/v2/movie/search?q=' + text
    this.getMovieListData(searchUrl, 'searchResult', '')
  }
})