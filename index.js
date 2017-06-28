const Promise = require('bluebird')
const _ = require('lodash')
const videos = require('./videos')
const subscription = require('./subscription')

const TEXT_QUOTE = {
	 GOOD: [
    "you must be fit and healthy so you are happy.If you need any help regarding health, work or study, feel free to ask."
  ] ,
  
  HEALTH: [
    "Dont stop when you are tired stop when you are done",
    "Your health is an investment not an expense",
	"You live only once, so be fit and eat healthy."
    
  ],
  WORK: [
    "Choose a job that you love and you will never have to work a single day in your life",
    "Success is result of perfection hardwork, determination and persistence",
	"Hardwork beats talent when talent doesnt work hard. Choose who you are :)",
	"It's simply the matter of doing what you do best not worrying about what other fellow is going to do.",
	"Don't wait for extraordinary opportunities. Seize common occasions and make them great."
  ] ,
   STUDY: [
    "Push yourself, Nobody else is going to do it for yourself",
    "If it is important for you, you will find a way. If not you will find excuse. Choose ;-) ",
	"Just believe in yourself, even if you dont,pretend that you do. At some point you will. "  
  ]
  
}

const TEXT_CATEGORIES = {
  TIPS: [
    "Here is your tip of the day to stay healthy!!!!",
    "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.",
    "The greatest wealth is Health",
	"Health is like money, we never have a true idea of its value until we lose it"
  ],
  RECIPES: [
    "This one is really tasty and healthy.",
    "You live only once, so be fit and eat healthy.",
	""
    
  ],
  GYM: [
    "You will find yourself working 20% harder just by listening to this on the trendmill",
    "Happy to be your workout mate... Watch this!",
    "If you are not pumped up after this video, I really don't know what to tell you"
  ]
}

const pickCategory = {
  quick_replies: [
    {
      content_type: 'text',
      title: '🔥 Tips  🔥',
      payload: 'GET_VIDEO_TIPS'
    },
    {
      content_type: 'text',
      title: '😌  Recipes 😌',
      payload: 'GET_VIDEO_RECIPES'
    },
    {
      content_type: 'text',
      title: '💪 Gym 💪',
      payload: 'GET_VIDEO_GYM'
    }
  ],
  typing: true
}

const WELCOME_SENTENCES = [
  "I am here to help my new friend with energy and determination to stay heathy",
  //"I'm not human so let's just stick to using buttons, that's going to be easier for the both of us :)",
  "Welcome to Fabulous Fit bot "
]

const WELCOME_TEXT_QUICK_REPLY = "Choose a video category right away and I'll make sure you get pumped up!"

const DEFAULT_ANSWERS = event => [
  event.user.first_name + ", choose something from the menu below but please don't say words to me :)",
  "Help, words are not my strong point " + event.user.first_name,
  "Motivational videos are all I understand unfortunately",
  "I like you.  You say words to me that sound nice even if I don't understand them :s",
  //"I hope you see how easy it is to create a bot on botpress " + event.user.first_name + ", clearly I'm in need of some nlp functionality though!"
]



const OPEN_SOURCE_TEXT = "This bot is open-source and released under the AGPL-3 license. Contributions are welcomed.\n? This bot is powered by the Botpress Platform."




module.exports = function(bp) {
	
  bp.middlewares.load()
  subscription(bp)

  bp.hear({
    type: 'postback',
    text: 'GET_STARTED' 
  }, (event, next) => {
    const { first_name, last_name } = event.user
    bp.logger.info('New user:', first_name, last_name)


    bp.subscription.subscribe(event.user.id, 'daily')
	
	//bp.messenger.sendText(event.user.id, "Hello "+first_name+" "+last_name, { typing: true, waitDelivery: true } ) 
    return Promise.mapSeries(WELCOME_SENTENCES, txt => {
      return bp.messenger.sendText(event.user.id, txt, { typing: true, waitDelivery: true })
      .then(Promise.delay(150).then(function() {
    console.log("250 ms passed");
    //return "Hello world";
	})
)
    })
    .then( Promise.delay(2000).then(function() { bp.messenger.sendText(event.user.id, WELCOME_TEXT_QUICK_REPLY, pickCategory) }) )
  })
  
  /*bp.hear({
    type: 'postback',
    text: 'MANAGE_SUBSCRIPTIONS' 
  }, (event, next) => {
	  
  bp.messenger.sendText(event.user.id, "hello your daily video", { waitDelivery: true })
     // .then(() => bp.sendRandomVideo(event.user.id, "GYM"))
    
  })*/

  
   bp.hear({'wit.entities.intent[0].value': 'hello'}, (event, next) => {
  console.log('>> hello')
  bp.messenger.sendText(event.user.id, 'Hello friend :) How are you feeling?')
}) 

bp.hear({'wit.entities.intent[0].value': 'good'}, (event, next) => {
  console.log('>> hello')
  bp.messenger.sendText(event.user.id, 'Thats nice!!')
  const text = _.sample(TEXT_QUOTE["GOOD"])
      bp.messenger.sendText(event.user.id, text, { waitDelivery: true })
})

 bp.hear({'wit.entities.intent[0].value': 'bad'}, (event, next) => {
  console.log('>> hello')
  bp.messenger.sendText(event.user.id, 'Feeling low about health, study or work? I can advice you on these topics only choose one ')
})


bp.hear({'wit.entities.intent[0].value': 'health'}, (event, next) => {
  const text = _.sample(TEXT_QUOTE["HEALTH"])
      bp.messenger.sendText(event.user.id, text, { waitDelivery: true })
})

bp.hear({'wit.entities.intent[0].value': 'study'}, (event, next) => {
   const text = _.sample(TEXT_QUOTE["STUDY"])
      bp.messenger.sendText(event.user.id, text, { waitDelivery: true })
})

bp.hear({'wit.entities.intent[0].value': 'work'}, (event, next) => {
   const text = _.sample(TEXT_QUOTE["WORK"])
      bp.messenger.sendText(event.user.id, text, { waitDelivery: true })
}) 


  bp.hear(/TRIGGER_DAILY/i, (event, next) => {
    bp.sendDailyVideo(event.user.id)
  })

// for hearing for each category of video 
  const hearGetVideo = category => {
    bp.hear({ text: 'GET_VIDEO_' + category }, (event, next) => {
      const text = _.sample(TEXT_CATEGORIES[category])
      bp.messenger.sendText(event.user.id, text, { waitDelivery: true })
      .then(() => bp.sendRandomVideo(event.user.id, category))
    })
  }

  // Create a listener for each categories
  _.keys(TEXT_CATEGORIES).forEach(hearGetVideo)

  bp.botDefaultResponse = event => {
    const text = _.sample(DEFAULT_ANSWERS(event))
    return bp.messenger.sendText(event.user.id, text, pickCategory)
  }
// this function sends a template which is displayed
  bp.sendRandomVideo = (userId, category) => {
    return videos.getRandomVideo(category)
    .then(meta => {
      return bp.messenger.sendTemplate(userId, {
        template_type: 'generic',
        elements: [{
          title: meta.title,
          item_url: meta.url,
          image_url: meta.thumbnail,
          subtitle: meta.description,
          buttons: [
            {
              type: 'web_url',
              title: ':) Watch :)',
              url: meta.url,
              webview_height_ratio: 'full'
            },
            {
              type: 'postback',
              title: ':) Next video',
              payload: 'GET_VIDEO_' + category
            },
            { type: 'element_share' }
          ]
        }]
      })
    })
   /* .then(() => {
      // 10% chance of saying this
      const n = _.random(0, 10)
      if (n === 5) {
        return Promise.delay(15000)
        .then(() => bp.sendShare(userId))
      }
    }) */
  }

  bp.sendShare = userId => {
    return bp.messenger.sendText(userId, SHARE_TEXT)
    .then(Promise.delay(1000))
    .then(() => bp.messenger.sendTemplate(userId, shareTemplate))
  }

  bp.sendDailyVideo = userId => {
    const category = _.sample(_.keys(TEXT_CATEGORIES))
    const text = "Here's your daily motivational video, have an excellent day ??!"

    bp.messenger.sendText(userId, text)
    .then(Promise.delay(1000))
    .then(() => bp.sendRandomVideo(userId, category))
  }
}