const axios = require('axios')
const _ = require('lodash')

const YOUTUBE_API_KEY = "AIzaSyCR_q7vCfYMx7RipQC5x9ln1J5jcYVcUQQ"

const videos = {
  TIPS: [
        "0aNNYEUARAk",
    "MCEY9Pm96a4",
    "h4yAEZVJZts",
    "wQsVY_HXdbs",
    "INPKIkbjA04",
    "qB3zlyMdmck",
    "kod9mQeI68w",
    "U9kgPZRy-Dc",
    "vdLApWYuHxA"
	
	
	
  ],
  RECIPES: [

	
	"CR3gRd09UZw",
    "wfrRLB7n0sQ",
    "FwReoq3_Uis",
    "tO0ilUQxfVQ",
    "GP-s43cb-w0",
    "JHLiKNFqypc",
    "OEFqJ16QkBo",
    "oQP_J2ASOnE",
    "4I4N8ya9pmU",
    "k4sED-Aea4Q",
    "t7mtGpPFw3I",
    "B_wUABaMqs0",
    "XAikXPd68u4",
    "ooU1Upa0Hiw",
    "EUzQdogxIzg",
    "UBZGjtsB99Y",
    "CR3gRd09UZw",
    "CR3gRd09UZw",
  ],
  GYM: [
    "Fh-rCrREEgA",
    "xoXYe9e01_Y",
    "hV63DbQ_qSc",
    "YxzQ6umhH4Q",
    "lsSC2vx7zFQ",
    "aMGoxlXmA0o",
    "at7QvbFy9fM",
    "qapsrR8zIJM",
    "vnMtpNhcDOE",
    "OV6-n5wtCWA",
    "lpVRxa9jsrE",
    "7fSLbC-1b0Q",
    "n_8ZIYxtPvc",
    "j0FFNcIYZMI",
    "R1JBQMXbN2k",
    "B_3pHAhhdM0"
  ]
}

const getYoutubeVideoMetadata = (videoId) => {
  const apiUrl = `https://content.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`

  return axios.get(apiUrl)
  .then(res => {
    const video = res.data.items[0].snippet
    return {
      description: video.description,
      thumbnail: (video.thumbnails.high || video.thumbnails.standard).url,
      title: video.title,
      url: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1'
    }
  })
}

module.exports = {
  getRandomVideo: (category) => {
    if (!category) {
      category = _.sample(_.keys(videos))
    }
    
    const videoId = _.sample(videos[category])
    return getYoutubeVideoMetadata(videoId)
  }
}
