// pages/posts/post-detail/post-detail.js
const postData = require('../../../data/posts-data.js')

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
    this.data.curPostId = options.id
    let data = {}
    postData.postList.map(item => {
      if (Number(item.postId) === Number(options.id)) {
        data = item
      }
    })
    this.setData(data)

    const postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      const collected = postsCollected[this.data.curPostId]
      this.setData({
        collected: Boolean(collected)
      })
    } else {
      const postsCollected = {}
      postsCollected[this.data.curPostId] = false
      wx.setStorageSync("posts_collected", postsCollected)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.backgoundAudio) {
      this.data.backgoundAudio.stop()
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.backgoundAudio) {
      this.data.backgoundAudio.stop()
    }
  },

  /**
   * 点击收藏
   */
  onCollectionTap: function(event) {
    const postsCollected = wx.getStorageSync("posts_collected")
    let postCollected = postsCollected[this.data.curPostId]
    postCollected = !postCollected
    postsCollected[this.data.curPostId] = postCollected
    // 更新缓存
    wx.setStorageSync('posts_collected', postsCollected)
    // 更新数据
    this.setData({
      collected: postCollected
    })

    // 通知弹窗
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000
    })
  },

  /**
   * 分享
   */
  onShareTap: function(event) {
    const itemList = [
      '分享到微信好友',
      '分享到朋友圈',
      '分享到QQ'
    ]
    wx.showActionSheet({
      itemList,
      itemColor: '#405f80',
      success: function(res) {
        wx.showModal({
          title: '用户分享到了' + itemList[res.tapIndex],
          content: "现在无法实现分享功能"
        })
      }
    })
  },

  /**
   * 音乐
   */
  onMusicTap: function(event) {
    /**
     * 如果是第一次播放，创建音乐实例
     */
    if(!this.data.backgoundAudio) {
      const audio = wx.getBackgroundAudioManager()
      audio.src = this.data.music.url
      audio.title = this.data.music.title
      audio.coverImgUrl = this.data.music.coverImg
      this.setData({
        backgoundAudio: audio,
        isPlayingAudio: true
      })
      // 监听暂停
      audio.onPause(() => {
        if (this.data.isPlayingAudio) {
          this.setData({
            isPlayingAudio: false
          })
        }
      })
      // 监听播放
      audio.onPlay(() => {
        if (!this.data.isPlayingAudio) {
          this.setData({
            isPlayingAudio: true
          })
        }
      })
      // 监听停止
      audio.onStop(() => {
        this.setData({
          isPlayingAudio: false
        })
      })
      return
    }

    if (!this.data.isPlayingAudio) {
      this.data.backgoundAudio.play()
      this.setData({
        isPlayingAudio: true
      })
    } else {
      this.data.backgoundAudio.pause()
      this.setData({
        isPlayingAudio: false
      })
    }
    

  }
})