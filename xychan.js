/**
  * Edit features in './message/msg.js'
  * Contact me on WhatsApp wa.me/6281319944917
  * Follow : https://github.com/rtwone
  * Follow : https://github.com/GetSya
*/

"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useSingleFileAuthState,
	delay
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const { serialize } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

function title() {
      console.clear()
	  console.log(chalk.bold.cyan(figlet.textSync('XyChan-Md', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n                        \n${chalk.magenta('XyChan-Md')} : ${chalk.white('Script Bot Multi Device')}\n${chalk.cyan('My Github')} : ${chalk.white('https://github.com/xychaann')}\n${chalk.red('Report buq in')} : ${chalk.white('http://wa.me/6282189975711')}\n${chalk.yellow('My Instagram')} : ${chalk.white('https://www.instagram.com/xychaann')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'fatal' }),
            auth: state,
            browser: ["XyChan-MultiDevice", "Safari", "3.0"]
        })
	title()
        store.bind(conn.ev)
	
	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ XyChan-MultiDevice ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ XyChan-MultiDevice ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ XyChan-MultiDevice ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = ''
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store)
	})
	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			status.stop()
			reconnect.stop()
			starting.stop()
			console.log(mylog('Server Ready ✓'))
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
			? connectToWhatsApp()
			: console.log(mylog('Wa web terlogout...'))
		}
	})
	conn.ev.on('creds.update', () => saveState)
	
	conn.ev.on('group-participants.update', async (data) => {
	try {
	let metadata = await conn.groupMetadata(data.id)
	  for (let i of data.participants) {
		try {
		  var pp_user = await conn.profilePictureUrl(i, 'image')
		} catch {
		  var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
		}
		if (data.action == "add") {
		  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Welcome  @${i.split("@")[0]} \n\n\n👤 : @${i.split("@")[0]}\n🎖️ : ${metadata.participants.length} _Members_\n🗓️ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n📆 Tanggal : ${moment.tz('Asia/Makassar').format('DD/MM/YY')}\n⏱️ Time : ${moment.tz('Asia/Makassar').format('HH:mm:ss')}\n`, mentions: [i] })
		} else if (data.action == "remove") {
		  conn.sendMessage(data.id, { image: { url: pp_user }, caption: `Goodbye @${i.split("@")[0]}`, mentions: [i] })
		}
	  }
	} catch (e) {
	  console.log(e)
	}
  }
)

	
	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))