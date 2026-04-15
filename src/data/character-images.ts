// Static image URL map keyed by "name|part" to handle duplicate names across parts.
// URLs use Special:FilePath redirects so browsers follow them to the Fandom CDN automatically.
const BASE = 'https://jojo.fandom.com/wiki/Special:FilePath'

const CHARACTER_IMAGES: Record<string, string> = {
  // Part 1
  'Jonathan Joestar|1':          `${BASE}/Jonathan_Joestar_Infobox.png`,
  'Dio Brando|1':                 `${BASE}/Dio_Brando_Infobox.png`,
  'Will A. Zeppeli|1':            `${BASE}/Will_A._Zeppeli_Infobox.png`,
  'Robert E. O. Speedwagon|1':    `${BASE}/Robert_E._O._Speedwagon_Infobox.png`,
  'Erina Pendleton|1':            `${BASE}/Erina_Pendleton_Infobox.png`,
  // Part 2
  'Joseph Joestar|2':             `${BASE}/Joseph_Joestar_Infobox.png`,
  'Caesar Anthonio Zeppeli|2':    `${BASE}/Caesar_Anthonio_Zeppeli_Infobox.png`,
  'Lisa Lisa|2':                  `${BASE}/Lisa_Lisa_Infobox.png`,
  'Kars|2':                       `${BASE}/Kars_Infobox.png`,
  'Esidisi|2':                    `${BASE}/Esidisi_Infobox.png`,
  'Wamuu|2':                      `${BASE}/Wamuu_Infobox.png`,
  'Rudol von Stroheim|2':         `${BASE}/Rudol_von_Stroheim_Infobox.png`,
  // Part 3
  'Jotaro Kujo|3':                `${BASE}/Jotaro_Kujo_Infobox.png`,
  'Noriaki Kakyoin|3':            `${BASE}/Noriaki_Kakyoin_Infobox.png`,
  'Jean Pierre Polnareff|3':      `${BASE}/Jean_Pierre_Polnareff_Infobox.png`,
  'Muhammad Avdol|3':             `${BASE}/Muhammad_Avdol_Infobox.png`,
  'Iggy|3':                       `${BASE}/Iggy_Infobox.png`,
  'Vanilla Ice|3':                `${BASE}/Vanilla_Ice_Infobox.png`,
  "N'Doul|3":                     `${BASE}/N'Doul_Infobox.png`,
  'Mariah|3':                     `${BASE}/Mariah_Infobox.png`,
  'Alessi|3':                     `${BASE}/Alessi_Infobox.png`,
  'Dio Brando|3':                 `${BASE}/DIO_Infobox.png`,
  // Part 4
  'Josuke Higashikata|4':         `${BASE}/Josuke_Higashikata_Infobox.png`,
  'Koichi Hirose|4':              `${BASE}/Koichi_Hirose_Infobox.png`,
  'Okuyasu Nijimura|4':           `${BASE}/Okuyasu_Nijimura_Infobox.png`,
  'Rohan Kishibe|4':              `${BASE}/Rohan_Kishibe_Infobox.png`,
  'Yoshikage Kira|4':             `${BASE}/Yoshikage_Kira_Infobox.png`,
  'Yukako Yamagishi|4':           `${BASE}/Yukako_Yamagishi_Infobox.png`,
  'Shigekiyo Yangu|4':            `${BASE}/Shigekiyo_Yangu_Infobox.png`,
  'Aya Tsuji|4':                  `${BASE}/Aya_Tsuji_Infobox.png`,
  'Mikitaka Hazekura|4':          `${BASE}/Mikitaka_Hazekura_Infobox.png`,
  // Part 5
  'Giorno Giovanna|5':            `${BASE}/Giorno_Giovanna_Infobox.png`,
  'Bruno Bucciarati|5':           `${BASE}/Bruno_Bucciarati_Infobox.png`,
  'Guido Mista|5':                `${BASE}/Guido_Mista_Infobox.png`,
  'Narancia Ghirga|5':            `${BASE}/Narancia_Ghirga_Infobox.png`,
  'Pannacotta Fugo|5':            `${BASE}/Pannacotta_Fugo_Infobox.png`,
  'Trish Una|5':                  `${BASE}/Trish_Una_Infobox.png`,
  'Leone Abbacchio|5':            `${BASE}/Leone_Abbacchio_Infobox.png`,
  'Risotto Nero|5':               `${BASE}/Risotto_Nero_Infobox.png`,
  'Ghiaccio|5':                   `${BASE}/Ghiaccio_Infobox.png`,
  'Diavolo|5':                    `${BASE}/Diavolo_Infobox.png`,
  // Part 6
  'Jolyne Cujoh|6':               `${BASE}/Jolyne_Cujoh_Infobox.png`,
  'Ermes Costello|6':             `${BASE}/Ermes_Costello_Infobox.png`,
  'Emporio Alniño|6':             `${BASE}/Emporio_Alni%C3%B1o_Infobox.png`,
  'Weather Report|6':             `${BASE}/Weather_Report_Infobox.png`,
  'Foo Fighters|6':               `${BASE}/Foo_Fighters_Infobox.png`,
  'Narciso Anasui|6':             `${BASE}/Narciso_Anasui_Infobox.png`,
  'Enrico Pucci|6':               `${BASE}/Enrico_Pucci_Infobox.png`,
  // Part 7
  'Johnny Joestar|7':             `${BASE}/Johnny_Joestar_Infobox.png`,
  'Gyro Zeppeli|7':               `${BASE}/Gyro_Zeppeli_Infobox.png`,
  'Diego Brando|7':               `${BASE}/Diego_Brando_Infobox.png`,
  'Funny Valentine|7':            `${BASE}/Funny_Valentine_Infobox.png`,
  'Hot Pants|7':                  `${BASE}/Hot_Pants_Infobox.png`,
  'Mountain Tim|7':               `${BASE}/Mountain_Tim_Infobox.png`,
  'Pocoloco|7':                   `${BASE}/Pocoloco_Infobox.png`,
  // Part 8
  'Josuke Higashikata (JJL)|8':   `${BASE}/Josuke_Higashikata_(JJL)_Infobox.png`,
  'Yasuho Hirose|8':              `${BASE}/Yasuho_Hirose_Infobox.png`,
  'Norisuke Higashikata IV|8':    `${BASE}/Norisuke_Higashikata_IV_Infobox.png`,
  'Rai Mamezuku|8':               `${BASE}/Rai_Mamezuku_Infobox.png`,
  'Tooru|8':                      `${BASE}/Tooru_Infobox.png`,
  'Yoshikage Kira (JJL)|8':       `${BASE}/Yoshikage_Kira_(JJL)_Infobox.png`,
}

export function getImageUrl(name: string, part: number): string | null {
  return CHARACTER_IMAGES[`${name}|${part}`] ?? null
}
