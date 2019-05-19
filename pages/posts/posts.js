// pages/posts/posts.js
const postData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({content: postData.postList})
  },

  /**
   * 点击post
   */
  onPostTap: function(event) {
    const postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  /**
   * 点击swiper
   */
  onSwiperTap: function(event) {
    const postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})