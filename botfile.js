module.exports = {

  /**
  * where the content is stored
  * you can access this property from `bp.dataLocation`
  */
  dataDir: process.env.BOTPRESS_DATA_DIR || './data',

  modulesConfigDir: process.env.BOTPRESS_CONFIG_DIR || './modules_config',
  disableFileLogs: false,
  //port: process.env.BOTPRESS_PORT || process.env.PORT || 3000,
  port:process.env.PORT || 3000,
  optOutStats: false,
  notification: {
    file: 'notifications.json',
    maxLength: 50
  },
  log: {
    file: 'bot.log',
    maxSize: 1e6 // 1mb
  },

  /**
  * Access control of admin panel
  */
  login: {
    enabled: process.env.NODE_ENV === 'production',
    tokenExpiry: '6 hours',
    password: process.env.BOTPRESS_PASSWORD || 'password',
    maxAttempts: 3,
    resetAfter: 5 * 60 * 10000 // 5 minutes
  },

  /**
  * Postgres configuration
  */
  postgres: {
    enabled: process.env.DATABASE === 'postgres',
    /*host: process.env.PG_HOST || '127.0.0.1',
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || '',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DB || '',*/
	connection: process.env.DATABASE_URL,
    ssl: process.env.PG_SSL || true
  },
  
  config: {
    'botpress-messenger': {

       greetingMessage: '🔥 Hey {{user_first_name}}, my name is Fabfit. 
	   //I was born to show people how easy it is to create a basic bot with botpress, they never expected me to literally change peoples lives!\n\nAre you ready to:\n- Take charge of your life\n- Work out harder at the gym\n- Achieve more at work.\n\nDon\'t you just want to be great? 💪\n',
       
       persistentMenu: true,
       
       persistentMenuItems: [ 
         { type: 'postback',
            title: '💪 Gym Motivation',
            value: 'GET_VIDEO_GYM' },
          { type: 'postback',
            title: '🔥 Health Tips',
            value: 'GET_VIDEO_TIPS' },
          { type: 'postback',
            title: '😇 Healthy Recipes',
            value: 'GET_VIDEO_RECIPES' },
		{ type: 'postback',
            title: '👉 Manage subscriptions',
            value: 'MANAGE_SUBSCRIPTIONS' } //, 
         /* { type: 'postback',
            title: '⭐ This bot is open-source',
            value: 'OPEN_SOURCE' } */
        ],

        trustedDomains: [ 'https://youtube.com' ],
      
        autoRespondGetStarted: false
    }
  }
}

