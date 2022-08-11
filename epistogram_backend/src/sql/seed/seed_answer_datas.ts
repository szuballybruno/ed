import { AnswerData } from '../../models/entity/answer/AnswerData';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { QuestionDatasSeedType } from './seed_question_datas';

export const getAnswerDatasSeedData = (questions: QuestionDatasSeedType) => getSeedList<AnswerData>()({

    // SECTION 1
    // 1.1 answers
    answer_data_1: {
        text: 'Örülnék, ha lenne ehhez egy kollégám',
        isCorrect: true,
    },
    answer_data_2: {
        text: 'Inkább egyedül vágnék neki a feladatnak',
        isCorrect: false,
    },
    // 1.2 answers
    answer_data_3: {
        text: 'Segít, ha megvitathatom azt másokkal',
        isCorrect: true,
    },
    answer_data_4: {
        text: 'Jobban szeretem egyedül megoldani azt',
        isCorrect: false,
    },
    // 1.3 answers
    answer_data_5: {
        text: 'Csoportos aktivitások, illetve közös megvitatások nagyobb számban vannak beiktatva',
        isCorrect: true,
    },
    answer_data_6: {
        text: 'Egyénileg megoldandó feladatok kerülnek meghatározásra',
        isCorrect: false,
    },
    // 1.4 answers
    answer_data_7: {
        text: 'Magához az előadóhoz szólnak a gondolataim',
        isCorrect: true,
    },
    answer_data_8: {
        text: 'Inkább magához a témához szólok, az előadó másodlagos',
        isCorrect: false,
    },
    // 1.5 answers
    answer_data_9: {
        text: 'Szoros együttműködés a többiekkel',
        isCorrect: true,
    },
    answer_data_10: {
        text: 'Szívesebben oldok meg egyedül részfeladatokat',
        isCorrect: false,
    },
    // 1.6 answers
    answer_data_11: {
        text: 'A barátaimmal szeretek',
        isCorrect: true,
    },
    answer_data_12: {
        text: 'Egymagam intézem',
        isCorrect: false,
    },
    // 1.7 answers
    answer_data_13: {
        text: 'Többen vagyunk, és nagy a sürgés-forgás',
        isCorrect: true,
    },
    answer_data_14: {
        text: 'Ha kevesebben vagyunk, vagy akár egyedül dolgozhatok',
        isCorrect: false,
    },


    // SECTION 2
    // 2.1 answers
    answer_data_15: {
        text: 'Szeretem lerajzolni, vizualizálni a problémát',
        isCorrect: true,
    },
    answer_data_16: {
        text: 'Egy példa problémán keresztül tudom jól megérteni',
        isCorrect: false,
    },
    // 2.2 answers
    answer_data_17: {
        text: 'Egy képet kreálok róla a fejemben',
        isCorrect: true,
    },
    answer_data_18: {
        text: 'Lerajzolom azt, amire emlékeznem kell',
        isCorrect: false,
    },
    // 2.3 answers
    answer_data_19: {
        text: 'Könnyű feladat, nem jelent számomra gondot',
        isCorrect: true,
    },
    answer_data_20: {
        text: 'Kihívást jelent',
        isCorrect: false,
    },
    // 2.4 answers
    answer_data_21: {
        text: 'Fizikai eszközökkel, modellekkel dolgozhatunk',
        isCorrect: true,
    },
    answer_data_22: {
        text: 'Csoportosan megvitatjuk az adott témát',
        isCorrect: false,
    },
    // 2.5 answers
    answer_data_23: {
        text: 'Ábrákat, működés közbeni rajzot készítenék',
        isCorrect: true,
    },
    answer_data_24: {
        text: 'Rövid jegyzetet írnék a működéséről',
        isCorrect: false,
    },
    // 2.6 answers
    answer_data_25: {
        text: 'Rajzolhatok, a kezeimmel dolgozhatok valamin',
        isCorrect: true,
    },
    answer_data_26: {
        text: 'Beszélhetek, írhatok, vagy inkább hallgathatok valakit',
        isCorrect: false,
    },
    // 2.7 answers
    answer_data_27: {
        text: 'Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt',
        isCorrect: true,
    },
    answer_data_28: {
        text: 'Mondja el/írja le, hogy mikor merre kell fordulnom',
        isCorrect: false,
    },


    // SECTION 3
    // 3.1 answers
    answer_data_29: {
        text: 'Tényeket és részleteket megtanulni, megismerni',
        isCorrect: true,
    },
    answer_data_30: {
        text: 'Saját teóriákat kreálni, ötletelni',
        isCorrect: false,
    },
    // 3.2 answers
    answer_data_31: {
        text: 'Specifikus instrukciókat követhetek',
        isCorrect: true,
    },
    answer_data_32: {
        text: 'Analizálni kell és döntéseket hoznom ',
        isCorrect: false,
    },
    // 3.3 answers
    answer_data_33: {
        text: 'Megoldani egy matematikai problémát egy képlet segítségével',
        isCorrect: true,
    },
    answer_data_34: {
        text: 'Felfedezni a képlet mögötti logikát',
        isCorrect: false,
    },
    // 3.4 answers
    answer_data_35: {
        text: 'Szívesebben írnék egy gyakorlati problémáról, annak folyamatáról',
        isCorrect: true,
    },
    answer_data_36: {
        text: 'Szívesebben írnék inkább elméletekről, teóriákról',
        isCorrect: false,
    },
    // 3.5 answers
    answer_data_37: {
        text: 'Pontos, részletes instrukciókat követhetek',
        isCorrect: true,
    },
    answer_data_38: {
        text: 'Elemzésre van szükség, és következtetéseket kell levonnom',
        isCorrect: false,
    },
    // 3.6 answers
    answer_data_39: {
        text: 'Jobban élvezném a ház megépítését.',
        isCorrect: true,
    },
    answer_data_40: {
        text: 'Jobban élvezném a ház megtervezését. ',
        isCorrect: false,
    },
    // 3.7 answers
    answer_data_41: {
        text: 'Kipróbálnék több típust is, dolgoznék velük',
        isCorrect: true,
    },
    answer_data_42: {
        text: 'Utána néznék az alapvető működésüknek, milyen elven operálnak',
        isCorrect: false,
    },


    // SECTION 4
    // 4.1 answers
    answer_data_43: {
        text: 'Szóban kapom meg',
        isCorrect: true,
    },
    answer_data_44: {
        text: 'Írásban kapom meg',
        isCorrect: false,
    },
    // 4.2 answers
    answer_data_45: {
        text: 'Mennék el  egy híres pszichológus előadására',
        isCorrect: true,
    },
    answer_data_46: {
        text: 'Olvasnám el  a könyvet, amelyről az előadás szól',
        isCorrect: false,
    },
    // 4.3 answers
    answer_data_47: {
        text: 'A neveket',
        isCorrect: true,
    },
    answer_data_48: {
        text: 'Az arcokat',
        isCorrect: false,
    },
    // 4.4 answers
    answer_data_49: {
        text: 'Az előadó magyaráz és megválaszolja a kérdéseket',
        isCorrect: true,
    },
    answer_data_50: {
        text: 'Videók, filmek segítségével mutatja be az adott témát',
        isCorrect: false,
    },
    // 4.5 answers
    answer_data_51: {
        text: 'Ha hallom (valaki elmondja nekem)',
        isCorrect: true,
    },
    answer_data_52: {
        text: 'Ha képeken látom',
        isCorrect: false,
    },
    // 4.6 answers
    answer_data_53: {
        text: 'Meghallgatom a híreket a rádióban, akár vezetés közben',
        isCorrect: true,
    },
    answer_data_54: {
        text: 'Hírportálokról tájékozódom inkább',
        isCorrect: false,
    },
    // 4.7 answers
    answer_data_55: {
        text: 'Megkérem egy kollégámat, hogy magyarázza el',
        isCorrect: true,
    },
    answer_data_56: {
        text: 'Megkérem egy kollégámat, hogy mutassa be a gépen, hogyan használja',
        isCorrect: false,
    },


    // SECTION 5
    // 5.1 answers
    answer_data_57: {
        text: 'A tapasztalataim és a megérzéseim',
        isCorrect: true,
    },
    answer_data_58: {
        text: 'A tények és az objektív adatok',
        isCorrect: false,
    },
    // 5.2 answers
    answer_data_59: {
        text: 'Azzal dolgozom, ami éppen rendelkezésre áll a közelemben',
        isCorrect: true,
    },
    answer_data_60: {
        text: 'Szükségem van minden eszközre, előre összekészítve',
        isCorrect: false,
    },
    // 5.3 answers
    answer_data_61: {
        text: 'Szívesen teszem azt zenén, íráson keresztül, művészet segítségével',
        isCorrect: true,
    },
    answer_data_62: {
        text: 'Tömören, egyértelműen kommunikálók róluk',
        isCorrect: false,
    },
    // 5.4 answers
    answer_data_63: {
        text: 'Engedik, hogy hallgatókat a saját érdeklődésük vezesse',
        isCorrect: true,
    },
    answer_data_64: {
        text: 'Konkrét, kézzelfogható elvárásokat támasztanak',
        isCorrect: false,
    },
    // 5.5 answers
    answer_data_65: {
        text: 'Meg szoktam kérdőjelezni azt, amiről hallok vagy olvasok',
        isCorrect: true,
    },
    answer_data_66: {
        text: 'El szoktam fogadni azt, amiről hallok vagy olvasok',
        isCorrect: false,
    },
    // 5.6 answers
    answer_data_67: {
        text: 'Esszé jellegű vizsga',
        isCorrect: true,
    },
    answer_data_68: {
        text: 'Teszt jellegű felmérés',
        isCorrect: false,
    },
    // 5.7 answers
    answer_data_69: {
        text: 'A saját megközelítésemet alkalmazva megoldani',
        isCorrect: true,
    },
    answer_data_70: {
        text: 'Pontos utasítások alapján teljesíteni',
        isCorrect: false,
    },
    answer_data_108: {
        text: 'Odagörgetek',
        isCorrect: false,
    },
    answer_data_109: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd entert nyomok',
        isCorrect: false,
    },
    answer_data_110: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd entert nyomok.',
        isCorrect: true,
    },
    answer_data_111: {
        text: 'Az A1 cellába beírom, hogy X789654, majd entert nyomok',
        isCorrect: false,
    },
    answer_data_112: {
        text: 'Beírom, hogy hatvány',
        isCorrect: false,
    },
    answer_data_113: {
        text: 'Beírom, hogy *',
        isCorrect: false,
    },
    answer_data_114: {
        text: 'Beírom, hogy ^',
        isCorrect: true,
    },
    answer_data_115: {
        text: 'Beírom, hogy ^ - ezt az AltGr+3 billentyűkombináció adja ki, és a többi művelettel ellentéteben nem látszik azonnal, csak a következő bevitt karakterrel együtt)',
        isCorrect: false,
    },
    answer_data_116: {
        text: 'b4*_b5',
        isCorrect: false,
    },
    answer_data_117: {
        text: 'b4 * _b5',
        isCorrect: false,
    },
    answer_data_118: {
        text: '=_b4_x_b5',
        isCorrect: false,
    },
    answer_data_119: {
        text: '=_b4*_b5',
        isCorrect: true,
    },
    answer_data_120: {
        text: 'A másolt képletben az A1 cella $A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: true,
    },
    answer_data_121: {
        text: 'A másolt képletben az A1 cella $A1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű',
        isCorrect: false,
    },
    answer_data_122: {
        text: 'A másolt képletben az A1 cella A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű',
        isCorrect: false,
    },
    answer_data_123: {
        text: 'A másolt képletben az A1 cella &A&1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: false,
    },
    answer_data_124: {
        text: 'Odagörgetek',
        isCorrect: false,
    },
    answer_data_125: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd entert nyomok.',
        isCorrect: false,
    },
    answer_data_126: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd entert nyomok.',
        isCorrect: true,
    },
    answer_data_127: {
        text: 'Az A1 cellába beírom, hogy X789654, majd entert nyomok.',
        isCorrect: false,
    },
    answer_data_128: {
        text: 'A másolt képletben az A1 cella $A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: true,
    },
    answer_data_129: {
        text: 'A szerkesztőlécen a számításban a pi()-t használom.',
        isCorrect: false,
    },
    answer_data_130: {
        text: 'A Pi-t használom.',
        isCorrect: false,
    },
    answer_data_131: {
        text: '3,141592653589',
        isCorrect: false,
    },
    answer_data_132: {
        text: 'b4 * _b5',
        isCorrect: false,
    },
    answer_data_133: {
        text: '=_b4_x_b5',
        isCorrect: false,
    },
    answer_data_134: {
        text: '=_b4*_b5',
        isCorrect: true,
    },
    answer_data_135: {
        text: 'b4*_b5',
        isCorrect: false,
    },
    answer_data_136: {
        text: 'Beírom, hogy hatvány',
        isCorrect: false,
    },
    answer_data_137: {
        text: 'Beírom, hogy *',
        isCorrect: false,
    },
    answer_data_138: {
        text: 'Beírom, hogy ^',
        isCorrect: false,
    },
    answer_data_139: {
        text: 'Beírom, hogy ^ - ezt az AltGr+3 billentyűkombináció adja ki, és a többi művelettel ellentéteben nem látszik azonnal,csak a következő bevitt karakterrel együtt)',
        isCorrect: true,
    },
    answer_data_140: {
        text: 'A másolt képletben az A1 cella $A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: true,
    },
    answer_data_141: {
        text: 'A másolt képletben az A1 cella $A1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: false,
    },
    answer_data_142: {
        text: 'A másolt képletben az A1 cella A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: false,
    },
    answer_data_143: {
        text: 'A másolt képletben az A1 cella &A&1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        isCorrect: false,
    },
    answer_data_144: {
        text: 'Jobb egérgombbal egyszer kattintok az Asztalon az Excel ikonra, majd a megjelenő menüben a megnyitás-ra kattintok egyszer a bal egérgombbal.',
        isCorrect: true,
    },
    answer_data_145: {
        text: 'Bal egérgombbal duplán kattintok az Asztalon az Excel ikonra.',
        isCorrect: false,
    },
    answer_data_146: {
        text: 'A keresőcsíkon beírom, hogy Excel, majd megjelenő zöld ikonra kattintok.',
        isCorrect: false,
    },
    answer_data_147: {
        text: 'A Start menüben kikeresem az Excel-t és bal egérgombbal kattintok.',
        isCorrect: false,
    },
    answer_data_148: {
        text: 'Pipa',
        isCorrect: false,
    },
    answer_data_149: {
        text: 'Ragasztószalag',
        isCorrect: false,
    },
    answer_data_150: {
        text: 'Rajzszög',
        isCorrect: true,
    },
    answer_data_151: {
        text: 'Kalapács',
        isCorrect: false,
    },
    answer_data_152: {
        text: 'Az Excel kikapcsol',
        isCorrect: false,
    },
    answer_data_153: {
        text: 'A zöld címsoron a Befektetés kalkulátor név jelenik meg',
        isCorrect: true,
    },
    answer_data_154: {
        text: 'Az Excel kinyomtatja a munkafüzetet',
        isCorrect: false,
    },
    answer_data_155: {
        text: 'A Munkafüzet 3-at villan',
        isCorrect: false,
    },
    answer_data_156: {
        text: 'Ctrl+S',
        isCorrect: false,
    },
    answer_data_157: {
        text: 'Alt+Tab',
        isCorrect: true,
    },
    answer_data_158: {
        text: 'Ctrl+P',
        isCorrect: false,
    },
    answer_data_159: {
        text: 'Ctrl+A',
        isCorrect: false,
    },
    answer_data_160: {
        text: 'A kijelöléshez a Shift+Del, majd beillesztéshez Ctrl+V.',
        isCorrect: true,
    },
    answer_data_161: {
        text: 'A kijelöléshez a Ctrl+Shift+Del, majd beillesztéshez Ctrl+V.',
        isCorrect: false,
    },
    answer_data_162: {
        text: 'A kijelöléshez a Shift+AltGr, majd beillesztéshez Ctrl+V.',
        isCorrect: false,
    },
    answer_data_163: {
        text: 'A kijelöléshez a Ctrl+C, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_164: {
        text: 'CTRL-Z',
        isCorrect: false,
    },
    answer_data_165: {
        text: 'Ha az egérrel rámutatok az adott betűtípusra',
        isCorrect: false,
    },
    answer_data_166: {
        text: 'Ha begépelem a betűtípust',
        isCorrect: false,
    },
    answer_data_167: {
        text: 'Ha a kijelölt résznél a legördülő menü adott pontjára (az új betűtípusra) kattintok',
        isCorrect: true,
    },
    answer_data_168: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menün.)',
        isCorrect: true,
    },
    answer_data_169: {
        text: 'A számok közé szóközt ütök',
        isCorrect: false,
    },
    answer_data_170: {
        text: 'A számok közé Entert ütök',
        isCorrect: false,
    },
    answer_data_171: {
        text: 'A számok közé Tab-ot ütök',
        isCorrect: false,
    },
    answer_data_172: {
        text: '.mp4',
        isCorrect: false,
    },
    answer_data_173: {
        text: '.mkv',
        isCorrect: true,
    },
    answer_data_174: {
        text: '.avi',
        isCorrect: false,
    },
    answer_data_175: {
        text: '.mov',
        isCorrect: false,
    },
    answer_data_176: {
        text: 'Képkocka/másodperc (frame/second)',
        isCorrect: true,
    },
    answer_data_177: {
        text: 'Belső nézetű lövöldözős játék ( first-person shooter)',
        isCorrect: false,
    },
    answer_data_178: {
        text: 'Igaz',
        isCorrect: true,
    },
    answer_data_179: {
        text: 'Hamis',
        isCorrect: false,
    },
    answer_data_180: {
        text: 'Nincs köztük különbség',
        isCorrect: false,
    },
    answer_data_181: {
        text: 'A kijelző felvétele opcióval nagyobb felbontásban vehetjük fel a videókat',
        isCorrect: false,
    },
    answer_data_182: {
        text: 'Az ablak felvétele során csak egy adott ablak tartalmát rögzítjük, és elkattinthatunk, míg kijelző felvételénél minden rögzítésre kerül, amin a monitorunkon látszódik.',
        isCorrect: true,
    },
    answer_data_183: {
        text: 'Mert így kisebb fájlméretet kapunk.',
        isCorrect: false,
    },
    answer_data_184: {
        text: 'Mert így nem torzul a felvett hang.',
        isCorrect: true,
    },
    answer_data_185: {
        text: 'Mert a sárga zónában túl halk lenne a felvétel.',
        isCorrect: false,
    },
    answer_data_186: {
        text: '.avi',
        isCorrect: false,
    },
    answer_data_187: {
        text: '.m4v',
        isCorrect: false,
    },
    answer_data_188: {
        text: '.mkv',
        isCorrect: true,
    },
    answer_data_189: {
        text: '.mp4',
        isCorrect: false,
    },
    answer_data_190: {
        text: 'Képkocka/másodperc (frame/second)',
        isCorrect: true,
    },
    answer_data_191: {
        text: 'Belső nézetű lövöldözős játék ( first-person shooter)',
        isCorrect: false,
    },
    answer_data_192: {
        text: 'Igaz',
        isCorrect: false,
    },
    answer_data_193: {
        text: 'Hamis',
        isCorrect: true,
    },
    answer_data_194: {
        text: 'Nincs köztük különbség',
        isCorrect: false,
    },
    answer_data_195: {
        text: 'A kijelző felvétele opcióval nagyobb felbontásban vehetjük fel a videókat',
        isCorrect: false,
    },
    answer_data_196: {
        text: 'Az ablak felvétele során csak egy adott ablak tartalmát rögzítjük, és elkattinthatunk, míg kijelző felvételénél minden rögzítésre kerül, amin a monitorunkon látszódik.',
        isCorrect: true,
    },
    answer_data_197: {
        text: 'Megkülönböztethetetlen minőség, nagy fájlméret',
        isCorrect: false,
    },
    answer_data_198: {
        text: 'Jó minőség, közepes fájlméret',
        isCorrect: true,
    },
    answer_data_199: {
        text: 'Veszteségmentes minőség, hatalmas fájlméret',
        isCorrect: false,
    },
    answer_data_224: {
        text: 'CTRL-Y',
        isCorrect: false,
    },
    answer_data_225: {
        text: 'Ha a kijelölt résznél a legördülő menü adott pontjára (az új stílusra) kattintok',
        isCorrect: true,
    },
    answer_data_226: {
        text: 'Ha begépelem a stílus nevét',
        isCorrect: false,
    },
    answer_data_227: {
        text: 'Ha az egérrel rámutatok az adott stílusra',
        isCorrect: false,
    },
    answer_data_228: {
        text: 'Pipa',
        isCorrect: false,
    },
    answer_data_229: {
        text: 'Ragasztószalag',
        isCorrect: false,
    },
    answer_data_230: {
        text: 'Ecset',
        isCorrect: true,
    },
    answer_data_231: {
        text: 'Kalapács',
        isCorrect: false,
    },
    answer_data_232: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_233: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_234: {
        text: 'Egyszerre maximum 3 feltétel',
        isCorrect: false,
    },
    answer_data_235: {
        text: 'Egyszerre maximum 5 feltétel',
        isCorrect: false,
    },
    answer_data_236: {
        text: '[Zöld]; [Kék]##;[Piros]-##;',
        isCorrect: false,
    },
    answer_data_237: {
        text: '[Kék]##;[Piros]-##;[Zöld]',
        isCorrect: true,
    },
    answer_data_238: {
        text: '[Kék]##;[Piros]##;[Zöld]',
        isCorrect: false,
    },
    answer_data_239: {
        text: '[Piros]-##;[Kék]##;[Zöld]',
        isCorrect: false,
    },
    answer_data_240: {
        text: 'Kijelölöm a sorokat, f8; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_241: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: true,
    },
    answer_data_242: {
        text: 'Kijelölöm a sorokat, bal klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_243: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_244: {
        text: 'Jobb klikk az oszlop betűjelére és a helyi menüben az elrejtés-re klikkelek',
        isCorrect: true,
    },
    answer_data_245: {
        text: 'Jobb klikk az oszlop betűjelére és hide billentyű a billentyűzeten',
        isCorrect: false,
    },
    answer_data_246: {
        text: 'Bal klikk az oszlop betűjelére és a helyi menüben az elrejtés-re klikkelek',
        isCorrect: false,
    },
    answer_data_247: {
        text: 'Bal klikk az oszlop betűjelére és hide billentyű a billentyűzeten',
        isCorrect: false,
    },
    answer_data_248: {
        text: 'A számok közé ENTER-t ütök',
        isCorrect: false,
    },
    answer_data_249: {
        text: 'A számok közé szóközt ütök',
        isCorrect: false,
    },
    answer_data_250: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menün.)',
        isCorrect: true,
    },
    answer_data_251: {
        text: 'A számok közé Tab-ot ütök',
        isCorrect: false,
    },
    answer_data_252: {
        text: 'Igen, de csak fél, harmad és negyed törtekkel',
        isCorrect: false,
    },
    answer_data_253: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_254: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_255: {
        text: 'Igen. A számformátumnál kell beállítani a törteket',
        isCorrect: false,
    },
    answer_data_256: {
        text: '„120;0E+001”',
        isCorrect: false,
    },
    answer_data_257: {
        text: '„1,20E+01”',
        isCorrect: true,
    },
    answer_data_258: {
        text: '„1,20E+0012”',
        isCorrect: false,
    },
    answer_data_259: {
        text: '„1E+12”',
        isCorrect: false,
    },
    answer_data_260: {
        text: '[Zöld]0;[Kék]##;[Piros]-##;[Sárga]',
        isCorrect: false,
    },
    answer_data_261: {
        text: '##[Kék];-##[Piros];[Zöld]0;[Sárga]',
        isCorrect: false,
    },
    answer_data_262: {
        text: '[Sárga];[Kék]##;[Piros]-##;[Zöld]0',
        isCorrect: false,
    },
    answer_data_263: {
        text: '[Kék]##;[Piros]-##;[Zöld]0;[Sárga]',
        isCorrect: true,
    },
    answer_data_264: {
        text: 'Az adattartományra kattintok, majd a Kezdőlap menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: true,
    },
    answer_data_265: {
        text: 'Az adattartományra kattintok, majd a Adatok menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_266: {
        text: 'Az adattartományra kattintok, majd a Nézet menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_267: {
        text: 'Az adattartományra kattintok, majd a Képletek menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_268: {
        text: 'Nézet >> Stílusok >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_269: {
        text: 'Kezdőlap >> Stílusok >> Új cellastílus',
        isCorrect: true,
    },
    answer_data_270: {
        text: 'Kezdőlap >> Nézetek >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_271: {
        text: 'Kezdőlap >> Stílusok >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_272: {
        text: '=á_t_l_a_g(_b2:_b20)',
        isCorrect: true,
    },
    answer_data_273: {
        text: 'á_t_l_a_g(_b2:_b20)',
        isCorrect: false,
    },
    answer_data_274: {
        text: '=á_t_l_a_g(_b2;_b20)',
        isCorrect: false,
    },
    answer_data_275: {
        text: '=á_t_l_a_g(_b2 _b20)',
        isCorrect: false,
    },
    answer_data_276: {
        text: '=_mó_d_u_s_z._e_g_y(_b2;_b20)',
        isCorrect: false,
    },
    answer_data_277: {
        text: '=_mó_d_u_s_z(_b2,_b20)',
        isCorrect: false,
    },
    answer_data_278: {
        text: '=_mó_d_u_s_z._e_g_y(_b2:_b20)',
        isCorrect: true,
    },
    answer_data_279: {
        text: '=_mó_d_u_s_z._e_g_y(_b2 _b20)',
        isCorrect: false,
    },
    answer_data_280: {
        text: 'd_a_r_a_b_t_e_l_i(_b2:_b20;2)',
        isCorrect: false,
    },
    answer_data_281: {
        text: '=_d_a_r_a_b_t_e_l_i(_b2:_b20;5)',
        isCorrect: false,
    },
    answer_data_282: {
        text: '=_d_a_r_a_b_t_e_l_i(2;_b2:_b20)',
        isCorrect: false,
    },
    answer_data_283: {
        text: '=_d_a_r_a_b_t_e_l_i(_b2:_b20;2)',
        isCorrect: true,
    },
    answer_data_284: {
        text: 'f7',
        isCorrect: false,
    },
    answer_data_285: {
        text: 'f8',
        isCorrect: false,
    },
    answer_data_286: {
        text: 'f9',
        isCorrect: true,
    },
    answer_data_287: {
        text: 'f10',
        isCorrect: false,
    },
    answer_data_288: {
        text: 'Lent',
        isCorrect: true,
    },
    answer_data_289: {
        text: 'Felugró párbeszédablakban',
        isCorrect: false,
    },
    answer_data_290: {
        text: 'Legördülő listán',
        isCorrect: false,
    },
    answer_data_291: {
        text: 'A zöld csíkon a gyorselérési eszköztárban',
        isCorrect: false,
    },
    answer_data_292: {
        text: 'Szélesebb sorral',
        isCorrect: false,
    },
    answer_data_293: {
        text: 'Szélesebb oszloppal',
        isCorrect: true,
    },
    answer_data_294: {
        text: 'Ellenőrzöm a képletet',
        isCorrect: false,
    },
    answer_data_295: {
        text: 'Megkeresem a hiányzó hivatkozást',
        isCorrect: false,
    },
    answer_data_296: {
        text: 'Jobb alsó sarok',
        isCorrect: false,
    },
    answer_data_297: {
        text: 'Jobb felső sarok',
        isCorrect: false,
    },
    answer_data_298: {
        text: 'Bal alsó sarok',
        isCorrect: false,
    },
    answer_data_299: {
        text: 'Bal felső sarok',
        isCorrect: true,
    },
    answer_data_300: {
        text: 'Kijelölöm a B oszlopot, majd jobb klikk az oszlop betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        isCorrect: false,
    },
    answer_data_301: {
        text: 'Kijelölöm az A:C oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        isCorrect: true,
    },
    answer_data_302: {
        text: 'Kijelölöm az A:D oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        isCorrect: false,
    },
    answer_data_303: {
        text: 'Kijelölöm az A:E oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        isCorrect: false,
    },
    answer_data_304: {
        text: 'Kezdőlap',
        isCorrect: false,
    },
    answer_data_305: {
        text: 'Nézet',
        isCorrect: false,
    },
    answer_data_306: {
        text: 'Adatok',
        isCorrect: false,
    },
    answer_data_307: {
        text: 'Képletek',
        isCorrect: true,
    },
    answer_data_308: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_309: {
        text: 'Igen: Kezdőlap >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_310: {
        text: 'Igen: Kezdőlap >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_311: {
        text: 'Igen: Adatok >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_312: {
        text: 'Ez is igaz teszt',
        isCorrect: true,
    },
    answer_data_313: {
        text: 'E',
        isCorrect: false,
    },
    answer_data_314: {
        text: 'X',
        isCorrect: true,
    },
    answer_data_315: {
        text: 'C',
        isCorrect: false,
    },
    answer_data_316: {
        text: 'L',
        isCorrect: false,
    },
    answer_data_321: {
        text: 'A',
        isCorrect: true,
    },
    answer_data_322: {
        text: 'B',
        isCorrect: false,
    },
    answer_data_323: {
        text: 'C',
        isCorrect: false,
    },
    answer_data_324: {
        text: 'D',
        isCorrect: false,
    },
    answer_data_325: {
        text: 'Pipa',
        isCorrect: false,
    },
    answer_data_326: {
        text: 'Ragasztószalag',
        isCorrect: false,
    },
    answer_data_327: {
        text: 'Rajzszög',
        isCorrect: true,
    },
    answer_data_328: {
        text: 'Kalapács',
        isCorrect: false,
    },
    answer_data_317: {
        text: 'Floppilemez',
        isCorrect: false,
    },
    answer_data_318: {
        text: 'Pont',
        isCorrect: false,
    },
    answer_data_319: {
        text: 'Balra visszaforduló nyíl',
        isCorrect: true,
    },
    answer_data_320: {
        text: 'Jobbra visszaforduló nyíl',
        isCorrect: false,
    },
    answer_data_329: {
        text: 'Az Excel kikapcsol',
        isCorrect: false,
    },
    answer_data_330: {
        text: 'A zöld címsoron a Befektetés kalkulátor név jelenik meg',
        isCorrect: true,
    },
    answer_data_331: {
        text: 'Az Excel kinyomtatja a munkafüzetet ',
        isCorrect: false,
    },
    answer_data_332: {
        text: 'A munkafüzet 3-at villan',
        isCorrect: false,
    },
    answer_data_333: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás ',
        isCorrect: false,
    },
    answer_data_334: {
        text: 'Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: false,
    },
    answer_data_335: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Oldalak >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: false,
    },
    answer_data_336: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: true,
    },
    answer_data_337: {
        text: 'Odagörgetek',
        isCorrect: false,
    },
    answer_data_338: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd Entert nyomok',
        isCorrect: false,
    },
    answer_data_339: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd Entert nyomok',
        isCorrect: true,
    },
    answer_data_340: {
        text: 'Az A1 cellába beírom, hogy X789654, majd Entert nyomok',
        isCorrect: false,
    },
    answer_data_341: {
        text: 'Átírómenü',
        isCorrect: false,
    },
    answer_data_342: {
        text: 'Szerkesztőléc',
        isCorrect: true,
    },
    answer_data_343: {
        text: 'Edit menü',
        isCorrect: false,
    },
    answer_data_344: {
        text: 'Szerkesztőcsík',
        isCorrect: false,
    },
    answer_data_345: {
        text: ' Egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        isCorrect: false,
    },
    answer_data_346: {
        text: 'Jobb egérgombbal kattintok a lecserélni kívánt munkalapon',
        isCorrect: false,
    },
    answer_data_347: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        isCorrect: false,
    },
    answer_data_348: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére lent',
        isCorrect: true,
    },
    answer_data_349: {
        text: 'Bal felső',
        isCorrect: true,
    },
    answer_data_350: {
        text: 'Bal alsó',
        isCorrect: false,
    },
    answer_data_351: {
        text: 'Jobb alsó',
        isCorrect: false,
    },
    answer_data_352: {
        text: 'Jobb felső',
        isCorrect: false,
    },
    answer_data_353: {
        text: 'Beírom, hogy "hatvány"',
        isCorrect: false,
    },
    answer_data_354: {
        text: 'Beírom, hogy "*"',
        isCorrect: false,
    },
    answer_data_355: {
        text: 'Beírom, hogy "^"',
        isCorrect: true,
    },
    answer_data_358: {
        text: 'A szerkesztőlécen a számításban a "Pi()"-t használom',
        isCorrect: true,
    },
    answer_data_359: {
        text: 'A Pi-t használom',
        isCorrect: false,
    },
    answer_data_360: {
        text: '3,141592654',
        isCorrect: false,
    },
    answer_data_361: {
        text: '"B4*B5"',
        isCorrect: false,
    },
    answer_data_362: {
        text: '"B4 * B5"',
        isCorrect: false,
    },
    answer_data_363: {
        text: '"=B4XB5"',
        isCorrect: false,
    },
    answer_data_364: {
        text: '"=B4*B5"',
        isCorrect: true,
    },
    answer_data_365: {
        text: 'Pipa',
        isCorrect: false,
    },
    answer_data_366: {
        text: 'Ragasztószalag',
        isCorrect: false,
    },
    answer_data_367: {
        text: 'Ecset',
        isCorrect: true,
    },
    answer_data_368: {
        text: 'Kalapács',
        isCorrect: false,
    },
    answer_data_369: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_370: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_371: {
        text: 'Egyszerre maximum 3 feltétel',
        isCorrect: false,
    },
    answer_data_372: {
        text: 'Egyszerre maximum 5 feltétel',
        isCorrect: false,
    },
    answer_data_373: {
        text: '[Zöld]; [Kék]##;[Piros]-##;',
        isCorrect: false,
    },
    answer_data_374: {
        text: '[Kék]##;[Piros]-##;[Zöld]',
        isCorrect: true,
    },
    answer_data_375: {
        text: '[Kék]##;[Piros]##;[Zöld]',
        isCorrect: false,
    },
    answer_data_376: {
        text: '[Piros]-##;[Kék]##;[Zöld]',
        isCorrect: false,
    },
    answer_data_377: {
        text: 'A számok közé Entert ütök',
        isCorrect: false,
    },
    answer_data_378: {
        text: 'A számok közé szóközt ütök',
        isCorrect: false,
    },
    answer_data_379: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menüszalagon)',
        isCorrect: true,
    },
    answer_data_380: {
        text: 'A számok közé Tab-ot ütök',
        isCorrect: false,
    },
    answer_data_381: {
        text: 'Igen, de csak fél, harmad és negyed törtekkel',
        isCorrect: false,
    },
    answer_data_382: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_384: {
        text: 'Igen, a számformátumnál kell beállítani a törteket',
        isCorrect: true,
    },
    answer_data_385: {
        text: '[Zöld]0;[Kék]##;[Piros]-##;[Sárga]',
        isCorrect: false,
    },
    answer_data_386: {
        text: '##[Kék];-##[Piros];[Zöld]0;[Sárga]',
        isCorrect: false,
    },
    answer_data_387: {
        text: '[Sárga];[Kék]##;[Piros]-##;[Zöld]0',
        isCorrect: false,
    },
    answer_data_388: {
        text: '[Kék]##;[Piros]-##;[Zöld]0;[Sárga]',
        isCorrect: true,
    },
    answer_data_389: {
        text: 'Nézet menü',
        isCorrect: false,
    },
    answer_data_390: {
        text: 'Kezdőlap >> Betűtípus (párbeszédablak) >> Szegély',
        isCorrect: true,
    },
    answer_data_391: {
        text: 'Kezdőlap >> Szegély',
        isCorrect: false,
    },
    answer_data_392: {
        text: 'Szegélyek',
        isCorrect: false,
    },
    answer_data_393: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 3 és 3',
        isCorrect: false,
    },
    answer_data_394: {
        text: 'Formátum >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: false,
    },
    answer_data_395: {
        text: ' Feltételes formázás >> Kezdőlap >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: false,
    },
    answer_data_396: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: true,
    },
    answer_data_397: {
        text: 'Kezdőlap >>Cellastílusok >> Adatsávok >> További szabályok',
        isCorrect: false,
    },
    answer_data_398: {
        text: 'Kezdőlap >> Formázás táblázatként',
        isCorrect: false,
    },
    answer_data_399: {
        text: 'Kezdőlap >> Formázás táblázatként >> Adatsávok >> További szabályok',
        isCorrect: false,
    },
    answer_data_400: {
        text: 'Kezdőlap >> Feltételes formázás >> Adatsávok >> További szabályok',
        isCorrect: true,
    },
    answer_data_401: {
        text: 'Kezdőlap >> Feltételes formázás >> Értékgörbe',
        isCorrect: false,
    },
    answer_data_402: {
        text: 'Kezdőlap >> Feltételes formázás >> Adatok >> Értékgörbe',
        isCorrect: false,
    },
    answer_data_403: {
        text: 'Kezdőlap >> Feltételes formázás >> Értékgörbe beillesztése',
        isCorrect: false,
    },
    answer_data_404: {
        text: 'Beszúrás >> Értékgörbe',
        isCorrect: true,
    },
    answer_data_405: {
        text: 'Kijelölöm a sorokat, "f8"; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_406: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: true,
    },
    answer_data_407: {
        text: 'Kijelölöm a sorokat, bal klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_408: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_409: {
        text: 'Jobb klikk az oszlop betűjelére és a helyi menüben az "elrejtés"-re kattintok',
        isCorrect: true,
    },
    answer_data_410: {
        text: 'Jobb klikk az oszlop betűjelére és "Hide" billentyű a billentyűzeten',
        isCorrect: false,
    },
    answer_data_411: {
        text: 'Bal klikk az oszlop betűjelére és a helyi menüben az "elrejtés"-re kattintok',
        isCorrect: false,
    },
    answer_data_412: {
        text: 'Bal klikk az oszlop betűjelére és "Hide" billentyű a billentyűzeten',
        isCorrect: false,
    },
    answer_data_413: {
        text: 'Az adattartományra kattintok, majd a Kezdőlap menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: true,
    },
    answer_data_414: {
        text: 'Az adattartományra kattintok, majd a Adatok menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_415: {
        text: 'Az adattartományra kattintok, majd a Nézet menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_416: {
        text: 'Az adattartományra kattintok, majd a Képletek menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_417: {
        text: 'Vágólap',
        isCorrect: false,
    },
    answer_data_418: {
        text: 'Betűtípus',
        isCorrect: true,
    },
    answer_data_419: {
        text: 'Igazítás',
        isCorrect: false,
    },
    answer_data_420: {
        text: 'Szám',
        isCorrect: false,
    },
    answer_data_421: {
        text: '"=ÁTLAG(B2:B20)"',
        isCorrect: true,
    },
    answer_data_422: {
        text: '"ÁTLAG(B2:B20)"',
        isCorrect: false,
    },
    answer_data_423: {
        text: '"=ÁTLAG(B2;B20)"',
        isCorrect: false,
    },
    answer_data_424: {
        text: '"=ÁTLAG(B2 B20)"',
        isCorrect: false,
    },
    answer_data_425: {
        text: '"=MÓDUSZ.EGY(B2;B20)"',
        isCorrect: false,
    },
    answer_data_426: {
        text: '"=MÓDUSZ(B2,B20)"',
        isCorrect: false,
    },
    answer_data_427: {
        text: '"=MÓDUSZ.EGY(B2:B20)"',
        isCorrect: true,
    },
    answer_data_428: {
        text: '"=MÓDUSZ.EGY(B2 B20)"',
        isCorrect: false,
    },
    answer_data_429: {
        text: '"DARABTELI(B2:B20;2)"',
        isCorrect: false,
    },
    answer_data_430: {
        text: '"=DARABTELI(B2:B20;5)"',
        isCorrect: false,
    },
    answer_data_431: {
        text: '"=DARABTELI(2;B2:B20)"',
        isCorrect: false,
    },
    answer_data_432: {
        text: '"=DARABTELI(B2:B20;2)"',
        isCorrect: true,
    },
    answer_data_433: {
        text: 'f7',
        isCorrect: false,
    },
    answer_data_434: {
        text: 'f8',
        isCorrect: false,
    },
    answer_data_435: {
        text: 'f9',
        isCorrect: true,
    },
    answer_data_436: {
        text: 'f10',
        isCorrect: false,
    },
    answer_data_441: {
        text: 'Több darabot számol egy tartományban',
        isCorrect: false,
    },
    answer_data_442: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az összes kritérium',
        isCorrect: true,
    },
    answer_data_443: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az több kritérium',
        isCorrect: false,
    },
    answer_data_357: {
        text: 'Nem tudunk ezzel számolni',
        isCorrect: false,
    },
    answer_data_383: {
        text: 'Nem, nem tudja kezelni az Excel a tört számokat',
        isCorrect: false,
    },
    answer_data_437: {
        text: 'JÓ, ROSSZ',
        isCorrect: false,
    },
    answer_data_438: {
        text: 'OK, NEM OK',
        isCorrect: false,
    },
    answer_data_439: {
        text: 'IGAZ, HAMIS',
        isCorrect: true,
    },
    answer_data_440: {
        text: 'Nincs kimeneti üzenete',
        isCorrect: false,
    },
    answer_data_444: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az 3 kritérium',
        isCorrect: false,
    },
    answer_data_474: {
        text: 'Nem tudom felfedni az oszlopot, ha már elrejtettem',
        isCorrect: false,
    },
    answer_data_449: {
        text: '"=KEREKÍTÉS(A1;3)"',
        isCorrect: true,
    },
    answer_data_450: {
        text: '"=KEREKÍTÉS(A1;0;3)"',
        isCorrect: false,
    },
    answer_data_451: {
        text: '"=KEREKÍTÉS(A1;111)"',
        isCorrect: false,
    },
    answer_data_452: {
        text: '"=KEREKÍTÉS(A1;000)"',
        isCorrect: false,
    },
    answer_data_453: {
        text: '"=AZONOS(B22345-Z123498)"',
        isCorrect: false,
    },
    answer_data_454: {
        text: '"=AZONOS(B2234.Z123498)"',
        isCorrect: false,
    },
    answer_data_455: {
        text: '"=AZONOS(B22345,Z123498)"',
        isCorrect: false,
    },
    answer_data_456: {
        text: '"=AZONOS(B22345;Z123498)"',
        isCorrect: true,
    },
    answer_data_457: {
        text: '"=VAGY(B2=Ford&C2="piros)"',
        isCorrect: false,
    },
    answer_data_458: {
        text: '"=VAGY(B2=Ford:C2="piros)"',
        isCorrect: false,
    },
    answer_data_459: {
        text: '"=VAGY(B2<=Ford;C2>="piros)"',
        isCorrect: false,
    },
    answer_data_460: {
        text: '"=VAGY(B2=Ford;C2="piros)"',
        isCorrect: true,
    },
    answer_data_461: {
        text: 'Lent',
        isCorrect: true,
    },
    answer_data_462: {
        text: 'Felugró párbeszédablakban',
        isCorrect: false,
    },
    answer_data_463: {
        text: 'Legördülő listán',
        isCorrect: false,
    },
    answer_data_464: {
        text: 'A zöld csíkon a gyorselérési eszköztárban',
        isCorrect: false,
    },
    answer_data_465: {
        text: 'Szélesebb sorral',
        isCorrect: false,
    },
    answer_data_466: {
        text: 'Szélesebb oszloppal',
        isCorrect: true,
    },
    answer_data_467: {
        text: 'Ellenőrzöm a képletet',
        isCorrect: false,
    },
    answer_data_468: {
        text: 'Megkeresem a hiányzó hivatkozást',
        isCorrect: false,
    },
    answer_data_469: {
        text: 'Bal alsó sarok',
        isCorrect: false,
    },
    answer_data_470: {
        text: 'Jobb alsó sarok',
        isCorrect: false,
    },
    answer_data_471: {
        text: 'Jobb felső sarok',
        isCorrect: false,
    },
    answer_data_472: {
        text: 'Bal felső sarok',
        isCorrect: true,
    },
    answer_data_473: {
        text: 'Kijelölöm a B oszlopot, majd jobb klikk az oszlop betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        isCorrect: false,
    },
    answer_data_477: {
        text: 'Kezdőlap',
        isCorrect: false,
    },
    answer_data_478: {
        text: 'Nézet',
        isCorrect: false,
    },
    answer_data_479: {
        text: 'Adatok',
        isCorrect: false,
    },
    answer_data_480: {
        text: 'Képletek',
        isCorrect: true,
    },
    answer_data_482: {
        text: 'Igen: Kezdőlap >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: true,
    },
    answer_data_483: {
        text: 'Igen: Kezdőlap >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_484: {
        text: 'Igen: Adatok >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_485: {
        text: 'az angol szavakat',
        isCorrect: false,
    },
    answer_data_486: {
        text: 'a magyar szavakat',
        isCorrect: false,
    },
    answer_data_487: {
        text: 'a csupa nagybetűs szavakat',
        isCorrect: true,
    },
    answer_data_488: {
        text: 'a csupa dőlt betűs szavakat',
        isCorrect: false,
    },
    answer_data_489: {
        text: 'CTRL+Q',
        isCorrect: false,
    },
    answer_data_490: {
        text: 'CTRL+Á',
        isCorrect: false,
    },
    answer_data_491: {
        text: 'CTRL+H',
        isCorrect: false,
    },
    answer_data_492: {
        text: 'CTRL+K',
        isCorrect: true,
    },
    answer_data_493: {
        text: 'Nincs',
        isCorrect: false,
    },
    answer_data_494: {
        text: 'Az esetvizsgáló párbeszédablakán a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        isCorrect: true,
    },
    answer_data_495: {
        text: 'Az NÉZET menün a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        isCorrect: false,
    },
    answer_data_496: {
        text: 'Az esetvizsgáló párbeszédablakán a "Összes"-re kattintok és új munkalapon látom az eredményeket',
        isCorrect: false,
    },
    answer_data_497: {
        text: 'Az a cella, amit az Excel átalakít a számítással',
        isCorrect: false,
    },
    answer_data_498: {
        text: 'Az a cella, ahová a kamatot írom be',
        isCorrect: false,
    },
    answer_data_499: {
        text: 'Az a cella, ahová a célértéket írom be',
        isCorrect: true,
    },
    answer_data_500: {
        text: 'Az a cella, ahová az Excel a célértéket szűri le',
        isCorrect: false,
    },
    answer_data_501: {
        text: 'Kezdőlap menü >> Új megjegyzés',
        isCorrect: false,
    },
    answer_data_502: {
        text: 'Adatok menü >> Új megjegyzés',
        isCorrect: false,
    },
    answer_data_503: {
        text: 'Véleményezés menü >> Új megjegyzés',
        isCorrect: true,
    },
    answer_data_504: {
        text: 'Hivatkozások menü >> Új megjegyzés',
        isCorrect: false,
    },
    answer_data_505: {
        text: 'A képre a jobb egérgombbal kattintok és elhúzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: false,
    },
    answer_data_506: {
        text: 'A képre a jobb egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: false,
    },
    answer_data_507: {
        text: 'A képre a bal egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: true,
    },
    answer_data_508: {
        text: 'A képre a jobb egérgombbal háromszor kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: false,
    },
    answer_data_509: {
        text: 'Jobb klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        isCorrect: true,
    },
    answer_data_510: {
        text: 'Bal klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        isCorrect: false,
    },
    answer_data_511: {
        text: 'Jobb klikk a képre >> Kitöltés képpel vagy anyagmintával',
        isCorrect: false,
    },
    answer_data_512: {
        text: 'Nem lehet',
        isCorrect: false,
    },
    answer_data_513: {
        text: '1',
        isCorrect: false,
    },
    answer_data_514: {
        text: '2',
        isCorrect: false,
    },
    answer_data_515: {
        text: '3',
        isCorrect: true,
    },
    answer_data_516: {
        text: '4',
        isCorrect: false,
    },
    answer_data_517: {
        text: 'Bal oldalon',
        isCorrect: false,
    },
    answer_data_518: {
        text: 'Jobb klikk a képre és a helyi menü alatt, a Stílus mellett jobbra van a körülvágás',
        isCorrect: false,
    },
    answer_data_519: {
        text: 'Jobb klikk a képre és a helyi menü közepén van a körülvágás',
        isCorrect: false,
    },
    answer_data_520: {
        text: 'Jobb klikk a képre és a helyi menü felett, a Stílus mellett jobbra van a körülvágás',
        isCorrect: true,
    },
    answer_data_521: {
        text: 'Igen. A WordArt-ra jobb egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        isCorrect: true,
    },
    answer_data_522: {
        text: 'Igen. A WordArt-ra duplán a bal egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        isCorrect: false,
    },
    answer_data_523: {
        text: 'Igen. A WordArt jobb egérgombbal kattintok >> Beszúrás >> Kép',
        isCorrect: false,
    },
    answer_data_524: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_525: {
        text: 'Sehogy',
        isCorrect: false,
    },
    answer_data_526: {
        text: 'Beszúrás >> Szimbólum',
        isCorrect: true,
    },
    answer_data_527: {
        text: 'AltGr+I billentyűkombináció',
        isCorrect: false,
    },
    answer_data_528: {
        text: 'Jobb klikk és AltGr',
        isCorrect: false,
    },
    answer_data_529: {
        text: 'Kezdőlap',
        isCorrect: false,
    },
    answer_data_530: {
        text: 'Formátum',
        isCorrect: false,
    },
    answer_data_531: {
        text: 'Beszúrás >> Egyenlet >> Szabadkézi egyenlet',
        isCorrect: true,
    },
    answer_data_532: {
        text: 'Képletek',
        isCorrect: false,
    },
    answer_data_533: {
        text: '"SZUMHA(A2:A27;"Mintaférj";B2:B27)"',
        isCorrect: true,
    },
    answer_data_534: {
        text: '"SZUNHA(A2:A27;"Mintaférj";B2:B27)',
        isCorrect: false,
    },
    answer_data_535: {
        text: '"SZUMHA(A2:A27;"Mintaférj":B2:B27)"',
        isCorrect: false,
    },
    answer_data_475: {
        text: 'Kijelölöm az A:C oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        isCorrect: true,
    },
    answer_data_476: {
        text: 'Csak egy oszlopot nem lehet felfedni',
        isCorrect: false,
    },
    answer_data_481: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_536: {
        text: '"SZUMHA("Mintaférj";A2:A27;B2:B27)"',
        isCorrect: false,
    },
    answer_data_537: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és jobb egérgombbal leokézom',
        isCorrect: false,
    },
    answer_data_538: {
        text: 'Kijelölöm a táblázatot >> Adatokeszközök menü >> Ismétlődések eltávolítása >> és leokézom',
        isCorrect: false,
    },
    answer_data_539: {
        text: 'Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        isCorrect: false,
    },
    answer_data_540: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        isCorrect: true,
    },
    answer_data_541: {
        text: 'Ha védem a táblázatot az adatvesztéstől',
        isCorrect: false,
    },
    answer_data_542: {
        text: 'Ha többen használunk egy táblázatot, és el akarom kerülni a hibákat',
        isCorrect: true,
    },
    answer_data_543: {
        text: 'Ha színesebb a táblázat',
        isCorrect: false,
    },
    answer_data_544: {
        text: 'Ha makrókat tiltok le vele',
        isCorrect: false,
    },
    answer_data_545: {
        text: 'Megengedve >> Szöveghossz >> minimum 0; maximum 6',
        isCorrect: true,
    },
    answer_data_546: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 6',
        isCorrect: false,
    },
    answer_data_547: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 7',
        isCorrect: false,
    },
    answer_data_548: {
        text: 'Megengedve >> Szöveghossz >> minimum 5; maximum 6',
        isCorrect: false,
    },
    answer_data_549: {
        text: 'Mert ha tagolva van és nem szám a formátum, akkor a tagolást szóköznek veszi az Excel és nem fog tudni számolni',
        isCorrect: true,
    },
    answer_data_550: {
        text: 'Mert így kevesebb lesz az adat, amit át kell konvertálni',
        isCorrect: false,
    },
    answer_data_551: {
        text: 'Nem kell',
        isCorrect: false,
    },
    answer_data_552: {
        text: 'Mert tizedes törtet nem tud átkonvertálni',
        isCorrect: false,
    },
    answer_data_553: {
        text: 'Semmi hiba nem történik',
        isCorrect: false,
    },
    answer_data_554: {
        text: 'Üres cellákat kapok',
        isCorrect: false,
    },
    answer_data_555: {
        text: 'Mindent kétszer ír ki',
        isCorrect: false,
    },
    answer_data_556: {
        text: 'Az Excel az egész táblázatot átmásolja szűrés helyett',
        isCorrect: true,
    },
    answer_data_558: {
        text: 'Áttekinthetőbb lesz a táblázat, a felesleges adatokat törli az Excel',
        isCorrect: false,
    },
    answer_data_559: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak másik munkalapra menti',
        isCorrect: false,
    },
    answer_data_561: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Elő 10 Százalék',
        isCorrect: false,
    },
    answer_data_562: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Elő 10 Százalék',
        isCorrect: false,
    },
    answer_data_563: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Elő 10 Tétel',
        isCorrect: true,
    },
    answer_data_564: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Elő 10 Tétel',
        isCorrect: false,
    },
    answer_data_565: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: CÉGNÉV és RENDELÉS ÖSSZEGE',
        isCorrect: false,
    },
    answer_data_566: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        isCorrect: false,
    },
    answer_data_567: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS IDŐPONTJA',
        isCorrect: false,
    },
    answer_data_568: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        isCorrect: true,
    },
    answer_data_569: {
        text: 'Igen',
        isCorrect: false,
    },
    answer_data_570: {
        text: 'Nem',
        isCorrect: true,
    },
    answer_data_571: {
        text: 'Igen, de csak oszlopokból',
        isCorrect: false,
    },
    answer_data_572: {
        text: 'Igen, maximum 3 különálló sorból',
        isCorrect: false,
    },
    answer_data_573: {
        text: 'Igen, de csak szaggatott vonallal',
        isCorrect: false,
    },
    answer_data_574: {
        text: 'Igen, de csak dupla vonallal',
        isCorrect: false,
    },
    answer_data_575: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_576: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_577: {
        text: 'Kép formázása',
        isCorrect: true,
    },
    answer_data_578: {
        text: 'Adatok formázása',
        isCorrect: false,
    },
    answer_data_579: {
        text: 'Adatlap formázása',
        isCorrect: false,
    },
    answer_data_580: {
        text: 'Betűtípus formázása',
        isCorrect: false,
    },
    answer_data_581: {
        text: 'A hátteret',
        isCorrect: false,
    },
    answer_data_582: {
        text: 'A diagram hátterét',
        isCorrect: false,
    },
    answer_data_583: {
        text: 'A diagramterületet',
        isCorrect: true,
    },
    answer_data_584: {
        text: 'A területhátteret',
        isCorrect: false,
    },
    answer_data_585: {
        text: 'Adatok >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> int >> Korlátozó feltétel: Egész szám >> Ok',
        isCorrect: false,
    },
    answer_data_586: {
        text: 'Korlátozó felvétel felvétele párbeszédablak >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> int >> Korlátozó feltétel: Egész szám >> Ok',
        isCorrect: true,
    },
    answer_data_587: {
        text: 'Korlátozó felvétel felvétele párbeszédablak >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> bin >> Korlátozó feltétel: Egész szám >> Ok',
        isCorrect: false,
    },
    answer_data_588: {
        text: 'Korlátozó felvétel felvétele párbeszédablak >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> dif >> Korlátozó feltétel: Egész szám >> Ok',
        isCorrect: false,
    },
    answer_data_589: {
        text: 'A kijelöléshez a Shift+Del, majd beillesztéshez Ctrl+V',
        isCorrect: true,
    },
    answer_data_590: {
        text: 'A kijelöléshez a Ctrl+Shift+Del, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_591: {
        text: 'A kijelöléshez a Shift+AltGr, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_592: {
        text: 'A kijelöléshez a Ctrl+C, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_593: {
        text: 'Nincs',
        isCorrect: false,
    },
    answer_data_594: {
        text: 'Nincs, csak bonyolultabbá válik a folyamat',
        isCorrect: false,
    },
    answer_data_595: {
        text: 'Haladó szinten nincs különbség',
        isCorrect: false,
    },
    answer_data_596: {
        text: 'Haladóbb szinten a billentyűzettel gyorsabbak lehetünk',
        isCorrect: true,
    },
    answer_data_356: {
        text: 'Beírom, hogy "X"',
        isCorrect: false,
    },
    answer_data_597: {
        text: 'F4',
        isCorrect: false,
    },
    answer_data_598: {
        text: '&',
        isCorrect: false,
    },
    answer_data_599: {
        text: '@',
        isCorrect: false,
    },
    answer_data_600: {
        text: '$',
        isCorrect: true,
    },
    answer_data_601: {
        text: 'Könyvelési',
        isCorrect: false,
    },
    answer_data_602: {
        text: 'Tudományos',
        isCorrect: true,
    },
    answer_data_603: {
        text: 'Általános',
        isCorrect: false,
    },
    answer_data_604: {
        text: 'Szöveg',
        isCorrect: false,
    },
    answer_data_605: {
        text: 'Nézet >> Stílusok >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_606: {
        text: 'Kezdőlap >> Stílusok >> Új cellastílus',
        isCorrect: true,
    },
    answer_data_607: {
        text: 'Kezdőlap >> Nézetek >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_608: {
        text: 'Nem lehet ilyet beállítani',
        isCorrect: false,
    },
    answer_data_609: {
        text: 'Nem tudom változtatni az Excel táblázat hátterét',
        isCorrect: false,
    },
    answer_data_610: {
        text: 'Lapelrendezés >> Háttér >> Képek beszúrása ',
        isCorrect: true,
    },
    answer_data_611: {
        text: 'Beszúrás >> Képek beszúrása ',
        isCorrect: false,
    },
    answer_data_612: {
        text: '"=Hol.van("banán";A1:Z999999)"',
        isCorrect: false,
    },
    answer_data_613: {
        text: '"=HA(A1=0;"TEA";"KÁVÉ)"',
        isCorrect: true,
    },
    answer_data_614: {
        text: '"=HA(B2=0;"TEA";"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_615: {
        text: '"=HAA1(B2=0;"TEA";"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_616: {
        text: '"=HA(A1=0;"TEA";VAGY,"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_445: {
        text: '1900.01.01',
        isCorrect: true,
    },
    answer_data_447: {
        text: '1000.01.01',
        isCorrect: false,
    },
    answer_data_448: {
        text: '1800.01.01',
        isCorrect: false,
    },
    answer_data_446: {
        text: 'Időszámításunk kezdete',
        isCorrect: false,
    },
    answer_data_617: {
        text: 'Számolási hibát vét dátumnál',
        isCorrect: false,
    },
    answer_data_618: {
        text: 'Számolási hibát vét pénznemnél',
        isCorrect: false,
    },
    answer_data_619: {
        text: 'Több találat esetén is csak ez elsőt jeleníti meg',
        isCorrect: true,
    },
    answer_data_620: {
        text: 'Minden találatot megjelenít',
        isCorrect: false,
    },
    answer_data_621: {
        text: '"=KÖZÉP(A1;2;4)"',
        isCorrect: true,
    },
    answer_data_622: {
        text: '"=BAL(A1;2;4)"',
        isCorrect: false,
    },
    answer_data_623: {
        text: '"=KÖZÉP(A1;3;4;5;6)"',
        isCorrect: false,
    },
    answer_data_624: {
        text: '"=KÖZÉP(A1;2;.3.5.4)"',
        isCorrect: false,
    },
    answer_data_625: {
        text: 'pipa',
        isCorrect: false,
    },
    answer_data_626: {
        text: 'sx',
        isCorrect: false,
    },
    answer_data_627: {
        text: 'fx',
        isCorrect: true,
    },
    answer_data_628: {
        text: 'x',
        isCorrect: false,
    },
    answer_data_629: {
        text: 'Egyszerre csak 10 sort mutat',
        isCorrect: false,
    },
    answer_data_630: {
        text: 'Makrót futtat',
        isCorrect: false,
    },
    answer_data_631: {
        text: 'Színes stílus és gyors rendezés, valamint táblázatszintű műveletek',
        isCorrect: true,
    },
    answer_data_632: {
        text: 'Kevesebb adatot mutat, így átláthatóbb',
        isCorrect: false,
    },
    answer_data_633: {
        text: 'Alt+3',
        isCorrect: false,
    },
    answer_data_634: {
        text: 'AltGr+3',
        isCorrect: true,
    },
    answer_data_635: {
        text: 'Ctrl+3',
        isCorrect: false,
    },
    answer_data_636: {
        text: 'AltGr+Ctrl',
        isCorrect: false,
    },
    answer_data_637: {
        text: 'Rögtön azután, hogy beütöttem',
        isCorrect: false,
    },
    answer_data_638: {
        text: 'A következő leütött karakterrel együtt',
        isCorrect: true,
    },
    answer_data_639: {
        text: 'Nem jelenik meg',
        isCorrect: false,
    },
    answer_data_640: {
        text: 'A képlet véglegesítésénél',
        isCorrect: false,
    },
    answer_data_641: {
        text: '*',
        isCorrect: true,
    },
    answer_data_642: {
        text: 'X',
        isCorrect: false,
    },
    answer_data_643: {
        text: 'x',
        isCorrect: false,
    },
    answer_data_644: {
        text: '><',
        isCorrect: false,
    },
    answer_data_645: {
        text: 'ActiveCell = LÁTTAM',
        isCorrect: false,
    },
    answer_data_646: {
        text: 'ActiveCell = "LÁTTAM"',
        isCorrect: true,
    },
    answer_data_647: {
        text: 'Active.Cell = "LÁTTAM"',
        isCorrect: false,
    },
    answer_data_648: {
        text: 'ActiveCell = "LÁTTAM".',
        isCorrect: false,
    },
    answer_data_649: {
        text: 'Fájl menü (>> Egyebek) >> Beállítások >> Bővítmények >> Ugrás >> Solver >> OK',
        isCorrect: true,
    },
    answer_data_650: {
        text: 'Bővítmények >> Beállítások >> Ugrás >> Solver >> OK',
        isCorrect: false,
    },
    answer_data_651: {
        text: 'Fájl menü >> Solver >> OK',
        isCorrect: false,
    },
    answer_data_652: {
        text: 'Fejlesztőeszközök >> Solver >> OK',
        isCorrect: false,
    },
    answer_data_653: {
        text: 'pi',
        isCorrect: false,
    },
    answer_data_654: {
        text: 'p',
        isCorrect: false,
    },
    answer_data_655: {
        text: '𝝿',
        isCorrect: false,
    },
    answer_data_656: {
        text: '"PI()"',
        isCorrect: true,
    },
    answer_data_557: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak elrejti',
        isCorrect: true,
    },
    answer_data_560: {
        text: 'Az Excel a kiszűrt adatokat törli',
        isCorrect: false,
    },
    answer_data_657: {
        text: 'w',
        isCorrect: false,
    },
    answer_data_658: {
        text: 'x',
        isCorrect: true,
    },
    answer_data_659: {
        text: 'y',
        isCorrect: false,
    },
    answer_data_660: {
        text: 'z',
        isCorrect: false,
    },
    answer_data_661: {
        text: 'USB stick',
        isCorrect: false,
    },
    answer_data_662: {
        text: 'Floppy lemez',
        isCorrect: true,
    },
    answer_data_663: {
        text: 'DVD lemez',
        isCorrect: false,
    },
    answer_data_664: {
        text: 'SSD drive',
        isCorrect: false,
    },
    answer_data_665: {
        text: 'angol',
        isCorrect: true,
    },
    answer_data_666: {
        text: 'magyar',
        isCorrect: false,
    },
    answer_data_667: {
        text: 'semmilyen',
        isCorrect: false,
    },
    answer_data_668: {
        text: 'angol és magyar',
        isCorrect: false,
    },
    answer_data_669: {
        text: 'CTRL + B',
        isCorrect: false,
    },
    answer_data_670: {
        text: 'Kezdőlap >> Betűtipus >> Kattintok a "D"-re vagy CTRL + I',
        isCorrect: true,
    },
    answer_data_671: {
        text: 'CTRL + D',
        isCorrect: false,
    },
    answer_data_672: {
        text: 'F2',
        isCorrect: false,
    },
    answer_data_673: {
        text: 'Beszúrás menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        isCorrect: false,
    },
    answer_data_674: {
        text: 'Kijelölöm a szöveget >> Nézet menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        isCorrect: false,
    },
    answer_data_675: {
        text: 'Kijelölöm a szöveget >> Beszúrás menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        isCorrect: true,
    },
    answer_data_676: {
        text: 'Kijelölöm a szöveget >> Formátum menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        isCorrect: false,
    },
    answer_data_677: {
        text: 'CTRL + Z',
        isCorrect: false,
    },
    answer_data_678: {
        text: 'Tervezés menü >> Vízjel >> Vízjel eltávolítása',
        isCorrect: true,
    },
    answer_data_679: {
        text: 'Törlés gomb',
        isCorrect: false,
    },
    answer_data_680: {
        text: 'ALT + F4',
        isCorrect: false,
    },
    answer_data_681: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        isCorrect: false,
    },
    answer_data_682: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        isCorrect: false,
    },
    answer_data_683: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        isCorrect: false,
    },
    answer_data_684: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        isCorrect: true,
    },
    answer_data_685: {
        text: 'Nem lehet frissíteni',
        isCorrect: false,
    },
    answer_data_686: {
        text: 'Manuálisan kell átírni az oldalszámokat',
        isCorrect: false,
    },
    answer_data_687: {
        text: 'Kattintok a tartalomjegyzékre, majd a fent megjelenő "Frissítés"-re',
        isCorrect: true,
    },
    answer_data_688: {
        text: 'F2',
        isCorrect: false,
    },
    answer_data_689: {
        text: 'A Word kicsiben megmutatja, hogy mit írtam a jegyzetbe',
        isCorrect: true,
    },
    answer_data_690: {
        text: 'Törlődik a jegyzet',
        isCorrect: false,
    },
    answer_data_691: {
        text: 'Végjegyzet lesz a lábjegyzetből',
        isCorrect: false,
    },
    answer_data_692: {
        text: 'Semmi',
        isCorrect: false,
    },
    answer_data_693: {
        text: 'Nem lehet',
        isCorrect: false,
    },
    answer_data_694: {
        text: 'Lehet',
        isCorrect: true,
    },
    answer_data_695: {
        text: 'Lehet, de csak A5 méretben',
        isCorrect: false,
    },
    answer_data_696: {
        text: 'Lehet, de csak A4 méretben',
        isCorrect: false,
    },
    answer_data_697: {
        text: 'Floppilemez',
        isCorrect: false,
    },
    answer_data_698: {
        text: 'Pont',
        isCorrect: false,
    },
    answer_data_699: {
        text: 'Balra visszaforduló nyíl',
        isCorrect: true,
    },
    answer_data_700: {
        text: 'Jobbra visszaforduló nyíl',
        isCorrect: false,
    },
    answer_data_701: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás ',
        isCorrect: false,
    },
    answer_data_702: {
        text: 'Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: false,
    },
    answer_data_703: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Oldalak >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: false,
    },
    answer_data_704: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: true,
    },
    answer_data_705: {
        text: 'A kijelöléshez a Shift+Del, majd beillesztéshez Ctrl+V',
        isCorrect: true,
    },
    answer_data_706: {
        text: 'A kijelöléshez a Ctrl+Shift+Del, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_707: {
        text: 'A kijelöléshez a Shift+AltGr, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_708: {
        text: 'A kijelöléshez a Ctrl+C, majd beillesztéshez Ctrl+V',
        isCorrect: false,
    },
    answer_data_709: {
        text: 'Odagörgetek',
        isCorrect: false,
    },
    answer_data_710: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd Entert nyomok',
        isCorrect: false,
    },
    answer_data_711: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd Entert nyomok',
        isCorrect: true,
    },
    answer_data_712: {
        text: 'Az A1 cellába beírom, hogy X789654, majd Entert nyomok',
        isCorrect: false,
    },
    answer_data_713: {
        text: 'Nincs',
        isCorrect: false,
    },
    answer_data_714: {
        text: 'Nincs, csak bonyolultabbá válik a folyamat',
        isCorrect: false,
    },
    answer_data_715: {
        text: 'Haladó szinten nincs különbség',
        isCorrect: false,
    },
    answer_data_716: {
        text: 'Haladóbb szinten a billentyűzettel gyorsabbak lehetünk',
        isCorrect: true,
    },
    answer_data_717: {
        text: ' Egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        isCorrect: false,
    },
    answer_data_718: {
        text: 'Jobb egérgombbal kattintok a lecserélni kívánt munkalapon',
        isCorrect: false,
    },
    answer_data_719: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        isCorrect: false,
    },
    answer_data_1122: {
        text: 'Shift + Enter',
        isCorrect: false,
    },
    answer_data_720: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére lent',
        isCorrect: true,
    },
    answer_data_721: {
        text: 'Bal felső',
        isCorrect: true,
    },
    answer_data_722: {
        text: 'Bal alsó',
        isCorrect: false,
    },
    answer_data_723: {
        text: 'Jobb alsó',
        isCorrect: false,
    },
    answer_data_724: {
        text: 'Jobb felső',
        isCorrect: false,
    },
    answer_data_725: {
        text: 'Vágólap',
        isCorrect: false,
    },
    answer_data_726: {
        text: 'Betűtípus',
        isCorrect: true,
    },
    answer_data_727: {
        text: 'Igazítás',
        isCorrect: false,
    },
    answer_data_728: {
        text: 'Szám',
        isCorrect: false,
    },
    answer_data_729: {
        text: 'Beírom, hogy "hatvány"',
        isCorrect: false,
    },
    answer_data_730: {
        text: 'Beírom, hogy "*"',
        isCorrect: false,
    },
    answer_data_731: {
        text: 'Beírom, hogy "^"',
        isCorrect: true,
    },
    answer_data_732: {
        text: 'Beírom, hogy "X"',
        isCorrect: false,
    },
    answer_data_733: {
        text: 'A szerkesztőlécen a számításban a "Pi()"-t használom',
        isCorrect: true,
    },
    answer_data_734: {
        text: 'A Pi-t használom',
        isCorrect: false,
    },
    answer_data_735: {
        text: '3,141592654',
        isCorrect: false,
    },
    answer_data_736: {
        text: 'Nem tudunk ezzel számolni',
        isCorrect: false,
    },
    answer_data_737: {
        text: '"B4*B5"',
        isCorrect: false,
    },
    answer_data_738: {
        text: '"B4 * B5"',
        isCorrect: false,
    },
    answer_data_739: {
        text: '"=B4XB5"',
        isCorrect: false,
    },
    answer_data_740: {
        text: '"=B4*B5"',
        isCorrect: true,
    },
    answer_data_741: {
        text: 'F4',
        isCorrect: false,
    },
    answer_data_742: {
        text: '&',
        isCorrect: false,
    },
    answer_data_743: {
        text: '@',
        isCorrect: false,
    },
    answer_data_744: {
        text: '$',
        isCorrect: true,
    },
    answer_data_745: {
        text: 'Rögtön azután, hogy beütöttem',
        isCorrect: false,
    },
    answer_data_746: {
        text: 'A következő leütött karakterrel együtt',
        isCorrect: true,
    },
    answer_data_747: {
        text: 'Nem jelenik meg',
        isCorrect: false,
    },
    answer_data_748: {
        text: 'A képlet véglegesítésénél',
        isCorrect: false,
    },
    answer_data_749: {
        text: 'Vágólap',
        isCorrect: false,
    },
    answer_data_750: {
        text: 'Betűtípus',
        isCorrect: true,
    },
    answer_data_751: {
        text: 'Igazítás',
        isCorrect: false,
    },
    answer_data_752: {
        text: 'Szám',
        isCorrect: false,
    },
    answer_data_753: {
        text: 'Pipa',
        isCorrect: false,
    },
    answer_data_754: {
        text: 'Ragasztószalag',
        isCorrect: false,
    },
    answer_data_755: {
        text: 'Ecset',
        isCorrect: true,
    },
    answer_data_756: {
        text: 'Kalapács',
        isCorrect: false,
    },
    answer_data_757: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_758: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_759: {
        text: 'Egyszerre maximum 3 feltétel',
        isCorrect: false,
    },
    answer_data_760: {
        text: 'Egyszerre maximum 5 feltétel',
        isCorrect: false,
    },
    answer_data_761: {
        text: '[Zöld]; [Kék]##;[Piros]-##;',
        isCorrect: false,
    },
    answer_data_762: {
        text: '[Kék]##;[Piros]-##;[Zöld]',
        isCorrect: true,
    },
    answer_data_763: {
        text: '[Kék]##;[Piros]##;[Zöld]',
        isCorrect: false,
    },
    answer_data_764: {
        text: '[Piros]-##;[Kék]##;[Zöld]',
        isCorrect: false,
    },
    answer_data_765: {
        text: 'Igen, de csak fél, harmad és negyed törtekkel',
        isCorrect: false,
    },
    answer_data_766: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_767: {
        text: 'Igen, a számformátumnál kell beállítani a törteket',
        isCorrect: true,
    },
    answer_data_768: {
        text: 'Nem, nem tudja kezelni az Excel a tört számokat',
        isCorrect: false,
    },
    answer_data_769: {
        text: 'Nézet >> Stílusok >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_770: {
        text: 'Kezdőlap >> Stílusok >> Új cellastílus',
        isCorrect: true,
    },
    answer_data_771: {
        text: 'Kezdőlap >> Nézetek >> Egyebek >> Új cellastílus',
        isCorrect: false,
    },
    answer_data_772: {
        text: 'Nem lehet ilyet beállítani',
        isCorrect: false,
    },
    answer_data_773: {
        text: 'Nézet menü',
        isCorrect: false,
    },
    answer_data_774: {
        text: 'Kezdőlap >> Betűtípus (párbeszédablak) >> Szegély',
        isCorrect: true,
    },
    answer_data_775: {
        text: 'Kezdőlap >> Szegély',
        isCorrect: false,
    },
    answer_data_776: {
        text: 'Szegélyek',
        isCorrect: false,
    },
    answer_data_777: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 3 és 3',
        isCorrect: false,
    },
    answer_data_778: {
        text: 'Formátum >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: false,
    },
    answer_data_779: {
        text: ' Feltételes formázás >> Kezdőlap >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: false,
    },
    answer_data_781: {
        text: 'Kijelölöm a sorokat, "f8"; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_782: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: true,
    },
    answer_data_783: {
        text: 'Kijelölöm a sorokat, bal klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_784: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben megadom az általam kívánt értéket',
        isCorrect: false,
    },
    answer_data_785: {
        text: 'Nem tudom változtatni az Excel táblázat hátterét',
        isCorrect: false,
    },
    answer_data_786: {
        text: 'Lapelrendezés >> Háttér >> Képek beszúrása ',
        isCorrect: true,
    },
    answer_data_787: {
        text: 'Beszúrás >> Képek beszúrása ',
        isCorrect: false,
    },
    answer_data_788: {
        text: '"=Hol.van("banán";A1:Z999999)"',
        isCorrect: false,
    },
    answer_data_793: {
        text: '"=MÓDUSZ.EGY(B2;B20)"',
        isCorrect: false,
    },
    answer_data_794: {
        text: '"=MÓDUSZ(B2,B20)"',
        isCorrect: false,
    },
    answer_data_795: {
        text: '"=MÓDUSZ.EGY(B2:B20)"',
        isCorrect: true,
    },
    answer_data_796: {
        text: '"=MÓDUSZ.EGY(B2 B20)"',
        isCorrect: false,
    },
    answer_data_797: {
        text: '"DARABTELI(B2:B20;2)"',
        isCorrect: false,
    },
    answer_data_798: {
        text: '"=DARABTELI(B2:B20;5)"',
        isCorrect: false,
    },
    answer_data_799: {
        text: '"=DARABTELI(2;B2:B20)"',
        isCorrect: false,
    },
    answer_data_800: {
        text: '"=DARABTELI(B2:B20;2)"',
        isCorrect: true,
    },
    answer_data_801: {
        text: '"=HA(A1=0;"TEA";"KÁVÉ)"',
        isCorrect: true,
    },
    answer_data_802: {
        text: '"=HA(B2=0;"TEA";"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_803: {
        text: '"=HAA1(B2=0;"TEA";"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_804: {
        text: '"=HA(A1=0;"TEA";VAGY,"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_805: {
        text: 'JÓ, ROSSZ',
        isCorrect: false,
    },
    answer_data_806: {
        text: 'OK, NEM OK',
        isCorrect: false,
    },
    answer_data_807: {
        text: 'IGAZ, HAMIS',
        isCorrect: true,
    },
    answer_data_808: {
        text: 'Nincs kimeneti üzenete',
        isCorrect: false,
    },
    answer_data_809: {
        text: 'Több darabot számol egy tartományban',
        isCorrect: false,
    },
    answer_data_810: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az összes kritérium',
        isCorrect: true,
    },
    answer_data_811: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az több kritérium',
        isCorrect: false,
    },
    answer_data_812: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az 3 kritérium',
        isCorrect: false,
    },
    answer_data_813: {
        text: '1900.01.01',
        isCorrect: true,
    },
    answer_data_814: {
        text: '1000.01.01',
        isCorrect: false,
    },
    answer_data_815: {
        text: '1800.01.01',
        isCorrect: false,
    },
    answer_data_816: {
        text: 'Időszámításunk kezdete',
        isCorrect: false,
    },
    answer_data_817: {
        text: 'Számolási hibát vét dátumnál',
        isCorrect: false,
    },
    answer_data_818: {
        text: 'Számolási hibát vét pénznemnél',
        isCorrect: false,
    },
    answer_data_819: {
        text: 'Több találat esetén is csak ez elsőt jeleníti meg',
        isCorrect: true,
    },
    answer_data_820: {
        text: 'Minden találatot megjelenít',
        isCorrect: false,
    },
    answer_data_821: {
        text: '"=KEREKÍTÉS(A1;3)"',
        isCorrect: true,
    },
    answer_data_822: {
        text: '"=KEREKÍTÉS(A1;0;3)"',
        isCorrect: false,
    },
    answer_data_823: {
        text: '"=KEREKÍTÉS(A1;111)"',
        isCorrect: false,
    },
    answer_data_824: {
        text: '"=KEREKÍTÉS(A1;000)"',
        isCorrect: false,
    },
    answer_data_780: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: true,
    },
    answer_data_825: {
        text: '"SZUMHA(A2:A27;"Mintaférj";B2:B27)"',
        isCorrect: true,
    },
    answer_data_826: {
        text: '"SZUNHA(A2:A27;"Mintaférj";B2:B27)',
        isCorrect: false,
    },
    answer_data_827: {
        text: '"SZUMHA(A2:A27;"Mintaférj":B2:B27)"',
        isCorrect: false,
    },
    answer_data_828: {
        text: '"SZUMHA("Mintaférj";A2:A27;B2:B27)"',
        isCorrect: false,
    },
    answer_data_829: {
        text: 'pipa',
        isCorrect: false,
    },
    answer_data_830: {
        text: 'sx',
        isCorrect: false,
    },
    answer_data_831: {
        text: 'fx',
        isCorrect: true,
    },
    answer_data_832: {
        text: 'x',
        isCorrect: false,
    },
    answer_data_833: {
        text: 'Lent',
        isCorrect: true,
    },
    answer_data_834: {
        text: 'Felugró párbeszédablakban',
        isCorrect: false,
    },
    answer_data_835: {
        text: 'Legördülő listán',
        isCorrect: false,
    },
    answer_data_836: {
        text: 'A zöld csíkon a gyorselérési eszköztárban',
        isCorrect: false,
    },
    answer_data_837: {
        text: 'Szélesebb sorral',
        isCorrect: false,
    },
    answer_data_838: {
        text: 'Szélesebb oszloppal',
        isCorrect: true,
    },
    answer_data_839: {
        text: 'Ellenőrzöm a képletet',
        isCorrect: false,
    },
    answer_data_840: {
        text: 'Megkeresem a hiányzó hivatkozást',
        isCorrect: false,
    },
    answer_data_841: {
        text: 'Igen: Kezdőlap >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: true,
    },
    answer_data_842: {
        text: 'Igen: Kezdőlap >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_843: {
        text: 'Igen: Adatok >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        isCorrect: false,
    },
    answer_data_844: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_845: {
        text: 'az angol szavakat',
        isCorrect: false,
    },
    answer_data_846: {
        text: 'a magyar szavakat',
        isCorrect: false,
    },
    answer_data_847: {
        text: 'a csupa nagybetűs szavakat',
        isCorrect: true,
    },
    answer_data_848: {
        text: 'a csupa dőlt betűs szavakat',
        isCorrect: false,
    },
    answer_data_849: {
        text: 'CTRL+Q',
        isCorrect: false,
    },
    answer_data_850: {
        text: 'CTRL+Á',
        isCorrect: false,
    },
    answer_data_851: {
        text: 'CTRL+H',
        isCorrect: false,
    },
    answer_data_852: {
        text: 'CTRL+K',
        isCorrect: true,
    },
    answer_data_853: {
        text: 'Nincs',
        isCorrect: false,
    },
    answer_data_854: {
        text: 'Az esetvizsgáló párbeszédablakán a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        isCorrect: true,
    },
    answer_data_855: {
        text: 'Az NÉZET menün a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        isCorrect: false,
    },
    answer_data_856: {
        text: 'Az esetvizsgáló párbeszédablakán a "Összes"-re kattintok és új munkalapon látom az eredményeket',
        isCorrect: false,
    },
    answer_data_857: {
        text: 'Az a cella, amit az Excel átalakít a számítással',
        isCorrect: false,
    },
    answer_data_858: {
        text: 'Az a cella, ahová a kamatot írom be',
        isCorrect: false,
    },
    answer_data_859: {
        text: 'Az a cella, ahová a célértéket írom be',
        isCorrect: true,
    },
    answer_data_860: {
        text: 'Az a cella, ahová az Excel a célértéket szűri le',
        isCorrect: false,
    },
    answer_data_861: {
        text: 'Írásvédett lesz.',
        isCorrect: false,
    },
    answer_data_862: {
        text: 'Törölhetetlen lesz.',
        isCorrect: false,
    },
    answer_data_863: {
        text: 'A Word fájlmenüjében rögzítem a fájlt, hogy mindig lássam a menüben.',
        isCorrect: true,
    },
    answer_data_864: {
        text: 'PDF-fájl lesz belőle.',
        isCorrect: false,
    },
    answer_data_865: {
        text: 'A cím mutatja.',
        isCorrect: false,
    },
    answer_data_866: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_867: {
        text: 'Adatok menü: Információ',
        isCorrect: false,
    },
    answer_data_868: {
        text: 'Fájl menü: Információ',
        isCorrect: true,
    },
    answer_data_869: {
        text: 'C++',
        isCorrect: false,
    },
    answer_data_870: {
        text: 'Angol',
        isCorrect: false,
    },
    answer_data_871: {
        text: 'Magyar',
        isCorrect: false,
    },
    answer_data_872: {
        text: 'Sok nyelvet ismer, pl angol, magyar, német stb.',
        isCorrect: true,
    },
    answer_data_873: {
        text: '(Fájl menü >> Egyebek >>) Beállítások >> (Bal oldalon) Gyorseléri eszköztár >> Gyakori parancsok >> Felolvasás >> Felvétel >> Ok',
        isCorrect: true,
    },
    answer_data_874: {
        text: 'Nézet >> (Bal oldalon) Gyorseléri eszköztár >> Gyakori parancsok >> Felolvasás >> Felvétel >> Ok',
        isCorrect: false,
    },
    answer_data_875: {
        text: 'Berszúrás >> (Bal oldalon) Gyorseléri eszköztár >> Gyakori parncsok >> Felolvasás >> Felvétel >> Ok',
        isCorrect: false,
    },
    answer_data_876: {
        text: '(Fájl menü >> Egyebek >>) Beállítások >> (Bal oldalon) Menüszalag testreszabása >> Gyakori parancsok >> át is állíthatom: Minden parancs >> Felolvasás >> Felvétel >>Ok',
        isCorrect: false,
    },
    answer_data_877: {
        text: 'Arra, hogy nagy legyen',
        isCorrect: false,
    },
    answer_data_878: {
        text: 'Arra, hogy kicsi legyen',
        isCorrect: false,
    },
    answer_data_879: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat',
        isCorrect: true,
    },
    answer_data_880: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: false,
    },
    answer_data_881: {
        text: 'CTRL + F',
        isCorrect: false,
    },
    answer_data_882: {
        text: 'CTRL + D',
        isCorrect: false,
    },
    answer_data_883: {
        text: 'CTRL + B',
        isCorrect: true,
    },
    answer_data_884: {
        text: 'CTRL + T',
        isCorrect: false,
    },
    answer_data_885: {
        text: 'Shift +F1',
        isCorrect: false,
    },
    answer_data_886: {
        text: 'Shift +F2',
        isCorrect: false,
    },
    answer_data_887: {
        text: 'Shift +F3',
        isCorrect: true,
    },
    answer_data_888: {
        text: 'Shift +F4',
        isCorrect: false,
    },
    answer_data_889: {
        text: 'kb. 16 000',
        isCorrect: false,
    },
    answer_data_890: {
        text: 'kb. 160 000',
        isCorrect: false,
    },
    answer_data_891: {
        text: 'kb.1 600 000',
        isCorrect: false,
    },
    answer_data_892: {
        text: 'Több, mint 16 000 000',
        isCorrect: true,
    },
    answer_data_893: {
        text: 'Pont: 1 pont kicsit kisebb, mint 0,4 mm',
        isCorrect: true,
    },
    answer_data_894: {
        text: 'mm',
        isCorrect: false,
    },
    answer_data_895: {
        text: 'Pont: 10 pont kicsit kisebb, mint 0,4 mm',
        isCorrect: false,
    },
    answer_data_896: {
        text: '0,1 cm',
        isCorrect: false,
    },
    answer_data_897: {
        text: 'CTRL + Shift + 3',
        isCorrect: false,
    },
    answer_data_898: {
        text: 'CTRL + F1',
        isCorrect: false,
    },
    answer_data_899: {
        text: 'CTRL + I',
        isCorrect: false,
    },
    answer_data_900: {
        text: 'CTRL + =',
        isCorrect: true,
    },
    answer_data_901: {
        text: 'Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Piros >> Ok',
        isCorrect: false,
    },
    answer_data_902: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Kezdőlap menü >> Nézet >> A rész jobb alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Piros >> Ok',
        isCorrect: false,
    },
    answer_data_903: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész jobb alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Kék >> Ok',
        isCorrect: false,
    },
    answer_data_904: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész jobb alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Piros >> Ok',
        isCorrect: true,
    },
    answer_data_905: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        isCorrect: true,
    },
    answer_data_906: {
        text: 'Nagybetű formátum és méret.',
        isCorrect: false,
    },
    answer_data_907: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete megváltozik.',
        isCorrect: false,
    },
    answer_data_908: {
        text: 'A formátuma a kisbetűéké, a mérete a nagyoké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        isCorrect: false,
    },
    answer_data_909: {
        text: 'Szóközt ütök közéjük.',
        isCorrect: false,
    },
    answer_data_910: {
        text: 'Kijelölöm a ritkítani kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Térköz: Ritkított. >> Ok',
        isCorrect: true,
    },
    answer_data_911: {
        text: 'Tab-ot ütök közéjük',
        isCorrect: false,
    },
    answer_data_1116: {
        text: 'Beszúrás menü >> Szöveg >> Kész modulok >> Kész szöveg',
        isCorrect: true,
    },
    answer_data_1120: {
        text: 'Kezdőlap menü >> Nézet >> Rendezés ikon',
        isCorrect: false,
    },
    answer_data_1123: {
        text: 'Enter',
        isCorrect: false,
    },
    answer_data_1124: {
        text: 'F1 + Enter',
        isCorrect: false,
    },
    answer_data_1275: {
        text: 'A képre a bal egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: true,
    },
    answer_data_1276: {
        text: 'A képre a jobb egérgombbal háromszor kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: false,
    },
    answer_data_912: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Sorköz: Ritkított. >> Ok',
        isCorrect: false,
    },
    answer_data_913: {
        text: 'Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Szövegeffektusok',
        isCorrect: true,
    },
    answer_data_914: {
        text: 'Nézet',
        isCorrect: false,
    },
    answer_data_915: {
        text: 'Kezdőlap menüszalag: Bekezdés résznél van az ikonja.',
        isCorrect: false,
    },
    answer_data_916: {
        text: 'Beállítások',
        isCorrect: false,
    },
    answer_data_917: {
        text: 'A + olló',
        isCorrect: false,
    },
    answer_data_918: {
        text: 'A + X',
        isCorrect: false,
    },
    answer_data_919: {
        text: 'A + radír',
        isCorrect: true,
    },
    answer_data_920: {
        text: 'A + hibajavító ecset',
        isCorrect: false,
    },
    answer_data_921: {
        text: 'CTRL + J',
        isCorrect: false,
    },
    answer_data_922: {
        text: 'CTRL + R',
        isCorrect: true,
    },
    answer_data_923: {
        text: 'CTRL + NYÍL JOBBRA',
        isCorrect: false,
    },
    answer_data_924: {
        text: 'CTRL + END',
        isCorrect: false,
    },
    answer_data_925: {
        text: '1 cm',
        isCorrect: false,
    },
    answer_data_926: {
        text: '1,25 cm',
        isCorrect: true,
    },
    answer_data_927: {
        text: '2 cm',
        isCorrect: false,
    },
    answer_data_928: {
        text: '1,5 cm',
        isCorrect: false,
    },
    answer_data_929: {
        text: 'Sorköz',
        isCorrect: false,
    },
    answer_data_930: {
        text: 'Behúzás',
        isCorrect: false,
    },
    answer_data_931: {
        text: 'Enter',
        isCorrect: false,
    },
    answer_data_932: {
        text: 'Térköz',
        isCorrect: true,
    },
    answer_data_933: {
        text: 'Kattintok a MÁSODIK bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: false,
    },
    answer_data_934: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Tervezés menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: false,
    },
    answer_data_935: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: true,
    },
    answer_data_936: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Nézet menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: false,
    },
    answer_data_937: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> Nézet menü >> Bekezdés rész: Szegély >> A lenyíló menü legalsó lehetősége: Szegély és mintázat... >> Párbeszédablak >> Beállítom, amit akarok >> Ok',
        isCorrect: false,
    },
    answer_data_938: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> A lenyíló helyi menü legalsó lehetősége: Szegély és mintázat... >> Párbeszédablak >> Beállítom, amit akarok >> Ok',
        isCorrect: false,
    },
    answer_data_939: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> Kezdőlap menü >> Bekezdés rész: Szegély >> Beállítom, amit akarok >> Ok',
        isCorrect: false,
    },
    answer_data_940: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> Kezdőlap menü >> Bekezdés rész: Szegély >> A lenyíló menü legalsó lehetősége: Szegély és mintázat... >> Párbeszédablak >> Beállítom, amit akarok >> Ok',
        isCorrect: true,
    },
    answer_data_941: {
        text: 'Balra zárt',
        isCorrect: false,
    },
    answer_data_942: {
        text: 'Jobbra zárt',
        isCorrect: false,
    },
    answer_data_943: {
        text: 'Középre zárt',
        isCorrect: false,
    },
    answer_data_944: {
        text: 'Sorkizárt',
        isCorrect: true,
    },
    answer_data_945: {
        text: 'Stabilabban tartja a távolságot, mint a szóközök.',
        isCorrect: true,
    },
    answer_data_946: {
        text: 'Gyorsabb a szóköznél',
        isCorrect: false,
    },
    answer_data_947: {
        text: 'Térközt is ad.',
        isCorrect: false,
    },
    answer_data_948: {
        text: 'Ritkítja a betűk közti távolságot.',
        isCorrect: false,
    },
    answer_data_949: {
        text: 'Kattintok a vonalzón a margóra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        isCorrect: false,
    },
    answer_data_950: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        isCorrect: true,
    },
    answer_data_951: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  vessző >> Ok',
        isCorrect: false,
    },
    answer_data_952: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló helyi menün kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        isCorrect: false,
    },
    answer_data_953: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        isCorrect: true,
    },
    answer_data_954: {
        text: 'Bal klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        isCorrect: false,
    },
    answer_data_955: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Nézet >> Számozás folytatása',
        isCorrect: false,
    },
    answer_data_956: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Frissítés',
        isCorrect: false,
    },
    answer_data_957: {
        text: 'fent-lent 2 - 2 cm, bal-jobb oldalon 2,5 - 2,5 cm',
        isCorrect: false,
    },
    answer_data_958: {
        text: 'fent-lent, bal-jobb oldalon 1,5 - 1,5 cm',
        isCorrect: false,
    },
    answer_data_959: {
        text: 'fent-lent, bal-jobb oldalon 3 - 3 cm',
        isCorrect: false,
    },
    answer_data_960: {
        text: 'fent-lent, bal-jobb oldalon 2,5 - 2,5 cm',
        isCorrect: true,
    },
    answer_data_961: {
        text: 'Nézet menü >> Oldalszín >> Kitöltési effektusok >> Színátmenet fül >> Kétszínű >> Beállítom a színeket és Változatokat >> Ok',
        isCorrect: false,
    },
    answer_data_962: {
        text: 'Fájl menü >> Nyomtatási beállítások >> Kitöltési effektusok >> Színátmenet fül >> Kétszínű >> Beállítom a színeket és Változatokat >> Ok',
        isCorrect: false,
    },
    answer_data_963: {
        text: 'Tervezés menü >> Oldalszín >> Kitöltési effektusok >> Színátmenet fül >> Egyszínű >> Beállítom a színeket és Változatokat >> Ok',
        isCorrect: false,
    },
    answer_data_964: {
        text: 'Tervezés menü >> Oldalszín >> Kitöltési effektusok >> Színátmenet fül >> Kétszínű >> Beállítom a színeket és Változatokat >> Ok',
        isCorrect: true,
    },
    answer_data_965: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >>  a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        isCorrect: false,
    },
    answer_data_966: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        isCorrect: true,
    },
    answer_data_967: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Nézet >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        isCorrect: false,
    },
    answer_data_968: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Beállítás a listáról és Ok',
        isCorrect: false,
    },
    answer_data_969: {
        text: 'Bal egérgombbal duplán kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: true,
    },
    answer_data_970: {
        text: 'Jobbal kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: false,
    },
    answer_data_1117: {
        text: 'Kezdőlap menü >> Bekezdés >> Rendezés ikon',
        isCorrect: true,
    },
    answer_data_1118: {
        text: 'Nézet menü >> Bekezdés >> Rendezés ikon',
        isCorrect: false,
    },
    answer_data_971: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Nézet menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: false,
    },
    answer_data_972: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Tervezés menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: false,
    },
    answer_data_973: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_974: {
        text: 'Beszúrás menü: Élőfej >> Élőfej hozzáadás >> Stílusok >>Térhatás Kikeresem a listából a fazettás stílust',
        isCorrect: false,
    },
    answer_data_975: {
        text: 'Beszúrás menü: Élőfej >> Kikeresem a listából a fazettás stílust',
        isCorrect: true,
    },
    answer_data_976: {
        text: 'Beszúrás menü: Élőláb >> Kikeresem a listából a fazettás stílust',
        isCorrect: false,
    },
    answer_data_977: {
        text: 'Kattintás a fedőlapon >> Nézet menü >> Színek',
        isCorrect: false,
    },
    answer_data_978: {
        text: 'Kattintás a fedőlapon >> Nézet menü >> Színek',
        isCorrect: true,
    },
    answer_data_979: {
        text: 'Kattintás a fedőlapon >> Tervezés menü >> Témák',
        isCorrect: false,
    },
    answer_data_980: {
        text: 'Kattintás a fedőlapon >> Fedőlap menü >> Színek',
        isCorrect: false,
    },
    answer_data_981: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása >> Stílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        isCorrect: true,
    },
    answer_data_982: {
        text: 'Formátum menü >> Stílusok >> Új Stílus',
        isCorrect: false,
    },
    answer_data_983: {
        text: 'Bal klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        isCorrect: false,
    },
    answer_data_984: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus átnevezése  párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        isCorrect: false,
    },
    answer_data_985: {
        text: 'Nem lehet stílust módosítani.',
        isCorrect: false,
    },
    answer_data_986: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: true,
    },
    answer_data_987: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Bal klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: false,
    },
    answer_data_988: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Szerkesztés  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: false,
    },
    answer_data_989: {
        text: 'Színeket.',
        isCorrect: false,
    },
    answer_data_990: {
        text: 'Betűszíneket. ',
        isCorrect: false,
    },
    answer_data_991: {
        text: 'Margókat.',
        isCorrect: false,
    },
    answer_data_992: {
        text: 'Egyszerre több stílust. ',
        isCorrect: true,
    },
    answer_data_993: {
        text: 'ALT + Tab',
        isCorrect: true,
    },
    answer_data_994: {
        text: 'ALT + Tab + Del',
        isCorrect: false,
    },
    answer_data_995: {
        text: 'Alt + Del',
        isCorrect: false,
    },
    answer_data_996: {
        text: 'ALT + F4',
        isCorrect: false,
    },
    answer_data_997: {
        text: 'Sor vége',
        isCorrect: false,
    },
    answer_data_998: {
        text: 'Fejezet vége',
        isCorrect: false,
    },
    answer_data_999: {
        text: 'Oldal vége',
        isCorrect: false,
    },
    answer_data_1000: {
        text: 'Bekezdés vége',
        isCorrect: true,
    },
    answer_data_1001: {
        text: 'Del',
        isCorrect: false,
    },
    answer_data_1002: {
        text: 'Home',
        isCorrect: true,
    },
    answer_data_1003: {
        text: 'End',
        isCorrect: false,
    },
    answer_data_1004: {
        text: 'CTRL',
        isCorrect: false,
    },
    answer_data_1005: {
        text: 'CTRL + Enter',
        isCorrect: true,
    },
    answer_data_1006: {
        text: 'Shift + Enter',
        isCorrect: false,
    },
    answer_data_1007: {
        text: 'CTRL + End',
        isCorrect: false,
    },
    answer_data_1008: {
        text: 'Ctrl + F4',
        isCorrect: false,
    },
    answer_data_1009: {
        text: 'Nem lehet.',
        isCorrect: false,
    },
    answer_data_1010: {
        text: 'Táblázat szegélyekkel teszem.',
        isCorrect: false,
    },
    answer_data_1011: {
        text: 'Szerkesztés >> Rácsvonalak',
        isCorrect: false,
    },
    answer_data_1012: {
        text: 'Nézet menü >> Megjelenítés >> Rácsvonalak',
        isCorrect: true,
    },
    answer_data_1013: {
        text: 'F1',
        isCorrect: false,
    },
    answer_data_1014: {
        text: 'Jobb kattintás',
        isCorrect: true,
    },
    answer_data_1015: {
        text: 'Dupla jobb kattintás',
        isCorrect: false,
    },
    answer_data_1016: {
        text: 'Bal kattintás',
        isCorrect: false,
    },
    answer_data_1017: {
        text: 'Ctrl',
        isCorrect: false,
    },
    answer_data_1018: {
        text: 'Alt',
        isCorrect: true,
    },
    answer_data_1019: {
        text: 'Del',
        isCorrect: false,
    },
    answer_data_1020: {
        text: 'Tab',
        isCorrect: false,
    },
    answer_data_1021: {
        text: 'Nyomtatási kép',
        isCorrect: false,
    },
    answer_data_1022: {
        text: 'Nyomtatási elrendezés',
        isCorrect: true,
    },
    answer_data_1023: {
        text: 'Webes nézet',
        isCorrect: false,
    },
    answer_data_1024: {
        text: 'Olvasómód',
        isCorrect: false,
    },
    answer_data_1025: {
        text: '215%',
        isCorrect: false,
    },
    answer_data_1026: {
        text: 'Oldal szélessége',
        isCorrect: true,
    },
    answer_data_1027: {
        text: 'Szöveg szélessége',
        isCorrect: false,
    },
    answer_data_1028: {
        text: 'Több oldal',
        isCorrect: false,
    },
    answer_data_1029: {
        text: 'Kezdőlap >> Bekezdés >> Minden látszik',
        isCorrect: true,
    },
    answer_data_1030: {
        text: 'Nézet >> Bekezdés >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1031: {
        text: 'Nézet >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1032: {
        text: 'Kezdőlap >> Bekezdés >> Nagyítás >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1033: {
        text: 'Kezdőlap menü >> Ablak >> Felosztás megszüntetése',
        isCorrect: false,
    },
    answer_data_1034: {
        text: 'Kezdőlap menü >> Megjelenítés >> Webes nézet',
        isCorrect: false,
    },
    answer_data_1035: {
        text: 'Nézet menü >> Ablak >> Felosztás megszüntetése',
        isCorrect: true,
    },
    answer_data_1036: {
        text: 'Nézet menü >> Megjelenítés >> Webes nézet',
        isCorrect: false,
    },
    answer_data_1037: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom a Del billentyűt.',
        isCorrect: false,
    },
    answer_data_1038: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom a * billentyűt.',
        isCorrect: false,
    },
    answer_data_1039: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom az F5 billentyűt.',
        isCorrect: false,
    },
    answer_data_1040: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom az Alt billentyűt.',
        isCorrect: true,
    },
    answer_data_1041: {
        text: 'CTRL + Z',
        isCorrect: false,
    },
    answer_data_1042: {
        text: 'CTRL + X',
        isCorrect: false,
    },
    answer_data_1043: {
        text: 'CTRL + V',
        isCorrect: true,
    },
    answer_data_1044: {
        text: 'CTRL + C',
        isCorrect: false,
    },
    answer_data_1045: {
        text: '1',
        isCorrect: true,
    },
    answer_data_1046: {
        text: '2',
        isCorrect: false,
    },
    answer_data_1047: {
        text: '3',
        isCorrect: false,
    },
    answer_data_1048: {
        text: '4',
        isCorrect: false,
    },
    answer_data_1049: {
        text: 'Kezdőlap menü >> Nézet >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: false,
    },
    answer_data_1050: {
        text: 'CTRL + H >> Vágólap',
        isCorrect: false,
    },
    answer_data_1051: {
        text: 'CTRL + H >> Vágólap',
        isCorrect: true,
    },
    answer_data_1052: {
        text: 'Formátum menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: false,
    },
    answer_data_1053: {
        text: 'Ecset. Kezdőlap menü >> Vágólap >> Ecset ikon',
        isCorrect: true,
    },
    answer_data_1054: {
        text: 'Ecset. Nézet menü >> Vágólap >> Ecset ikon',
        isCorrect: false,
    },
    answer_data_1055: {
        text: 'CD-t ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        isCorrect: false,
    },
    answer_data_1056: {
        text: 'Tollat ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        isCorrect: false,
    },
    answer_data_1057: {
        text: 'Fájlméretet',
        isCorrect: false,
    },
    answer_data_1058: {
        text: 'Sávszélességet',
        isCorrect: false,
    },
    answer_data_1059: {
        text: 'Időt',
        isCorrect: true,
    },
    answer_data_1060: {
        text: 'Lapméretet',
        isCorrect: false,
    },
    answer_data_1061: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1062: {
        text: 'Véleményezés menü >> Új megjegyzés >> Az oldal jobb szélén jelenik meg a megjegyzés, amire lehet kommentelni, válaszolni.',
        isCorrect: true,
    },
    answer_data_1063: {
        text: 'Véleményezés menü >> Korrektúra >> Új korrektúra.',
        isCorrect: false,
    },
    answer_data_1064: {
        text: 'A mentésnél lehet megjegyzést beírni.',
        isCorrect: false,
    },
    answer_data_1119: {
        text: 'Kezdőlap menü >> Adatok >> Bekezdés >> Rendezés ikon',
        isCorrect: false,
    },
    answer_data_1121: {
        text: 'Ctrl + Enter',
        isCorrect: true,
    },
    answer_data_1065: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Bal oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        isCorrect: false,
    },
    answer_data_1066: {
        text: 'Nem lehet ilyet beállítani.',
        isCorrect: false,
    },
    answer_data_1067: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        isCorrect: true,
    },
    answer_data_1068: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Formázás >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        isCorrect: false,
    },
    answer_data_1069: {
        text: 'Mentés másként >> Egyebek >> Pitypang >> Ok',
        isCorrect: false,
    },
    answer_data_1070: {
        text: 'Fájl menü >> Információ >> Dokumentumvédelem >> Titkosítás jelszóval >> A párbeszédbalakon bírom és megerősítem a jelszót: "pitypang".  >> Ok',
        isCorrect: true,
    },
    answer_data_1071: {
        text: 'Fájl menü >> Adatvédelem >> Információ >> Titkosítás jelszóval >> A párbeszédbalakon bírom és megerősítem a jelszót: "pitypang".  >> Ok',
        isCorrect: false,
    },
    answer_data_1072: {
        text: 'Nem lehet ilyet beállítani.',
        isCorrect: false,
    },
    answer_data_1073: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        isCorrect: true,
    },
    answer_data_1074: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >>  Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        isCorrect: false,
    },
    answer_data_1075: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szín a listából: piros >> Ok vagy Alkalmaz',
        isCorrect: false,
    },
    answer_data_1076: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok;  >> Ok vagy Alkalmaz',
        isCorrect: false,
    },
    answer_data_1077: {
        text: 'Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1078: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: true,
    },
    answer_data_1079: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >>  A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1080: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Ellenőrzés >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1081: {
        text: 'Ctrl + H >> A párbeszédablakba beírom, hogy: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1082: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1083: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1084: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >> Egyebek >> Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: true,
    },
    answer_data_1085: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Ok',
        isCorrect: false,
    },
    answer_data_1086: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "apple" >> Az összes cseréje',
        isCorrect: true,
    },
    answer_data_1087: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1088: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "alma" >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1089: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        isCorrect: true,
    },
    answer_data_1090: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Formátum >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        isCorrect: false,
    },
    answer_data_1091: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1092: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Bekezdés >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >>Az összes cseréje >> Szükség esetén ismétlem. ',
        isCorrect: false,
    },
    answer_data_1093: {
        text: 'Manuálisan kell elválasztani.',
        isCorrect: false,
    },
    answer_data_1094: {
        text: 'Kijelelöm az elválasztás tartományát. >> Tervezés menü >> Elválasztás >> Automatikus',
        isCorrect: false,
    },
    answer_data_1095: {
        text: 'Kijelelöm az elválasztás tartományát. >> Elrendezés menü >> Elválasztás >> Automatikus',
        isCorrect: true,
    },
    answer_data_1096: {
        text: 'Kijelelöm az elválasztás tartományát. >> Szerkesztés menü >> Elválasztás >> Automatikus',
        isCorrect: false,
    },
    answer_data_1097: {
        text: 'Minden hibát észrevesz a Word helyesírásellenőrzője.',
        isCorrect: true,
    },
    answer_data_1098: {
        text: 'A Word helyesírásellenőrzője jó megoldást is jelezhet hibának.',
        isCorrect: false,
    },
    answer_data_1099: {
        text: 'A helyesírási hibákat piros aláhúzással jelöli a Word.',
        isCorrect: false,
    },
    answer_data_1100: {
        text: 'A Word helyesírásellenőrzője a Véleményezés menüből érhető el.',
        isCorrect: false,
    },
    answer_data_1101: {
        text: 'Kihagyás',
        isCorrect: false,
    },
    answer_data_1102: {
        text: 'Az összes kihagyása',
        isCorrect: false,
    },
    answer_data_1103: {
        text: 'Felvétel a szótárba',
        isCorrect: true,
    },
    answer_data_1104: {
        text: 'Szótár frissítése',
        isCorrect: false,
    },
    answer_data_1105: {
        text: 'Fájl menü >> Egyebek >> Beállítások >> A Word beállításai párbeszédablak >> Nyelvi ellenőrzés >> Automatikus javítási beállítások >> A párbeszédablakon az Automatikus javítás fül >> Itt tudom beállítani, hogy mit mire javítson.',
        isCorrect: true,
    },
    answer_data_1106: {
        text: 'Shift + F9',
        isCorrect: false,
    },
    answer_data_1107: {
        text: 'Fájl menü >> Véleményezés >> Beállítások >> A Word beállításai párbeszédablak >> Nyelvi ellenőrzés >> Automatikus javítási beállítások >> A párbeszédablakon az Automatikus javítás fül >> Itt tudom beállítani, hogy mit mire javítson.',
        isCorrect: false,
    },
    answer_data_1108: {
        text: 'Fájl menü >> Egyebek >> Beállítások >> Automatikus javítási beállítások >> A párbeszédablakon az Automatikus javítás fül >> Itt tudom beállítani, hogy mit mire javítson.',
        isCorrect: false,
    },
    answer_data_1109: {
        text: 'Shift + F4',
        isCorrect: false,
    },
    answer_data_1110: {
        text: 'Shift + F5',
        isCorrect: false,
    },
    answer_data_1111: {
        text: 'Shift + F6',
        isCorrect: false,
    },
    answer_data_1112: {
        text: 'Shift + F7',
        isCorrect: true,
    },
    answer_data_1113: {
        text: 'Ctrl + V',
        isCorrect: false,
    },
    answer_data_1114: {
        text: 'Beszúrás menü >> Kész szöveg',
        isCorrect: false,
    },
    answer_data_1115: {
        text: 'Beszúrás menü >> Szövegdoboz',
        isCorrect: false,
    },
    answer_data_1125: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        isCorrect: false,
    },
    answer_data_1126: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        isCorrect: true,
    },
    answer_data_1127: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kipipálom az azonos hasábszélességet, és beállítom az első hasábot szélesebbnek.',
        isCorrect: false,
    },
    answer_data_1128: {
        text: '(A hasábokon kívűl kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        isCorrect: false,
    },
    answer_data_1129: {
        text: 'Jobb klikk a menüszalagon az adott sílusra és "Módosítás".',
        isCorrect: true,
    },
    answer_data_1130: {
        text: 'Bal klikk a menüszalagon az adott sílusra és "Módosítás".',
        isCorrect: false,
    },
    answer_data_1131: {
        text: 'Jobb klikk a helyi menüben az adott sílusra és "Módosítás".',
        isCorrect: false,
    },
    answer_data_1132: {
        text: 'Jobb klikk a menüszalagon az adott sílusra és "Szerkesztés".',
        isCorrect: false,
    },
    answer_data_1133: {
        text: 'Formátum és betűtípus',
        isCorrect: false,
    },
    answer_data_1134: {
        text: 'Adatok rendezése',
        isCorrect: false,
    },
    answer_data_1135: {
        text: 'Címsorszámozás',
        isCorrect: true,
    },
    answer_data_1136: {
        text: 'Felsorolás',
        isCorrect: false,
    },
    answer_data_1137: {
        text: 'Hivatkozások menü >> Bejegyzés megjelölése a Tárgymuatató részen >> A párbeszédbalakon Megjelölés, vagy Az összes megjelelölése',
        isCorrect: false,
    },
    answer_data_1138: {
        text: 'Kijelölölöm a szót >> Hivatkozások menü >> A párbeszédbalakon Megjelölés, vagy Az összes megjelelölése',
        isCorrect: false,
    },
    answer_data_1139: {
        text: 'Kijelölölöm a szót >> Hivatkozások menü >> Bejegyzés megjelölése a Tárgymutatató részen >> A párbeszédbalakon: Hozzáadás',
        isCorrect: false,
    },
    answer_data_1140: {
        text: 'Kijelölölöm a szót >> Hivatkozások menü >> Bejegyzés megjelölése a Tárgymutatató részen >> A párbeszédbalakon Megjelölés, vagy Az összes megjelelölése',
        isCorrect: true,
    },
    answer_data_1141: {
        text: 'Hivatkozások menü >>  A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >> Ok',
        isCorrect: false,
    },
    answer_data_1142: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        isCorrect: true,
    },
    answer_data_1143: {
        text: 'Hivatkozások menü >> Végjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        isCorrect: false,
    },
    answer_data_1144: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        isCorrect: false,
    },
    answer_data_1145: {
        text: '0-10',
        isCorrect: false,
    },
    answer_data_1146: {
        text: '11-12',
        isCorrect: true,
    },
    answer_data_1147: {
        text: '12-14',
        isCorrect: false,
    },
    answer_data_1148: {
        text: '14-16',
        isCorrect: false,
    },
    answer_data_1149: {
        text: 'Gyorselérési eszköztár',
        isCorrect: false,
    },
    answer_data_1150: {
        text: 'Beszúrás',
        isCorrect: false,
    },
    answer_data_1151: {
        text: 'Nézet',
        isCorrect: false,
    },
    answer_data_1152: {
        text: 'Ha nincs a menüszalagon, akkor Fájl >> (Egyebek >>) Beállítások >> Menüszalag testreszabása',
        isCorrect: true,
    },
    answer_data_1153: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        isCorrect: true,
    },
    answer_data_1154: {
        text: 'Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        isCorrect: false,
    },
    answer_data_1155: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ok.',
        isCorrect: false,
    },
    answer_data_1156: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Formátumra kattintva a lenyíló párbeszédablakban testreszabom.',
        isCorrect: false,
    },
    answer_data_1157: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket fizetés után beszúrhatok a dokumentumomba.',
        isCorrect: false,
    },
    answer_data_1158: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket beszúrhatok a dokumentumomba.',
        isCorrect: true,
    },
    answer_data_1159: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket beszúrhatok a dokumentumomba.',
        isCorrect: false,
    },
    answer_data_1160: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket beszúrhatok a dokumentumomba, de nem méretezhetem át őket.',
        isCorrect: false,
    },
    answer_data_1161: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: true,
    },
    answer_data_1162: {
        text: 'Az alakzatra kattintok, majd a Beszúrás menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: false,
    },
    answer_data_1163: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Stockképek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: false,
    },
    answer_data_1164: {
        text: 'Az alakzatra kattintok, majd az Alakzat beszúrása menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: false,
    },
    answer_data_1165: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1166: {
        text: 'Csak a körvonalat.',
        isCorrect: false,
    },
    answer_data_1167: {
        text: 'Csak a kitöltést.',
        isCorrect: false,
    },
    answer_data_1168: {
        text: 'A körvonalat és a kitöltést is.',
        isCorrect: true,
    },
    answer_data_1169: {
        text: 'Kattintsunk a beszúrás menüre!',
        isCorrect: false,
    },
    answer_data_1170: {
        text: 'Válasszuk ki a nekünk kellő aktív ablakot!',
        isCorrect: false,
    },
    answer_data_1171: {
        text: 'Válasszuk ki a menün a Képenyőkép lehetőséget!',
        isCorrect: false,
    },
    answer_data_1172: {
        text: 'A beszúrni kívánt ablakot tegyük le a tálcára!',
        isCorrect: true,
    },
    answer_data_1173: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        isCorrect: true,
    },
    answer_data_1174: {
        text: 'Új diagramot kell szerkesztenem.',
        isCorrect: false,
    },
    answer_data_1175: {
        text: 'Kijelölöm a diagramot >> Adatok szerkesztése menü a menüszalagon >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        isCorrect: false,
    },
    answer_data_1176: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló PowerPoint-alapú táblázatban pedig szerkeszthetem az adatokat.',
        isCorrect: false,
    },
    answer_data_1177: {
        text: 'Kattintok az ábrán, majd a lenyíló párbeszédablakban adhatom meg az új adatokat.',
        isCorrect: false,
    },
    answer_data_1178: {
        text: 'A nézet menüben állíthatom át a körvonalakat.',
        isCorrect: false,
    },
    answer_data_1179: {
        text: 'Kattintok az ábrán és a menüszalagon megjelenik a SmartArt-terv menü. Ebben.',
        isCorrect: true,
    },
    answer_data_1180: {
        text: 'Nem lehet szerkeszteni.',
        isCorrect: false,
    },
    answer_data_1181: {
        text: 'Photoshoppal.',
        isCorrect: false,
    },
    answer_data_1182: {
        text: 'Kattintok a képen >> Képmetsző menü >> A menüszalagon megjelenik a Háttér eltávolítása menü >> Ott az F1 gombbal a  "Megtartandó területek megjelölése" és az "Eltávolítandó területek megjelölése" lehetőségekkel szerkesztem a képet >> A végén: Módosítások megtartása.',
        isCorrect: false,
    },
    answer_data_1274: {
        text: 'A képre a jobb egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: false,
    },
    answer_data_1183: {
        text: 'Kattintok a képen >> Képformátum menü >> A menüszalagon megjelenik a Háttér eltávolítása menü >> Ott a Szerkesztés lehetőséggel szerkesztem a képet >> A végén: Módosítások megtartása.',
        isCorrect: false,
    },
    answer_data_1184: {
        text: 'Kattintok a képen >> Képformátum menü >> A menüszalagon megjelenik a Háttér eltávolítása menü >> Ott a "Megtartandó területek megjelölése" és az "Eltávolítandó területek megjelölése" lehetőségekkel szerkesztem a képet >> A végén: Módosítások megtartása.',
        isCorrect: true,
    },
    answer_data_1185: {
        text: 'Nézet >> Szín >> Szépiaszín',
        isCorrect: false,
    },
    answer_data_1186: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépiaszín',
        isCorrect: true,
    },
    answer_data_1187: {
        text: 'Kattintok a kép mellé >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépiaszín',
        isCorrect: false,
    },
    answer_data_1188: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> RGB: 255',
        isCorrect: false,
    },
    answer_data_1189: {
        text: 'Jobb klikk az alakzaton >> Szerkesztés',
        isCorrect: false,
    },
    answer_data_1190: {
        text: 'Jobb klikk az alakzaton >> Alakzat formázása',
        isCorrect: false,
    },
    answer_data_1191: {
        text: 'Jobb klikk az alakzaton >> Csomópontok szerkesztése',
        isCorrect: true,
    },
    answer_data_1192: {
        text: 'Ezt nem lehet szerkeszteni.',
        isCorrect: false,
    },
    answer_data_1193: {
        text: 'Egy makró.',
        isCorrect: false,
    },
    answer_data_1194: {
        text: 'Egy látványos szövegrész, amit beszúrhatunk a szövegbe és formázhatunk.',
        isCorrect: true,
    },
    answer_data_1195: {
        text: 'Egy képaláírás',
        isCorrect: false,
    },
    answer_data_1196: {
        text: 'Egy Iniciálé',
        isCorrect: false,
    },
    answer_data_1197: {
        text: 'Kattintok a képfájlon és a menüszalagon megjelenik az Alakzat formátuma menü, ahol mindent beállíthatok.',
        isCorrect: false,
    },
    answer_data_1198: {
        text: 'Ha már beszúrtam, legfeljebb törölhetem, vagy visszavonhatom.',
        isCorrect: false,
    },
    answer_data_1199: {
        text: 'Jobbal a WordArton és a hely menün a nézetre A párbeszédablakban mindent beállíthatok.',
        isCorrect: false,
    },
    answer_data_1200: {
        text: 'Kattintok az ábrán és a menüszalagon megjelenik az Alakzat formátuma menü, ahol mindent beállíthatok.',
        isCorrect: true,
    },
    answer_data_1201: {
        text: 'Arial',
        isCorrect: false,
    },
    answer_data_1202: {
        text: 'Tahoma',
        isCorrect: false,
    },
    answer_data_1203: {
        text: 'Wingdings',
        isCorrect: true,
    },
    answer_data_1204: {
        text: 'Courgette',
        isCorrect: false,
    },
    answer_data_1205: {
        text: 'Beszúrás menü >> Egyenlet >> Megjelenik az egyenlet menü a menüszalagon >>  Baloldalt >> Szabadkézi egyenlet',
        isCorrect: true,
    },
    answer_data_1206: {
        text: 'Beszúrás >> Kézi bevitel >> Szabadkézi egyenlet',
        isCorrect: false,
    },
    answer_data_1207: {
        text: 'Beszúrás >> Szabadkézi bevitel >> Szabadkézi egyenlet',
        isCorrect: false,
    },
    answer_data_1208: {
        text: 'Kezdőlap menü >> Lenyitom az Egyenlet ikont >> Megjelenik a lista alján a Szabadkézi egyenlet',
        isCorrect: false,
    },
    answer_data_1209: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        isCorrect: true,
    },
    answer_data_1210: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és hagyjuk ki az Automatikus frissítést',
        isCorrect: false,
    },
    answer_data_1211: {
        text: 'Beszúrás menü >> Dátum és idő >> A legördülő listán állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        isCorrect: false,
    },
    answer_data_1212: {
        text: 'Dátum menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        isCorrect: false,
    },
    answer_data_1213: {
        text: 'Törlöm a margót.',
        isCorrect: false,
    },
    answer_data_1214: {
        text: 'Ctrl + A majd Del',
        isCorrect: false,
    },
    answer_data_1215: {
        text: 'Törlöm a betűt.',
        isCorrect: false,
    },
    answer_data_1216: {
        text: 'Kattintok az iniciálén >> Beszúrás menü >> Inicálé >> Nincs',
        isCorrect: true,
    },
    answer_data_1217: {
        text: '10 x 10 cella',
        isCorrect: false,
    },
    answer_data_1218: {
        text: '100 x 10 cella',
        isCorrect: false,
    },
    answer_data_1219: {
        text: '8 x 8 cella',
        isCorrect: false,
    },
    answer_data_1220: {
        text: '10 x 8 cella',
        isCorrect: true,
    },
    answer_data_1221: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1222: {
        text: 'Kijelölöm az egyesíteni kívánt cellákat és Ctrl + U',
        isCorrect: false,
    },
    answer_data_1223: {
        text: 'Kijelölöm az egyesíteni kívánt cellákat, és az Elrendezés menün a Cellák egyesítése opciót választom.',
        isCorrect: true,
    },
    answer_data_1224: {
        text: 'Kijelölöm az egyesíteni kívánt cellákat, Ctrl + n, és az Elrendezés menün Cellák egyesítése opciót választom.',
        isCorrect: false,
    },
    answer_data_1225: {
        text: 'Kattintok egy cellán, majd Delete gomb',
        isCorrect: false,
    },
    answer_data_1226: {
        text: 'Jobb klikk a táblázatra >> a menüszalagon: Törlés >> Táblázat törlése',
        isCorrect: false,
    },
    answer_data_1227: {
        text: 'Jobb klikk a táblázatra >> a helyi menün: Törlés >> Táblázat törlése',
        isCorrect: true,
    },
    answer_data_1228: {
        text: 'Jobb klikk a táblázatra >> Alt + Ctrl + Del',
        isCorrect: false,
    },
    answer_data_1229: {
        text: '1 tabulátor volt az "alma" szó előtt.',
        isCorrect: false,
    },
    answer_data_1230: {
        text: '2 tabulátor volt az "alma" szó előtt.',
        isCorrect: true,
    },
    answer_data_1231: {
        text: '2 szóköz volt az "alma" szó előtt.',
        isCorrect: false,
    },
    answer_data_1232: {
        text: '1 szóköz volt az "alma" szó előtt.',
        isCorrect: false,
    },
    answer_data_1233: {
        text: ' kb. több tucat',
        isCorrect: false,
    },
    answer_data_1234: {
        text: 'kb. több millió',
        isCorrect: true,
    },
    answer_data_1235: {
        text: 'kb. több ezer',
        isCorrect: false,
    },
    answer_data_1236: {
        text: 'kb. több százezer',
        isCorrect: false,
    },
    answer_data_1237: {
        text: '"=SZUM"',
        isCorrect: false,
    },
    answer_data_1238: {
        text: '"SUM"',
        isCorrect: false,
    },
    answer_data_1239: {
        text: '"=RESULT"',
        isCorrect: false,
    },
    answer_data_1240: {
        text: '"=SUM(ABOVE)"',
        isCorrect: true,
    },
    answer_data_1241: {
        text: 'Fájlméretet',
        isCorrect: false,
    },
    answer_data_1242: {
        text: 'Hogy a használni kívánt nyomtató és festék alkamas-e a célra.',
        isCorrect: true,
    },
    answer_data_1243: {
        text: 'Háttérszínt',
        isCorrect: false,
    },
    answer_data_1244: {
        text: 'Lapméretet',
        isCorrect: false,
    },
    answer_data_1245: {
        text: 'Nagy legyen.',
        isCorrect: false,
    },
    answer_data_1246: {
        text: 'Kicsi legyen.',
        isCorrect: false,
    },
    answer_data_1247: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: true,
    },
    answer_data_1248: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: false,
    },
    answer_data_1249: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1250: {
        text: 'Nézet menü >> Színek',
        isCorrect: false,
    },
    answer_data_1251: {
        text: 'Helyi menü >> Színek',
        isCorrect: false,
    },
    answer_data_1252: {
        text: 'Tervezés menü >> Színek',
        isCorrect: true,
    },
    answer_data_1253: {
        text: 'pdf-ként',
        isCorrect: false,
    },
    answer_data_1254: {
        text: 'sablonként',
        isCorrect: true,
    },
    answer_data_1255: {
        text: 'preziként',
        isCorrect: false,
    },
    answer_data_1256: {
        text: 'fejlécként',
        isCorrect: false,
    },
    answer_data_1257: {
        text: 'Szimpla: 1',
        isCorrect: false,
    },
    answer_data_1258: {
        text: '1,15',
        isCorrect: false,
    },
    answer_data_1259: {
        text: '1,5',
        isCorrect: true,
    },
    answer_data_1260: {
        text: '2',
        isCorrect: false,
    },
    answer_data_1261: {
        text: 'Minden levél külön fájl lesz.',
        isCorrect: false,
    },
    answer_data_1262: {
        text: 'Megmarad egy sablon külön, maguk a körlevelek alapértelmezetten Levél1 néven, vagy Levél2 stb. néven menthetőek el.',
        isCorrect: true,
    },
    answer_data_1263: {
        text: 'A körlevelek alapértelmezetten Levél1 néven, vagy Levél2 stb. néven menthetőek el. A sablon automatikusan törlődik.',
        isCorrect: false,
    },
    answer_data_1264: {
        text: 'Megmarad egy sablon külön, maguk a körlevelek alapértelmezetten Körlevél1 néven, vagy Körlevél2 stb. néven menthetőek el.',
        isCorrect: false,
    },
    answer_data_1265: {
        text: 'Rekordok',
        isCorrect: false,
    },
    answer_data_1266: {
        text: 'Mező',
        isCorrect: false,
    },
    answer_data_1267: {
        text: 'Adatok',
        isCorrect: false,
    },
    answer_data_1268: {
        text: 'Adatmező',
        isCorrect: true,
    },
    answer_data_1269: {
        text: 'Egyszerre csak 10 sort mutat',
        isCorrect: false,
    },
    answer_data_1270: {
        text: 'Makrót futtat',
        isCorrect: false,
    },
    answer_data_1271: {
        text: 'Színes stílus és gyors rendezés, valamint táblázatszintű műveletek',
        isCorrect: true,
    },
    answer_data_1272: {
        text: 'Kevesebb adatot mutat, így átláthatóbb',
        isCorrect: false,
    },
    answer_data_1273: {
        text: 'A képre a jobb egérgombbal kattintok és elhúzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        isCorrect: false,
    },
    answer_data_1277: {
        text: 'Jobb klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        isCorrect: true,
    },
    answer_data_1278: {
        text: 'Bal klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        isCorrect: false,
    },
    answer_data_1279: {
        text: 'Jobb klikk a képre >> Kitöltés képpel vagy anyagmintával',
        isCorrect: false,
    },
    answer_data_1280: {
        text: 'Nem lehet',
        isCorrect: false,
    },
    answer_data_1281: {
        text: '1',
        isCorrect: false,
    },
    answer_data_1282: {
        text: '2',
        isCorrect: false,
    },
    answer_data_1283: {
        text: '3',
        isCorrect: true,
    },
    answer_data_1284: {
        text: '4',
        isCorrect: false,
    },
    answer_data_1285: {
        text: 'Bal oldalon',
        isCorrect: false,
    },
    answer_data_1286: {
        text: 'Jobb klikk a képre és a helyi menü alatt, a Stílus mellett jobbra van a körülvágás',
        isCorrect: false,
    },
    answer_data_1287: {
        text: 'Jobb klikk a képre és a helyi menü közepén van a körülvágás',
        isCorrect: false,
    },
    answer_data_1288: {
        text: 'Jobb klikk a képre és a helyi menü felett, a Stílus mellett jobbra van a körülvágás',
        isCorrect: true,
    },
    answer_data_1289: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_1290: {
        text: 'A kontraszt állításával',
        isCorrect: false,
    },
    answer_data_1291: {
        text: 'A Formátum menüben van erre mód',
        isCorrect: false,
    },
    answer_data_1292: {
        text: 'A Képformátum menüben van erre mód',
        isCorrect: true,
    },
    answer_data_1293: {
        text: 'Nyilat szaggatott vonalból',
        isCorrect: false,
    },
    answer_data_1294: {
        text: 'Nyilat szaggatott vonalból árnyékkal',
        isCorrect: false,
    },
    answer_data_1295: {
        text: 'Nyilat szaggatott vonalból árnyékkal és tükrözve',
        isCorrect: false,
    },
    answer_data_1297: {
        text: 'Sárga villám alakzatot',
        isCorrect: false,
    },
    answer_data_1298: {
        text: 'Sárga villám alakzatot fekete körvonallal',
        isCorrect: false,
    },
    answer_data_1299: {
        text: 'Sárga villám alakzatot fekete körvonallal, és tükrözve',
        isCorrect: false,
    },
    answer_data_1300: {
        text: 'Mindegyiket',
        isCorrect: true,
    },
    answer_data_1301: {
        text: 'Igen. A WordArt-ra jobb egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        isCorrect: true,
    },
    answer_data_1302: {
        text: 'Igen. A WordArt-ra duplán a bal egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        isCorrect: false,
    },
    answer_data_1303: {
        text: 'Igen. A WordArt jobb egérgombbal kattintok >> Beszúrás >> Kép',
        isCorrect: false,
    },
    answer_data_1304: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_1305: {
        text: '4',
        isCorrect: false,
    },
    answer_data_1306: {
        text: '6',
        isCorrect: false,
    },
    answer_data_1307: {
        text: '8',
        isCorrect: true,
    },
    answer_data_1308: {
        text: '10',
        isCorrect: false,
    },
    answer_data_1309: {
        text: 'Sehogy',
        isCorrect: false,
    },
    answer_data_1310: {
        text: 'Beszúrás >> Szimbólum',
        isCorrect: true,
    },
    answer_data_1311: {
        text: 'AltGr+I billentyűkombináció',
        isCorrect: false,
    },
    answer_data_1312: {
        text: 'Jobb klikk és AltGr',
        isCorrect: false,
    },
    answer_data_1313: {
        text: 'Kezdőlap',
        isCorrect: false,
    },
    answer_data_1314: {
        text: 'Formátum',
        isCorrect: false,
    },
    answer_data_1315: {
        text: 'Beszúrás >> Egyenlet >> Szabadkézi egyenlet',
        isCorrect: true,
    },
    answer_data_1316: {
        text: 'Képletek',
        isCorrect: false,
    },
    answer_data_1296: {
        text: 'Mindegyiket',
        isCorrect: true,
    },
    answer_data_1317: {
        text: 'Kezdőlap',
        isCorrect: false,
    },
    answer_data_1318: {
        text: 'Beszúrás',
        isCorrect: false,
    },
    answer_data_1319: {
        text: 'Adatok',
        isCorrect: true,
    },
    answer_data_1320: {
        text: 'Képletek',
        isCorrect: false,
    },
    answer_data_1321: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és jobb egérgombbal leokézom',
        isCorrect: false,
    },
    answer_data_1322: {
        text: 'Kijelölöm a táblázatot >> Adatokeszközök menü >> Ismétlődések eltávolítása >> és leokézom',
        isCorrect: false,
    },
    answer_data_1323: {
        text: 'Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        isCorrect: false,
    },
    answer_data_1324: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        isCorrect: true,
    },
    answer_data_1325: {
        text: 'Ha védem a táblázatot az adatvesztéstől',
        isCorrect: false,
    },
    answer_data_1326: {
        text: 'Ha többen használunk egy táblázatot, és el akarom kerülni a hibákat',
        isCorrect: true,
    },
    answer_data_1327: {
        text: 'Ha színesebb a táblázat',
        isCorrect: false,
    },
    answer_data_1328: {
        text: 'Ha makrókat tiltok le vele',
        isCorrect: false,
    },
    answer_data_1329: {
        text: 'Katt a C1 cellára >> Adatok a menüszalagon >> Adatérvényesítés >> Megengedve >> Lista >> Forrás: C1:C10 >> OK',
        isCorrect: false,
    },
    answer_data_1330: {
        text: 'Katt a B1 cellára >> Adatérvényesítés >> Megengedve >> Lista >> Forrás: C1:C10 >> OK',
        isCorrect: false,
    },
    answer_data_1331: {
        text: 'Katt a B1 cellára >> Adatok a menüszalagon >> Adatérvényesítés >> Megengedve >> Lista >> Forrás: C1:C10 >> OK',
        isCorrect: true,
    },
    answer_data_1332: {
        text: 'Katt a B1 cellára >> Adatok a menüszalagon >> Adatérvényesítés >> Feltételes formázás >> Lista >> Forrás: C1:C10 >> OK',
        isCorrect: false,
    },
    answer_data_1333: {
        text: 'Megengedve >> Szöveghossz >> minimum 0; maximum 6',
        isCorrect: true,
    },
    answer_data_1334: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 6',
        isCorrect: false,
    },
    answer_data_1335: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 7',
        isCorrect: false,
    },
    answer_data_1336: {
        text: 'Megengedve >> Szöveghossz >> minimum 5; maximum 6',
        isCorrect: false,
    },
    answer_data_1337: {
        text: 'Nem lehet',
        isCorrect: false,
    },
    answer_data_1338: {
        text: 'Formátum',
        isCorrect: false,
    },
    answer_data_1339: {
        text: 'Adatok érvényesítése',
        isCorrect: false,
    },
    answer_data_1340: {
        text: 'Adatok érvényesítése >> Hibajelzés fül',
        isCorrect: true,
    },
    answer_data_1341: {
        text: 'A THM: a B2 cella',
        isCorrect: false,
    },
    answer_data_1342: {
        text: 'A hónap: a B4 cella. Fix hivatkozással: $B$3',
        isCorrect: true,
    },
    answer_data_1343: {
        text: 'A hónap: a B3 cella',
        isCorrect: true,
    },
    answer_data_1344: {
        text: 'A THM: a B2 cella Fix hivatkozással: $B$2',
        isCorrect: false,
    },
    answer_data_1345: {
        text: 'Mert ha tagolva van és nem szám a formátum, akkor a tagolást szóköznek veszi az Excel és nem fog tudni számolni.',
        isCorrect: true,
    },
    answer_data_1346: {
        text: 'Mert így kevesebb lesz az adat, amit át kell konvertálni',
        isCorrect: false,
    },
    answer_data_1347: {
        text: 'Nem kell',
        isCorrect: false,
    },
    answer_data_1348: {
        text: 'Mert tizedes törtet nem tud átkonvertálni',
        isCorrect: false,
    },
    answer_data_1349: {
        text: 'ACII',
        isCorrect: false,
    },
    answer_data_1350: {
        text: 'UTF8',
        isCorrect: true,
    },
    answer_data_1351: {
        text: '1250',
        isCorrect: false,
    },
    answer_data_1352: {
        text: 'Európai/Magyar',
        isCorrect: false,
    },
    answer_data_1353: {
        text: 'Semmi hiba nem történik',
        isCorrect: false,
    },
    answer_data_1354: {
        text: 'Üres cellákat kapok',
        isCorrect: false,
    },
    answer_data_1355: {
        text: 'Mindent kétszer ír ki',
        isCorrect: false,
    },
    answer_data_1356: {
        text: 'Az Excel az egész táblázatot átmásolja szűrés helyett.',
        isCorrect: true,
    },
    answer_data_1357: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak elrejti',
        isCorrect: true,
    },
    answer_data_1358: {
        text: 'Áttekinthetőbb lesz a táblázat, a felesleges adatokat törli az Excel',
        isCorrect: false,
    },
    answer_data_1359: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak másik munkalapra menti',
        isCorrect: false,
    },
    answer_data_1360: {
        text: 'Az Excel a kiszűrt adatokat törli',
        isCorrect: false,
    },
    answer_data_1361: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Első 10 Százalék',
        isCorrect: false,
    },
    answer_data_1362: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Első 10 Százalék',
        isCorrect: false,
    },
    answer_data_1363: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Első 10 Tétel',
        isCorrect: true,
    },
    answer_data_1364: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Első 10 Tétel',
        isCorrect: false,
    },
    answer_data_1471: {
        text: 'CTRL + D',
        isCorrect: false,
    },
    answer_data_1472: {
        text: 'F2',
        isCorrect: false,
    },
    answer_data_1365: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: CÉGNÉV és RENDELÉS ÖSSZEGE',
        isCorrect: false,
    },
    answer_data_1366: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        isCorrect: false,
    },
    answer_data_1367: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS IDŐPONTJA',
        isCorrect: false,
    },
    answer_data_1368: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        isCorrect: true,
    },
    answer_data_1369: {
        text: 'Igen',
        isCorrect: false,
    },
    answer_data_1370: {
        text: 'Nem',
        isCorrect: true,
    },
    answer_data_1371: {
        text: 'Igen, de csak oszlopokból',
        isCorrect: false,
    },
    answer_data_1372: {
        text: 'Igen, maximum 3 különálló sorból',
        isCorrect: false,
    },
    answer_data_1393: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás ',
        isCorrect: false,
    },
    answer_data_1394: {
        text: 'Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: false,
    },
    answer_data_1395: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Oldalak >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: false,
    },
    answer_data_1396: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        isCorrect: true,
    },
    answer_data_1397: {
        text: 'Bal felső',
        isCorrect: true,
    },
    answer_data_1398: {
        text: 'Bal alsó',
        isCorrect: false,
    },
    answer_data_1399: {
        text: 'Jobb alsó',
        isCorrect: false,
    },
    answer_data_1400: {
        text: 'Jobb felső',
        isCorrect: false,
    },
    answer_data_1401: {
        text: 'Beírom, hogy "hatvány"',
        isCorrect: false,
    },
    answer_data_1402: {
        text: 'Beírom, hogy "*"',
        isCorrect: false,
    },
    answer_data_1403: {
        text: 'Beírom, hogy "^"',
        isCorrect: true,
    },
    answer_data_1404: {
        text: 'Beírom, hogy "X"',
        isCorrect: false,
    },
    answer_data_1405: {
        text: '"B4*B5"',
        isCorrect: false,
    },
    answer_data_1406: {
        text: '"B4 * B5"',
        isCorrect: false,
    },
    answer_data_1407: {
        text: '"=B4XB5"',
        isCorrect: false,
    },
    answer_data_1408: {
        text: '"=B4*B5"',
        isCorrect: true,
    },
    answer_data_1409: {
        text: 'Alt+3',
        isCorrect: false,
    },
    answer_data_1410: {
        text: 'AltGr+3',
        isCorrect: true,
    },
    answer_data_1411: {
        text: 'Ctrl+3',
        isCorrect: false,
    },
    answer_data_1412: {
        text: 'AltGr+Ctrl',
        isCorrect: false,
    },
    answer_data_1413: {
        text: 'A számok közé Entert ütök',
        isCorrect: false,
    },
    answer_data_1414: {
        text: 'A számok közé szóközt ütök',
        isCorrect: false,
    },
    answer_data_1415: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menüszalagon)',
        isCorrect: true,
    },
    answer_data_1416: {
        text: 'A számok közé Tab-ot ütök',
        isCorrect: false,
    },
    answer_data_1417: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 3 és 3',
        isCorrect: false,
    },
    answer_data_1418: {
        text: 'Formátum >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: false,
    },
    answer_data_1419: {
        text: ' Feltételes formázás >> Kezdőlap >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: false,
    },
    answer_data_1420: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        isCorrect: true,
    },
    answer_data_1421: {
        text: 'Az adattartományra kattintok, majd a Kezdőlap menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: true,
    },
    answer_data_1422: {
        text: 'Az adattartományra kattintok, majd a Adatok menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_1423: {
        text: 'Az adattartományra kattintok, majd a Nézet menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_1424: {
        text: 'Az adattartományra kattintok, majd a Képletek menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        isCorrect: false,
    },
    answer_data_1425: {
        text: '"=ÁTLAG(B2:B20)"',
        isCorrect: true,
    },
    answer_data_1426: {
        text: '"ÁTLAG(B2:B20)"',
        isCorrect: false,
    },
    answer_data_1427: {
        text: '"=ÁTLAG(B2;B20)"',
        isCorrect: false,
    },
    answer_data_1428: {
        text: '"=ÁTLAG(B2 B20)"',
        isCorrect: false,
    },
    answer_data_1429: {
        text: '"DARABTELI(B2:B20;2)"',
        isCorrect: false,
    },
    answer_data_1430: {
        text: '"=DARABTELI(B2:B20;5)"',
        isCorrect: false,
    },
    answer_data_1431: {
        text: '"=DARABTELI(2;B2:B20)"',
        isCorrect: false,
    },
    answer_data_1432: {
        text: '"=DARABTELI(B2:B20;2)"',
        isCorrect: true,
    },
    answer_data_1433: {
        text: '"=HA(A1=0;"TEA";"KÁVÉ)"',
        isCorrect: true,
    },
    answer_data_1434: {
        text: '"=HA(B2=0;"TEA";"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_1435: {
        text: '"=HAA1(B2=0;"TEA";"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_1436: {
        text: '"=HA(A1=0;"TEA";VAGY,"KÁVÉ)"',
        isCorrect: false,
    },
    answer_data_1437: {
        text: 'JÓ, ROSSZ',
        isCorrect: false,
    },
    answer_data_1438: {
        text: 'OK, NEM OK',
        isCorrect: false,
    },
    answer_data_1439: {
        text: 'IGAZ, HAMIS',
        isCorrect: true,
    },
    answer_data_1440: {
        text: 'Nincs kimeneti üzenete',
        isCorrect: false,
    },
    answer_data_1441: {
        text: 'Több darabot számol egy tartományban',
        isCorrect: false,
    },
    answer_data_1442: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az összes kritérium',
        isCorrect: true,
    },
    answer_data_1443: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre több kritérium',
        isCorrect: false,
    },
    answer_data_1444: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre 3 kritérium',
        isCorrect: false,
    },
    answer_data_1445: {
        text: '"=KEREKÍTÉS(A1;3)"',
        isCorrect: true,
    },
    answer_data_1446: {
        text: '"=KEREKÍTÉS(A1;0;3)"',
        isCorrect: false,
    },
    answer_data_1447: {
        text: '"=KEREKÍTÉS(A1;111)"',
        isCorrect: false,
    },
    answer_data_1448: {
        text: '"=KEREKÍTÉS(A1;000)"',
        isCorrect: false,
    },
    answer_data_1449: {
        text: 'Szélesebb sorral',
        isCorrect: false,
    },
    answer_data_1450: {
        text: 'Szélesebb oszloppal',
        isCorrect: true,
    },
    answer_data_1451: {
        text: 'Ellenőrzöm a képletet',
        isCorrect: false,
    },
    answer_data_1452: {
        text: 'Megkeresem a hiányzó hivatkozást',
        isCorrect: false,
    },
    answer_data_1453: {
        text: 'CTRL + O ',
        isCorrect: false,
    },
    answer_data_1454: {
        text: 'CTRL + B',
        isCorrect: false,
    },
    answer_data_1455: {
        text: 'CTRL + S',
        isCorrect: true,
    },
    answer_data_1456: {
        text: 'CTRL + A',
        isCorrect: false,
    },
    answer_data_1457: {
        text: 'Több oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        isCorrect: true,
    },
    answer_data_1458: {
        text: 'Egy oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        isCorrect: false,
    },
    answer_data_1459: {
        text: 'Több oldalas dokumentumot egy példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        isCorrect: false,
    },
    answer_data_1460: {
        text: '1-1-1-1 2-2-2-2 3-3-3-3',
        isCorrect: false,
    },
    answer_data_1461: {
        text: 'Írásvédett lesz.',
        isCorrect: false,
    },
    answer_data_1462: {
        text: 'Törölhetetlen lesz.',
        isCorrect: false,
    },
    answer_data_1463: {
        text: 'A Word fájlmenüjében rögzítem a fájlt, hogy mindig lássam a menüben.',
        isCorrect: true,
    },
    answer_data_1464: {
        text: 'PDF-fájl lesz belőle.',
        isCorrect: false,
    },
    answer_data_1465: {
        text: 'A cím mutatja.',
        isCorrect: false,
    },
    answer_data_1466: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_1467: {
        text: 'Adatok menü: Információ',
        isCorrect: false,
    },
    answer_data_1468: {
        text: 'Fájl menü: Információ',
        isCorrect: true,
    },
    answer_data_1469: {
        text: 'CTRL + B',
        isCorrect: false,
    },
    answer_data_1470: {
        text: 'Kezdőlap >> Betűtipus >> Kattintok a "D"-re vagy CTRL + I',
        isCorrect: true,
    },
    answer_data_1473: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        isCorrect: false,
    },
    answer_data_1474: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        isCorrect: false,
    },
    answer_data_1475: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        isCorrect: false,
    },
    answer_data_1476: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        isCorrect: true,
    },
    answer_data_1477: {
        text: 'Nem lehet frissíteni.',
        isCorrect: false,
    },
    answer_data_1478: {
        text: 'Manuálisan kell átírni az oldalszámokat. ',
        isCorrect: false,
    },
    answer_data_1479: {
        text: 'Kattintok a tartalomjegyzékre, majd a fent megjelenő "Frissítés"-re. ',
        isCorrect: true,
    },
    answer_data_1480: {
        text: 'F2',
        isCorrect: false,
    },
    answer_data_1481: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_1482: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_1483: {
        text: 'Csak C4 méretben',
        isCorrect: false,
    },
    answer_data_1484: {
        text: 'Csak A4 méretben',
        isCorrect: false,
    },
    answer_data_1485: {
        text: 'Arra, hogy nagy legyen',
        isCorrect: false,
    },
    answer_data_1486: {
        text: 'Arra, hogy kicsi legyen',
        isCorrect: false,
    },
    answer_data_1487: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: true,
    },
    answer_data_1488: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: false,
    },
    answer_data_1489: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        isCorrect: true,
    },
    answer_data_1490: {
        text: 'Nagybetű formátum és méret.',
        isCorrect: false,
    },
    answer_data_1491: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete megváltozik.',
        isCorrect: false,
    },
    answer_data_1492: {
        text: 'A formátuma a kisbetűéké, a mérete a nagyoké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        isCorrect: false,
    },
    answer_data_1493: {
        text: 'Szóközt ütök közéjük.',
        isCorrect: false,
    },
    answer_data_1494: {
        text: 'Kijelölöm a ritkítani kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Térköz: Ritkított.>> Ok',
        isCorrect: true,
    },
    answer_data_1495: {
        text: 'Tab-ot ütök közéjük',
        isCorrect: false,
    },
    answer_data_1496: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Sorköz: Ritkított.>> Ok',
        isCorrect: false,
    },
    answer_data_1497: {
        text: 'Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Szövegeffektusok',
        isCorrect: true,
    },
    answer_data_1498: {
        text: 'Nézet',
        isCorrect: false,
    },
    answer_data_1499: {
        text: 'Kezdőlap menüszalag: Betűtípus résznél van az ikonja.',
        isCorrect: true,
    },
    answer_data_1500: {
        text: 'Beállítások',
        isCorrect: false,
    },
    answer_data_1501: {
        text: 'CTRL + J',
        isCorrect: false,
    },
    answer_data_1502: {
        text: 'CTRL + R',
        isCorrect: true,
    },
    answer_data_1503: {
        text: 'CTRL + NYÍL JOBBRA',
        isCorrect: false,
    },
    answer_data_1504: {
        text: 'CTRL + END',
        isCorrect: false,
    },
    answer_data_1505: {
        text: 'Sorköz',
        isCorrect: false,
    },
    answer_data_1506: {
        text: 'Behúzás',
        isCorrect: false,
    },
    answer_data_1507: {
        text: 'Enter',
        isCorrect: false,
    },
    answer_data_1508: {
        text: 'Térköz',
        isCorrect: true,
    },
    answer_data_1509: {
        text: 'Kattintok a MÁSODIK bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: false,
    },
    answer_data_1510: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Tervezés menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: false,
    },
    answer_data_1511: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: true,
    },
    answer_data_1512: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Nézet menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        isCorrect: false,
    },
    answer_data_1513: {
        text: 'Stabilabban tartja a távolságot, mint a szóközök.',
        isCorrect: true,
    },
    answer_data_1514: {
        text: 'Gyorsabb a szóköznél',
        isCorrect: false,
    },
    answer_data_1515: {
        text: 'Térközt is ad.',
        isCorrect: false,
    },
    answer_data_1516: {
        text: 'Ritkítja a betűk közti távolságot.',
        isCorrect: false,
    },
    answer_data_1517: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        isCorrect: true,
    },
    answer_data_1518: {
        text: 'Bal klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        isCorrect: false,
    },
    answer_data_1519: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Nézet >> Számozás folytatása',
        isCorrect: false,
    },
    answer_data_1520: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Frissítés',
        isCorrect: false,
    },
    answer_data_1521: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >>  a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        isCorrect: false,
    },
    answer_data_1522: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >>Beállítás a listáról és Ok',
        isCorrect: true,
    },
    answer_data_1523: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Nézet >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        isCorrect: false,
    },
    answer_data_1524: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Beállítás a listáról és Ok',
        isCorrect: false,
    },
    answer_data_1525: {
        text: 'Kattintás a fedőlapon >> Nézet menü >> Színek',
        isCorrect: false,
    },
    answer_data_1526: {
        text: 'Kattintás a fedőlapon >> Tervezés menü >> Színek',
        isCorrect: true,
    },
    answer_data_1527: {
        text: 'Kattintás a fedőlapon >> Tervezés menü >> Témák',
        isCorrect: false,
    },
    answer_data_1528: {
        text: 'Kattintás a fedőlapon >> Fedőlap menü >> Színek',
        isCorrect: false,
    },
    answer_data_1529: {
        text: 'Nem lehet stílust módosítani.',
        isCorrect: false,
    },
    answer_data_1530: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: true,
    },
    answer_data_1531: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Bal klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: false,
    },
    answer_data_1532: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Szerkesztés  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: false,
    },
    answer_data_1533: {
        text: 'Del',
        isCorrect: false,
    },
    answer_data_1534: {
        text: 'Home',
        isCorrect: true,
    },
    answer_data_1535: {
        text: 'End',
        isCorrect: false,
    },
    answer_data_1536: {
        text: 'CTRL',
        isCorrect: false,
    },
    answer_data_1537: {
        text: 'CTRL + Enter',
        isCorrect: true,
    },
    answer_data_1538: {
        text: 'Shift + Enter',
        isCorrect: false,
    },
    answer_data_1539: {
        text: 'CTRL + End',
        isCorrect: false,
    },
    answer_data_1540: {
        text: 'Ctrl + F4',
        isCorrect: false,
    },
    answer_data_1541: {
        text: 'Nem lehet.',
        isCorrect: false,
    },
    answer_data_1542: {
        text: 'Táblázat szegélyekkel teszem.',
        isCorrect: false,
    },
    answer_data_1543: {
        text: 'Szerkesztés >> Rácsvonalak',
        isCorrect: false,
    },
    answer_data_1544: {
        text: 'Nézet menü >> Megjelenítés >> Rácsvonalak',
        isCorrect: true,
    },
    answer_data_1545: {
        text: 'Kezdőlap >> Bekezdés >> Minden látszik',
        isCorrect: true,
    },
    answer_data_1546: {
        text: 'Nézet >> Bekezdés >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1547: {
        text: 'Nézet >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1548: {
        text: 'Kezdőlap >> Bekezdés >> Nagyítás >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1549: {
        text: 'Kezdőlap menü >> Ablak >> Felosztás megszüntetése',
        isCorrect: false,
    },
    answer_data_1550: {
        text: 'Kezdőlap menü >> Megjelenítés >> Webes nézet',
        isCorrect: false,
    },
    answer_data_1551: {
        text: 'Nézet menü >> Ablak >> Felosztás megszüntetése',
        isCorrect: true,
    },
    answer_data_1552: {
        text: 'Nézet menü >> Megjelenítés >> Webes nézet',
        isCorrect: false,
    },
    answer_data_1553: {
        text: 'Kezdőlap menü >> Nézet >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: false,
    },
    answer_data_1554: {
        text: 'CTRL + H >> Vágólap',
        isCorrect: false,
    },
    answer_data_1555: {
        text: 'Kezdőlap menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: true,
    },
    answer_data_1556: {
        text: 'Formátum menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: false,
    },
    answer_data_1557: {
        text: 'Ecset. Kezdőlap menü >> Vágólap >> Ecset ikon',
        isCorrect: true,
    },
    answer_data_1558: {
        text: 'Ecset. Nézet menü >> Vágólap >> Ecset ikon',
        isCorrect: false,
    },
    answer_data_1559: {
        text: 'CD-t ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        isCorrect: false,
    },
    answer_data_1560: {
        text: 'Tollat ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        isCorrect: false,
    },
    answer_data_1561: {
        text: 'Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1562: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: true,
    },
    answer_data_1563: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >>  A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1564: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Ellenőrzés >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1565: {
        text: 'Ctrl + H >> A párbeszédablakba beírom, hogy: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1566: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1567: {
        text: 'Ctrl + F >> A párbeszédablakba bírom, hogy: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1568: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >> Egyebek >> Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: true,
    },
    answer_data_1569: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Ok',
        isCorrect: false,
    },
    answer_data_1570: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "apple" >> Az összes cseréje',
        isCorrect: true,
    },
    answer_data_1571: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1572: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "alma" >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1573: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        isCorrect: true,
    },
    answer_data_1574: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Formátum >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        isCorrect: false,
    },
    answer_data_1575: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1576: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Bekezdés >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >>Az összes cseréje >> Szükség esetén ismétlem. ',
        isCorrect: false,
    },
    answer_data_1577: {
        text: 'Manuálisan kell elválasztani.',
        isCorrect: false,
    },
    answer_data_1578: {
        text: 'Kijelelöm az elválasztás tartományát. >> Tervezés menü >> Elválasztás >> Automatikus',
        isCorrect: false,
    },
    answer_data_1579: {
        text: 'Kijelelöm az elválasztás tartományát. >> Elrendezés menü >> Elválasztás >> Automatikus',
        isCorrect: true,
    },
    answer_data_1580: {
        text: 'Kijelelöm az elválasztás tartományát. >> Szerkesztés menü >> Elválasztás >> Automatikus',
        isCorrect: false,
    },
    answer_data_1581: {
        text: 'Kihagyás',
        isCorrect: false,
    },
    answer_data_1582: {
        text: 'Az összes kihagyása',
        isCorrect: false,
    },
    answer_data_1583: {
        text: 'Felvétel a szótárba',
        isCorrect: true,
    },
    answer_data_1584: {
        text: 'Szótár frissítése',
        isCorrect: false,
    },
    answer_data_1585: {
        text: 'Shift + F4',
        isCorrect: false,
    },
    answer_data_1586: {
        text: 'Shift + F5',
        isCorrect: false,
    },
    answer_data_1587: {
        text: 'Shift + F6',
        isCorrect: false,
    },
    answer_data_1588: {
        text: 'Shift + F7',
        isCorrect: true,
    },
    answer_data_1589: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        isCorrect: false,
    },
    answer_data_1590: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        isCorrect: true,
    },
    answer_data_1591: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kipipálom az azonos hasábszélességet, és beállítom az első hasábot szélesebbnek.',
        isCorrect: false,
    },
    answer_data_1592: {
        text: '(A hasábokon kívűl kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        isCorrect: false,
    },
    answer_data_1593: {
        text: 'Formátum és betűtípus',
        isCorrect: false,
    },
    answer_data_1594: {
        text: 'Adatok rendezése',
        isCorrect: false,
    },
    answer_data_1595: {
        text: 'Címsorszámozás',
        isCorrect: true,
    },
    answer_data_1596: {
        text: 'Felsorolás',
        isCorrect: false,
    },
    answer_data_1597: {
        text: 'Hivatkozások menü >>  A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >> Ok',
        isCorrect: false,
    },
    answer_data_1598: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        isCorrect: true,
    },
    answer_data_1599: {
        text: 'Hivatkozások menü >> Végjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        isCorrect: false,
    },
    answer_data_1725: {
        text: 'Jobb klikk az alakzaton >> Szerkesztés',
        isCorrect: false,
    },
    answer_data_1600: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        isCorrect: false,
    },
    answer_data_1601: {
        text: 'A menüszalagon',
        isCorrect: true,
    },
    answer_data_1602: {
        text: 'Beszúrás',
        isCorrect: false,
    },
    answer_data_1603: {
        text: 'Nézet',
        isCorrect: false,
    },
    answer_data_1604: {
        text: 'Ha nincs a menüszalagon, akkor Fájl >> (Egyebek >>) Beállítások >> Menüszalag testreszabása',
        isCorrect: true,
    },
    answer_data_1605: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        isCorrect: true,
    },
    answer_data_1606: {
        text: 'Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        isCorrect: false,
    },
    answer_data_1607: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ok.',
        isCorrect: false,
    },
    answer_data_1608: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Formátumra kattintva a lenyíló párbeszédablakban testreszabom.',
        isCorrect: false,
    },
    answer_data_1609: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: true,
    },
    answer_data_1610: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: false,
    },
    answer_data_1611: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: false,
    },
    answer_data_1612: {
        text: 'Az alakzatra kattintok, majd az Alakzat beszúrása menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        isCorrect: false,
    },
    answer_data_1613: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        isCorrect: true,
    },
    answer_data_1614: {
        text: 'Új diagramot kell szerkesztenem.',
        isCorrect: false,
    },
    answer_data_1615: {
        text: 'Kijelölöm a diagramot >> Adatok szerkesztése menü a menüszalagon >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        isCorrect: false,
    },
    answer_data_1616: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló PowerPoint-alapú táblázatban pedig szerkeszthetem az adatokat.',
        isCorrect: false,
    },
    answer_data_1617: {
        text: 'Kattintok az ábrán, majd a lenyíló párbeszédablakban adhatom meg az új adatokat.',
        isCorrect: false,
    },
    answer_data_1618: {
        text: 'A nézet menüben állíthatom át a körvonalakat.',
        isCorrect: false,
    },
    answer_data_1619: {
        text: 'Kattintok az ábrán és a menüszalagon megjelenik a SmartArt-terv menü. Ebben.',
        isCorrect: true,
    },
    answer_data_1620: {
        text: 'Nem lehet szerkeszteni.',
        isCorrect: false,
    },
    answer_data_1621: {
        text: 'Nézet >> Szín >> Szépia szín',
        isCorrect: false,
    },
    answer_data_1622: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépia szín',
        isCorrect: true,
    },
    answer_data_1623: {
        text: 'Kattintok a kép mellé >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépia szín',
        isCorrect: false,
    },
    answer_data_1624: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> RGB: 255',
        isCorrect: false,
    },
    answer_data_1625: {
        text: 'Jobb klikk az alakzaton >> Szerkesztés',
        isCorrect: false,
    },
    answer_data_1626: {
        text: 'Jobb klikk az alakzaton >> Alakzat formázása',
        isCorrect: false,
    },
    answer_data_1627: {
        text: 'Jobb klikk az alakzaton >> Csomópontok szerkesztése',
        isCorrect: true,
    },
    answer_data_1628: {
        text: 'Ezt nem lehet szerkeszteni.',
        isCorrect: false,
    },
    answer_data_1629: {
        text: 'Egy makró.',
        isCorrect: false,
    },
    answer_data_1630: {
        text: 'Egy látványos szövegrész, amit beszúrhatunk a szövegbe és formázhatunk.',
        isCorrect: true,
    },
    answer_data_1631: {
        text: 'Egy képaláírás',
        isCorrect: false,
    },
    answer_data_1632: {
        text: 'Egy Iniciálé',
        isCorrect: false,
    },
    answer_data_1633: {
        text: 'Arial',
        isCorrect: false,
    },
    answer_data_1634: {
        text: 'Tahoma',
        isCorrect: false,
    },
    answer_data_1635: {
        text: 'Wingdings',
        isCorrect: true,
    },
    answer_data_1636: {
        text: 'Courgette',
        isCorrect: false,
    },
    answer_data_1637: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        isCorrect: true,
    },
    answer_data_1638: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és hagyjuk ki az Automatikus frissítést',
        isCorrect: false,
    },
    answer_data_1639: {
        text: 'Beszúrás menü >> Dátum és idő >> A legördülő listán állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        isCorrect: false,
    },
    answer_data_1640: {
        text: 'Dátum menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        isCorrect: false,
    },
    answer_data_1641: {
        text: 'Több oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        isCorrect: true,
    },
    answer_data_1642: {
        text: 'Egy oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        isCorrect: false,
    },
    answer_data_1643: {
        text: 'Több oldalas dokumentumot egy példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        isCorrect: false,
    },
    answer_data_1644: {
        text: '1-1-1-1 2-2-2-2 3-3-3-3',
        isCorrect: false,
    },
    answer_data_1645: {
        text: 'A cím mutatja.',
        isCorrect: false,
    },
    answer_data_1646: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_1647: {
        text: 'Adatok menü: Információ',
        isCorrect: false,
    },
    answer_data_1648: {
        text: 'Fájl menü: Információ',
        isCorrect: true,
    },
    answer_data_1649: {
        text: 'CTRL + B',
        isCorrect: false,
    },
    answer_data_1650: {
        text: 'Kezdőlap >> Betűtipus >> Kattintok a "D"-re vagy CTRL + I',
        isCorrect: true,
    },
    answer_data_1651: {
        text: 'CTRL + D',
        isCorrect: false,
    },
    answer_data_1652: {
        text: 'F2',
        isCorrect: false,
    },
    answer_data_1653: {
        text: 'Nem lehet frissíteni.',
        isCorrect: false,
    },
    answer_data_1654: {
        text: 'Manuálisan kell átírni az oldalszámokat. ',
        isCorrect: false,
    },
    answer_data_1655: {
        text: 'Kattintok a tartalomjegyzékre, majd a fent megjelenő "Frissítés"-re. ',
        isCorrect: true,
    },
    answer_data_1656: {
        text: 'F2',
        isCorrect: false,
    },
    answer_data_1657: {
        text: 'CTRL + F',
        isCorrect: false,
    },
    answer_data_1658: {
        text: 'CTRL + D',
        isCorrect: false,
    },
    answer_data_1659: {
        text: 'CTRL + B',
        isCorrect: true,
    },
    answer_data_1660: {
        text: 'CTRL + T',
        isCorrect: false,
    },
    answer_data_1661: {
        text: 'Szóközt ütök közéjük.',
        isCorrect: false,
    },
    answer_data_1662: {
        text: 'Kijelölöm a ritkítani kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Térköz: Ritkított.>> Ok',
        isCorrect: true,
    },
    answer_data_1663: {
        text: 'Tab-ot ütök közéjük',
        isCorrect: false,
    },
    answer_data_1664: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Sorköz: Ritkított.>> Ok',
        isCorrect: false,
    },
    answer_data_1665: {
        text: 'Stabilabban tartja a távolságot, mint a szóközök.',
        isCorrect: true,
    },
    answer_data_1666: {
        text: 'Gyorsabb a szóköznél',
        isCorrect: false,
    },
    answer_data_1667: {
        text: 'Térközt is ad.',
        isCorrect: false,
    },
    answer_data_1668: {
        text: 'Ritkítja a betűk közti távolságot.',
        isCorrect: false,
    },
    answer_data_1669: {
        text: 'Kattintok a vonalzón a margóra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        isCorrect: false,
    },
    answer_data_1670: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        isCorrect: true,
    },
    answer_data_1671: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  vessző >> Ok',
        isCorrect: false,
    },
    answer_data_1672: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló helyi menün kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        isCorrect: false,
    },
    answer_data_1673: {
        text: 'Bal egérgombbal duplán kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: true,
    },
    answer_data_1674: {
        text: 'Jobbal kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: false,
    },
    answer_data_1675: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Nézet menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: false,
    },
    answer_data_1676: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Tervezés menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        isCorrect: false,
    },
    answer_data_1677: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása >> Stílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        isCorrect: true,
    },
    answer_data_1678: {
        text: 'Formátum menü >> Stílusok >> Új Stílus',
        isCorrect: false,
    },
    answer_data_1679: {
        text: 'Bal klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        isCorrect: false,
    },
    answer_data_1680: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus átnevezése  párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        isCorrect: false,
    },
    answer_data_1681: {
        text: 'Nem lehet stílust módosítani.',
        isCorrect: false,
    },
    answer_data_1682: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: true,
    },
    answer_data_1683: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Bal klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: false,
    },
    answer_data_1684: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Szerkesztés  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        isCorrect: false,
    },
    answer_data_1685: {
        text: 'Del',
        isCorrect: false,
    },
    answer_data_1686: {
        text: 'Home',
        isCorrect: true,
    },
    answer_data_1687: {
        text: 'End',
        isCorrect: false,
    },
    answer_data_1688: {
        text: 'CTRL',
        isCorrect: false,
    },
    answer_data_1689: {
        text: 'Kezdőlap >> Bekezdés >> Minden látszik',
        isCorrect: true,
    },
    answer_data_1690: {
        text: 'Nézet >> Bekezdés >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1691: {
        text: 'Nézet >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1692: {
        text: 'Kezdőlap >> Bekezdés >> Nagyítás >> Minden látszik',
        isCorrect: false,
    },
    answer_data_1693: {
        text: 'Kezdőlap menü >> Nézet >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: false,
    },
    answer_data_1694: {
        text: 'CTRL + H >> Vágólap',
        isCorrect: false,
    },
    answer_data_1695: {
        text: 'Kezdőlap menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: true,
    },
    answer_data_1696: {
        text: 'Formátum menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        isCorrect: false,
    },
    answer_data_1697: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Bal oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        isCorrect: false,
    },
    answer_data_1698: {
        text: 'Nem lehet ilyet beállítani.',
        isCorrect: false,
    },
    answer_data_1699: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        isCorrect: true,
    },
    answer_data_1700: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Formázás >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        isCorrect: false,
    },
    answer_data_1701: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        isCorrect: true,
    },
    answer_data_1702: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >>  Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        isCorrect: false,
    },
    answer_data_1703: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szín a listából: piros >> Ok vagy Alkalmaz',
        isCorrect: false,
    },
    answer_data_1704: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok;  >> Ok vagy Alkalmaz',
        isCorrect: false,
    },
    answer_data_1705: {
        text: 'Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1706: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: true,
    },
    answer_data_1707: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >>  A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1708: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Ellenőrzés >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        isCorrect: false,
    },
    answer_data_1709: {
        text: 'Ctrl + H >> A párbeszédablakba beírom, hogy: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1710: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1711: {
        text: 'Ctrl + F >> A párbeszédablakba bírom, hogy: Courgette >> Ok',
        isCorrect: false,
    },
    answer_data_1712: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >> Egyebek >> Formátum >> Betűtipus: Courgette >> Ok',
        isCorrect: true,
    },
    answer_data_1713: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Ok',
        isCorrect: false,
    },
    answer_data_1714: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "apple" >> Az összes cseréje',
        isCorrect: true,
    },
    answer_data_1715: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1716: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "alma" >> Az összes cseréje',
        isCorrect: false,
    },
    answer_data_1717: {
        text: 'Kezdőlap menü >> Bekezdés >> Rendezés ikon',
        isCorrect: true,
    },
    answer_data_1718: {
        text: 'Nézet menü >> Bekezdés >> Rendezés ikon',
        isCorrect: false,
    },
    answer_data_1719: {
        text: 'Kezdőlap menü >> Adatok >> Bekezdés >> Rendezés ikon',
        isCorrect: false,
    },
    answer_data_1720: {
        text: 'Kezdőlap menü >> Nézet >> Rendezés ikonKezdőlap menü >> Nézet >> Rendezés ikon',
        isCorrect: false,
    },
    answer_data_1721: {
        text: 'Formátum és betűtípus',
        isCorrect: false,
    },
    answer_data_1722: {
        text: 'Adatok rendezése',
        isCorrect: false,
    },
    answer_data_1723: {
        text: 'Címsorszámozás',
        isCorrect: true,
    },
    answer_data_1724: {
        text: 'Felsorolás',
        isCorrect: false,
    },
    answer_data_1726: {
        text: 'Jobb klikk az alakzaton >> Alakzat formázása',
        isCorrect: false,
    },
    answer_data_1727: {
        text: 'Jobb klikk az alakzaton >> Csomópontok szerkesztése',
        isCorrect: true,
    },
    answer_data_1728: {
        text: 'Ezt nem lehet szerkeszteni.',
        isCorrect: false,
    },
    answer_data_1729: {
        text: 'Kiírja, hogy "hello".',
        isCorrect: false,
    },
    answer_data_1730: {
        text: ' Az Üres bemutató lehetőség mellett megnyithatunk egy "Üdvözli a PowerPoint" című bemutatót, ami sok mindent elmagyaráz.',
        isCorrect: true,
    },
    answer_data_1731: {
        text: 'Youtube linket ad. ',
        isCorrect: false,
    },
    answer_data_1732: {
        text: 'Emailt küld nekünk.',
        isCorrect: false,
    },
    answer_data_1733: {
        text: 'Nézet menü >> Ablakváltás >> arra a prezentációra kattintok, amivel dolgozni akarok.',
        isCorrect: true,
    },
    answer_data_1734: {
        text: 'Nem lehet.',
        isCorrect: false,
    },
    answer_data_1735: {
        text: 'Mentem a befejezni kívántat és kilépek belőle.',
        isCorrect: false,
    },
    answer_data_1736: {
        text: 'Nézet menü >> Aktív prezentáció >> arra a prezentációra kattintok, amivel dolgozni akarok.',
        isCorrect: false,
    },
    answer_data_1737: {
        text: 'bal felső sarok',
        isCorrect: false,
    },
    answer_data_1738: {
        text: 'bal alsó sarok',
        isCorrect: false,
    },
    answer_data_1739: {
        text: 'jobb felső sarok',
        isCorrect: false,
    },
    answer_data_1740: {
        text: 'jobb alsó sarok',
        isCorrect: true,
    },
    answer_data_1741: {
        text: 'Nem lehet.',
        isCorrect: false,
    },
    answer_data_1742: {
        text: 'Csak az alapértelmezett helyekre lehet. ',
        isCorrect: false,
    },
    answer_data_1743: {
        text: 'Beszúrás menü >> Szöveg >> Szövegdoboz >> majd egérrel kijelölöm a dián a helyet.',
        isCorrect: true,
    },
    answer_data_1744: {
        text: 'Nézet menü >> Szövegdoboz.',
        isCorrect: false,
    },
    answer_data_1745: {
        text: 'CTRL + X',
        isCorrect: false,
    },
    answer_data_1746: {
        text: 'CTRL+ Z',
        isCorrect: false,
    },
    answer_data_1747: {
        text: 'A mégis nyila a gyorselérési eszköztáron (balra visszaforduló nyíl)',
        isCorrect: false,
    },
    answer_data_1748: {
        text: 'A mégis nyila a gyorselérési eszköztáron (jobbra visszaforduló nyíl)',
        isCorrect: true,
    },
    answer_data_1749: {
        text: '.ppt',
        isCorrect: false,
    },
    answer_data_1750: {
        text: '.keynote',
        isCorrect: false,
    },
    answer_data_1751: {
        text: '.docx',
        isCorrect: false,
    },
    answer_data_1752: {
        text: '.pptx',
        isCorrect: true,
    },
    answer_data_1753: {
        text: '1 kattintás a bal egérgombbal',
        isCorrect: false,
    },
    answer_data_1754: {
        text: '1 kattintás a jobb egérgombbal',
        isCorrect: false,
    },
    answer_data_1755: {
        text: '2 kattintás a bal egérgombbal',
        isCorrect: true,
    },
    answer_data_1756: {
        text: '2 kattintás a jobb egérgombbal',
        isCorrect: false,
    },
    answer_data_1757: {
        text: 'Többen látják a fájlt.',
        isCorrect: false,
    },
    answer_data_1758: {
        text: 'Egyszerre többen is dolgozhatunk egy fájlon.',
        isCorrect: true,
    },
    answer_data_1759: {
        text: 'Elküldhetem a fájlt bárkinek.',
        isCorrect: false,
    },
    answer_data_1760: {
        text: 'Felváltva többen is dolgozhatuk egy fájlon.',
        isCorrect: false,
    },
    answer_data_1761: {
        text: 'Csak szabványméretek vannak.',
        isCorrect: false,
    },
    answer_data_1763: {
        text: 'Nézet menü >> Egyéni diaméret',
        isCorrect: false,
    },
    answer_data_1764: {
        text: 'Formátum menü >> Diaméret >> Egyéni diaméret.',
        isCorrect: false,
    },
    answer_data_1765: {
        text: 'Ctrl',
        isCorrect: false,
    },
    answer_data_1766: {
        text: 'NumLock',
        isCorrect: false,
    },
    answer_data_1767: {
        text: 'Del',
        isCorrect: true,
    },
    answer_data_1768: {
        text: 'Win',
        isCorrect: false,
    },
    answer_data_1769: {
        text: 'Ctrl',
        isCorrect: true,
    },
    answer_data_1770: {
        text: 'Shift',
        isCorrect: false,
    },
    answer_data_1771: {
        text: 'Alt',
        isCorrect: false,
    },
    answer_data_1772: {
        text: 'Win',
        isCorrect: false,
    },
    answer_data_1773: {
        text: 'A kijelölés után rákattintok a bal egérgombbal, de lenyomva tartom és amíg az egérgomb le van nyomva - húzással oda mozgatom, ahova szeretném.',
        isCorrect: true,
    },
    answer_data_1774: {
        text: 'A kijelölés után rákattintok a jobb egérgombbal, de lenyomva tartom és amíg az egérgomb le van nyomva - húzással oda mozgatom, ahova szeretném.',
        isCorrect: false,
    },
    answer_data_1775: {
        text: 'A kijelölés után rákattintok a jobb egérgombbal, de majd felengedem a gombot és húzással oda mozgatom, ahova szeretném.',
        isCorrect: false,
    },
    answer_data_1776: {
        text: 'Csak másolni lehet, mozgatni nem.',
        isCorrect: false,
    },
    answer_data_1777: {
        text: 'Szövegdoboz',
        isCorrect: false,
    },
    answer_data_1778: {
        text: 'Szövegrész',
        isCorrect: false,
    },
    answer_data_1779: {
        text: 'Kép',
        isCorrect: false,
    },
    answer_data_1780: {
        text: 'Dia',
        isCorrect: true,
    },
    answer_data_1781: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1782: {
        text: 'Beillesztés képként - ezután igen.',
        isCorrect: true,
    },
    answer_data_1783: {
        text: 'Forrásformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        isCorrect: false,
    },
    answer_data_1784: {
        text: 'Célformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        isCorrect: false,
    },
    answer_data_1785: {
        text: '12 a PowerPointból.',
        isCorrect: false,
    },
    answer_data_1786: {
        text: '24 a PowerPointból.',
        isCorrect: false,
    },
    answer_data_1787: {
        text: '24 a PowerPointból és más alkalmazásokból.',
        isCorrect: true,
    },
    answer_data_1788: {
        text: '12 a PowerPointból és más alkalmazásokból.',
        isCorrect: false,
    },
    answer_data_1793: {
        text: 'Arra, hogy nagy legyen',
        isCorrect: false,
    },
    answer_data_1794: {
        text: 'Arra, hogy kicsi legyen',
        isCorrect: false,
    },
    answer_data_1795: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: true,
    },
    answer_data_1796: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: false,
    },
    answer_data_1801: {
        text: 'kb. 60cm',
        isCorrect: false,
    },
    answer_data_1802: {
        text: 'kb. 6 cm',
        isCorrect: false,
    },
    answer_data_1803: {
        text: 'kb. 24 cm',
        isCorrect: false,
    },
    answer_data_1804: {
        text: 'kb. 2,4 cm',
        isCorrect: true,
    },
    answer_data_1805: {
        text: 'L',
        isCorrect: false,
    },
    answer_data_1806: {
        text: 'I',
        isCorrect: false,
    },
    answer_data_1807: {
        text: 'Y',
        isCorrect: false,
    },
    answer_data_1808: {
        text: 'D',
        isCorrect: true,
    },
    answer_data_1809: {
        text: 'Nem',
        isCorrect: false,
    },
    answer_data_1810: {
        text: '1 és 10 között.',
        isCorrect: false,
    },
    answer_data_1811: {
        text: 'Igen. Pozitív és negatív % értékekkel.',
        isCorrect: true,
    },
    answer_data_1812: {
        text: '1 és 5 között',
        isCorrect: false,
    },
    answer_data_1813: {
        text: 'Kezdőlap menü >> Nézet >> Térköz és pozíció.',
        isCorrect: false,
    },
    answer_data_1814: {
        text: 'Nézet menü >> Betűtipus rész >> Térköz és pozíció.',
        isCorrect: false,
    },
    answer_data_1815: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és pozíció.',
        isCorrect: true,
    },
    answer_data_1816: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és betűköz.',
        isCorrect: false,
    },
    answer_data_1817: {
        text: 'A kijelölt rész betűit mindenképpen kisbetűre állítja',
        isCorrect: false,
    },
    answer_data_1818: {
        text: 'A kijelölt rész betűméretét kisebbre vagy nagyobbra állítja',
        isCorrect: false,
    },
    answer_data_1819: {
        text: 'A kijelölt rész betűi közül az eredetileg nagybetűket kicsire cseréli, a kisbetűket pedig nagyra.',
        isCorrect: true,
    },
    answer_data_1820: {
        text: 'Az alapértelmezett betűtípust változtatja meg.',
        isCorrect: false,
    },
    answer_data_1821: {
        text: 'A betűszíneknél, a lenyitható listánál: >> További színek... >>Egyéni fül >> RGB (esetleg hexadecimális)',
        isCorrect: true,
    },
    answer_data_1822: {
        text: 'A nézetnél, a lenyitható listánál: >> További színek... >>Egyéni fül >> RGB (esetleg hexadecimális)',
        isCorrect: false,
    },
    answer_data_1823: {
        text: 'A betűszíneknél, a lenyitható listánál: >>  RGB (esetleg hexadecimális)',
        isCorrect: false,
    },
    answer_data_1824: {
        text: 'A betűszíneknél, a lenyitható listánál: >> Színek... >>Egyéni fül >> RGB (esetleg hexadecimális)',
        isCorrect: false,
    },
    answer_data_1825: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: true,
    },
    answer_data_1826: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> bal alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: false,
    },
    answer_data_1827: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> balra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: false,
    },
    answer_data_1828: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra felfelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: false,
    },
    answer_data_1829: {
        text: 'sorok',
        isCorrect: false,
    },
    answer_data_1830: {
        text: 'betűk',
        isCorrect: false,
    },
    answer_data_1831: {
        text: 'bekezdések',
        isCorrect: true,
    },
    answer_data_1832: {
        text: 'diák',
        isCorrect: false,
    },
    answer_data_1833: {
        text: 'balra',
        isCorrect: false,
    },
    answer_data_1834: {
        text: 'középre',
        isCorrect: false,
    },
    answer_data_1835: {
        text: 'fel',
        isCorrect: true,
    },
    answer_data_1836: {
        text: 'jobbra',
        isCorrect: false,
    },
    answer_data_1837: {
        text: 'A WordArt-ot 100-nál kevesebb színnel tölthetem ki.',
        isCorrect: true,
    },
    answer_data_1838: {
        text: 'A WordArt-ot képpel is kitölthetem.',
        isCorrect: false,
    },
    answer_data_1839: {
        text: 'A WordArt-ot  PowerPoint által megadott színekkel is kitölthetem.',
        isCorrect: false,
    },
    answer_data_1840: {
        text: 'A WordArt-ot az internetről letöltött képpel is kitölthetem.',
        isCorrect: false,
    },
    answer_data_1841: {
        text: 'Áttetszőség',
        isCorrect: false,
    },
    answer_data_1842: {
        text: 'Méret',
        isCorrect: false,
    },
    answer_data_1843: {
        text: 'Elmosás',
        isCorrect: false,
    },
    answer_data_1844: {
        text: 'Térköz',
        isCorrect: true,
    },
    answer_data_1762: {
        text: 'Tervezés menü >> Diaméret >> Egyéni diaméret ',
        isCorrect: true,
    },
    answer_data_1845: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Kiigazítás menüben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: false,
    },
    answer_data_1846: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Szín részben a Kiigazítás ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: false,
    },
    answer_data_1847: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Kiigazítás részben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: true,
    },
    answer_data_1848: {
        text: 'Nem lehet a beszúrt képet formázni.',
        isCorrect: false,
    },
    answer_data_1849: {
        text: 'Első oszlop',
        isCorrect: false,
    },
    answer_data_1850: {
        text: 'Középső oszlop',
        isCorrect: true,
    },
    answer_data_1851: {
        text: 'Utolsó oszlop',
        isCorrect: false,
    },
    answer_data_1852: {
        text: 'Összegsor',
        isCorrect: false,
    },
    answer_data_1853: {
        text: 'Keretezés',
        isCorrect: false,
    },
    answer_data_1854: {
        text: 'Árnyékolás',
        isCorrect: false,
    },
    answer_data_1855: {
        text: 'Tükröződés',
        isCorrect: false,
    },
    answer_data_1856: {
        text: 'Fazetta',
        isCorrect: true,
    },
    answer_data_1857: {
        text: 'A szövegdoboz vonalain 8 darab pont van.',
        isCorrect: false,
    },
    answer_data_1858: {
        text: 'A csúcsokon lévő pontok segítségével nyújtom a szövegdobozt.',
        isCorrect: false,
    },
    answer_data_1859: {
        text: 'Az oldalfelezőkön lévő pontok segítségével elforgatom a szövegdobozt.',
        isCorrect: true,
    },
    answer_data_1860: {
        text: 'A nyújtás méretarányos átméretezés.',
        isCorrect: false,
    },
    answer_data_1861: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűméretét.',
        isCorrect: true,
    },
    answer_data_1862: {
        text: 'A PowerPoint automatikusan a szövegdobozt igazítja a beírt szöveg betűméretéhez.',
        isCorrect: false,
    },
    answer_data_1863: {
        text: 'A PowerPoint nem igazítja automatikusan a szövegdobozhoz a beírt szöveg betűméretét.',
        isCorrect: false,
    },
    answer_data_1864: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűtípusát.',
        isCorrect: false,
    },
    answer_data_1865: {
        text: 'Igen, a szövegdobozra kattintva a Szaggatott vonal menün, a Körvonal ikonján kattintva a lenyíló menüben az Alakzat formátuma lehetőségnél.',
        isCorrect: false,
    },
    answer_data_1866: {
        text: 'Igen, a diára kattintva az Alakzat formátuma menün, a Körvonal ikonján kattintva a lenyíló menüben a Szaggatott vonal lehetőségnél.',
        isCorrect: false,
    },
    answer_data_1867: {
        text: 'Igen, a szövegdobozra kattintva a Körvonal menün, az Alakzat formátuma ikonján kattintva a lenyíló menüben a Szaggatott vonal lehetőségnél.',
        isCorrect: false,
    },
    answer_data_1868: {
        text: 'Igen, a szövegdobozra kattintva az Alakzat formátuma menün a Körvonal ikonján kattintva a lenyíló menüben a Szaggatott vonal lehetőségnél.',
        isCorrect: true,
    },
    answer_data_1869: {
        text: 'Word',
        isCorrect: false,
    },
    answer_data_1870: {
        text: 'Access',
        isCorrect: false,
    },
    answer_data_1871: {
        text: 'Excel',
        isCorrect: true,
    },
    answer_data_1872: {
        text: 'Publisher',
        isCorrect: false,
    },
    answer_data_1873: {
        text: 'Minél áttetszőbb az árnyék, annál jobban látható az árnyék színe.',
        isCorrect: false,
    },
    answer_data_1874: {
        text: 'Az árnyék távolsága állandó.',
        isCorrect: false,
    },
    answer_data_1875: {
        text: 'Minél kevésbé áttetsző az árnyék, annál jobban látható az árnyék színe.',
        isCorrect: true,
    },
    answer_data_1876: {
        text: 'A tükröződés mérete állandó.',
        isCorrect: false,
    },
    answer_data_1877: {
        text: 'Felső fazetta',
        isCorrect: false,
    },
    answer_data_1878: {
        text: 'Alsó fazetta',
        isCorrect: false,
    },
    answer_data_1879: {
        text: 'WordArt',
        isCorrect: true,
    },
    answer_data_1880: {
        text: 'Megvilágítás',
        isCorrect: false,
    },
    answer_data_1881: {
        text: 'Fekete-fehérré teszi azt.',
        isCorrect: false,
    },
    answer_data_1882: {
        text: 'Egyből törli.',
        isCorrect: false,
    },
    answer_data_1883: {
        text: 'Feketébe borítja.',
        isCorrect: false,
    },
    answer_data_1884: {
        text: 'Ciklámen színnel.',
        isCorrect: true,
    },
    answer_data_1885: {
        text: 'Kattintok a beszúrt képen a jobb egérgombbal, a megjelenő Képformátum menüben a Körülvágásra kattintok, majd a lenyíló menüben a Körülvágás alakzatra lehetőségei közül kiválasztom a szívet, és kattintok a bal egérgombbal.',
        isCorrect: false,
    },
    answer_data_1886: {
        text: 'Kattintok a beszúrt képen a bal egérgombbal, a megjelenő Képformátum menüben a Körülvágásra kattintok, majd a lenyíló menüben a Körülvágás alakzatra lehetőségei közül kiválasztom a szívet, és kattintok a bal egérgombbal.',
        isCorrect: true,
    },
    answer_data_1887: {
        text: 'Kattintok a beszúrt képen a bal egérgombbal, a megjelenő Körülvágás alakzatra menüben a Körülvágásra kattintok, majd a lenyíló menüben a Képformátum  lehetőségei közül kiválasztom a szívet, és kattintok a bal egérgombbal.',
        isCorrect: false,
    },
    answer_data_1888: {
        text: 'Erre nincs lehetőség',
        isCorrect: false,
    },
    answer_data_1889: {
        text: 'Címdiát.',
        isCorrect: true,
    },
    answer_data_1890: {
        text: 'Hátteret.',
        isCorrect: false,
    },
    answer_data_1891: {
        text: 'Térhatást.',
        isCorrect: false,
    },
    answer_data_1892: {
        text: 'Bármit.',
        isCorrect: false,
    },
    answer_data_1893: {
        text: 'Win + Alt + Q',
        isCorrect: false,
    },
    answer_data_1894: {
        text: 'Win + Ctrl + Q',
        isCorrect: false,
    },
    answer_data_1895: {
        text: 'Win + Ctrl + Q + Enter',
        isCorrect: false,
    },
    answer_data_1896: {
        text: 'Win + Shift + Q',
        isCorrect: true,
    },
    answer_data_1897: {
        text: 'A videó végén lévő kép.',
        isCorrect: false,
    },
    answer_data_1898: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és teljesen testreszabható.',
        isCorrect: true,
    },
    answer_data_1899: {
        text: 'Az a kép, ami a beszúrt videó végén van, a lejátszás után kerül oda, és teljesen testreszabható.',
        isCorrect: false,
    },
    answer_data_1900: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és a videó egyik kockáját mutatja.',
        isCorrect: false,
    },
    answer_data_1901: {
        text: 'Másodperc pontossággal.',
        isCorrect: false,
    },
    answer_data_1902: {
        text: 'Nem vágható.',
        isCorrect: false,
    },
    answer_data_1903: {
        text: 'Perc pontossággal.',
        isCorrect: false,
    },
    answer_data_1904: {
        text: 'Ezredmásodperc pontossággal.',
        isCorrect: true,
    },
    answer_data_1905: {
        text: 'A videó lejátszásának általam beállított első szakaszában a nyitókép elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a videó.',
        isCorrect: false,
    },
    answer_data_1906: {
        text: 'A videó lejátszásának általam beállított utolsó szakaszában a videó elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a nyitókép.',
        isCorrect: true,
    },
    answer_data_1907: {
        text: 'A videó színeit sötétebbre állítom.',
        isCorrect: false,
    },
    answer_data_1908: {
        text: 'A videó színeit halványabbra állítom.',
        isCorrect: false,
    },
    answer_data_1909: {
        text: 'Rossz diaszám volt megadva.',
        isCorrect: false,
    },
    answer_data_1910: {
        text: 'Páratlan sorszámú diára kerülhet csak élőfej és élőláb.',
        isCorrect: false,
    },
    answer_data_1911: {
        text: 'A címdiát duplikáltuk, és a beállításnal nem kértünk a címdiára élőfejet, élőlábat. Így a duplikált dia sem kap ilyet.',
        isCorrect: true,
    },
    answer_data_1912: {
        text: 'Nem volt hiba a végrehajtásban. A PowerPoint néha hibázik, ilyenkor frissíteni kell.',
        isCorrect: false,
    },
    answer_data_1913: {
        text: 'Kezdőlap menü >> Elrendezések rész >> Diák gomb (a videón: beépített elrendezések).',
        isCorrect: false,
    },
    answer_data_1914: {
        text: 'Csak a szöveget lehet formázni a mentés után.',
        isCorrect: false,
    },
    answer_data_1915: {
        text: 'Nem lehet utólag átrendezni.',
        isCorrect: false,
    },
    answer_data_1916: {
        text: 'Kezdőlap menü >> Diák rész >> Elrendezések gomb (a videón: beépített elrendezések).',
        isCorrect: true,
    },
    answer_data_1917: {
        text: 'Diaméret menü >> Tervezés >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        isCorrect: false,
    },
    answer_data_1918: {
        text: 'Diaméret menü >> Dia mérete >>  Tervezés párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        isCorrect: false,
    },
    answer_data_1919: {
        text: 'Tervezés menü >> Diaméret >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        isCorrect: true,
    },
    answer_data_1920: {
        text: 'Csak centiméteres pontosságú beállítás érvényes.',
        isCorrect: false,
    },
    answer_data_1921: {
        text: 'Ha ketten nézzük a diavetítést.',
        isCorrect: false,
    },
    answer_data_1922: {
        text: 'Ha például projektorra ki tudom vetíteni az előadást, és a nézők a kivetítést nézik, nekem meg a PowerPoint a laptopomon mutatja, hogy mi következik, és mit mondjak még el a dia mellé.',
        isCorrect: true,
    },
    answer_data_1923: {
        text: 'Ha makróra rögzítem a prezentációt.',
        isCorrect: false,
    },
    answer_data_1924: {
        text: 'Ha önismétlő prezentációt adok elő.',
        isCorrect: false,
    },
    answer_data_1925: {
        text: 'Diavetítés menü >> Nézet >> Dia elrejtése.',
        isCorrect: false,
    },
    answer_data_1926: {
        text: 'Diavetítés menü >> Dia elrejtése.',
        isCorrect: true,
    },
    answer_data_1927: {
        text: 'Csak törölni lehet.',
        isCorrect: false,
    },
    answer_data_1928: {
        text: 'Ctrl kattintás >> Dia elrejtése',
        isCorrect: false,
    },
    answer_data_1929: {
        text: 'Ctrl + Shift +K',
        isCorrect: false,
    },
    answer_data_1930: {
        text: 'Shift + K',
        isCorrect: false,
    },
    answer_data_1931: {
        text: 'Alt + Ctrl + K',
        isCorrect: false,
    },
    answer_data_1932: {
        text: 'Ctrl + K',
        isCorrect: true,
    },
    answer_data_1933: {
        text: 'A teljes eltelt időt.',
        isCorrect: true,
    },
    answer_data_1934: {
        text: 'A hátralévő időt.',
        isCorrect: false,
    },
    answer_data_1935: {
        text: 'Az aktív diánál eltöltött időt.',
        isCorrect: false,
    },
    answer_data_1936: {
        text: 'A diák sorszámát.',
        isCorrect: false,
    },
    answer_data_1937: {
        text: '.pptx',
        isCorrect: false,
    },
    answer_data_1938: {
        text: '.ppsx',
        isCorrect: true,
    },
    answer_data_1939: {
        text: '.pppsx',
        isCorrect: false,
    },
    answer_data_1940: {
        text: '.ptpx',
        isCorrect: false,
    },
    answer_data_1941: {
        text: 'Lista',
        isCorrect: false,
    },
    answer_data_1942: {
        text: 'Folyamat',
        isCorrect: false,
    },
    answer_data_1943: {
        text: 'Hierarchia',
        isCorrect: false,
    },
    answer_data_1944: {
        text: 'Parabola',
        isCorrect: true,
    },
    answer_data_1945: {
        text: 'Térhatást ad.',
        isCorrect: false,
    },
    answer_data_1946: {
        text: 'Az áttűnést a diák között.',
        isCorrect: false,
    },
    answer_data_1947: {
        text: 'A szövegdobozt.',
        isCorrect: true,
    },
    answer_data_1948: {
        text: 'A bekezdéseket.',
        isCorrect: false,
    },
    answer_data_1953: {
        text: 'CTRL + X',
        isCorrect: false,
    },
    answer_data_1954: {
        text: 'Ctrl + Z',
        isCorrect: false,
    },
    answer_data_1955: {
        text: 'A mégis nyila a gyorselérési eszköztáron (balra visszaforduló nyíl)',
        isCorrect: false,
    },
    answer_data_1956: {
        text: 'A mégis nyila a gyorselérési eszköztáron (jobbra visszaforduló nyíl)',
        isCorrect: true,
    },
    answer_data_1957: {
        text: 'Nyomtatást',
        isCorrect: false,
    },
    answer_data_1958: {
        text: 'Mentést',
        isCorrect: false,
    },
    answer_data_1959: {
        text: 'Új dia beszúrását',
        isCorrect: true,
    },
    answer_data_1960: {
        text: 'Új prezentáció létrehozását',
        isCorrect: false,
    },
    answer_data_1961: {
        text: 'A fájl tárolása egy távoli szerveren történik, így az én gépemen nem foglal helyet',
        isCorrect: false,
    },
    answer_data_1962: {
        text: 'Lehetőségem van egyszerre több emberrel is együtt dolgozni egy fájlon',
        isCorrect: true,
    },
    answer_data_1963: {
        text: 'A fájl átkerül egy másik számítógépre, amelyen később lehetőségem van megtartani a prezentációt',
        isCorrect: false,
    },
    answer_data_1964: {
        text: 'Lehetőségem van több emberrel együtt dolgozni, egyszerre azonban csak maximum 3 fővel. ',
        isCorrect: false,
    },
    answer_data_1965: {
        text: 'Csak szabványméretek vannak.',
        isCorrect: false,
    },
    answer_data_1966: {
        text: 'Tervezés menü >> Diaméret >> Egyéni diaméret ',
        isCorrect: true,
    },
    answer_data_1967: {
        text: 'Nézet menü >> Egyéni diaméret',
        isCorrect: false,
    },
    answer_data_1968: {
        text: 'Formátum menü >> Diaméret >> Egyéni diaméret.',
        isCorrect: false,
    },
    answer_data_1969: {
        text: 'Ctrl',
        isCorrect: true,
    },
    answer_data_1970: {
        text: 'Shift',
        isCorrect: false,
    },
    answer_data_1971: {
        text: 'Alt',
        isCorrect: false,
    },
    answer_data_1972: {
        text: 'Win',
        isCorrect: false,
    },
    answer_data_1973: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1974: {
        text: 'Beillesztés képként - ezután igen.',
        isCorrect: true,
    },
    answer_data_1975: {
        text: 'Forrásformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        isCorrect: false,
    },
    answer_data_1976: {
        text: 'Célformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        isCorrect: false,
    },
    answer_data_1977: {
        text: '12 a PowerPointból.',
        isCorrect: false,
    },
    answer_data_1978: {
        text: '24 a PowerPointból.',
        isCorrect: false,
    },
    answer_data_1979: {
        text: '24 a PowerPointból és más alkalmazásokból.',
        isCorrect: true,
    },
    answer_data_1980: {
        text: '12 a PowerPointból és más alkalmazásokból.',
        isCorrect: false,
    },
    answer_data_1981: {
        text: 'Arra, hogy nagy legyen',
        isCorrect: false,
    },
    answer_data_1982: {
        text: 'Arra, hogy kicsi legyen',
        isCorrect: false,
    },
    answer_data_1983: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: true,
    },
    answer_data_1984: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        isCorrect: false,
    },
    answer_data_1985: {
        text: 'L',
        isCorrect: false,
    },
    answer_data_1986: {
        text: 'I',
        isCorrect: false,
    },
    answer_data_1987: {
        text: 'Y',
        isCorrect: false,
    },
    answer_data_1988: {
        text: 'D',
        isCorrect: true,
    },
    answer_data_1989: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_1990: {
        text: '1 és 10 között.',
        isCorrect: false,
    },
    answer_data_1991: {
        text: 'Igen. Pozitív és negatív % értékekkel.',
        isCorrect: true,
    },
    answer_data_1992: {
        text: '1 és 5 között',
        isCorrect: false,
    },
    answer_data_1993: {
        text: 'Kezdőlap menü >> Nézet >> Térköz és pozíció.',
        isCorrect: false,
    },
    answer_data_1994: {
        text: 'Nézet menü >> Betűtipus rész >> Térköz és pozíció.',
        isCorrect: false,
    },
    answer_data_1995: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és pozíció.',
        isCorrect: true,
    },
    answer_data_1996: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és betűköz.',
        isCorrect: false,
    },
    answer_data_1997: {
        text: 'A kijelölt rész betűit mindenképpen kisbetűre állítja',
        isCorrect: false,
    },
    answer_data_1998: {
        text: 'A kijelölt rész betűméretét kisebbre vagy nagyobbra állítja',
        isCorrect: false,
    },
    answer_data_1999: {
        text: 'A kijelölt rész betűi közül az eredetileg nagybetűket kicsire cseréli, a kisbetűket pedig nagyra.',
        isCorrect: true,
    },
    answer_data_2000: {
        text: 'Az alapértelmezett betűtípust változtatja meg.',
        isCorrect: false,
    },
    answer_data_2001: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: true,
    },
    answer_data_2002: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> bal alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: false,
    },
    answer_data_2003: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> balra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: false,
    },
    answer_data_2004: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra felfelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        isCorrect: false,
    },
    answer_data_2005: {
        text: 'sorok',
        isCorrect: false,
    },
    answer_data_2006: {
        text: 'betűk',
        isCorrect: false,
    },
    answer_data_2007: {
        text: 'bekezdések',
        isCorrect: true,
    },
    answer_data_2008: {
        text: 'diák',
        isCorrect: false,
    },
    answer_data_2009: {
        text: 'A WordArt-ot 100-nál kevesebb színnel tölthetem ki.',
        isCorrect: true,
    },
    answer_data_2010: {
        text: 'A WordArt-ot képpel is kitölthetem.',
        isCorrect: false,
    },
    answer_data_2011: {
        text: 'A WordArt-ot  PowerPoint által megadott színekkel is kitölthetem.',
        isCorrect: false,
    },
    answer_data_2012: {
        text: 'A WordArt-ot az internetről letöltött képpel is kitölthetem.',
        isCorrect: false,
    },
    answer_data_2013: {
        text: 'Áttetszőség',
        isCorrect: false,
    },
    answer_data_2014: {
        text: 'Méret',
        isCorrect: false,
    },
    answer_data_2015: {
        text: 'Elmosás',
        isCorrect: false,
    },
    answer_data_2016: {
        text: 'Térköz',
        isCorrect: true,
    },
    answer_data_2017: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Kiigazítás menüben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: false,
    },
    answer_data_2018: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Szín részben a Kiigazítás ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: false,
    },
    answer_data_2019: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Kiigazítás részben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: true,
    },
    answer_data_2020: {
        text: 'Nem lehet a beszúrt képet formázni.',
        isCorrect: false,
    },
    answer_data_2021: {
        text: 'Első oszlop',
        isCorrect: false,
    },
    answer_data_2022: {
        text: 'Középső oszlop',
        isCorrect: true,
    },
    answer_data_2023: {
        text: 'Utolsó oszlop',
        isCorrect: false,
    },
    answer_data_2024: {
        text: 'Összegsor',
        isCorrect: false,
    },
    answer_data_2025: {
        text: 'Keretezés',
        isCorrect: false,
    },
    answer_data_2026: {
        text: 'Árnyékolás',
        isCorrect: false,
    },
    answer_data_2027: {
        text: 'Tükröződés',
        isCorrect: false,
    },
    answer_data_2028: {
        text: 'Fazetta',
        isCorrect: true,
    },
    answer_data_2029: {
        text: 'Semmiben.',
        isCorrect: false,
    },
    answer_data_2030: {
        text: 'A csatolt kép követi az eredeti képen a PowerPointtól függetlenül elvégzett változtatásokat. ',
        isCorrect: true,
    },
    answer_data_2031: {
        text: 'A csatolt kép nagyobb felbontású.',
        isCorrect: false,
    },
    answer_data_2032: {
        text: 'A csatolt kép nem szekeszthető, de a beszúrt igen.',
        isCorrect: false,
    },
    answer_data_2033: {
        text: 'A szövegdoboz vonalain 8 darab pont van.',
        isCorrect: false,
    },
    answer_data_2034: {
        text: 'A csúcsokon lévő pontok segítségével nyújtom a szövegdobozt.',
        isCorrect: false,
    },
    answer_data_2035: {
        text: 'Az oldalfelezőkön lévő pontok segítségével elforgatom a szövegdobozt.',
        isCorrect: true,
    },
    answer_data_2036: {
        text: 'A nyújtás méretarányos átméretezés.',
        isCorrect: false,
    },
    answer_data_2037: {
        text: 'Igen, jelképes 1 eurós árért.',
        isCorrect: false,
    },
    answer_data_2038: {
        text: 'Nem.',
        isCorrect: false,
    },
    answer_data_2039: {
        text: 'Igen, a szerző feltüntetésével.',
        isCorrect: true,
    },
    answer_data_2040: {
        text: 'Igen, de csak, ha a Chrome böngészővel kerestem a képet.',
        isCorrect: false,
    },
    answer_data_2041: {
        text: 'Felső fazetta',
        isCorrect: false,
    },
    answer_data_2042: {
        text: 'Alsó fazetta',
        isCorrect: false,
    },
    answer_data_2043: {
        text: 'WordArt',
        isCorrect: true,
    },
    answer_data_2044: {
        text: 'Megvilágítás',
        isCorrect: false,
    },
    answer_data_2045: {
        text: 'Fekete-fehérré teszi azt.',
        isCorrect: false,
    },
    answer_data_2046: {
        text: 'Egyből törli.',
        isCorrect: false,
    },
    answer_data_2047: {
        text: 'Feketébe borítja.',
        isCorrect: false,
    },
    answer_data_2048: {
        text: 'Ciklámen színnel.',
        isCorrect: true,
    },
    answer_data_2049: {
        text: 'Win + Alt + Q',
        isCorrect: false,
    },
    answer_data_2050: {
        text: 'Win + Ctrl + Q',
        isCorrect: false,
    },
    answer_data_2051: {
        text: 'Win + Ctrl + Q + Enter',
        isCorrect: false,
    },
    answer_data_2052: {
        text: 'Win + Shift + Q',
        isCorrect: true,
    },
    answer_data_2053: {
        text: 'A videó végén lévő kép.',
        isCorrect: false,
    },
    answer_data_2054: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és teljesen testreszabható.',
        isCorrect: true,
    },
    answer_data_2055: {
        text: 'Az a kép, ami a beszúrt videó végén van, a lejátszás után kerül oda, és teljesen testreszabható.',
        isCorrect: false,
    },
    answer_data_2056: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és a videó egyik kockáját mutatja.',
        isCorrect: false,
    },
    answer_data_2057: {
        text: 'Másodperc pontossággal.',
        isCorrect: false,
    },
    answer_data_2058: {
        text: 'Nem vágható.',
        isCorrect: false,
    },
    answer_data_2059: {
        text: 'Perc pontossággal.',
        isCorrect: false,
    },
    answer_data_2060: {
        text: 'Ezredmásodperc pontossággal.',
        isCorrect: true,
    },
    answer_data_2061: {
        text: 'A videó lejátszásának általam beállított első szakaszában a nyitókép elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a videó.',
        isCorrect: false,
    },
    answer_data_2062: {
        text: 'A videó lejátszásának általam beállított utolsó szakaszában a videó elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a nyitókép.',
        isCorrect: true,
    },
    answer_data_2063: {
        text: 'A videó színeit sötétebbre állítom.',
        isCorrect: false,
    },
    answer_data_2064: {
        text: 'A videó színeit halványabbra állítom.',
        isCorrect: false,
    },
    answer_data_2065: {
        text: 'Rossz diaszám volt megadva.',
        isCorrect: false,
    },
    answer_data_2066: {
        text: 'Páratlan sorszámú diára kerülhet csak élőfej és élőláb.',
        isCorrect: false,
    },
    answer_data_2067: {
        text: 'A címdiát duplikáltuk, és a beállításnal nem kértünk a címdiára élőfejet, élőlábat. Így a duplikált dia sem kap ilyet.',
        isCorrect: true,
    },
    answer_data_2068: {
        text: 'Nem volt hiba a végrehajtásban. A PowerPoint néha hibázik, ilyenkor frissíteni kell.',
        isCorrect: false,
    },
    answer_data_2069: {
        text: 'Kezdőlap menü >> Elrendezések rész >> Diák gomb (a videón: beépített elrendezések).',
        isCorrect: false,
    },
    answer_data_2070: {
        text: 'Csak a szöveget lehet formázni a mentés után.',
        isCorrect: false,
    },
    answer_data_2071: {
        text: 'Nem lehet utólag átrendezni.',
        isCorrect: false,
    },
    answer_data_2072: {
        text: 'Kezdőlap menü >> Diák rész >> Elrendezések gomb (a videón: beépített elrendezések).',
        isCorrect: true,
    },
    answer_data_2073: {
        text: 'Diaméret menü >> Tervezés >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        isCorrect: false,
    },
    answer_data_2074: {
        text: 'Diaméret menü >> Dia mérete >>  Tervezés párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        isCorrect: false,
    },
    answer_data_2075: {
        text: 'Tervezés menü >> Diaméret >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        isCorrect: true,
    },
    answer_data_2076: {
        text: 'Csak centiméteres pontosságú beállítás érvényes.',
        isCorrect: false,
    },
    answer_data_2077: {
        text: 'Ha ketten nézzük a diavetítést.',
        isCorrect: false,
    },
    answer_data_2078: {
        text: 'Ha például projektorra ki tudom vetíteni az előadást, és a nézők a kivetítést nézik, nekem meg a PowerPoint a laptopomon mutatja, hogy mi következik, és mit mondjak még el a dia mellé.',
        isCorrect: true,
    },
    answer_data_2079: {
        text: 'Ha makróra rögzítem a prezentációt. ',
        isCorrect: false,
    },
    answer_data_2080: {
        text: 'Ha önismétlő prezentációt adok elő.',
        isCorrect: false,
    },
    answer_data_2081: {
        text: 'Nem kötelező számozni a diákat.',
        isCorrect: false,
    },
    answer_data_2082: {
        text: 'A számozás mellé a dátumot is odailleszthetem, és beállíthatom, hogy a dátum fix legyen, azaz ne frissüljön.',
        isCorrect: false,
    },
    answer_data_2083: {
        text: 'A címdián mindig van számozás, ezt nem lehet letiltani.',
        isCorrect: true,
    },
    answer_data_2084: {
        text: 'A számozás mellé a dátumot is odailleszthetem, és beállíthatom, hogy a dátum frissüljön.',
        isCorrect: false,
    },
    answer_data_2085: {
        text: 'Ctrl + Shift +K',
        isCorrect: false,
    },
    answer_data_2086: {
        text: 'Shift + K',
        isCorrect: false,
    },
    answer_data_2087: {
        text: 'Alt + Ctrl + K',
        isCorrect: false,
    },
    answer_data_2088: {
        text: 'Ctrl + K',
        isCorrect: true,
    },
    answer_data_2089: {
        text: '.pptx',
        isCorrect: false,
    },
    answer_data_2090: {
        text: '.ppsx',
        isCorrect: true,
    },
    answer_data_2091: {
        text: '.pppsx',
        isCorrect: false,
    },
    answer_data_2092: {
        text: '.ptpx',
        isCorrect: false,
    },
    answer_data_2093: {
        text: 'Nem lehet.',
        isCorrect: false,
    },
    answer_data_2094: {
        text: 'Csak az alapértelmezett helyekre lehet. ',
        isCorrect: false,
    },
    answer_data_2095: {
        text: 'Beszúrás menü >> Szöveg >> Szövegdoboz >> majd egérrel kijelölöm a dián a helyet.',
        isCorrect: true,
    },
    answer_data_2096: {
        text: 'Nézet menü >> Szövegdoboz.',
        isCorrect: false,
    },
    answer_data_2097: {
        text: 'Nyomtatást',
        isCorrect: false,
    },
    answer_data_2098: {
        text: 'Mentést',
        isCorrect: false,
    },
    answer_data_2099: {
        text: 'Új dia beszúrását',
        isCorrect: true,
    },
    answer_data_2100: {
        text: 'Új prezentáció létrehozását',
        isCorrect: false,
    },
    answer_data_2101: {
        text: 'Csak szabványméretek vannak.',
        isCorrect: false,
    },
    answer_data_2102: {
        text: 'Tervezés menü >> Diaméret >> Egyéni diaméret ',
        isCorrect: true,
    },
    answer_data_2103: {
        text: 'Nézet menü >> Egyéni diaméret',
        isCorrect: false,
    },
    answer_data_2104: {
        text: 'Formátum menü >> Diaméret >> Egyéni diaméret.',
        isCorrect: false,
    },
    answer_data_2105: {
        text: 'AltGr',
        isCorrect: false,
    },
    answer_data_2106: {
        text: 'Alt',
        isCorrect: false,
    },
    answer_data_2107: {
        text: 'Shift',
        isCorrect: false,
    },
    answer_data_2108: {
        text: 'Ctrl',
        isCorrect: true,
    },
    answer_data_2109: {
        text: 'Betűszínt',
        isCorrect: false,
    },
    answer_data_2110: {
        text: 'Betűtípust',
        isCorrect: false,
    },
    answer_data_2111: {
        text: 'Méretet és a szövegkiemelés színét',
        isCorrect: false,
    },
    answer_data_2112: {
        text: 'Igazítást',
        isCorrect: true,
    },
    answer_data_2113: {
        text: 'kb. 60cm',
        isCorrect: false,
    },
    answer_data_2114: {
        text: 'kb. 6 cm',
        isCorrect: false,
    },
    answer_data_2115: {
        text: 'kb. 24 cm',
        isCorrect: false,
    },
    answer_data_2116: {
        text: 'kb 2,4 cm',
        isCorrect: true,
    },
    answer_data_2117: {
        text: 'A kijelölt rész betűit mindenképpen kisbetűre állítja',
        isCorrect: false,
    },
    answer_data_2118: {
        text: 'A kijelölt rész betűméretét kisebbre vagy nagyobbra állítja',
        isCorrect: false,
    },
    answer_data_2119: {
        text: 'A kijelölt rész betűi közül az eredetileg nagybetűket kicsire cseréli, a kisbetűket pedig nagyra.',
        isCorrect: true,
    },
    answer_data_2120: {
        text: 'Az alapértelmezett betűtípust változtatja meg.',
        isCorrect: false,
    },
    answer_data_2121: {
        text: 'balra zár',
        isCorrect: false,
    },
    answer_data_2122: {
        text: 'jobbra zár',
        isCorrect: false,
    },
    answer_data_2123: {
        text: 'középre zár',
        isCorrect: false,
    },
    answer_data_2124: {
        text: 'mindkét margóhoz igazít',
        isCorrect: true,
    },
    answer_data_2125: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Kiigazítás menüben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: false,
    },
    answer_data_2126: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Szín részben a Kiigazítás ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: false,
    },
    answer_data_2127: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Kiigazítás részben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        isCorrect: true,
    },
    answer_data_2128: {
        text: 'Nem lehet a beszúrt képet formázni.',
        isCorrect: false,
    },
    answer_data_2129: {
        text: 'Keretezés',
        isCorrect: false,
    },
    answer_data_2130: {
        text: 'Árnyékolás',
        isCorrect: false,
    },
    answer_data_2131: {
        text: 'Tükröződés',
        isCorrect: false,
    },
    answer_data_2132: {
        text: 'Fazetta',
        isCorrect: true,
    },
    answer_data_2133: {
        text: 'Kattintok az első, majd a második dián >> Áttűnések menü >> Időzítés résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        isCorrect: false,
    },
    answer_data_2134: {
        text: 'Kattintok a második dián >> Áttűnések menü >> Időzítés résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        isCorrect: false,
    },
    answer_data_2135: {
        text: 'Kattintok az első dián >> Időzítés menü >> Áttűnések résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        isCorrect: false,
    },
    answer_data_2136: {
        text: 'Kattintok az első dián >> Áttűnések menü >> Időzítés résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        isCorrect: true,
    },
    answer_data_2137: {
        text: 'A jobb oldalon a dia száma alatt van egy csillag.',
        isCorrect: false,
    },
    answer_data_2138: {
        text: 'A bal oldalon a dia száma alatt van egy csillag.',
        isCorrect: true,
    },
    answer_data_2139: {
        text: 'A dia piros keretet kap a jobb oldalon.',
        isCorrect: false,
    },
    answer_data_2140: {
        text: 'Elindul az áttűnés, ha jobb egérgombbal kattintok kettőt.',
        isCorrect: false,
    },
    answer_data_2141: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűméretét.',
        isCorrect: true,
    },
    answer_data_2142: {
        text: 'A PowerPoint automatikusan a szövegdobozt igazítja a beírt szöveg betűméretéhez.',
        isCorrect: false,
    },
    answer_data_2143: {
        text: 'A PowerPoint nem igazítja automatikusan a szövegdobozhoz a beírt szöveg betűméretét.',
        isCorrect: false,
    },
    answer_data_2144: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűtípusát.',
        isCorrect: false,
    },
    answer_data_2145: {
        text: 'Fekete-fehérré teszi azt.',
        isCorrect: false,
    },
    answer_data_2146: {
        text: 'Egyből törli.',
        isCorrect: false,
    },
    answer_data_2147: {
        text: 'Feketébe borítja.',
        isCorrect: false,
    },
    answer_data_2148: {
        text: 'Ciklámen színnel.',
        isCorrect: true,
    },
    answer_data_2149: {
        text: 'Címdiát.',
        isCorrect: true,
    },
    answer_data_2150: {
        text: 'Hátteret.',
        isCorrect: false,
    },
    answer_data_2151: {
        text: 'Térhatást.',
        isCorrect: false,
    },
    answer_data_2152: {
        text: 'Bármit.',
        isCorrect: false,
    },
    answer_data_2153: {
        text: 'A videó lejátszásának általam beállított első szakaszában a nyitókép elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a videó.',
        isCorrect: false,
    },
    answer_data_2154: {
        text: 'A videó lejátszásának általam beállított utolsó szakaszában a videó elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a nyitókép.',
        isCorrect: true,
    },
    answer_data_2155: {
        text: 'A videó színeit sötétebbre állítom.',
        isCorrect: false,
    },
    answer_data_2156: {
        text: 'A videó színeit halványabbra állítom.',
        isCorrect: false,
    },
    answer_data_2157: {
        text: 'Ha ketten nézzük a diavetítést.',
        isCorrect: false,
    },
    answer_data_2158: {
        text: 'Ha például projektorra ki tudom vetíteni az előadást, és a nézők a kivetítést nézik, nekem meg a PowerPoint a laptopomon mutatja, hogy mi következik, és mit mondjak még el a dia mellé.',
        isCorrect: true,
    },
    answer_data_2159: {
        text: 'Ha makróra rögzítem a prezentációt.',
        isCorrect: false,
    },
    answer_data_2160: {
        text: 'Ha önismétlő prezentációt adok elő.',
        isCorrect: false,
    },
    answer_data_2161: {
        text: 'A jobb oldalon a Háttér formázása munkaablakon kattintok a Mindegyikre feliratú gombra. Ekkor az aktív dia háttere kerül az összes diára.',
        isCorrect: true,
    },
    answer_data_2162: {
        text: 'A jobb oldalon a Háttér formázása munkaablakon kattintok a Mindegyikre feliratú gombra. Ekkor a címdia háttere kerül az összes diára.',
        isCorrect: false,
    },
    answer_data_2163: {
        text: 'A bal oldalon a Háttér formázása munkaablakon kattintok a Mindegyikre feliratú gombra. Ekkor a címdia háttere kerül az összes diára.',
        isCorrect: false,
    },
    answer_data_2164: {
        text: 'A Tervezés menüban a Diaformátum ikonra kattintok.',
        isCorrect: false,
    },
    answer_data_2165: {
        text: 'Jobb vagy bal kattintás.',
        isCorrect: false,
    },
    answer_data_2166: {
        text: 'A rámutatás, vagy a kattintás a gombon.',
        isCorrect: true,
    },
    answer_data_2167: {
        text: 'F1 vagy rámutatás.',
        isCorrect: false,
    },
    answer_data_2168: {
        text: 'Csak a kattintás.',
        isCorrect: false,
    },


    /* Precourse exam answers for 
    * Excel course #27
    * Precourse exam #43
    * Questions #580-584
    */
    answer_data_pretest_excel_1_1_F: {
        text: 'Kezdőlap',
        isCorrect: false,
    },
    answer_data_pretest_excel_1_2_F: {
        text: 'Beszúrás',
        isCorrect: false,
    },
    answer_data_pretest_excel_1_3_T: {
        text: 'Adatok',
        isCorrect: true,
    },
    answer_data_pretest_excel_1_4_F: {
        text: 'Képletek',
        isCorrect: false,
    },

    answer_data_pretest_excel_2_1_F: {
        text: 'Nem lehet',
        isCorrect: false,
    },
    answer_data_pretest_excel_2_2_F: {
        text: 'Formátum',
        isCorrect: false,
    },
    answer_data_pretest_excel_2_3_F: {
        text: 'Adatok érvényesítése',
        isCorrect: false,
    },
    answer_data_pretest_excel_2_4_T: {
        text: 'Adatok érvényesítése >> Hibajelzés fül',
        isCorrect: true,
    },

    answer_data_pretest_excel_3_1_T: {
        text: 'Mert ha tagolva van és nem szám a formátum, akkor a tagolást szóköznek veszi az Excel és nem fog tudni számolni.',
        isCorrect: true,
    },
    answer_data_pretest_excel_3_2_F: {
        text: 'Mert így kevesebb lesz az adat, amit át kell konvertálni',
        isCorrect: false,
    },
    answer_data_pretest_excel_3_3_F: {
        text: 'Nem kell',
        isCorrect: false,
    },
    answer_data_pretest_excel_3_4_F: {
        text: 'Mert tizedes törtet nem tud átkonvertálni',
        isCorrect: false,
    },

    answer_data_pretest_excel_4_1_T: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak elrejti',
        isCorrect: true,
    },
    answer_data_pretest_excel_4_2_F: {
        text: 'Áttekinthetőbb lesz a táblázat, a felesleges adatokat törli az Excel',
        isCorrect: false,
    },
    answer_data_pretest_excel_4_3_F: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak másik munkalapra menti',
        isCorrect: false,
    },
    answer_data_pretest_excel_4_4_F: {
        text: 'Az Excel a kiszűrt adatokat törli',
        isCorrect: false,
    },

    answer_data_pretest_excel_5_1_F: {
        text: 'Igen, de csak szaggatott vonallal',
        isCorrect: false,
    },
    answer_data_pretest_excel_5_2_F: {
        text: 'Igen, de csak dupla vonallal',
        isCorrect: false,
    },
    answer_data_pretest_excel_5_3_T: {
        text: 'Igen',
        isCorrect: true,
    },
    answer_data_pretest_excel_5_4_F: {
        text: 'Nem',
        isCorrect: false,
    },

    /* Precourse exam answers for 
    * PP/Word/OBS courses #28,#17,#22
    * Precourse exam #39,#40,#41
    * Questions #585-587
    */

    answer_data_2189: {
        text: 'a',
        isCorrect: false,
    },
    answer_data_2190: {
        text: 'b',
        isCorrect: false,
    },
    answer_data_2191: {
        text: 'c',
        isCorrect: true,
    },
    answer_data_2192: {
        text: 'd',
        isCorrect: false,
    },

    answer_data_2193: {
        text: 'a',
        isCorrect: false,
    },
    answer_data_2194: {
        text: 'b',
        isCorrect: false,
    },
    answer_data_2195: {
        text: 'c',
        isCorrect: true,
    },
    answer_data_2196: {
        text: 'd',
        isCorrect: false,
    },

    // --------------------- PP PRETEST ANSWERS 

    // pp pretest answers / question 1
    pp_pretest_question_1_answer_data_1: {
        text: 'Ctrl',
        isCorrect: true,
    },
    pp_pretest_question_1_answer_data_2: {
        text: 'Shift',
        isCorrect: false,
    },
    pp_pretest_question_1_answer_data_3: {
        text: 'Alt',
        isCorrect: false,
    },
    pp_pretest_question_1_answer_data_4: {
        text: 'Win',
        isCorrect: false,
    },

    // pp pretest answers / question 2
    pp_pretest_question_2_answer_data_1: {
        text: 'Többen látják a fájlt.',
        isCorrect: false,
    },
    pp_pretest_question_2_answer_data_2: {
        text: 'Egyszerre többen is dolgozhatunk egy fájlon.',
        isCorrect: true,
    },
    pp_pretest_question_2_answer_data_3: {
        text: 'Elküldhetem a fájlt bárkinek.',
        isCorrect: false,
    },
    pp_pretest_question_2_answer_data_4: {
        text: 'Felváltva többen is dolgozhatuk egy fájlon.',
        isCorrect: false,
    },

    // pp pretest answers / question 3
    pp_pretest_question_3_answer_data_1: {
        text: 'sorok',
        isCorrect: false,
    },
    pp_pretest_question_3_answer_data_2: {
        text: 'betűk',
        isCorrect: false,
    },
    pp_pretest_question_3_answer_data_3: {
        text: 'bekezdések',
        isCorrect: true,
    },
    pp_pretest_question_3_answer_data_4: {
        text: 'diák',
        isCorrect: false,
    },
});

export type AnswerDatasSeedDataType = ReturnType<typeof getAnswerDatasSeedData>;