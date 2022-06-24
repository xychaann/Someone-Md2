const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Makassar").locale("id");

let dt = moment(Date.now()).tz('Asia/Makassar').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)


	    //── 「 Waktuuu 」 ──//			
			
			var ase = new Date();
                        var jamss = ase.getHours();
                         switch(jamss){
                case 0: jamss = "Tengah Malam 🌚"; break;
                case 1: jamss = "Tengah Malam 🌚"; break;
                case 2: jamss = "Tengah Malam 🌚"; break;
                case 3: jamss = "Tengah Malam 🌔"; break;
                case 4: jamss = "Subuh 🌔"; break;
                case 5: jamss = "Fajar 🌄"; break;
                case 6: jamss = "Pagi 🌄"; break;
                case 7: jamss = "Pagi 🌄"; break;
                case 8: jamss = "Pagi 🌞"; break;
                case 9: jamss = "Pagi ☀️"; break;
                case 10: jamss = "Pagi ☀️"; break;
                case 11: jamss = "Siang ☀️"; break;
                case 12: jamss = "Zuhur ☀️"; break;
                case 13: jamss = "Siang ☀️"; break;
                case 14: jamss = "Siang ☀️"; break;
                case 15: jamss = "Ashar 🌞"; break;
                case 16: jamss = "Sore 🌄"; break;
                case 17: jamss = "Sore 🌄"; break;
                case 18: jamss = "Maghrib 🌄"; break;
                case 19: jamss = "Isha 🌙"; break;
                case 20: jamss = "Malam 🌙"; break;
                case 21: jamss = "Malam 🌙"; break;
                case 22: jamss = "Tengah malam 🌙"; break;
                case 23: jamss = "Tengah malam 🌚"; break;
            }
                var tampilUcapan = "" + jamss;
    
            const hariRaya = new Date('1 3, 2023 00:00:00')
			const sekarang = new Date().getTime();
			const Selisih = hariRaya - sekarang;
			const jhari = Math.floor( Selisih / (1000 * 60 * 60 * 24));
			const jjam = Math.floor( Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
			const mmmenit = Math.floor( Selisih % (1000 * 60 * 60) / (1000 * 60));
			const ddetik = Math.floor( Selisih % (1000 * 60) / 1000);
			const ultah = `${jhari}Hari ${jjam}Jam ${mmmenit}Menit ${ddetik}Detik`
			
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let wib = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}


exports.listmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `*Aloo! ${pushname}*
  
╭──⫹⫺「 Info User 」
│
├ Nama  : *${pushname}*
├ Nomor : *wa.me/${sender.split("@")[0]}*
├ Status : *${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Gratisan'}*
├ Limit Harian : *${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}*
├ Limit Game : *${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}*
├ Balance : *$${toCommas(getBalance(sender, balance))}*
│
╰──⫹⫺
  
  ${readmore}
  ╭── ❏ *Main Menu*
  │
  │ 🔖 ${prefix}menu
  │ 🔖 ${prefix}owner
  │ 🔖 ${prefix}script
  │ 🔖 ${prefix}rules
  │ 🔖 ${prefix}cekprem
  │ 🔖 ${prefix}speed
  │ 🔖 ${prefix}runtime
  │ 🔖 ${prefix}cekprem
  │ 🔖 ${prefix}listprem
  │ 🔖 ${prefix}jo <Text>
  │ 🔖 ${prefix}simi <Text>
  │
  ╰────────────── ❏

  ╭── ❏ *Converter/Tools*
  │
  │ 🔖 ${prefix}stiker <Reply>
  │ 🔖 ${prefix}toimg <Reply>
  │ 🔖 ${prefix}tovid <Reply>
  │
  ╰────────────── ❏

  ╭── ❏ *Downloader*
  │
  │ 🔖 ${prefix}play <Querry>
  │ 🔖 ${prefix}youtube <Link>
  │ 🔖 ${prefix}tiktok <Link>
  │ 🔖 ${prefix}tiktokaudio <Link>
  │ 🔖 ${prefix}ytmp4 <Link>
  │ 🔖 ${prefix}ytmp3 <Link>
  │ 🔖 ${prefix}ytmp3vn <Link>
  │ 🔖 ${prefix}getvideo
  │ 🔖 ${prefix}getmusic
  │ 🔖 ${prefix}igv <Instagram Video/Reels>
  │ 🔖 ${prefix}igf <Instagram Image>
  │ 🔖 ${prefix}facebook <Link>
  │ 🔖 ${prefix}mediafire <Link>
  │
  ╰────────────── ❏
  
  ╭── ❏ *Random Menu*
  │
  │ 🔖 ${prefix}quotes
  │ 🔖 ${prefix}gombalan
  │ 🔖 ${prefix}katagalau
  │ 🔖 ${prefix}cecan
  │ 🔖 ${prefix}cogan
  │ 🔖 ${prefix}naruto
  │ 🔖 ${prefix}loli
  │ 🔖 ${prefix}waifu
  │ 🔖 ${prefix}husbu
  │ 🔖 ${prefix}yaoi
  │
  ╰────────────── ❏
  
  ╭── ❏ *Premium User*
  │
  │ 🔖 ${prefix}asupan
  │ 🔖 ${prefix}bokep
  │ 🔖 ${prefix}xnxx link
  │ 🔖 ${prefix}ahegao
  │ 🔖 ${prefix}bloewjob
  │ 🔖 ${prefix}hentai
  │ 🔖 ${prefix}masturbation
  │ 🔖 ${prefix}pussy
  │ 🔖 ${prefix}jadibot <Fitur Lagi Error>
  │
  ╰────────────── ❏
  
  ╭── ❏ *Menu Maker*
  │
  │ 🔖 ${prefix}glitch <Text> <Text>
  │ 🔖 ${prefix}flaming <Text>
  │ 🔖 ${prefix}shadow <Text>
  │ 🔖 ${prefix}wolftext <Text>
  │ 🔖 ${prefix}cup <Text>
  │ 🔖 ${prefix}cup2 <Text>
  │ 🔖 ${prefix}romantic <Text>
  │ 🔖 ${prefix}writetext <Text>
  │ 🔖 ${prefix}lovetext <Text>
  │ 🔖 ${prefix}lovetext2 <Text>
  │ 🔖 ${prefix}undergrass <Text>
  │ 🔖 ${prefix}coffecup <Text>
  │ 🔖 ${prefix}woodheart <Text>
  │ 🔖 ${prefix}tahta <Text>
  │ 🔖 ${prefix}waifumaker <Text>
  │ 🔖 ${prefix}lolimaker <Text>
  │ 🔖 ${prefix}kanekimaker <Text>
  │ 🔖 ${prefix}guramaker <Text>
  │ 🔖 ${prefix}leaves <Text>
  │ 🔖 ${prefix}pornhub <Text>
  │ 🔖 ${prefix}3d <Text>
  │ 🔖 ${prefix}christmas <Text>
  │ 🔖 ${prefix}logowolf <Text>
  │ 🔖 ${prefix}logowolf2 <Text>
  │
  ╰────────────── ❏
  
  ╭── ❏ *Menu Lain Nya*
  │
  │ 🔖 ${prefix}shortlink <Link>
  │ 🔖 ${prefix}ssweb <Link>
  │ 🔖 ${prefix}ssdesktop <Link>
  │ 🔖 ${prefix}sshpfull <Link>
  │ 🔖 ${prefix}kbbi <Kata>
  │ 🔖 ${prefix}faktaunik
  │ 🔖 ${prefix}ppcp
  │ 🔖 ${prefix}darkjokes
  │ 🔖 ${prefix}meme
  │ 🔖 ${prefix}covid19
  │ 🔖 ${prefix}cerpen
  │ 🔖 ${prefix}cersex
  │ 🔖 ${prefix}wiki <Query>
  │ 🔖 ${prefix}igstalk <Username>
  │ 🔖 ${prefix}say <Text>
  │ 🔖 ${prefix}qr <Text>
  │ 🔖 ${prefix}readmore <Text>|<Text>
  │ 🔖 ${prefix}hitungmundur 12 10 2022
  │ 🔖 ${prefix}translate <from> <to>
  │ 🔖 ${prefix}lirik <Judul>
  │ 🔖 ${prefix}grupwa <Search>
  │ 🔖 ${prefix}ytsearch <Search>
  │ 🔖 ${prefix}pinterest <Querry>
  │ 🔖 ${prefix}getpp
  │
  ╰────────────── ❏

  ╭── ❏ *Islamic Menu*
  │
  │ 🔖 ${prefix}quran <Querry>
  │ 🔖 ${prefix}quranaudio <surah> <ayat>
  │ 🔖 ${prefix}listquran <Querry>
  │ 🔖 ${prefix}kisahnabi <Nama Nabi>
  │
  ╰────────────── ❏

  ╭── ❏ *Menu Tulis*
  │
  │ 🔖 ${prefix}nuliskanan <Text>
  │ 🔖 ${prefix}nuliskiri <Text>
  │ 🔖 ${prefix}foliokanan <Text>
  │ 🔖 ${prefix}foliokiri <Text>
  │
  ╰────────────── ❏
  
  ╭── ❏ *Edit Vokal*
  │
  │ 🔖 ${prefix}halah
  │ 🔖 ${prefix}hilih
  │ 🔖 ${prefix}heleh
  │ 🔖 ${prefix}huluh
  │ 🔖 ${prefix}holoh
  │
  ╰────────────── ❏
  
  ╭── ❏ *Game & Fun Menu*
  │
  │ 🔖 ${prefix}tictactoe @tag
  │ 🔖 ${prefix}delttc
  │ 🔖 ${prefix}suit
  │ 🔖 ${prefix}slot
  │ 🔖 ${prefix}tebakgambar
  │ 🔖 ${prefix}apakah <Query>
  │ 🔖 ${prefix}kapankah <Query>
  │ 🔖 ${prefix}rate <Query>
  │ 🔖 ${prefix}gantecek <Nama>
  │ 🔖 ${prefix}cantikcek <Nama>
  │ 🔖 ${prefix}sangecek <Nama>
  │ 🔖 ${prefix}gaycek <Nama>
  │ 🔖 ${prefix}lesbicek <Nama>
  │ 🔖 ${prefix}gimana <Query>
  │ 🔖 ${prefix}bisakah <Query>
  │ 🔖 ${prefix}cekme
  │ 🔖 ${prefix}dadu
  │
  ╰────────────── ❏
  
  ╭── ❏ *Payment & Bank*
  │
  │ 🔖 ${prefix}buylimit <Jumlah>
  │ 🔖 ${prefix}buyglimit <Jumlah>
  │ 🔖 ${prefix}transfer @tag <jumlah>
  │ 🔖 ${prefix}limit
  │ 🔖 ${prefix}balance
  │ 🔖 ${prefix}topbalance
  │
  ╰────────────── ❏

  ╭── ❏ *Group Menu*
  │
  │ 🔖 ${prefix}linkgrup
  │ 🔖 ${prefix}setppgrup
  │ 🔖 ${prefix}setnamegc
  │ 🔖 ${prefix}setdesc
  │ 🔖 ${prefix}group <Open/Close>
  │ 🔖 ${prefix}revoke
  │ 🔖 ${prefix}hidetag <Text>
  │ 🔖 ${prefix}kick <@tag>
  │ 🔖 ${prefix}add <@tag>
  │
  ╰────────────── ❏
  
  ╭── ❏ *Owner Menu*
  │
  │ > evalcode
  │ x evalcode-2
  │ $ executor
  │ 🔖 ${prefix}setppbot
  │ 🔖 ${prefix}exif
  │ 🔖 ${prefix}textchat
  │ 🔖 ${prefix}leave
  │ 🔖 ${prefix}addprem
  │ 🔖 ${prefix}delprem
  │ 🔖 ${prefix}broadcast
  │
  ╰────────────── ❏

  *THANKS TO*
  - Allah SWT
  - chintanda-md
  - XyChan Team
  - @adiwajshing`
}
