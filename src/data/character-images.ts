// Static image URL map keyed by "name|part" to match DB character names.
// URLs are from static.jojowiki.com and verified to work in browsers.
const CHARACTER_IMAGES: Record<string, string> = {
  // Part 1
  'Jonathan Joestar|1':
    'https://static.jojowiki.com/images/thumb/b/bd/latest/20221006234855/Jonathan_Infobox_Manga.png/400px-Jonathan_Infobox_Manga.png',
  'Dio Brando|1':
    'https://static.jojowiki.com/images/thumb/5/5f/latest/20210529185004/Dio_PB_Infobox_Manga.png/400px-Dio_PB_Infobox_Manga.png',
  'Will A. Zeppeli|1':
    'https://static.jojowiki.com/images/thumb/9/9c/latest/20210227224405/Will_Zeppeli_Infobox_Manga.png/400px-Will_Zeppeli_Infobox_Manga.png',
  'Robert E. O. Speedwagon|1':
    'https://static.jojowiki.com/images/thumb/b/bc/latest/20240221141643/SPW_PB_Infobox_Manga.png/400px-SPW_PB_Infobox_Manga.png',

  // Part 2
  'Joseph Joestar|2':
    'https://static.jojowiki.com/images/thumb/e/e2/latest/20221006235618/Joseph_Joestar_Infobox_Manga.png/400px-Joseph_Joestar_Infobox_Manga.png',
  'Caesar Anthonio Zeppeli|2':
    'https://static.jojowiki.com/images/thumb/f/f6/latest/20210212074706/Caesar_Infobox_Manga.png/400px-Caesar_Infobox_Manga.png',
  'Lisa Lisa|2':
    'https://static.jojowiki.com/images/thumb/1/15/latest/20240219144914/Lisa_Lisa_Infobox_Manga.png/400px-Lisa_Lisa_Infobox_Manga.png',
  'Kars|2':
    'https://static.jojowiki.com/images/thumb/8/88/latest/20240224164606/Kars_Infobox_Manga.png/400px-Kars_Infobox_Manga.png',
  'Esidisi|2':
    'https://static.jojowiki.com/images/thumb/7/7c/latest/20211014230207/Esidisi_Infobox_Manga.png/400px-Esidisi_Infobox_Manga.png',
  'Wamuu|2':
    'https://static.jojowiki.com/images/thumb/7/77/latest/20210516235644/Wamuu_Infobox_Manga.png/400px-Wamuu_Infobox_Manga.png',

  // Part 3
  'Jotaro Kujo|3':
    'https://static.jojowiki.com/images/thumb/6/69/latest/20201130220440/Jotaro_SC_Infobox_Manga.png/400px-Jotaro_SC_Infobox_Manga.png',
  'Noriaki Kakyoin|3':
    'https://static.jojowiki.com/images/thumb/6/67/latest/20240807163352/Kakyoin_Infobox_Manga.png/400px-Kakyoin_Infobox_Manga.png',
  'Jean Pierre Polnareff|3':
    'https://static.jojowiki.com/images/thumb/b/be/latest/20210512192332/Polnareff_SC_Infobox_Manga.png/400px-Polnareff_SC_Infobox_Manga.png',
  'Muhammad Avdol|3':
    'https://static.jojowiki.com/images/thumb/a/a8/latest/20260218075959/Avdol_Infobox_Manga.png/400px-Avdol_Infobox_Manga.png',
  'Iggy|3':
    'https://static.jojowiki.com/images/thumb/a/af/latest/20201130220802/Iggy_Infobox_Manga.png/400px-Iggy_Infobox_Manga.png',
  'Vanilla Ice|3':
    'https://static.jojowiki.com/images/thumb/f/ff/latest/20210318205840/Vanilla_Ice_Infobox_Manga.png/400px-Vanilla_Ice_Infobox_Manga.png',
  'Dio Brando|3':
    'https://static.jojowiki.com/images/thumb/5/5f/latest/20210529185004/Dio_PB_Infobox_Manga.png/400px-Dio_PB_Infobox_Manga.png',

  // Part 4
  'Josuke Higashikata|4':
    'https://static.jojowiki.com/images/thumb/a/a1/latest/20221007024100/Josuke_DU_Infobox_Manga.png/400px-Josuke_DU_Infobox_Manga.png',
  'Koichi Hirose|4':
    'https://static.jojowiki.com/images/thumb/4/4e/latest/20210107173808/Koichi_Hirose_Infobox_Manga.png/400px-Koichi_Hirose_Infobox_Manga.png',
  'Okuyasu Nijimura|4':
    'https://static.jojowiki.com/images/thumb/3/3b/latest/20241202150518/Okuyasu_Nijimura_Infobox_Manga.png/400px-Okuyasu_Nijimura_Infobox_Manga.png',
  'Rohan Kishibe|4':
    'https://static.jojowiki.com/images/thumb/2/2e/latest/20250218031607/Rohan_Kishibe_Infobox_Manga.png/400px-Rohan_Kishibe_Infobox_Manga.png',
  'Yoshikage Kira|4':
    'https://static.jojowiki.com/images/thumb/c/ce/latest/20210107171552/Yoshikage_Kira_Original_Infobox_Manga.png/400px-Yoshikage_Kira_Original_Infobox_Manga.png',
  'Yukako Yamagishi|4':
    'https://static.jojowiki.com/images/thumb/9/96/latest/20260315023006/Yukako_Yamagishi_Infobox_Manga.png/400px-Yukako_Yamagishi_Infobox_Manga.png',
  'Shigekiyo Yangu|4':
    'https://static.jojowiki.com/images/thumb/9/9b/latest/20220528181757/Shigechi_Infobox_Manga.png/400px-Shigechi_Infobox_Manga.png',

  // Part 5
  'Giorno Giovanna|5':
    'https://static.jojowiki.com/images/thumb/2/21/latest/20210313222135/Giorno_Giovanna_Infobox_Manga.png/400px-Giorno_Giovanna_Infobox_Manga.png',
  'Bruno Bucciarati|5':
    'https://static.jojowiki.com/images/thumb/c/cc/latest/20210908165838/Bruno_Bucciarati_Infobox_Manga.png/400px-Bruno_Bucciarati_Infobox_Manga.png',
  'Guido Mista|5':
    'https://static.jojowiki.com/images/thumb/1/17/latest/20201214192335/Guido_Mista_Infobox_Manga.png/400px-Guido_Mista_Infobox_Manga.png',
  'Narancia Ghirga|5':
    'https://static.jojowiki.com/images/thumb/c/c2/latest/20230320122834/Narancia_Ghirga_Infobox_Manga.png/400px-Narancia_Ghirga_Infobox_Manga.png',
  'Pannacotta Fugo|5':
    'https://static.jojowiki.com/images/6/68/latest/20210607065345/Pannacotta_Fugo_Infobox_Manga.png',
  'Trish Una|5':
    'https://static.jojowiki.com/images/thumb/6/61/latest/20251019230324/Trish_Una_Infobox_Manga.PNG/400px-Trish_Una_Infobox_Manga.PNG',
  'Leone Abbacchio|5':
    'https://static.jojowiki.com/images/thumb/0/05/latest/20240711031041/Leone_Abbacchio_Infobox_Manga.png/400px-Leone_Abbacchio_Infobox_Manga.png',
  'Diavolo|5':
    'https://static.jojowiki.com/images/thumb/0/03/latest/20250601031900/Diavolo_Revealed_Infobox_Manga.png/400px-Diavolo_Revealed_Infobox_Manga.png',

  // Part 6
  'Jolyne Cujoh|6':
    'https://static.jojowiki.com/images/thumb/2/20/latest/20200923041552/Jolyne_Infobox_Manga.png/400px-Jolyne_Infobox_Manga.png',
  'Ermes Costello|6':
    'https://static.jojowiki.com/images/thumb/8/8a/latest/20210520090701/Ermes_Costello_Infobox_Manga.png/400px-Ermes_Costello_Infobox_Manga.png',
  'Emporio Alniño|6':
    'https://static.jojowiki.com/images/thumb/a/a1/latest/20260306214854/Emporio_Alnino_Infobox_Manga.png/400px-Emporio_Alnino_Infobox_Manga.png',
  'Weather Report|6':
    'https://static.jojowiki.com/images/f/f3/latest/20210201073132/Weather_Report_Infobox_Manga.png',
  'Foo Fighters|6':
    'https://static.jojowiki.com/images/thumb/0/07/latest/20210313143756/Foo_Fighters_Stand_Infobox_Manga.png/400px-Foo_Fighters_Stand_Infobox_Manga.png',
  'Narciso Anasui|6':
    'https://static.jojowiki.com/images/thumb/7/76/latest/20221017142034/Narciso_Anasui_Infobox_Manga.png/400px-Narciso_Anasui_Infobox_Manga.png',
  'Enrico Pucci|6':
    'https://static.jojowiki.com/images/thumb/d/d3/latest/20241130134017/Pucci_Original_Infobox_Manga.png/400px-Pucci_Original_Infobox_Manga.png',

  // Part 7
  'Johnny Joestar|7':
    'https://static.jojowiki.com/images/thumb/b/b7/latest/20230129074253/Johnny_Joestar_Infobox_Manga.png/400px-Johnny_Joestar_Infobox_Manga.png',
  'Gyro Zeppeli|7':
    'https://static.jojowiki.com/images/thumb/7/76/latest/20200816174510/Gyro_Zeppeli_Infobox_Manga.png/400px-Gyro_Zeppeli_Infobox_Manga.png',
  'Diego Brando|7':
    'https://static.jojowiki.com/images/thumb/4/4b/latest/20200913222640/Diego_Brando_Infobox_Manga.png/400px-Diego_Brando_Infobox_Manga.png',
  'Funny Valentine|7':
    'https://static.jojowiki.com/images/thumb/6/6b/latest/20260218123844/Valentine_Normal_Infobox_Manga.png/400px-Valentine_Normal_Infobox_Manga.png',
  'Hot Pants|7':
    'https://static.jojowiki.com/images/thumb/6/61/latest/20250421191232/Hot_Pants_Infobox_Manga.png/400px-Hot_Pants_Infobox_Manga.png',

  // Part 8 (JoJolion)
  'Josuke Higashikata (JJL)|8':
    'https://static.jojowiki.com/images/thumb/a/a1/latest/20221007024100/Josuke_DU_Infobox_Manga.png/400px-Josuke_DU_Infobox_Manga.png',
  'Yasuho Hirose|8':
    'https://static.jojowiki.com/images/thumb/a/a7/latest/20221208021338/Yasuho_Hirose_Infobox_Manga.png/400px-Yasuho_Hirose_Infobox_Manga.png',
  'Rai Mamezuku|8':
    'https://static.jojowiki.com/images/3/3e/latest/20210824154504/Rai_Mamezuku_Infobox_Manga.png',
  'Tooru|8':
    'https://static.jojowiki.com/images/8/83/latest/20210829142716/Toru_Infobox_Manga.png',
  'Yoshikage Kira (JJL)|8':
    'https://static.jojowiki.com/images/thumb/c/ce/latest/20210107171552/Yoshikage_Kira_Original_Infobox_Manga.png/400px-Yoshikage_Kira_Original_Infobox_Manga.png',
}

export function getImageUrl(name: string, part: number): string | null {
  return CHARACTER_IMAGES[`${name}|${part}`] ?? null
}
