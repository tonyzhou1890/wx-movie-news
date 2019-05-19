const utils = require('../../../../utils/util.js')
class Movie {
  constructor(url) {
    this.url = url
  }

  /**
   * getMovieData
   */
  getMovieData(cb) {
    this.cb = cb
    utils.http(this.url, this.processDoubanData.bind(this))
  }

  /**
   * processDoubanData
   */
  processDoubanData(data) {
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

    this.cb(movie)
  }
}

export { Movie }