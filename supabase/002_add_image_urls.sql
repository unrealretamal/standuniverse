-- Add image_url column to characters table
ALTER TABLE characters ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Base URL pattern: https://jojo.fandom.com/wiki/Special:FilePath/<filename>
-- Browsers follow the redirect to the Fandom CDN automatically

-- Part 1
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Jonathan_Joestar_Infobox.png' WHERE name = 'Jonathan Joestar';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Dio_Brando_Infobox.png' WHERE name = 'Dio Brando' AND part = 1;
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Will_A._Zeppeli_Infobox.png' WHERE name = 'Will A. Zeppeli';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Robert_E._O._Speedwagon_Infobox.png' WHERE name = 'Robert E. O. Speedwagon';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Erina_Pendleton_Infobox.png' WHERE name = 'Erina Pendleton';

-- Part 2
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Joseph_Joestar_Infobox.png' WHERE name = 'Joseph Joestar';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Caesar_Anthonio_Zeppeli_Infobox.png' WHERE name = 'Caesar Anthonio Zeppeli';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Lisa_Lisa_Infobox.png' WHERE name = 'Lisa Lisa';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Kars_Infobox.png' WHERE name = 'Kars';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Esidisi_Infobox.png' WHERE name = 'Esidisi';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Wamuu_Infobox.png' WHERE name = 'Wamuu';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Rudol_von_Stroheim_Infobox.png' WHERE name = 'Rudol von Stroheim';

-- Part 3
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Jotaro_Kujo_Infobox.png' WHERE name = 'Jotaro Kujo';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Noriaki_Kakyoin_Infobox.png' WHERE name = 'Noriaki Kakyoin';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Jean_Pierre_Polnareff_Infobox.png' WHERE name = 'Jean Pierre Polnareff';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Muhammad_Avdol_Infobox.png' WHERE name = 'Muhammad Avdol';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Iggy_Infobox.png' WHERE name = 'Iggy';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Vanilla_Ice_Infobox.png' WHERE name = 'Vanilla Ice';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/N''Doul_Infobox.png' WHERE name = 'N''Doul';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Mariah_Infobox.png' WHERE name = 'Mariah';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Alessi_Infobox.png' WHERE name = 'Alessi';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/DIO_Infobox.png' WHERE name = 'Dio Brando' AND part = 3;

-- Part 4
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Josuke_Higashikata_Infobox.png' WHERE name = 'Josuke Higashikata';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Koichi_Hirose_Infobox.png' WHERE name = 'Koichi Hirose';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Okuyasu_Nijimura_Infobox.png' WHERE name = 'Okuyasu Nijimura';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Rohan_Kishibe_Infobox.png' WHERE name = 'Rohan Kishibe';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Yoshikage_Kira_Infobox.png' WHERE name = 'Yoshikage Kira';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Yukako_Yamagishi_Infobox.png' WHERE name = 'Yukako Yamagishi';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Shigekiyo_Yangu_Infobox.png' WHERE name = 'Shigekiyo Yangu';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Aya_Tsuji_Infobox.png' WHERE name = 'Aya Tsuji';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Mikitaka_Hazekura_Infobox.png' WHERE name = 'Mikitaka Hazekura';

-- Part 5
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Giorno_Giovanna_Infobox.png' WHERE name = 'Giorno Giovanna';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Bruno_Bucciarati_Infobox.png' WHERE name = 'Bruno Bucciarati';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Guido_Mista_Infobox.png' WHERE name = 'Guido Mista';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Narancia_Ghirga_Infobox.png' WHERE name = 'Narancia Ghirga';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Pannacotta_Fugo_Infobox.png' WHERE name = 'Pannacotta Fugo';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Trish_Una_Infobox.png' WHERE name = 'Trish Una';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Leone_Abbacchio_Infobox.png' WHERE name = 'Leone Abbacchio';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Risotto_Nero_Infobox.png' WHERE name = 'Risotto Nero';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Ghiaccio_Infobox.png' WHERE name = 'Ghiaccio';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Diavolo_Infobox.png' WHERE name = 'Diavolo';

-- Part 6
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Jolyne_Cujoh_Infobox.png' WHERE name = 'Jolyne Cujoh';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Ermes_Costello_Infobox.png' WHERE name = 'Ermes Costello';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Emporio_Alni%C3%B1o_Infobox.png' WHERE name = 'Emporio Alniño';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Weather_Report_Infobox.png' WHERE name = 'Weather Report';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Foo_Fighters_Infobox.png' WHERE name = 'Foo Fighters';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Narciso_Anasui_Infobox.png' WHERE name = 'Narciso Anasui';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Enrico_Pucci_Infobox.png' WHERE name = 'Enrico Pucci';

-- Part 7
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Johnny_Joestar_Infobox.png' WHERE name = 'Johnny Joestar';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Gyro_Zeppeli_Infobox.png' WHERE name = 'Gyro Zeppeli';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Diego_Brando_Infobox.png' WHERE name = 'Diego Brando';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Funny_Valentine_Infobox.png' WHERE name = 'Funny Valentine';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Hot_Pants_Infobox.png' WHERE name = 'Hot Pants';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Mountain_Tim_Infobox.png' WHERE name = 'Mountain Tim';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Pocoloco_Infobox.png' WHERE name = 'Pocoloco';

-- Part 8 (JoJolion)
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Josuke_Higashikata_(JJL)_Infobox.png' WHERE name = 'Josuke Higashikata (JJL)';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Yasuho_Hirose_Infobox.png' WHERE name = 'Yasuho Hirose';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Norisuke_Higashikata_IV_Infobox.png' WHERE name = 'Norisuke Higashikata IV';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Rai_Mamezuku_Infobox.png' WHERE name = 'Rai Mamezuku';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Tooru_Infobox.png' WHERE name = 'Tooru';
UPDATE characters SET image_url = 'https://jojo.fandom.com/wiki/Special:FilePath/Yoshikage_Kira_(JJL)_Infobox.png' WHERE name = 'Yoshikage Kira (JJL)';
