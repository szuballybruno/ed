import { Answer } from '../../models/entity/Answer';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_questions from './seed_questions';

const list = getSeedList<Answer>()({

    // SECTION 1
    // 1.1 answers
    answer_1: {
        text: 'Örülnék, ha lenne ehhez egy kollégám',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_1.id
    },
    answer_2: {
        text: 'A tények és az objektív adatok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_1.id
    },
    // 1.2 answers
    answer_3: {
        text: 'Segít, ha megvitatom azt másokkal',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_2.id
    },
    answer_4: {
        text: 'Jobban szeretem egyedül megoldani azt',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_2.id
    },
    // 1.3 answers
    answer_5: {
        text: 'Csoportos aktivitások, illetve közös megvitatások nagyobb számban vannak beiktatva',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_3.id
    },
    answer_6: {
        text: 'Egyénileg megoldandó feladatok kerülnek meghatározásra',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_3.id
    },
    // 1.4 answers
    answer_7: {
        text: 'Magához az előadóhoz szólnak a gondolataim',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_4.id
    },
    answer_8: {
        text: 'Inkább magához a témához szólok, az előadó másodlagos',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_4.id
    },
    // 1.5 answers
    answer_9: {
        text: 'Szoros együttműködés a többiekkel',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_5.id
    },
    answer_10: {
        text: 'Szívesebben oldok meg egyedül részfeladatokat',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_5.id
    },
    // 1.6 answers
    answer_11: {
        text: 'A barátaimmal szeretek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_6.id
    },
    answer_12: {
        text: 'Egymagam intézem',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_6.id
    },
    // 1.7 answers
    answer_13: {
        text: 'Többen vagyunk, és nagy a sürgés-forgás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_7.id
    },
    answer_14: {
        text: 'Ha kevesebben vagyunk, vagy akár egyedül dolgozhatok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_7.id
    },


    // SECTION 2
    // 2.1 answers
    answer_15: {
        text: 'Szeretem lerajzolni, vizualizálni a problémát',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_8.id
    },
    answer_16: {
        text: 'Egy példa problémán keresztül tudom jól megérteni',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_8.id
    },
    // 2.2 answers
    answer_17: {
        text: 'Egy képet kreálok róla a fejemben',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_9.id
    },
    answer_18: {
        text: 'Lerajzolom azt, amire emlékeznem kell',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_9.id
    },
    // 2.3 answers
    answer_19: {
        text: 'Könnyű feladat, nem jelent számomra gondot',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_10.id
    },
    answer_20: {
        text: 'Kihívást jelent',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_10.id
    },
    // 2.4 answers
    answer_21: {
        text: 'Fizikai eszközökkel, modellekkel dolgozhatunk',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_11.id
    },
    answer_22: {
        text: 'Csoportosan megvitatjuk az adott témát',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_11.id
    },
    // 2.5 answers
    answer_23: {
        text: 'Ábrákat, működés közbeni rajzot készítenék',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_12.id
    },
    answer_24: {
        text: 'Rövid jegyzetet írnék a működéséről',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_12.id
    },
    // 2.6 answers
    answer_25: {
        text: 'Rajzolhatok, a kezeimmel dolgozhatok valamin',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_13.id
    },
    answer_26: {
        text: 'Beszélhetek, írhatok, vagy inkább hallgathatok valakit',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_13.id
    },
    // 2.7 answers
    answer_27: {
        text: 'Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_14.id
    },
    answer_28: {
        text: 'Mondja el/írja le, hogy mikor merre kell fordulnom',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_14.id
    },


    // SECTION 3
    // 3.1 answers
    answer_29: {
        text: 'Tényeket és részleteket megtanulni, megismerni',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_15.id
    },
    answer_30: {
        text: 'Saját teóriákat kreálni, ötletelni',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_15.id
    },
    // 3.2 answers
    answer_31: {
        text: 'Specifikus instrukciókat követhetek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_16.id
    },
    answer_32: {
        text: 'Analizálni kell, és döntéseket hoznom ',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_16.id
    },
    // 3.3 answers
    answer_33: {
        text: 'Megoldani egy matematikai problémát egy képlet segítségével',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_17.id
    },
    answer_34: {
        text: 'Felfedezni a képlet mögötti logikát',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_17.id
    },
    // 3.4 answers
    answer_35: {
        text: 'Szívesebben írnék egy gyakorlati problémáról, annak folyamatáról',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_18.id
    },
    answer_36: {
        text: 'Szívesebben írnék inkább elméletekről, teóriákról',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_18.id
    },
    // 3.5 answers
    answer_37: {
        text: 'Pontos, részletes instrukciókat követhetek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_19.id
    },
    answer_38: {
        text: 'Elemzésre van szükség, és következtetéseket kell levonnom',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_19.id
    },
    // 3.6 answers
    answer_39: {
        text: 'Jobban élvezném a ház megépítését.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_20.id
    },
    answer_40: {
        text: 'Jobban élvezném a ház megtervezését. ',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_20.id
    },
    // 3.7 answers
    answer_41: {
        text: 'Kipróbálnék több típust is, dolgoznék velük',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_21.id
    },
    answer_42: {
        text: 'Utána néznék az alapvető működésüknek, milyen elven operálnak',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_21.id
    },


    // SECTION 4
    // 4.1 answers
    answer_43: {
        text: 'Szóban kapom meg',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_22.id
    },
    answer_44: {
        text: 'Írásban kapom meg',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_22.id
    },
    // 4.2 answers
    answer_45: {
        text: 'Mennék el  egy híres pszichológus előadására',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_23.id
    },
    answer_46: {
        text: 'Olvasnám el  a könyvet, melyre az előadás alapszik',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_23.id
    },
    // 4.3 answers
    answer_47: {
        text: 'A neveket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_24.id
    },
    answer_48: {
        text: 'Az arcokat',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_24.id
    },
    // 4.4 answers
    answer_49: {
        text: 'Az előadó magyaráz és megválaszolja a kérdéseket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_25.id
    },
    answer_50: {
        text: 'Videókkal, filmek segítségével mutatja be az adott témát',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_25.id
    },
    // 4.5 answers
    answer_51: {
        text: 'Ha hallom (valaki elmondja nekem)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_26.id
    },
    answer_52: {
        text: 'Ha képeken látom',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_26.id
    },
    // 4.6 answers
    answer_53: {
        text: 'Meghallgatom a híreket a rádióban, akár vezetés közben',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_27.id
    },
    answer_54: {
        text: 'Hírportálokról tájékozódom inkább',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_27.id
    },
    // 4.7 answers
    answer_55: {
        text: 'Megkérem egy kollégámat, hogy magyarázza el',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_28.id
    },
    answer_56: {
        text: 'Megkérem egy kollégámat, hogy mutassa be a gépen, hogyan használja',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_28.id
    },


    // SECTION 5
    // 5.1 answers
    answer_57: {
        text: 'A tapasztalataim és a megérzéseim',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_29.id
    },
    answer_58: {
        text: 'A tények és az objektív adatok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_29.id
    },
    // 5.2 answers
    answer_59: {
        text: 'Azzal dolgozom, ami éppen rendelkezésre áll a közelemben',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_30.id
    },
    answer_60: {
        text: 'Szükségem van minden eszközre, előre összekészítve',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_30.id
    },
    // 5.3 answers
    answer_61: {
        text: 'Szívesen teszem azt zenével, írással, művészet segítségével',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_31.id
    },
    answer_62: {
        text: 'Tömören, egyértelműen kommunikálók róluk',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_31.id
    },
    // 5.4 answers
    answer_63: {
        text: 'Engedik, hogy hallgatókat a saját érdeklődésük vezesse',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_32.id
    },
    answer_64: {
        text: 'Konkrét, kézzelfogható elvárásokat támasztanak',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_32.id
    },
    // 5.5 answers
    answer_65: {
        text: 'Meg szoktam kérdőjelezni azt, amiről hallok vagy olvasok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_33.id
    },
    answer_66: {
        text: 'El szoktam fogadni azt, amiről hallok vagy olvasok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_33.id
    },
    // 5.6 answers
    answer_67: {
        text: 'Esszé jellegű vizsga',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_34.id
    },
    answer_68: {
        text: 'Teszt jellegű felmérés',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_34.id
    },
    // 5.7 answers
    answer_69: {
        text: 'A saját megközelítésemet alkalmazva megoldani',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_35.id
    },
    answer_70: {
        text: 'Pontos utasítások alapján teljesíteni',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_3.id
    },
    answer_108: {
        text: 'Odagörgetek',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_47.id
    },
    answer_109: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd entert nyomok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_47.id
    },
    answer_110: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd entert nyomok.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_47.id
    },
    answer_111: {
        text: 'Az A1 cellába beírom, hogy X789654, majd entert nyomok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_47.id
    },
    answer_112: {
        text: 'Beírom, hogy hatvány',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_48.id
    },
    answer_113: {
        text: 'Beírom, hogy *',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_48.id
    },
    answer_114: {
        text: 'Beírom, hogy ^',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_48.id
    },
    answer_115: {
        text: 'Beírom, hogy ^ - ezt az AltGr+3 billentyűkombináció adja ki, és a többi művelettel ellentéteben nem látszik azonnal, csak a következő bevitt karakterrel együtt)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_48.id
    },
    answer_116: {
        text: 'b4*_b5',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_50.id
    },
    answer_117: {
        text: 'b4 * _b5',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_50.id
    },
    answer_118: {
        text: '=_b4_x_b5',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_50.id
    },
    answer_119: {
        text: '=_b4*_b5',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_50.id
    },
    answer_120: {
        text: 'A másolt képletben az A1 cella $A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_51.id
    },
    answer_121: {
        text: 'A másolt képletben az A1 cella $A1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_51.id
    },
    answer_122: {
        text: 'A másolt képletben az A1 cella A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_51.id
    },
    answer_123: {
        text: 'A másolt képletben az A1 cella &A&1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_51.id
    },
    answer_124: {
        text: 'Odagörgetek',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_52.id
    },
    answer_125: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd entert nyomok.',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_52.id
    },
    answer_126: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd entert nyomok.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_52.id
    },
    answer_127: {
        text: 'Az A1 cellába beírom, hogy X789654, majd entert nyomok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_52.id
    },
    answer_128: {
        text: 'A másolt képletben az A1 cella $A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_53.id
    },
    answer_129: {
        text: 'A szerkesztőlécen a számításban a pi()-t használom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_53.id
    },
    answer_130: {
        text: 'A Pi-t használom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_53.id
    },
    answer_131: {
        text: '3,141592653589',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_53.id
    },
    answer_132: {
        text: 'b4 * _b5',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_54.id
    },
    answer_133: {
        text: '=_b4_x_b5',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_54.id
    },
    answer_134: {
        text: '=_b4*_b5',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_54.id
    },
    answer_135: {
        text: 'b4*_b5',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_54.id
    },
    answer_136: {
        text: 'Beírom, hogy hatvány',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_55.id
    },
    answer_137: {
        text: 'Beírom, hogy *',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_55.id
    },
    answer_138: {
        text: 'Beírom, hogy ^',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_55.id
    },
    answer_139: {
        text: 'Beírom, hogy ^ - ezt az AltGr+3 billentyűkombináció adja ki, és a többi művelettel ellentéteben nem látszik azonnal,csak a következő bevitt karakterrel együtt)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_55.id
    },
    answer_140: {
        text: 'A másolt képletben az A1 cella $A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_56.id
    },
    answer_141: {
        text: 'A másolt képletben az A1 cella $A1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_56.id
    },
    answer_142: {
        text: 'A másolt képletben az A1 cella A$1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_56.id
    },
    answer_143: {
        text: 'A másolt képletben az A1 cella &A&1 formátumban lesz feltüntetve. Segítség ebben az F4 billentyű.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_56.id
    },
    answer_144: {
        text: 'Jobb egérgombbal egyszer kattintok az Asztalon az Excel ikonra, majd a megjelenő menüben a megnyitás-ra kattintok egyszer a bal egérgombbal.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_57.id
    },
    answer_145: {
        text: 'Bal egérgombbal duplán kattintok az Asztalon az Excel ikonra.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_57.id
    },
    answer_146: {
        text: 'A keresőcsíkon beírom, hogy Excel, majd megjelenő zöld ikonra kattintok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_57.id
    },
    answer_147: {
        text: 'A Start menüben kikeresem az Excel-t és bal egérgombbal kattintok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_57.id
    },
    answer_148: {
        text: 'Pipa',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_58.id
    },
    answer_149: {
        text: 'Ragasztószalag',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_58.id
    },
    answer_150: {
        text: 'Rajzszög',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_58.id
    },
    answer_151: {
        text: 'Kalapács',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_58.id
    },
    answer_152: {
        text: 'Az Excel kikapcsol',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_59.id
    },
    answer_153: {
        text: 'A zöld címsoron a Befektetés kalkulátor név jelenik meg',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_59.id
    },
    answer_154: {
        text: 'Az Excel kinyomtatja a munkafüzetet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_59.id
    },
    answer_155: {
        text: 'A Munkafüzet 3-at villan',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_59.id
    },
    answer_156: {
        text: 'Ctrl+S',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_60.id
    },
    answer_157: {
        text: 'Alt+Tab',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_60.id
    },
    answer_158: {
        text: 'Ctrl+P',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_60.id
    },
    answer_159: {
        text: 'Ctrl+A',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_60.id
    },
    answer_160: {
        text: 'A kijelöléshez a Shift+Del, majd beillesztéshez Ctrl+V.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_61.id
    },
    answer_161: {
        text: 'A kijelöléshez a Ctrl+Shift+Del, majd beillesztéshez Ctrl+V.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_61.id
    },
    answer_162: {
        text: 'A kijelöléshez a Shift+AltGr, majd beillesztéshez Ctrl+V.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_61.id
    },
    answer_163: {
        text: 'A kijelöléshez a Ctrl+C, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_61.id
    },
    answer_164: {
        text: 'CTRL-Z',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_62.id
    },
    answer_165: {
        text: 'Ha az egérrel rámutatok az adott betűtípusra',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_62.id
    },
    answer_166: {
        text: 'Ha begépelem a betűtípust',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_62.id
    },
    answer_167: {
        text: 'Ha a kijelölt résznél a legördülő menü adott pontjára (az új betűtípusra) kattintok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_62.id
    },
    answer_168: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menün.)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_63.id
    },
    answer_169: {
        text: 'A számok közé szóközt ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_63.id
    },
    answer_170: {
        text: 'A számok közé Entert ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_63.id
    },
    answer_171: {
        text: 'A számok közé Tab-ot ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_63.id
    },
    answer_172: {
        text: '.mp4',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_64.id
    },
    answer_173: {
        text: '.mkv',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_64.id
    },
    answer_174: {
        text: '.avi',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_64.id
    },
    answer_175: {
        text: '.mov',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_64.id
    },
    answer_176: {
        text: 'Képkocka/másodperc (frame/second)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_65.id
    },
    answer_177: {
        text: 'Belső nézetű lövöldözős játék ( first-person shooter)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_65.id
    },
    answer_178: {
        text: 'Igaz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_66.id
    },
    answer_179: {
        text: 'Hamis',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_66.id
    },
    answer_180: {
        text: 'Nincs köztük különbség',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_67.id
    },
    answer_181: {
        text: 'A kijelző felvétele opcióval nagyobb felbontásban vehetjük fel a videókat',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_67.id
    },
    answer_182: {
        text: 'Az ablak felvétele során csak egy adott ablak tartalmát rögzítjük, és elkattinthatunk, míg kijelző felvételénél minden rögzítésre kerül, amin a monitorunkon látszódik.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_67.id
    },
    answer_183: {
        text: 'Mert így kisebb fájlméretet kapunk.',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_68.id
    },
    answer_184: {
        text: 'Mert így nem torzul a felvett hang.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_68.id
    },
    answer_185: {
        text: 'Mert a sárga zónában túl halk lenne a felvétel.',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_68.id
    },
    answer_186: {
        text: '.avi',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_69.id
    },
    answer_187: {
        text: '.m4v',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_69.id
    },
    answer_188: {
        text: '.mkv',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_69.id
    },
    answer_189: {
        text: '.mp4',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_69.id
    },
    answer_190: {
        text: 'Képkocka/másodperc (frame/second)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_70.id
    },
    answer_191: {
        text: 'Belső nézetű lövöldözős játék ( first-person shooter)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_70.id
    },
    answer_192: {
        text: 'Igaz',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_71.id
    },
    answer_193: {
        text: 'Hamis',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_71.id
    },
    answer_194: {
        text: 'Nincs köztük különbség',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_72.id
    },
    answer_195: {
        text: 'A kijelző felvétele opcióval nagyobb felbontásban vehetjük fel a videókat',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_72.id
    },
    answer_196: {
        text: 'Az ablak felvétele során csak egy adott ablak tartalmát rögzítjük, és elkattinthatunk, míg kijelző felvételénél minden rögzítésre kerül, amin a monitorunkon látszódik.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_72.id
    },
    answer_197: {
        text: 'Megkülönböztethetetlen minőség, nagy fájlméret',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_73.id
    },
    answer_198: {
        text: 'Jó minőség, közepes fájlméret',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_73.id
    },
    answer_199: {
        text: 'Veszteségmentes minőség, hatalmas fájlméret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_73.id
    },
    answer_224: {
        text: 'CTRL-Y',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_80.id
    },
    answer_225: {
        text: 'Ha a kijelölt résznél a legördülő menü adott pontjára (az új stílusra) kattintok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_80.id
    },
    answer_226: {
        text: 'Ha begépelem a stílus nevét',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_80.id
    },
    answer_227: {
        text: 'Ha az egérrel rámutatok az adott stílusra',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_80.id
    },
    answer_228: {
        text: 'Pipa',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_81.id
    },
    answer_229: {
        text: 'Ragasztószalag',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_81.id
    },
    answer_230: {
        text: 'Ecset',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_81.id
    },
    answer_231: {
        text: 'Kalapács',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_81.id
    },
    answer_232: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_82.id
    },
    answer_233: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_82.id
    },
    answer_234: {
        text: 'Egyszerre maximum 3 feltétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_82.id
    },
    answer_235: {
        text: 'Egyszerre maximum 5 feltétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_82.id
    },
    answer_236: {
        text: '[Zöld]; [Kék]##;[Piros]-##;',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_83.id
    },
    answer_237: {
        text: '[Kék]##;[Piros]-##;[Zöld]',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_83.id
    },
    answer_238: {
        text: '[Kék]##;[Piros]##;[Zöld]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_83.id
    },
    answer_239: {
        text: '[Piros]-##;[Kék]##;[Zöld]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_83.id
    },
    answer_240: {
        text: 'Kijelölöm a sorokat, f8; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_84.id
    },
    answer_241: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_84.id
    },
    answer_242: {
        text: 'Kijelölöm a sorokat, bal klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_84.id
    },
    answer_243: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_84.id
    },
    answer_244: {
        text: 'Jobb klikk az oszlop betűjelére és a helyi menüben az elrejtés-re klikkelek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_85.id
    },
    answer_245: {
        text: 'Jobb klikk az oszlop betűjelére és hide billentyű a billentyűzeten',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_85.id
    },
    answer_246: {
        text: 'Bal klikk az oszlop betűjelére és a helyi menüben az elrejtés-re klikkelek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_85.id
    },
    answer_247: {
        text: 'Bal klikk az oszlop betűjelére és hide billentyű a billentyűzeten',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_85.id
    },
    answer_248: {
        text: 'A számok közé ENTER-t ütök',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_86.id
    },
    answer_249: {
        text: 'A számok közé szóközt ütök',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_86.id
    },
    answer_250: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menün.)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_86.id
    },
    answer_251: {
        text: 'A számok közé Tab-ot ütök',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_86.id
    },
    answer_252: {
        text: 'Igen, de csak fél, harmad és negyed törtekkel',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_87.id
    },
    answer_253: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_87.id
    },
    answer_254: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_87.id
    },
    answer_255: {
        text: 'Igen. A számformátumnál kell beállítani a törteket',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_87.id
    },
    answer_256: {
        text: '„120;0E+001”',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_88.id
    },
    answer_257: {
        text: '„1,20E+01”',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_88.id
    },
    answer_258: {
        text: '„1,20E+0012”',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_88.id
    },
    answer_259: {
        text: '„1E+12”',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_88.id
    },
    answer_260: {
        text: '[Zöld]0;[Kék]##;[Piros]-##;[Sárga]',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_89.id
    },
    answer_261: {
        text: '##[Kék];-##[Piros];[Zöld]0;[Sárga]',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_89.id
    },
    answer_262: {
        text: '[Sárga];[Kék]##;[Piros]-##;[Zöld]0',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_89.id
    },
    answer_263: {
        text: '[Kék]##;[Piros]-##;[Zöld]0;[Sárga]',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_89.id
    },
    answer_264: {
        text: 'Az adattartományra kattintok, majd a Kezdőlap menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_90.id
    },
    answer_265: {
        text: 'Az adattartományra kattintok, majd a Adatok menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_90.id
    },
    answer_266: {
        text: 'Az adattartományra kattintok, majd a Nézet menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_90.id
    },
    answer_267: {
        text: 'Az adattartományra kattintok, majd a Képletek menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_90.id
    },
    answer_268: {
        text: 'Nézet >> Stílusok >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_91.id
    },
    answer_269: {
        text: 'Kezdőlap >> Stílusok >> Új cellastílus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_91.id
    },
    answer_270: {
        text: 'Kezdőlap >> Nézetek >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_91.id
    },
    answer_271: {
        text: 'Kezdőlap >> Stílusok >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_91.id
    },
    answer_272: {
        text: '=á_t_l_a_g(_b2:_b20)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_92.id
    },
    answer_273: {
        text: 'á_t_l_a_g(_b2:_b20)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_92.id
    },
    answer_274: {
        text: '=á_t_l_a_g(_b2;_b20)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_92.id
    },
    answer_275: {
        text: '=á_t_l_a_g(_b2 _b20)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_92.id
    },
    answer_276: {
        text: '=_mó_d_u_s_z._e_g_y(_b2;_b20)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_93.id
    },
    answer_277: {
        text: '=_mó_d_u_s_z(_b2,_b20)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_93.id
    },
    answer_278: {
        text: '=_mó_d_u_s_z._e_g_y(_b2:_b20)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_93.id
    },
    answer_279: {
        text: '=_mó_d_u_s_z._e_g_y(_b2 _b20)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_93.id
    },
    answer_280: {
        text: 'd_a_r_a_b_t_e_l_i(_b2:_b20;2)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_94.id
    },
    answer_281: {
        text: '=_d_a_r_a_b_t_e_l_i(_b2:_b20;5)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_94.id
    },
    answer_282: {
        text: '=_d_a_r_a_b_t_e_l_i(2;_b2:_b20)',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_94.id
    },
    answer_283: {
        text: '=_d_a_r_a_b_t_e_l_i(_b2:_b20;2)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_94.id
    },
    answer_284: {
        text: 'f7',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_95.id
    },
    answer_285: {
        text: 'f8',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_95.id
    },
    answer_286: {
        text: 'f9',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_95.id
    },
    answer_287: {
        text: 'f10',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_95.id
    },
    answer_288: {
        text: 'Lent',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_96.id
    },
    answer_289: {
        text: 'Felugró párbeszédablakban',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_96.id
    },
    answer_290: {
        text: 'Legördülő listán',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_96.id
    },
    answer_291: {
        text: 'A zöld csíkon a gyorselérési eszköztárban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_96.id
    },
    answer_292: {
        text: 'Szélesebb sorral',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_97.id
    },
    answer_293: {
        text: 'Szélesebb oszloppal',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_97.id
    },
    answer_294: {
        text: 'Ellenőrzöm a képletet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_97.id
    },
    answer_295: {
        text: 'Megkeresem a hiányzó hivatkozást',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_97.id
    },
    answer_296: {
        text: 'Jobb alsó sarok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_98.id
    },
    answer_297: {
        text: 'Jobb felső sarok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_98.id
    },
    answer_298: {
        text: 'Bal alsó sarok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_98.id
    },
    answer_299: {
        text: 'Bal felső sarok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_98.id
    },
    answer_300: {
        text: 'Kijelölöm a B oszlopot, majd jobb klikk az oszlop betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_99.id
    },
    answer_301: {
        text: 'Kijelölöm az A:C oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_99.id
    },
    answer_302: {
        text: 'Kijelölöm az A:D oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_99.id
    },
    answer_303: {
        text: 'Kijelölöm az A:E oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_99.id
    },
    answer_304: {
        text: 'Kezdőlap',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_100.id
    },
    answer_305: {
        text: 'Nézet',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_100.id
    },
    answer_306: {
        text: 'Adatok',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_100.id
    },
    answer_307: {
        text: 'Képletek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_100.id
    },
    answer_308: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_101.id
    },
    answer_309: {
        text: 'Igen: Kezdőlap >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_101.id
    },
    answer_310: {
        text: 'Igen: Kezdőlap >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_101.id
    },
    answer_311: {
        text: 'Igen: Adatok >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_101.id
    },
    answer_312: {
        text: 'Ez is igaz teszt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_66.id
    },
    answer_313: {
        text: 'E',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_103.id
    },
    answer_314: {
        text: 'X',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_103.id
    },
    answer_315: {
        text: 'C',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_103.id
    },
    answer_316: {
        text: 'L',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_103.id
    },
    answer_321: {
        text: 'A',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_105.id
    },
    answer_322: {
        text: 'B',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_105.id
    },
    answer_323: {
        text: 'C',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_105.id
    },
    answer_324: {
        text: 'D',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_105.id
    },
    answer_325: {
        text: 'Pipa',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_106.id
    },
    answer_326: {
        text: 'Ragasztószalag',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_106.id
    },
    answer_327: {
        text: 'Rajzszög',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_106.id
    },
    answer_328: {
        text: 'Kalapács',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_106.id
    },
    answer_317: {
        text: 'Floppilemez',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_104.id
    },
    answer_318: {
        text: 'Pont',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_104.id
    },
    answer_319: {
        text: 'Balra visszaforduló nyíl',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_104.id
    },
    answer_320: {
        text: 'Jobbra visszaforduló nyíl',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_104.id
    },
    answer_329: {
        text: 'Az Excel kikapcsol',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_107.id
    },
    answer_330: {
        text: 'A zöld címsoron a Befektetés kalkulátor név jelenik meg',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_107.id
    },
    answer_331: {
        text: 'Az Excel kinyomtatja a munkafüzetet ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_107.id
    },
    answer_332: {
        text: 'A munkafüzet 3-at villan',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_107.id
    },
    answer_333: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_108.id
    },
    answer_334: {
        text: 'Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_108.id
    },
    answer_335: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Oldalak >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_108.id
    },
    answer_336: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_108.id
    },
    answer_337: {
        text: 'Odagörgetek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_109.id
    },
    answer_338: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd Entert nyomok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_109.id
    },
    answer_339: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd Entert nyomok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_109.id
    },
    answer_340: {
        text: 'Az A1 cellába beírom, hogy X789654, majd Entert nyomok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_109.id
    },
    answer_341: {
        text: 'Átírómenü',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_110.id
    },
    answer_342: {
        text: 'Szerkesztőléc',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_110.id
    },
    answer_343: {
        text: 'Edit menü',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_110.id
    },
    answer_344: {
        text: 'Szerkesztőcsík',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_110.id
    },
    answer_345: {
        text: ' Egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_111.id
    },
    answer_346: {
        text: 'Jobb egérgombbal kattintok a lecserélni kívánt munkalapon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_111.id
    },
    answer_347: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_111.id
    },
    answer_348: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére lent',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_111.id
    },
    answer_349: {
        text: 'Bal felső',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_112.id
    },
    answer_350: {
        text: 'Bal alsó',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_112.id
    },
    answer_351: {
        text: 'Jobb alsó',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_112.id
    },
    answer_352: {
        text: 'Jobb felső',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_112.id
    },
    answer_353: {
        text: 'Beírom, hogy "hatvány"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_113.id
    },
    answer_354: {
        text: 'Beírom, hogy "*"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_113.id
    },
    answer_355: {
        text: 'Beírom, hogy "^"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_113.id
    },
    answer_358: {
        text: 'A szerkesztőlécen a számításban a "Pi()"-t használom',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_114.id
    },
    answer_359: {
        text: 'A Pi-t használom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_114.id
    },
    answer_360: {
        text: '3,141592654',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_114.id
    },
    answer_361: {
        text: '"B4*B5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_115.id
    },
    answer_362: {
        text: '"B4 * B5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_115.id
    },
    answer_363: {
        text: '"=B4XB5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_115.id
    },
    answer_364: {
        text: '"=B4*B5"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_115.id
    },
    answer_365: {
        text: 'Pipa',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_116.id
    },
    answer_366: {
        text: 'Ragasztószalag',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_116.id
    },
    answer_367: {
        text: 'Ecset',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_116.id
    },
    answer_368: {
        text: 'Kalapács',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_116.id
    },
    answer_369: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_117.id
    },
    answer_370: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_117.id
    },
    answer_371: {
        text: 'Egyszerre maximum 3 feltétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_117.id
    },
    answer_372: {
        text: 'Egyszerre maximum 5 feltétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_117.id
    },
    answer_373: {
        text: '[Zöld]; [Kék]##;[Piros]-##;',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_118.id
    },
    answer_374: {
        text: '[Kék]##;[Piros]-##;[Zöld]',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_118.id
    },
    answer_375: {
        text: '[Kék]##;[Piros]##;[Zöld]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_118.id
    },
    answer_376: {
        text: '[Piros]-##;[Kék]##;[Zöld]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_118.id
    },
    answer_377: {
        text: 'A számok közé Entert ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_119.id
    },
    answer_378: {
        text: 'A számok közé szóközt ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_119.id
    },
    answer_379: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menüszalagon)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_119.id
    },
    answer_380: {
        text: 'A számok közé Tab-ot ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_119.id
    },
    answer_381: {
        text: 'Igen, de csak fél, harmad és negyed törtekkel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_120.id
    },
    answer_382: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_120.id
    },
    answer_384: {
        text: 'Igen, a számformátumnál kell beállítani a törteket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_120.id
    },
    answer_385: {
        text: '[Zöld]0;[Kék]##;[Piros]-##;[Sárga]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_121.id
    },
    answer_386: {
        text: '##[Kék];-##[Piros];[Zöld]0;[Sárga]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_121.id
    },
    answer_387: {
        text: '[Sárga];[Kék]##;[Piros]-##;[Zöld]0',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_121.id
    },
    answer_388: {
        text: '[Kék]##;[Piros]-##;[Zöld]0;[Sárga]',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_121.id
    },
    answer_389: {
        text: 'Nézet menü',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_122.id
    },
    answer_390: {
        text: 'Kezdőlap >> Betűtípus (párbeszédablak) >> Szegély',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_122.id
    },
    answer_391: {
        text: 'Kezdőlap >> Szegély',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_122.id
    },
    answer_392: {
        text: 'Szegélyek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_122.id
    },
    answer_393: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 3 és 3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_123.id
    },
    answer_394: {
        text: 'Formátum >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_123.id
    },
    answer_395: {
        text: ' Feltételes formázás >> Kezdőlap >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_123.id
    },
    answer_396: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_123.id
    },
    answer_397: {
        text: 'Kezdőlap >>Cellastílusok >> Adatsávok >> További szabályok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_124.id
    },
    answer_398: {
        text: 'Kezdőlap >> Formázás táblázatként',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_124.id
    },
    answer_399: {
        text: 'Kezdőlap >> Formázás táblázatként >> Adatsávok >> További szabályok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_124.id
    },
    answer_400: {
        text: 'Kezdőlap >> Feltételes formázás >> Adatsávok >> További szabályok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_124.id
    },
    answer_401: {
        text: 'Kezdőlap >> Feltételes formázás >> Értékgörbe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_125.id
    },
    answer_402: {
        text: 'Kezdőlap >> Feltételes formázás >> Adatok >> Értékgörbe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_125.id
    },
    answer_403: {
        text: 'Kezdőlap >> Feltételes formázás >> Értékgörbe beillesztése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_125.id
    },
    answer_404: {
        text: 'Beszúrás >> Értékgörbe',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_125.id
    },
    answer_405: {
        text: 'Kijelölöm a sorokat, "f8"; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_126.id
    },
    answer_406: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_126.id
    },
    answer_407: {
        text: 'Kijelölöm a sorokat, bal klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_126.id
    },
    answer_408: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_126.id
    },
    answer_409: {
        text: 'Jobb klikk az oszlop betűjelére és a helyi menüben az "elrejtés"-re kattintok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_127.id
    },
    answer_410: {
        text: 'Jobb klikk az oszlop betűjelére és "Hide" billentyű a billentyűzeten',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_127.id
    },
    answer_411: {
        text: 'Bal klikk az oszlop betűjelére és a helyi menüben az "elrejtés"-re kattintok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_127.id
    },
    answer_412: {
        text: 'Bal klikk az oszlop betűjelére és "Hide" billentyű a billentyűzeten',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_127.id
    },
    answer_413: {
        text: 'Az adattartományra kattintok, majd a Kezdőlap menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_128.id
    },
    answer_414: {
        text: 'Az adattartományra kattintok, majd a Adatok menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_128.id
    },
    answer_415: {
        text: 'Az adattartományra kattintok, majd a Nézet menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_128.id
    },
    answer_416: {
        text: 'Az adattartományra kattintok, majd a Képletek menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_128.id
    },
    answer_417: {
        text: 'Vágólap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_129.id
    },
    answer_418: {
        text: 'Betűtípus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_129.id
    },
    answer_419: {
        text: 'Igazítás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_129.id
    },
    answer_420: {
        text: 'Szám',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_129.id
    },
    answer_421: {
        text: '"=ÁTLAG(B2:B20)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_130.id
    },
    answer_422: {
        text: '"ÁTLAG(B2:B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_130.id
    },
    answer_423: {
        text: '"=ÁTLAG(B2;B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_130.id
    },
    answer_424: {
        text: '"=ÁTLAG(B2 B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_130.id
    },
    answer_425: {
        text: '"=MÓDUSZ.EGY(B2;B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_131.id
    },
    answer_426: {
        text: '"=MÓDUSZ(B2,B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_131.id
    },
    answer_427: {
        text: '"=MÓDUSZ.EGY(B2:B20)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_131.id
    },
    answer_428: {
        text: '"=MÓDUSZ.EGY(B2 B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_131.id
    },
    answer_429: {
        text: '"DARABTELI(B2:B20;2)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_132.id
    },
    answer_430: {
        text: '"=DARABTELI(B2:B20;5)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_132.id
    },
    answer_431: {
        text: '"=DARABTELI(2;B2:B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_132.id
    },
    answer_432: {
        text: '"=DARABTELI(B2:B20;2)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_132.id
    },
    answer_433: {
        text: 'f7',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_133.id
    },
    answer_434: {
        text: 'f8',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_133.id
    },
    answer_435: {
        text: 'f9',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_133.id
    },
    answer_436: {
        text: 'f10',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_133.id
    },
    answer_441: {
        text: 'Több darabot számol egy tartományban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_135.id
    },
    answer_442: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az összes kritérium',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_135.id
    },
    answer_443: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az több kritérium',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_135.id
    },
    answer_357: {
        text: 'Nem tudunk ezzel számolni',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_114.id
    },
    answer_383: {
        text: 'Nem, nem tudja kezelni az Excel a tört számokat',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_120.id
    },
    answer_437: {
        text: 'JÓ, ROSSZ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_134.id
    },
    answer_438: {
        text: 'OK, NEM OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_134.id
    },
    answer_439: {
        text: 'IGAZ, HAMIS',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_134.id
    },
    answer_440: {
        text: 'Nincs kimeneti üzenete',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_134.id
    },
    answer_444: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az 3 kritérium',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_135.id
    },
    answer_474: {
        text: 'Nem tudom felfedni az oszlopot, ha már elrejtettem',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_143.id
    },
    answer_449: {
        text: '"=KEREKÍTÉS(A1;3)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_137.id
    },
    answer_450: {
        text: '"=KEREKÍTÉS(A1;0;3)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_137.id
    },
    answer_451: {
        text: '"=KEREKÍTÉS(A1;111)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_137.id
    },
    answer_452: {
        text: '"=KEREKÍTÉS(A1;000)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_137.id
    },
    answer_453: {
        text: '"=AZONOS(B22345-Z123498)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_138.id
    },
    answer_454: {
        text: '"=AZONOS(B2234.Z123498)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_138.id
    },
    answer_455: {
        text: '"=AZONOS(B22345,Z123498)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_138.id
    },
    answer_456: {
        text: '"=AZONOS(B22345;Z123498)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_138.id
    },
    answer_457: {
        text: '"=VAGY(B2=Ford&C2="piros)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_139.id
    },
    answer_458: {
        text: '"=VAGY(B2=Ford:C2="piros)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_139.id
    },
    answer_459: {
        text: '"=VAGY(B2<=Ford;C2>="piros)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_139.id
    },
    answer_460: {
        text: '"=VAGY(B2=Ford;C2="piros)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_139.id
    },
    answer_461: {
        text: 'Lent',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_140.id
    },
    answer_462: {
        text: 'Felugró párbeszédablakban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_140.id
    },
    answer_463: {
        text: 'Legördülő listán',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_140.id
    },
    answer_464: {
        text: 'A zöld csíkon a gyorselérési eszköztárban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_140.id
    },
    answer_465: {
        text: 'Szélesebb sorral',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_141.id
    },
    answer_466: {
        text: 'Szélesebb oszloppal',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_141.id
    },
    answer_467: {
        text: 'Ellenőrzöm a képletet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_141.id
    },
    answer_468: {
        text: 'Megkeresem a hiányzó hivatkozást',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_141.id
    },
    answer_469: {
        text: 'Bal alsó sarok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_142.id
    },
    answer_470: {
        text: 'Jobb alsó sarok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_142.id
    },
    answer_471: {
        text: 'Jobb felső sarok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_142.id
    },
    answer_472: {
        text: 'Bal felső sarok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_142.id
    },
    answer_473: {
        text: 'Kijelölöm a B oszlopot, majd jobb klikk az oszlop betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_143.id
    },
    answer_477: {
        text: 'Kezdőlap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_144.id
    },
    answer_478: {
        text: 'Nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_144.id
    },
    answer_479: {
        text: 'Adatok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_144.id
    },
    answer_480: {
        text: 'Képletek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_144.id
    },
    answer_482: {
        text: 'Igen: Kezdőlap >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_145.id
    },
    answer_483: {
        text: 'Igen: Kezdőlap >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_145.id
    },
    answer_484: {
        text: 'Igen: Adatok >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_145.id
    },
    answer_485: {
        text: 'az angol szavakat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_146.id
    },
    answer_486: {
        text: 'a magyar szavakat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_146.id
    },
    answer_487: {
        text: 'a csupa nagybetűs szavakat',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_146.id
    },
    answer_488: {
        text: 'a csupa dőlt betűs szavakat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_146.id
    },
    answer_489: {
        text: 'CTRL+Q',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_147.id
    },
    answer_490: {
        text: 'CTRL+Á',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_147.id
    },
    answer_491: {
        text: 'CTRL+H',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_147.id
    },
    answer_492: {
        text: 'CTRL+K',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_147.id
    },
    answer_493: {
        text: 'Nincs',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_148.id
    },
    answer_494: {
        text: 'Az esetvizsgáló párbeszédablakán a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_148.id
    },
    answer_495: {
        text: 'Az NÉZET menün a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_148.id
    },
    answer_496: {
        text: 'Az esetvizsgáló párbeszédablakán a "Összes"-re kattintok és új munkalapon látom az eredményeket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_148.id
    },
    answer_497: {
        text: 'Az a cella, amit az Excel átalakít a számítással',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_149.id
    },
    answer_498: {
        text: 'Az a cella, ahová a kamatot írom be',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_149.id
    },
    answer_499: {
        text: 'Az a cella, ahová a célértéket írom be',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_149.id
    },
    answer_500: {
        text: 'Az a cella, ahová az Excel a célértéket szűri le',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_149.id
    },
    answer_501: {
        text: 'Kezdőlap menü >> Új megjegyzés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_150.id
    },
    answer_502: {
        text: 'Adatok menü >> Új megjegyzés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_150.id
    },
    answer_503: {
        text: 'Véleményezés menü >> Új megjegyzés',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_150.id
    },
    answer_504: {
        text: 'Hivatkozások menü >> Új megjegyzés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_150.id
    },
    answer_505: {
        text: 'A képre a jobb egérgombbal kattintok és elhúzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_151.id
    },
    answer_506: {
        text: 'A képre a jobb egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_151.id
    },
    answer_507: {
        text: 'A képre a bal egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_151.id
    },
    answer_508: {
        text: 'A képre a jobb egérgombbal háromszor kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_151.id
    },
    answer_509: {
        text: 'Jobb klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_152.id
    },
    answer_510: {
        text: 'Bal klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_152.id
    },
    answer_511: {
        text: 'Jobb klikk a képre >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_152.id
    },
    answer_512: {
        text: 'Nem lehet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_152.id
    },
    answer_513: {
        text: '1',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_153.id
    },
    answer_514: {
        text: '2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_153.id
    },
    answer_515: {
        text: '3',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_153.id
    },
    answer_516: {
        text: '4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_153.id
    },
    answer_517: {
        text: 'Bal oldalon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_154.id
    },
    answer_518: {
        text: 'Jobb klikk a képre és a helyi menü alatt, a Stílus mellett jobbra van a körülvágás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_154.id
    },
    answer_519: {
        text: 'Jobb klikk a képre és a helyi menü közepén van a körülvágás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_154.id
    },
    answer_520: {
        text: 'Jobb klikk a képre és a helyi menü felett, a Stílus mellett jobbra van a körülvágás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_154.id
    },
    answer_521: {
        text: 'Igen. A WordArt-ra jobb egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_155.id
    },
    answer_522: {
        text: 'Igen. A WordArt-ra duplán a bal egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_155.id
    },
    answer_523: {
        text: 'Igen. A WordArt jobb egérgombbal kattintok >> Beszúrás >> Kép',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_155.id
    },
    answer_524: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_155.id
    },
    answer_525: {
        text: 'Sehogy',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_156.id
    },
    answer_526: {
        text: 'Beszúrás >> Szimbólum',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_156.id
    },
    answer_527: {
        text: 'AltGr+I billentyűkombináció',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_156.id
    },
    answer_528: {
        text: 'Jobb klikk és AltGr',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_156.id
    },
    answer_529: {
        text: 'Kezdőlap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_157.id
    },
    answer_530: {
        text: 'Formátum',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_157.id
    },
    answer_531: {
        text: 'Beszúrás >> Egyenlet >> Szabadkézi egyenlet',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_157.id
    },
    answer_532: {
        text: 'Képletek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_157.id
    },
    answer_533: {
        text: '"SZUMHA(A2:A27;"Mintaférj";B2:B27)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_158.id
    },
    answer_534: {
        text: '"SZUNHA(A2:A27;"Mintaférj";B2:B27)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_158.id
    },
    answer_535: {
        text: '"SZUMHA(A2:A27;"Mintaférj":B2:B27)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_158.id
    },
    answer_475: {
        text: 'Kijelölöm az A:C oszlopokat, majd jobb klikk az oszlopok betűjelén, és a helyi menüben a Felfedés opcióra kattintok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_143.id
    },
    answer_476: {
        text: 'Csak egy oszlopot nem lehet felfedni',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_143.id
    },
    answer_481: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_145.id
    },
    answer_536: {
        text: '"SZUMHA("Mintaférj";A2:A27;B2:B27)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_158.id
    },
    answer_537: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és jobb egérgombbal leokézom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_159.id
    },
    answer_538: {
        text: 'Kijelölöm a táblázatot >> Adatokeszközök menü >> Ismétlődések eltávolítása >> és leokézom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_159.id
    },
    answer_539: {
        text: 'Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_159.id
    },
    answer_540: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_159.id
    },
    answer_541: {
        text: 'Ha védem a táblázatot az adatvesztéstől',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_160.id
    },
    answer_542: {
        text: 'Ha többen használunk egy táblázatot, és el akarom kerülni a hibákat',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_160.id
    },
    answer_543: {
        text: 'Ha színesebb a táblázat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_160.id
    },
    answer_544: {
        text: 'Ha makrókat tiltok le vele',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_160.id
    },
    answer_545: {
        text: 'Megengedve >> Szöveghossz >> minimum 0; maximum 6',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_161.id
    },
    answer_546: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_161.id
    },
    answer_547: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 7',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_161.id
    },
    answer_548: {
        text: 'Megengedve >> Szöveghossz >> minimum 5; maximum 6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_161.id
    },
    answer_549: {
        text: 'Mert ha tagolva van és nem szám a formátum, akkor a tagolást szóköznek veszi az Excel és nem fog tudni számolni',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_162.id
    },
    answer_550: {
        text: 'Mert így kevesebb lesz az adat, amit át kell konvertálni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_162.id
    },
    answer_551: {
        text: 'Nem kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_162.id
    },
    answer_552: {
        text: 'Mert tizedes törtet nem tud átkonvertálni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_162.id
    },
    answer_553: {
        text: 'Semmi hiba nem történik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_163.id
    },
    answer_554: {
        text: 'Üres cellákat kapok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_163.id
    },
    answer_555: {
        text: 'Mindent kétszer ír ki',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_163.id
    },
    answer_556: {
        text: 'Az Excel az egész táblázatot átmásolja szűrés helyett',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_163.id
    },
    answer_558: {
        text: 'Áttekinthetőbb lesz a táblázat, a felesleges adatokat törli az Excel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_164.id
    },
    answer_559: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak másik munkalapra menti',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_164.id
    },
    answer_561: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Elő 10 Százalék',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_165.id
    },
    answer_562: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Elő 10 Százalék',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_165.id
    },
    answer_563: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Elő 10 Tétel',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_165.id
    },
    answer_564: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Elő 10 Tétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_165.id
    },
    answer_565: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: CÉGNÉV és RENDELÉS ÖSSZEGE',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_166.id
    },
    answer_566: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_166.id
    },
    answer_567: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS IDŐPONTJA',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_166.id
    },
    answer_568: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_166.id
    },
    answer_569: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_167.id
    },
    answer_570: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_167.id
    },
    answer_571: {
        text: 'Igen, de csak oszlopokból',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_167.id
    },
    answer_572: {
        text: 'Igen, maximum 3 különálló sorból',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_167.id
    },
    answer_573: {
        text: 'Igen, de csak szaggatott vonallal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_168.id
    },
    answer_574: {
        text: 'Igen, de csak dupla vonallal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_168.id
    },
    answer_575: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_168.id
    },
    answer_576: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_168.id
    },
    answer_577: {
        text: 'Kép formázása',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_169.id
    },
    answer_578: {
        text: 'Adatok formázása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_169.id
    },
    answer_579: {
        text: 'Adatlap formázása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_169.id
    },
    answer_580: {
        text: 'Betűtípus formázása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_169.id
    },
    answer_581: {
        text: 'A hátteret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_170.id
    },
    answer_582: {
        text: 'A diagram hátterét',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_170.id
    },
    answer_583: {
        text: 'A diagramterületet',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_170.id
    },
    answer_584: {
        text: 'A területhátteret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_170.id
    },
    answer_585: {
        text: 'Adatok >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> int >> Korlátozó feltétel: Egész szám >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_171.id
    },
    answer_586: {
        text: 'Korlátozó felvétel felvétele párbeszédablak >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> int >> Korlátozó feltétel: Egész szám >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_171.id
    },
    answer_587: {
        text: 'Korlátozó felvétel felvétele párbeszédablak >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> bin >> Korlátozó feltétel: Egész szám >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_171.id
    },
    answer_588: {
        text: 'Korlátozó felvétel felvétele párbeszédablak >> A cellahivatkozásnál beállítom a megfelelő cellatartományt >> A párbeszédblek közepén lenyitom a legördülő menüt >> dif >> Korlátozó feltétel: Egész szám >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_171.id
    },
    answer_589: {
        text: 'A kijelöléshez a Shift+Del, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_172.id
    },
    answer_590: {
        text: 'A kijelöléshez a Ctrl+Shift+Del, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_172.id
    },
    answer_591: {
        text: 'A kijelöléshez a Shift+AltGr, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_172.id
    },
    answer_592: {
        text: 'A kijelöléshez a Ctrl+C, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_172.id
    },
    answer_593: {
        text: 'Nincs',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_173.id
    },
    answer_594: {
        text: 'Nincs, csak bonyolultabbá válik a folyamat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_173.id
    },
    answer_595: {
        text: 'Haladó szinten nincs különbség',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_173.id
    },
    answer_596: {
        text: 'Haladóbb szinten a billentyűzettel gyorsabbak lehetünk',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_173.id
    },
    answer_356: {
        text: 'Beírom, hogy "X"',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_113.id
    },
    answer_597: {
        text: 'F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_174.id
    },
    answer_598: {
        text: '&',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_174.id
    },
    answer_599: {
        text: '@',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_174.id
    },
    answer_600: {
        text: '$',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_174.id
    },
    answer_601: {
        text: 'Könyvelési',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_175.id
    },
    answer_602: {
        text: 'Tudományos',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_175.id
    },
    answer_603: {
        text: 'Általános',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_175.id
    },
    answer_604: {
        text: 'Szöveg',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_175.id
    },
    answer_605: {
        text: 'Nézet >> Stílusok >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_176.id
    },
    answer_606: {
        text: 'Kezdőlap >> Stílusok >> Új cellastílus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_176.id
    },
    answer_607: {
        text: 'Kezdőlap >> Nézetek >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_176.id
    },
    answer_608: {
        text: 'Nem lehet ilyet beállítani',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_176.id
    },
    answer_609: {
        text: 'Nem tudom változtatni az Excel táblázat hátterét',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_177.id
    },
    answer_610: {
        text: 'Lapelrendezés >> Háttér >> Képek beszúrása ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_177.id
    },
    answer_611: {
        text: 'Beszúrás >> Képek beszúrása ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_177.id
    },
    answer_612: {
        text: '"=Hol.van("banán";A1:Z999999)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_177.id
    },
    answer_613: {
        text: '"=HA(A1=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_178.id
    },
    answer_614: {
        text: '"=HA(B2=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_178.id
    },
    answer_615: {
        text: '"=HAA1(B2=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_178.id
    },
    answer_616: {
        text: '"=HA(A1=0;"TEA";VAGY,"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_178.id
    },
    answer_445: {
        text: '1900.01.01',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_136.id
    },
    answer_447: {
        text: '1000.01.01',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_136.id
    },
    answer_448: {
        text: '1800.01.01',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_136.id
    },
    answer_446: {
        text: 'Időszámításunk kezdete',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_136.id
    },
    answer_617: {
        text: 'Számolási hibát vét dátumnál',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_179.id
    },
    answer_618: {
        text: 'Számolási hibát vét pénznemnél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_179.id
    },
    answer_619: {
        text: 'Több találat esetén is csak ez elsőt jeleníti meg',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_179.id
    },
    answer_620: {
        text: 'Minden találatot megjelenít',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_179.id
    },
    answer_621: {
        text: '"=KÖZÉP(A1;2;4)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_180.id
    },
    answer_622: {
        text: '"=BAL(A1;2;4)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_180.id
    },
    answer_623: {
        text: '"=KÖZÉP(A1;3;4;5;6)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_180.id
    },
    answer_624: {
        text: '"=KÖZÉP(A1;2;.3.5.4)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_180.id
    },
    answer_625: {
        text: 'pipa',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_181.id
    },
    answer_626: {
        text: 'sx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_181.id
    },
    answer_627: {
        text: 'fx',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_181.id
    },
    answer_628: {
        text: 'x',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_181.id
    },
    answer_629: {
        text: 'Egyszerre csak 10 sort mutat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_182.id
    },
    answer_630: {
        text: 'Makrót futtat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_182.id
    },
    answer_631: {
        text: 'Színes stílus és gyors rendezés, valamint táblázatszintű műveletek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_182.id
    },
    answer_632: {
        text: 'Kevesebb adatot mutat, így átláthatóbb',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_182.id
    },
    answer_633: {
        text: 'Alt+3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_183.id
    },
    answer_634: {
        text: 'AltGr+3',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_183.id
    },
    answer_635: {
        text: 'Ctrl+3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_183.id
    },
    answer_636: {
        text: 'AltGr+Ctrl',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_183.id
    },
    answer_637: {
        text: 'Rögtön azután, hogy beütöttem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_184.id
    },
    answer_638: {
        text: 'A következő leütött karakterrel együtt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_184.id
    },
    answer_639: {
        text: 'Nem jelenik meg',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_184.id
    },
    answer_640: {
        text: 'A képlet véglegesítésénél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_184.id
    },
    answer_641: {
        text: '*',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_185.id
    },
    answer_642: {
        text: 'X',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_185.id
    },
    answer_643: {
        text: 'x',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_185.id
    },
    answer_644: {
        text: '><',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_185.id
    },
    answer_645: {
        text: 'ActiveCell = LÁTTAM',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_186.id
    },
    answer_646: {
        text: 'ActiveCell = "LÁTTAM"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_186.id
    },
    answer_647: {
        text: 'Active.Cell = "LÁTTAM"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_186.id
    },
    answer_648: {
        text: 'ActiveCell = "LÁTTAM".',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_186.id
    },
    answer_649: {
        text: 'Fájl menü (>> Egyebek) >> Beállítások >> Bővítmények >> Ugrás >> Solver >> OK',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_187.id
    },
    answer_650: {
        text: 'Bővítmények >> Beállítások >> Ugrás >> Solver >> OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_187.id
    },
    answer_651: {
        text: 'Fájl menü >> Solver >> OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_187.id
    },
    answer_652: {
        text: 'Fejlesztőeszközök >> Solver >> OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_187.id
    },
    answer_653: {
        text: 'pi',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_188.id
    },
    answer_654: {
        text: 'p',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_188.id
    },
    answer_655: {
        text: '𝝿',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_188.id
    },
    answer_656: {
        text: '"PI()"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_188.id
    },
    answer_557: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak elrejti',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_164.id
    },
    answer_560: {
        text: 'Az Excel a kiszűrt adatokat törli',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_164.id
    },
    answer_657: {
        text: 'w',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_189.id
    },
    answer_658: {
        text: 'x',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_189.id
    },
    answer_659: {
        text: 'y',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_189.id
    },
    answer_660: {
        text: 'z',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_189.id
    },
    answer_661: {
        text: 'USB stick',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_190.id
    },
    answer_662: {
        text: 'Floppy lemez',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_190.id
    },
    answer_663: {
        text: 'DVD lemez',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_190.id
    },
    answer_664: {
        text: 'SSD drive',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_190.id
    },
    answer_665: {
        text: 'angol',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_191.id
    },
    answer_666: {
        text: 'magyar',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_191.id
    },
    answer_667: {
        text: 'semmilyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_191.id
    },
    answer_668: {
        text: 'angol és magyar',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_191.id
    },
    answer_669: {
        text: 'CTRL + B',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_192.id
    },
    answer_670: {
        text: 'Kezdőlap >> Betűtipus >> Kattintok a "D"-re vagy CTRL + I',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_192.id
    },
    answer_671: {
        text: 'CTRL + D',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_192.id
    },
    answer_672: {
        text: 'F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_192.id
    },
    answer_673: {
        text: 'Beszúrás menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_193.id
    },
    answer_674: {
        text: 'Kijelölöm a szöveget >> Nézet menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_193.id
    },
    answer_675: {
        text: 'Kijelölöm a szöveget >> Beszúrás menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_193.id
    },
    answer_676: {
        text: 'Kijelölöm a szöveget >> Formátum menü >> Táblázat >> Szövegből táblázat >> Beállítom az oszlopok sorok számát. Stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_193.id
    },
    answer_677: {
        text: 'CTRL + Z',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_194.id
    },
    answer_678: {
        text: 'Tervezés menü >> Vízjel >> Vízjel eltávolítása',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_194.id
    },
    answer_679: {
        text: 'Törlés gomb',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_194.id
    },
    answer_680: {
        text: 'ALT + F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_194.id
    },
    answer_681: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_195.id
    },
    answer_682: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_195.id
    },
    answer_683: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_195.id
    },
    answer_684: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_195.id
    },
    answer_685: {
        text: 'Nem lehet frissíteni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_196.id
    },
    answer_686: {
        text: 'Manuálisan kell átírni az oldalszámokat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_196.id
    },
    answer_687: {
        text: 'Kattintok a tartalomjegyzékre, majd a fent megjelenő "Frissítés"-re',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_196.id
    },
    answer_688: {
        text: 'F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_196.id
    },
    answer_689: {
        text: 'A Word kicsiben megmutatja, hogy mit írtam a jegyzetbe',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_197.id
    },
    answer_690: {
        text: 'Törlődik a jegyzet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_197.id
    },
    answer_691: {
        text: 'Végjegyzet lesz a lábjegyzetből',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_197.id
    },
    answer_692: {
        text: 'Semmi',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_197.id
    },
    answer_693: {
        text: 'Nem lehet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_198.id
    },
    answer_694: {
        text: 'Lehet',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_198.id
    },
    answer_695: {
        text: 'Lehet, de csak A5 méretben',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_198.id
    },
    answer_696: {
        text: 'Lehet, de csak A4 méretben',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_198.id
    },
    answer_697: {
        text: 'Floppilemez',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_199.id
    },
    answer_698: {
        text: 'Pont',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_199.id
    },
    answer_699: {
        text: 'Balra visszaforduló nyíl',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_199.id
    },
    answer_700: {
        text: 'Jobbra visszaforduló nyíl',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_199.id
    },
    answer_701: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_200.id
    },
    answer_702: {
        text: 'Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_200.id
    },
    answer_703: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Oldalak >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_200.id
    },
    answer_704: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_200.id
    },
    answer_705: {
        text: 'A kijelöléshez a Shift+Del, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_201.id
    },
    answer_706: {
        text: 'A kijelöléshez a Ctrl+Shift+Del, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_201.id
    },
    answer_707: {
        text: 'A kijelöléshez a Shift+AltGr, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_201.id
    },
    answer_708: {
        text: 'A kijelöléshez a Ctrl+C, majd beillesztéshez Ctrl+V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_201.id
    },
    answer_709: {
        text: 'Odagörgetek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_202.id
    },
    answer_710: {
        text: 'A szerkesztőlécbe beírom, hogy X789654, majd Entert nyomok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_202.id
    },
    answer_711: {
        text: 'A név mezőbe (bal oldal) beírom, hogy X789654, majd Entert nyomok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_202.id
    },
    answer_712: {
        text: 'Az A1 cellába beírom, hogy X789654, majd Entert nyomok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_202.id
    },
    answer_713: {
        text: 'Nincs',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_203.id
    },
    answer_714: {
        text: 'Nincs, csak bonyolultabbá válik a folyamat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_203.id
    },
    answer_715: {
        text: 'Haladó szinten nincs különbség',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_203.id
    },
    answer_716: {
        text: 'Haladóbb szinten a billentyűzettel gyorsabbak lehetünk',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_203.id
    },
    answer_717: {
        text: ' Egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_204.id
    },
    answer_718: {
        text: 'Jobb egérgombbal kattintok a lecserélni kívánt munkalapon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_204.id
    },
    answer_719: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére fent',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_204.id
    },
    answer_1122: {
        text: 'Shift + Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_306.id
    },
    answer_720: {
        text: 'Bal egérgombbal kattintok az aktiválni kívánt munkalap fülére lent',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_204.id
    },
    answer_721: {
        text: 'Bal felső',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_205.id
    },
    answer_722: {
        text: 'Bal alsó',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_205.id
    },
    answer_723: {
        text: 'Jobb alsó',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_205.id
    },
    answer_724: {
        text: 'Jobb felső',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_205.id
    },
    answer_725: {
        text: 'Vágólap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_206.id
    },
    answer_726: {
        text: 'Betűtípus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_206.id
    },
    answer_727: {
        text: 'Igazítás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_206.id
    },
    answer_728: {
        text: 'Szám',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_206.id
    },
    answer_729: {
        text: 'Beírom, hogy "hatvány"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_207.id
    },
    answer_730: {
        text: 'Beírom, hogy "*"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_207.id
    },
    answer_731: {
        text: 'Beírom, hogy "^"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_207.id
    },
    answer_732: {
        text: 'Beírom, hogy "X"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_207.id
    },
    answer_733: {
        text: 'A szerkesztőlécen a számításban a "Pi()"-t használom',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_208.id
    },
    answer_734: {
        text: 'A Pi-t használom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_208.id
    },
    answer_735: {
        text: '3,141592654',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_208.id
    },
    answer_736: {
        text: 'Nem tudunk ezzel számolni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_208.id
    },
    answer_737: {
        text: '"B4*B5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_209.id
    },
    answer_738: {
        text: '"B4 * B5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_209.id
    },
    answer_739: {
        text: '"=B4XB5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_209.id
    },
    answer_740: {
        text: '"=B4*B5"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_209.id
    },
    answer_741: {
        text: 'F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_210.id
    },
    answer_742: {
        text: '&',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_210.id
    },
    answer_743: {
        text: '@',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_210.id
    },
    answer_744: {
        text: '$',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_210.id
    },
    answer_745: {
        text: 'Rögtön azután, hogy beütöttem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_211.id
    },
    answer_746: {
        text: 'A következő leütött karakterrel együtt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_211.id
    },
    answer_747: {
        text: 'Nem jelenik meg',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_211.id
    },
    answer_748: {
        text: 'A képlet véglegesítésénél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_211.id
    },
    answer_749: {
        text: 'Vágólap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_212.id
    },
    answer_750: {
        text: 'Betűtípus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_212.id
    },
    answer_751: {
        text: 'Igazítás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_212.id
    },
    answer_752: {
        text: 'Szám',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_212.id
    },
    answer_753: {
        text: 'Pipa',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_213.id
    },
    answer_754: {
        text: 'Ragasztószalag',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_213.id
    },
    answer_755: {
        text: 'Ecset',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_213.id
    },
    answer_756: {
        text: 'Kalapács',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_213.id
    },
    answer_757: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_214.id
    },
    answer_758: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_214.id
    },
    answer_759: {
        text: 'Egyszerre maximum 3 feltétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_214.id
    },
    answer_760: {
        text: 'Egyszerre maximum 5 feltétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_214.id
    },
    answer_761: {
        text: '[Zöld]; [Kék]##;[Piros]-##;',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_215.id
    },
    answer_762: {
        text: '[Kék]##;[Piros]-##;[Zöld]',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_215.id
    },
    answer_763: {
        text: '[Kék]##;[Piros]##;[Zöld]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_215.id
    },
    answer_764: {
        text: '[Piros]-##;[Kék]##;[Zöld]',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_215.id
    },
    answer_765: {
        text: 'Igen, de csak fél, harmad és negyed törtekkel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_216.id
    },
    answer_766: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_216.id
    },
    answer_767: {
        text: 'Igen, a számformátumnál kell beállítani a törteket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_216.id
    },
    answer_768: {
        text: 'Nem, nem tudja kezelni az Excel a tört számokat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_216.id
    },
    answer_769: {
        text: 'Nézet >> Stílusok >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_217.id
    },
    answer_770: {
        text: 'Kezdőlap >> Stílusok >> Új cellastílus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_217.id
    },
    answer_771: {
        text: 'Kezdőlap >> Nézetek >> Egyebek >> Új cellastílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_217.id
    },
    answer_772: {
        text: 'Nem lehet ilyet beállítani',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_217.id
    },
    answer_773: {
        text: 'Nézet menü',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_218.id
    },
    answer_774: {
        text: 'Kezdőlap >> Betűtípus (párbeszédablak) >> Szegély',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_218.id
    },
    answer_775: {
        text: 'Kezdőlap >> Szegély',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_218.id
    },
    answer_776: {
        text: 'Szegélyek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_218.id
    },
    answer_777: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 3 és 3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_219.id
    },
    answer_778: {
        text: 'Formátum >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_219.id
    },
    answer_779: {
        text: ' Feltételes formázás >> Kezdőlap >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_219.id
    },
    answer_781: {
        text: 'Kijelölöm a sorokat, "f8"; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_220.id
    },
    answer_782: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_220.id
    },
    answer_783: {
        text: 'Kijelölöm a sorokat, bal klikk a kijelölt sorok egyikének számára; a helyi menüben: sormagasság, majd megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_220.id
    },
    answer_784: {
        text: 'Kijelölöm a sorokat, jobb klikk a kijelölt sorok egyikének számára; a helyi menüben megadom az általam kívánt értéket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_220.id
    },
    answer_785: {
        text: 'Nem tudom változtatni az Excel táblázat hátterét',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_221.id
    },
    answer_786: {
        text: 'Lapelrendezés >> Háttér >> Képek beszúrása ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_221.id
    },
    answer_787: {
        text: 'Beszúrás >> Képek beszúrása ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_221.id
    },
    answer_788: {
        text: '"=Hol.van("banán";A1:Z999999)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_221.id
    },
    answer_793: {
        text: '"=MÓDUSZ.EGY(B2;B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_223.id
    },
    answer_794: {
        text: '"=MÓDUSZ(B2,B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_223.id
    },
    answer_795: {
        text: '"=MÓDUSZ.EGY(B2:B20)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_223.id
    },
    answer_796: {
        text: '"=MÓDUSZ.EGY(B2 B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_223.id
    },
    answer_797: {
        text: '"DARABTELI(B2:B20;2)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_224.id
    },
    answer_798: {
        text: '"=DARABTELI(B2:B20;5)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_224.id
    },
    answer_799: {
        text: '"=DARABTELI(2;B2:B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_224.id
    },
    answer_800: {
        text: '"=DARABTELI(B2:B20;2)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_224.id
    },
    answer_801: {
        text: '"=HA(A1=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_225.id
    },
    answer_802: {
        text: '"=HA(B2=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_225.id
    },
    answer_803: {
        text: '"=HAA1(B2=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_225.id
    },
    answer_804: {
        text: '"=HA(A1=0;"TEA";VAGY,"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_225.id
    },
    answer_805: {
        text: 'JÓ, ROSSZ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_226.id
    },
    answer_806: {
        text: 'OK, NEM OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_226.id
    },
    answer_807: {
        text: 'IGAZ, HAMIS',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_226.id
    },
    answer_808: {
        text: 'Nincs kimeneti üzenete',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_226.id
    },
    answer_809: {
        text: 'Több darabot számol egy tartományban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_227.id
    },
    answer_810: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az összes kritérium',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_227.id
    },
    answer_811: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az több kritérium',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_227.id
    },
    answer_812: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az 3 kritérium',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_227.id
    },
    answer_813: {
        text: '1900.01.01',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_228.id
    },
    answer_814: {
        text: '1000.01.01',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_228.id
    },
    answer_815: {
        text: '1800.01.01',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_228.id
    },
    answer_816: {
        text: 'Időszámításunk kezdete',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_228.id
    },
    answer_817: {
        text: 'Számolási hibát vét dátumnál',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_229.id
    },
    answer_818: {
        text: 'Számolási hibát vét pénznemnél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_229.id
    },
    answer_819: {
        text: 'Több találat esetén is csak ez elsőt jeleníti meg',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_229.id
    },
    answer_820: {
        text: 'Minden találatot megjelenít',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_229.id
    },
    answer_821: {
        text: '"=KEREKÍTÉS(A1;3)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_230.id
    },
    answer_822: {
        text: '"=KEREKÍTÉS(A1;0;3)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_230.id
    },
    answer_823: {
        text: '"=KEREKÍTÉS(A1;111)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_230.id
    },
    answer_824: {
        text: '"=KEREKÍTÉS(A1;000)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_230.id
    },
    answer_780: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_219.id
    },
    answer_825: {
        text: '"SZUMHA(A2:A27;"Mintaférj";B2:B27)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_231.id
    },
    answer_826: {
        text: '"SZUNHA(A2:A27;"Mintaférj";B2:B27)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_231.id
    },
    answer_827: {
        text: '"SZUMHA(A2:A27;"Mintaférj":B2:B27)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_231.id
    },
    answer_828: {
        text: '"SZUMHA("Mintaférj";A2:A27;B2:B27)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_231.id
    },
    answer_829: {
        text: 'pipa',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_232.id
    },
    answer_830: {
        text: 'sx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_232.id
    },
    answer_831: {
        text: 'fx',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_232.id
    },
    answer_832: {
        text: 'x',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_232.id
    },
    answer_833: {
        text: 'Lent',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_234.id
    },
    answer_834: {
        text: 'Felugró párbeszédablakban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_234.id
    },
    answer_835: {
        text: 'Legördülő listán',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_234.id
    },
    answer_836: {
        text: 'A zöld csíkon a gyorselérési eszköztárban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_234.id
    },
    answer_837: {
        text: 'Szélesebb sorral',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_235.id
    },
    answer_838: {
        text: 'Szélesebb oszloppal',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_235.id
    },
    answer_839: {
        text: 'Ellenőrzöm a képletet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_235.id
    },
    answer_840: {
        text: 'Megkeresem a hiányzó hivatkozást',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_235.id
    },
    answer_841: {
        text: 'Igen: Kezdőlap >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_236.id
    },
    answer_842: {
        text: 'Igen: Kezdőlap >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_236.id
    },
    answer_843: {
        text: 'Igen: Adatok >> Rendezés és szűrés >> Egyéni sorrend >> Rendezés alapja >> Betűszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_236.id
    },
    answer_844: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_236.id
    },
    answer_845: {
        text: 'az angol szavakat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_237.id
    },
    answer_846: {
        text: 'a magyar szavakat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_237.id
    },
    answer_847: {
        text: 'a csupa nagybetűs szavakat',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_237.id
    },
    answer_848: {
        text: 'a csupa dőlt betűs szavakat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_237.id
    },
    answer_849: {
        text: 'CTRL+Q',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_238.id
    },
    answer_850: {
        text: 'CTRL+Á',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_238.id
    },
    answer_851: {
        text: 'CTRL+H',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_238.id
    },
    answer_852: {
        text: 'CTRL+K',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_238.id
    },
    answer_853: {
        text: 'Nincs',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_239.id
    },
    answer_854: {
        text: 'Az esetvizsgáló párbeszédablakán a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_239.id
    },
    answer_855: {
        text: 'Az NÉZET menün a "Jelentés"-re kattintok és új munkalapon látom az eredményeket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_239.id
    },
    answer_856: {
        text: 'Az esetvizsgáló párbeszédablakán a "Összes"-re kattintok és új munkalapon látom az eredményeket',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_239.id
    },
    answer_857: {
        text: 'Az a cella, amit az Excel átalakít a számítással',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_240.id
    },
    answer_858: {
        text: 'Az a cella, ahová a kamatot írom be',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_240.id
    },
    answer_859: {
        text: 'Az a cella, ahová a célértéket írom be',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_240.id
    },
    answer_860: {
        text: 'Az a cella, ahová az Excel a célértéket szűri le',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_240.id
    },
    answer_861: {
        text: 'Írásvédett lesz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_241.id
    },
    answer_862: {
        text: 'Törölhetetlen lesz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_241.id
    },
    answer_863: {
        text: 'A Word fájlmenüjében rögzítem a fájlt, hogy mindig lássam a menüben.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_241.id
    },
    answer_864: {
        text: 'PDF-fájl lesz belőle.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_241.id
    },
    answer_865: {
        text: 'A cím mutatja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_242.id
    },
    answer_866: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_242.id
    },
    answer_867: {
        text: 'Adatok menü: Információ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_242.id
    },
    answer_868: {
        text: 'Fájl menü: Információ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_242.id
    },
    answer_869: {
        text: 'C++',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_243.id
    },
    answer_870: {
        text: 'Angol',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_243.id
    },
    answer_871: {
        text: 'Magyar',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_243.id
    },
    answer_872: {
        text: 'Sok nyelvet ismer, pl angol, magyar, német stb.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_243.id
    },
    answer_873: {
        text: '(Fájl menü >> Egyebek >>) Beállítások >> (Bal oldalon) Gyorseléri eszköztár >> Gyakori parancsok >> Felolvasás >> Felvétel >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_244.id
    },
    answer_874: {
        text: 'Nézet >> (Bal oldalon) Gyorseléri eszköztár >> Gyakori parancsok >> Felolvasás >> Felvétel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_244.id
    },
    answer_875: {
        text: 'Berszúrás >> (Bal oldalon) Gyorseléri eszköztár >> Gyakori parncsok >> Felolvasás >> Felvétel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_244.id
    },
    answer_876: {
        text: '(Fájl menü >> Egyebek >>) Beállítások >> (Bal oldalon) Menüszalag testreszabása >> Gyakori parancsok >> át is állíthatom: Minden parancs >> Felolvasás >> Felvétel >>Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_244.id
    },
    answer_877: {
        text: 'Arra, hogy nagy legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_245.id
    },
    answer_878: {
        text: 'Arra, hogy kicsi legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_245.id
    },
    answer_879: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_245.id
    },
    answer_880: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_245.id
    },
    answer_881: {
        text: 'CTRL + F',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_246.id
    },
    answer_882: {
        text: 'CTRL + D',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_246.id
    },
    answer_883: {
        text: 'CTRL + B',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_246.id
    },
    answer_884: {
        text: 'CTRL + T',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_246.id
    },
    answer_885: {
        text: 'Shift +F1',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_247.id
    },
    answer_886: {
        text: 'Shift +F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_247.id
    },
    answer_887: {
        text: 'Shift +F3',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_247.id
    },
    answer_888: {
        text: 'Shift +F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_247.id
    },
    answer_889: {
        text: 'kb. 16 000',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_248.id
    },
    answer_890: {
        text: 'kb. 160 000',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_248.id
    },
    answer_891: {
        text: 'kb.1 600 000',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_248.id
    },
    answer_892: {
        text: 'Több, mint 16 000 000',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_248.id
    },
    answer_893: {
        text: 'Pont: 1 pont kicsit kisebb, mint 0,4 mm',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_249.id
    },
    answer_894: {
        text: 'mm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_249.id
    },
    answer_895: {
        text: 'Pont: 10 pont kicsit kisebb, mint 0,4 mm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_249.id
    },
    answer_896: {
        text: '0,1 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_249.id
    },
    answer_897: {
        text: 'CTRL + Shift + 3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_250.id
    },
    answer_898: {
        text: 'CTRL + F1',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_250.id
    },
    answer_899: {
        text: 'CTRL + I',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_250.id
    },
    answer_900: {
        text: 'CTRL + =',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_250.id
    },
    answer_901: {
        text: 'Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Piros >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_251.id
    },
    answer_902: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Kezdőlap menü >> Nézet >> A rész jobb alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Piros >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_251.id
    },
    answer_903: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész jobb alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Kék >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_251.id
    },
    answer_904: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész jobb alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Aláhúzás színe: Piros >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_251.id
    },
    answer_905: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_252.id
    },
    answer_906: {
        text: 'Nagybetű formátum és méret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_252.id
    },
    answer_907: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete megváltozik.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_252.id
    },
    answer_908: {
        text: 'A formátuma a kisbetűéké, a mérete a nagyoké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_252.id
    },
    answer_909: {
        text: 'Szóközt ütök közéjük.',
        deletionDate: null,
        isCorrect: false,
        questionId: seed_questions.question_253.id
    },
    answer_910: {
        text: 'Kijelölöm a ritkítani kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Térköz: Ritkított. >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_253.id
    },
    answer_911: {
        text: 'Tab-ot ütök közéjük',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_253.id
    },
    answer_1116: {
        text: 'Beszúrás menü >> Szöveg >> Kész modulok >> Kész szöveg',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_304.id
    },
    answer_1120: {
        text: 'Kezdőlap menü >> Nézet >> Rendezés ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_305.id
    },
    answer_1123: {
        text: 'Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_306.id
    },
    answer_1124: {
        text: 'F1 + Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_306.id
    },
    answer_1275: {
        text: 'A képre a bal egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_344.id
    },
    answer_1276: {
        text: 'A képre a jobb egérgombbal háromszor kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_344.id
    },
    answer_912: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Sorköz: Ritkított. >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_253.id
    },
    answer_913: {
        text: 'Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Szövegeffektusok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_254.id
    },
    answer_914: {
        text: 'Nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_254.id
    },
    answer_915: {
        text: 'Kezdőlap menüszalag: Bekezdés résznél van az ikonja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_254.id
    },
    answer_916: {
        text: 'Beállítások',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_254.id
    },
    answer_917: {
        text: 'A + olló',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_255.id
    },
    answer_918: {
        text: 'A + X',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_255.id
    },
    answer_919: {
        text: 'A + radír',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_255.id
    },
    answer_920: {
        text: 'A + hibajavító ecset',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_255.id
    },
    answer_921: {
        text: 'CTRL + J',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_256.id
    },
    answer_922: {
        text: 'CTRL + R',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_256.id
    },
    answer_923: {
        text: 'CTRL + NYÍL JOBBRA',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_256.id
    },
    answer_924: {
        text: 'CTRL + END',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_256.id
    },
    answer_925: {
        text: '1 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_257.id
    },
    answer_926: {
        text: '1,25 cm',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_257.id
    },
    answer_927: {
        text: '2 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_257.id
    },
    answer_928: {
        text: '1,5 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_257.id
    },
    answer_929: {
        text: 'Sorköz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_258.id
    },
    answer_930: {
        text: 'Behúzás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_258.id
    },
    answer_931: {
        text: 'Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_258.id
    },
    answer_932: {
        text: 'Térköz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_258.id
    },
    answer_933: {
        text: 'Kattintok a MÁSODIK bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_259.id
    },
    answer_934: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Tervezés menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_259.id
    },
    answer_935: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_259.id
    },
    answer_936: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Nézet menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_259.id
    },
    answer_937: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> Nézet menü >> Bekezdés rész: Szegély >> A lenyíló menü legalsó lehetősége: Szegély és mintázat... >> Párbeszédablak >> Beállítom, amit akarok >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_260.id
    },
    answer_938: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> A lenyíló helyi menü legalsó lehetősége: Szegély és mintázat... >> Párbeszédablak >> Beállítom, amit akarok >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_260.id
    },
    answer_939: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> Kezdőlap menü >> Bekezdés rész: Szegély >> Beállítom, amit akarok >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_260.id
    },
    answer_940: {
        text: 'Kattintok a szegélyezni kívánt bekezdésen. >> Kezdőlap menü >> Bekezdés rész: Szegély >> A lenyíló menü legalsó lehetősége: Szegély és mintázat... >> Párbeszédablak >> Beállítom, amit akarok >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_260.id
    },
    answer_941: {
        text: 'Balra zárt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_261.id
    },
    answer_942: {
        text: 'Jobbra zárt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_261.id
    },
    answer_943: {
        text: 'Középre zárt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_261.id
    },
    answer_944: {
        text: 'Sorkizárt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_261.id
    },
    answer_945: {
        text: 'Stabilabban tartja a távolságot, mint a szóközök.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_262.id
    },
    answer_946: {
        text: 'Gyorsabb a szóköznél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_262.id
    },
    answer_947: {
        text: 'Térközt is ad.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_262.id
    },
    answer_948: {
        text: 'Ritkítja a betűk közti távolságot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_262.id
    },
    answer_949: {
        text: 'Kattintok a vonalzón a margóra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_263.id
    },
    answer_950: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_263.id
    },
    answer_951: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  vessző >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_263.id
    },
    answer_952: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló helyi menün kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_263.id
    },
    answer_953: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_264.id
    },
    answer_954: {
        text: 'Bal klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_264.id
    },
    answer_955: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Nézet >> Számozás folytatása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_264.id
    },
    answer_956: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Frissítés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_264.id
    },
    answer_957: {
        text: 'fent-lent 2 - 2 cm, bal-jobb oldalon 2,5 - 2,5 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_265.id
    },
    answer_958: {
        text: 'fent-lent, bal-jobb oldalon 1,5 - 1,5 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_265.id
    },
    answer_959: {
        text: 'fent-lent, bal-jobb oldalon 3 - 3 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_265.id
    },
    answer_960: {
        text: 'fent-lent, bal-jobb oldalon 2,5 - 2,5 cm',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_265.id
    },
    answer_961: {
        text: 'Nézet menü >> Oldalszín >> Kitöltési effektusok >> Színátmenet fül >> Kétszínű >> Beállítom a színeket és Változatokat >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_266.id
    },
    answer_962: {
        text: 'Fájl menü >> Nyomtatási beállítások >> Kitöltési effektusok >> Színátmenet fül >> Kétszínű >> Beállítom a színeket és Változatokat >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_266.id
    },
    answer_963: {
        text: 'Tervezés menü >> Oldalszín >> Kitöltési effektusok >> Színátmenet fül >> Egyszínű >> Beállítom a színeket és Változatokat >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_266.id
    },
    answer_964: {
        text: 'Tervezés menü >> Oldalszín >> Kitöltési effektusok >> Színátmenet fül >> Kétszínű >> Beállítom a színeket és Változatokat >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_266.id
    },
    answer_965: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >>  a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_267.id
    },
    answer_966: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_267.id
    },
    answer_967: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Nézet >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_267.id
    },
    answer_968: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_267.id
    },
    answer_969: {
        text: 'Bal egérgombbal duplán kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_268.id
    },
    answer_970: {
        text: 'Jobbal kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_268.id
    },
    answer_1117: {
        text: 'Kezdőlap menü >> Bekezdés >> Rendezés ikon',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_305.id
    },
    answer_1118: {
        text: 'Nézet menü >> Bekezdés >> Rendezés ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_305.id
    },
    answer_971: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Nézet menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_268.id
    },
    answer_972: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Tervezés menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_268.id
    },
    answer_973: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_269.id
    },
    answer_974: {
        text: 'Beszúrás menü: Élőfej >> Élőfej hozzáadás >> Stílusok >>Térhatás Kikeresem a listából a fazettás stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_269.id
    },
    answer_975: {
        text: 'Beszúrás menü: Élőfej >> Kikeresem a listából a fazettás stílust',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_269.id
    },
    answer_976: {
        text: 'Beszúrás menü: Élőláb >> Kikeresem a listából a fazettás stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_269.id
    },
    answer_977: {
        text: 'Kattintás a fedőlapon >> Nézet menü >> Színek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_270.id
    },
    answer_978: {
        text: 'Kattintás a fedőlapon >> Nézet menü >> Színek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_270.id
    },
    answer_979: {
        text: 'Kattintás a fedőlapon >> Tervezés menü >> Témák',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_270.id
    },
    answer_980: {
        text: 'Kattintás a fedőlapon >> Fedőlap menü >> Színek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_270.id
    },
    answer_981: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása >> Stílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_271.id
    },
    answer_982: {
        text: 'Formátum menü >> Stílusok >> Új Stílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_271.id
    },
    answer_983: {
        text: 'Bal klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_271.id
    },
    answer_984: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus átnevezése  párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_271.id
    },
    answer_985: {
        text: 'Nem lehet stílust módosítani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_272.id
    },
    answer_986: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_272.id
    },
    answer_987: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Bal klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_272.id
    },
    answer_988: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Szerkesztés  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_272.id
    },
    answer_989: {
        text: 'Színeket.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_273.id
    },
    answer_990: {
        text: 'Betűszíneket. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_273.id
    },
    answer_991: {
        text: 'Margókat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_273.id
    },
    answer_992: {
        text: 'Egyszerre több stílust. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_273.id
    },
    answer_993: {
        text: 'ALT + Tab',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_274.id
    },
    answer_994: {
        text: 'ALT + Tab + Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_274.id
    },
    answer_995: {
        text: 'Alt + Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_274.id
    },
    answer_996: {
        text: 'ALT + F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_274.id
    },
    answer_997: {
        text: 'Sor vége',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_275.id
    },
    answer_998: {
        text: 'Fejezet vége',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_275.id
    },
    answer_999: {
        text: 'Oldal vége',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_275.id
    },
    answer_1000: {
        text: 'Bekezdés vége',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_275.id
    },
    answer_1001: {
        text: 'Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_276.id
    },
    answer_1002: {
        text: 'Home',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_276.id
    },
    answer_1003: {
        text: 'End',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_276.id
    },
    answer_1004: {
        text: 'CTRL',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_276.id
    },
    answer_1005: {
        text: 'CTRL + Enter',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_277.id
    },
    answer_1006: {
        text: 'Shift + Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_277.id
    },
    answer_1007: {
        text: 'CTRL + End',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_277.id
    },
    answer_1008: {
        text: 'Ctrl + F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_277.id
    },
    answer_1009: {
        text: 'Nem lehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_278.id
    },
    answer_1010: {
        text: 'Táblázat szegélyekkel teszem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_278.id
    },
    answer_1011: {
        text: 'Szerkesztés >> Rácsvonalak',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_278.id
    },
    answer_1012: {
        text: 'Nézet menü >> Megjelenítés >> Rácsvonalak',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_278.id
    },
    answer_1013: {
        text: 'F1',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_279.id
    },
    answer_1014: {
        text: 'Jobb kattintás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_279.id
    },
    answer_1015: {
        text: 'Dupla jobb kattintás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_279.id
    },
    answer_1016: {
        text: 'Bal kattintás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_279.id
    },
    answer_1017: {
        text: 'Ctrl',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_280.id
    },
    answer_1018: {
        text: 'Alt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_280.id
    },
    answer_1019: {
        text: 'Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_280.id
    },
    answer_1020: {
        text: 'Tab',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_280.id
    },
    answer_1021: {
        text: 'Nyomtatási kép',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_281.id
    },
    answer_1022: {
        text: 'Nyomtatási elrendezés',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_281.id
    },
    answer_1023: {
        text: 'Webes nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_281.id
    },
    answer_1024: {
        text: 'Olvasómód',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_281.id
    },
    answer_1025: {
        text: '215%',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_282.id
    },
    answer_1026: {
        text: 'Oldal szélessége',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_282.id
    },
    answer_1027: {
        text: 'Szöveg szélessége',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_282.id
    },
    answer_1028: {
        text: 'Több oldal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_282.id
    },
    answer_1029: {
        text: 'Kezdőlap >> Bekezdés >> Minden látszik',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_283.id
    },
    answer_1030: {
        text: 'Nézet >> Bekezdés >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_283.id
    },
    answer_1031: {
        text: 'Nézet >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_283.id
    },
    answer_1032: {
        text: 'Kezdőlap >> Bekezdés >> Nagyítás >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_283.id
    },
    answer_1033: {
        text: 'Kezdőlap menü >> Ablak >> Felosztás megszüntetése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_284.id
    },
    answer_1034: {
        text: 'Kezdőlap menü >> Megjelenítés >> Webes nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_284.id
    },
    answer_1035: {
        text: 'Nézet menü >> Ablak >> Felosztás megszüntetése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_284.id
    },
    answer_1036: {
        text: 'Nézet menü >> Megjelenítés >> Webes nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_284.id
    },
    answer_1037: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom a Del billentyűt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_285.id
    },
    answer_1038: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom a * billentyűt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_285.id
    },
    answer_1039: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom az F5 billentyűt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_285.id
    },
    answer_1040: {
        text: 'A kijelölés előtt lenyomom, és a kijelölés alatt lenyomva is tartom az Alt billentyűt.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_285.id
    },
    answer_1041: {
        text: 'CTRL + Z',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_286.id
    },
    answer_1042: {
        text: 'CTRL + X',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_286.id
    },
    answer_1043: {
        text: 'CTRL + V',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_286.id
    },
    answer_1044: {
        text: 'CTRL + C',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_286.id
    },
    answer_1045: {
        text: '1',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_287.id
    },
    answer_1046: {
        text: '2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_287.id
    },
    answer_1047: {
        text: '3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_287.id
    },
    answer_1048: {
        text: '4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_287.id
    },
    answer_1049: {
        text: 'Kezdőlap menü >> Nézet >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_288.id
    },
    answer_1050: {
        text: 'CTRL + H >> Vágólap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_288.id
    },
    answer_1051: {
        text: 'CTRL + H >> Vágólap',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_288.id
    },
    answer_1052: {
        text: 'Formátum menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_288.id
    },
    answer_1053: {
        text: 'Ecset. Kezdőlap menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_289.id
    },
    answer_1054: {
        text: 'Ecset. Nézet menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_289.id
    },
    answer_1055: {
        text: 'CD-t ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_289.id
    },
    answer_1056: {
        text: 'Tollat ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_289.id
    },
    answer_1057: {
        text: 'Fájlméretet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_290.id
    },
    answer_1058: {
        text: 'Sávszélességet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_290.id
    },
    answer_1059: {
        text: 'Időt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_290.id
    },
    answer_1060: {
        text: 'Lapméretet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_290.id
    },
    answer_1061: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_291.id
    },
    answer_1062: {
        text: 'Véleményezés menü >> Új megjegyzés >> Az oldal jobb szélén jelenik meg a megjegyzés, amire lehet kommentelni, válaszolni.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_291.id
    },
    answer_1063: {
        text: 'Véleményezés menü >> Korrektúra >> Új korrektúra.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_291.id
    },
    answer_1064: {
        text: 'A mentésnél lehet megjegyzést beírni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_291.id
    },
    answer_1119: {
        text: 'Kezdőlap menü >> Adatok >> Bekezdés >> Rendezés ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_305.id
    },
    answer_1121: {
        text: 'Ctrl + Enter',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_306.id
    },
    answer_1065: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Bal oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_292.id
    },
    answer_1066: {
        text: 'Nem lehet ilyet beállítani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_292.id
    },
    answer_1067: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_292.id
    },
    answer_1068: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Formázás >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_292.id
    },
    answer_1069: {
        text: 'Mentés másként >> Egyebek >> Pitypang >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_293.id
    },
    answer_1070: {
        text: 'Fájl menü >> Információ >> Dokumentumvédelem >> Titkosítás jelszóval >> A párbeszédbalakon bírom és megerősítem a jelszót: "pitypang".  >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_293.id
    },
    answer_1071: {
        text: 'Fájl menü >> Adatvédelem >> Információ >> Titkosítás jelszóval >> A párbeszédbalakon bírom és megerősítem a jelszót: "pitypang".  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_293.id
    },
    answer_1072: {
        text: 'Nem lehet ilyet beállítani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_293.id
    },
    answer_1073: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_294.id
    },
    answer_1074: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >>  Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_294.id
    },
    answer_1075: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szín a listából: piros >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_294.id
    },
    answer_1076: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok;  >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_294.id
    },
    answer_1077: {
        text: 'Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_295.id
    },
    answer_1078: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_295.id
    },
    answer_1079: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >>  A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_295.id
    },
    answer_1080: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Ellenőrzés >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_295.id
    },
    answer_1081: {
        text: 'Ctrl + H >> A párbeszédablakba beírom, hogy: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_296.id
    },
    answer_1082: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_296.id
    },
    answer_1083: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_296.id
    },
    answer_1084: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >> Egyebek >> Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_296.id
    },
    answer_1085: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_297.id
    },
    answer_1086: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "apple" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_297.id
    },
    answer_1087: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_297.id
    },
    answer_1088: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "alma" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_297.id
    },
    answer_1089: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_298.id
    },
    answer_1090: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Formátum >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_298.id
    },
    answer_1091: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_298.id
    },
    answer_1092: {
        text: 'Kijelölhetjük a szükséges területett, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Bekezdés >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >>Az összes cseréje >> Szükség esetén ismétlem. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_298.id
    },
    answer_1093: {
        text: 'Manuálisan kell elválasztani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_299.id
    },
    answer_1094: {
        text: 'Kijelelöm az elválasztás tartományát. >> Tervezés menü >> Elválasztás >> Automatikus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_299.id
    },
    answer_1095: {
        text: 'Kijelelöm az elválasztás tartományát. >> Elrendezés menü >> Elválasztás >> Automatikus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_299.id
    },
    answer_1096: {
        text: 'Kijelelöm az elválasztás tartományát. >> Szerkesztés menü >> Elválasztás >> Automatikus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_299.id
    },
    answer_1097: {
        text: 'Minden hibát észrevesz a Word helyesírásellenőrzője.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_300.id
    },
    answer_1098: {
        text: 'A Word helyesírásellenőrzője jó megoldást is jelezhet hibának.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_300.id
    },
    answer_1099: {
        text: 'A helyesírási hibákat piros aláhúzással jelöli a Word.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_300.id
    },
    answer_1100: {
        text: 'A Word helyesírásellenőrzője a Véleményezés menüből érhető el.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_300.id
    },
    answer_1101: {
        text: 'Kihagyás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_301.id
    },
    answer_1102: {
        text: 'Az összes kihagyása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_301.id
    },
    answer_1103: {
        text: 'Felvétel a szótárba',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_301.id
    },
    answer_1104: {
        text: 'Szótár frissítése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_301.id
    },
    answer_1105: {
        text: 'Fájl menü >> Egyebek >> Beállítások >> A Word beállításai párbeszédablak >> Nyelvi ellenőrzés >> Automatikus javítási beállítások >> A párbeszédablakon az Automatikus javítás fül >> Itt tudom beállítani, hogy mit mire javítson.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_302.id
    },
    answer_1106: {
        text: 'Shift + F9',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_302.id
    },
    answer_1107: {
        text: 'Fájl menü >> Véleményezés >> Beállítások >> A Word beállításai párbeszédablak >> Nyelvi ellenőrzés >> Automatikus javítási beállítások >> A párbeszédablakon az Automatikus javítás fül >> Itt tudom beállítani, hogy mit mire javítson.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_302.id
    },
    answer_1108: {
        text: 'Fájl menü >> Egyebek >> Beállítások >> Automatikus javítási beállítások >> A párbeszédablakon az Automatikus javítás fül >> Itt tudom beállítani, hogy mit mire javítson.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_302.id
    },
    answer_1109: {
        text: 'Shift + F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_303.id
    },
    answer_1110: {
        text: 'Shift + F5',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_303.id
    },
    answer_1111: {
        text: 'Shift + F6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_303.id
    },
    answer_1112: {
        text: 'Shift + F7',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_303.id
    },
    answer_1113: {
        text: 'Ctrl + V',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_304.id
    },
    answer_1114: {
        text: 'Beszúrás menü >> Kész szöveg',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_304.id
    },
    answer_1115: {
        text: 'Beszúrás menü >> Szövegdoboz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_304.id
    },
    answer_1125: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_307.id
    },
    answer_1126: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_307.id
    },
    answer_1127: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kipipálom az azonos hasábszélességet, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_307.id
    },
    answer_1128: {
        text: '(A hasábokon kívűl kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_307.id
    },
    answer_1129: {
        text: 'Jobb klikk a menüszalagon az adott sílusra és "Módosítás".',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_308.id
    },
    answer_1130: {
        text: 'Bal klikk a menüszalagon az adott sílusra és "Módosítás".',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_308.id
    },
    answer_1131: {
        text: 'Jobb klikk a helyi menüben az adott sílusra és "Módosítás".',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_308.id
    },
    answer_1132: {
        text: 'Jobb klikk a menüszalagon az adott sílusra és "Szerkesztés".',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_308.id
    },
    answer_1133: {
        text: 'Formátum és betűtípus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_309.id
    },
    answer_1134: {
        text: 'Adatok rendezése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_309.id
    },
    answer_1135: {
        text: 'Címsorszámozás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_309.id
    },
    answer_1136: {
        text: 'Felsorolás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_309.id
    },
    answer_1137: {
        text: 'Hivatkozások menü >> Bejegyzés megjelölése a Tárgymuatató részen >> A párbeszédbalakon Megjelölés, vagy Az összes megjelelölése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_310.id
    },
    answer_1138: {
        text: 'Kijelölölöm a szót >> Hivatkozások menü >> A párbeszédbalakon Megjelölés, vagy Az összes megjelelölése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_310.id
    },
    answer_1139: {
        text: 'Kijelölölöm a szót >> Hivatkozások menü >> Bejegyzés megjelölése a Tárgymutatató részen >> A párbeszédbalakon: Hozzáadás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_310.id
    },
    answer_1140: {
        text: 'Kijelölölöm a szót >> Hivatkozások menü >> Bejegyzés megjelölése a Tárgymutatató részen >> A párbeszédbalakon Megjelölés, vagy Az összes megjelelölése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_310.id
    },
    answer_1141: {
        text: 'Hivatkozások menü >>  A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_311.id
    },
    answer_1142: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_311.id
    },
    answer_1143: {
        text: 'Hivatkozások menü >> Végjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_311.id
    },
    answer_1144: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_311.id
    },
    answer_1145: {
        text: '0-10',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_312.id
    },
    answer_1146: {
        text: '11-12',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_312.id
    },
    answer_1147: {
        text: '12-14',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_312.id
    },
    answer_1148: {
        text: '14-16',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_312.id
    },
    answer_1149: {
        text: 'Gyorselérési eszköztár',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_313.id
    },
    answer_1150: {
        text: 'Beszúrás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_313.id
    },
    answer_1151: {
        text: 'Nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_313.id
    },
    answer_1152: {
        text: 'Ha nincs a menüszalagon, akkor Fájl >> (Egyebek >>) Beállítások >> Menüszalag testreszabása',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_313.id
    },
    answer_1153: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_314.id
    },
    answer_1154: {
        text: 'Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_314.id
    },
    answer_1155: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_314.id
    },
    answer_1156: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Formátumra kattintva a lenyíló párbeszédablakban testreszabom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_314.id
    },
    answer_1157: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket fizetés után beszúrhatok a dokumentumomba.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_315.id
    },
    answer_1158: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket beszúrhatok a dokumentumomba.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_315.id
    },
    answer_1159: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket beszúrhatok a dokumentumomba.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_315.id
    },
    answer_1160: {
        text: 'A Microsoft beépített, szabadon felhasználható képei, amiket beszúrhatok a dokumentumomba, de nem méretezhetem át őket.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_315.id
    },
    answer_1161: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_316.id
    },
    answer_1162: {
        text: 'Az alakzatra kattintok, majd a Beszúrás menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_316.id
    },
    answer_1163: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Stockképek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_316.id
    },
    answer_1164: {
        text: 'Az alakzatra kattintok, majd az Alakzat beszúrása menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_316.id
    },
    answer_1165: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_317.id
    },
    answer_1166: {
        text: 'Csak a körvonalat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_317.id
    },
    answer_1167: {
        text: 'Csak a kitöltést.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_317.id
    },
    answer_1168: {
        text: 'A körvonalat és a kitöltést is.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_317.id
    },
    answer_1169: {
        text: 'Kattintsunk a beszúrás menüre!',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_318.id
    },
    answer_1170: {
        text: 'Válasszuk ki a nekünk kellő aktív ablakot!',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_318.id
    },
    answer_1171: {
        text: 'Válasszuk ki a menün a Képenyőkép lehetőséget!',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_318.id
    },
    answer_1172: {
        text: 'A beszúrni kívánt ablakot tegyük le a tálcára!',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_318.id
    },
    answer_1173: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_319.id
    },
    answer_1174: {
        text: 'Új diagramot kell szerkesztenem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_319.id
    },
    answer_1175: {
        text: 'Kijelölöm a diagramot >> Adatok szerkesztése menü a menüszalagon >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_319.id
    },
    answer_1176: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló PowerPoint-alapú táblázatban pedig szerkeszthetem az adatokat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_319.id
    },
    answer_1177: {
        text: 'Kattintok az ábrán, majd a lenyíló párbeszédablakban adhatom meg az új adatokat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_320.id
    },
    answer_1178: {
        text: 'A nézet menüben állíthatom át a körvonalakat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_320.id
    },
    answer_1179: {
        text: 'Kattintok az ábrán és a menüszalagon megjelenik a SmartArt-terv menü. Ebben.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_320.id
    },
    answer_1180: {
        text: 'Nem lehet szerkeszteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_320.id
    },
    answer_1181: {
        text: 'Photoshoppal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_321.id
    },
    answer_1182: {
        text: 'Kattintok a képen >> Képmetsző menü >> A menüszalagon megjelenik a Háttér eltávolítása menü >> Ott az F1 gombbal a  "Megtartandó területek megjelölése" és az "Eltávolítandó területek megjelölése" lehetőségekkel szerkesztem a képet >> A végén: Módosítások megtartása.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_321.id
    },
    answer_1274: {
        text: 'A képre a jobb egérgombbal kattintok és azt lenyomva tartva húzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_344.id
    },
    answer_1183: {
        text: 'Kattintok a képen >> Képformátum menü >> A menüszalagon megjelenik a Háttér eltávolítása menü >> Ott a Szerkesztés lehetőséggel szerkesztem a képet >> A végén: Módosítások megtartása.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_321.id
    },
    answer_1184: {
        text: 'Kattintok a képen >> Képformátum menü >> A menüszalagon megjelenik a Háttér eltávolítása menü >> Ott a "Megtartandó területek megjelölése" és az "Eltávolítandó területek megjelölése" lehetőségekkel szerkesztem a képet >> A végén: Módosítások megtartása.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_321.id
    },
    answer_1185: {
        text: 'Nézet >> Szín >> Szépiaszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_322.id
    },
    answer_1186: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépiaszín',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_322.id
    },
    answer_1187: {
        text: 'Kattintok a kép mellé >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépiaszín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_322.id
    },
    answer_1188: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> RGB: 255',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_322.id
    },
    answer_1189: {
        text: 'Jobb klikk az alakzaton >> Szerkesztés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_323.id
    },
    answer_1190: {
        text: 'Jobb klikk az alakzaton >> Alakzat formázása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_323.id
    },
    answer_1191: {
        text: 'Jobb klikk az alakzaton >> Csomópontok szerkesztése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_323.id
    },
    answer_1192: {
        text: 'Ezt nem lehet szerkeszteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_323.id
    },
    answer_1193: {
        text: 'Egy makró.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_324.id
    },
    answer_1194: {
        text: 'Egy látványos szövegrész, amit beszúrhatunk a szövegbe és formázhatunk.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_324.id
    },
    answer_1195: {
        text: 'Egy képaláírás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_324.id
    },
    answer_1196: {
        text: 'Egy Iniciálé',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_324.id
    },
    answer_1197: {
        text: 'Kattintok a képfájlon és a menüszalagon megjelenik az Alakzat formátuma menü, ahol mindent beállíthatok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_325.id
    },
    answer_1198: {
        text: 'Ha már beszúrtam, legfeljebb törölhetem, vagy visszavonhatom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_325.id
    },
    answer_1199: {
        text: 'Jobbal a WordArton és a hely menün a nézetre A párbeszédablakban mindent beállíthatok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_325.id
    },
    answer_1200: {
        text: 'Kattintok az ábrán és a menüszalagon megjelenik az Alakzat formátuma menü, ahol mindent beállíthatok.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_325.id
    },
    answer_1201: {
        text: 'Arial',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_326.id
    },
    answer_1202: {
        text: 'Tahoma',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_326.id
    },
    answer_1203: {
        text: 'Wingdings',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_326.id
    },
    answer_1204: {
        text: 'Courgette',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_326.id
    },
    answer_1205: {
        text: 'Beszúrás menü >> Egyenlet >> Megjelenik az egyenlet menü a menüszalagon >>  Baloldalt >> Szabadkézi egyenlet',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_327.id
    },
    answer_1206: {
        text: 'Beszúrás >> Kézi bevitel >> Szabadkézi egyenlet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_327.id
    },
    answer_1207: {
        text: 'Beszúrás >> Szabadkézi bevitel >> Szabadkézi egyenlet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_327.id
    },
    answer_1208: {
        text: 'Kezdőlap menü >> Lenyitom az Egyenlet ikont >> Megjelenik a lista alján a Szabadkézi egyenlet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_327.id
    },
    answer_1209: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_328.id
    },
    answer_1210: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és hagyjuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_328.id
    },
    answer_1211: {
        text: 'Beszúrás menü >> Dátum és idő >> A legördülő listán állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_328.id
    },
    answer_1212: {
        text: 'Dátum menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_328.id
    },
    answer_1213: {
        text: 'Törlöm a margót.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_329.id
    },
    answer_1214: {
        text: 'Ctrl + A majd Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_329.id
    },
    answer_1215: {
        text: 'Törlöm a betűt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_329.id
    },
    answer_1216: {
        text: 'Kattintok az iniciálén >> Beszúrás menü >> Inicálé >> Nincs',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_329.id
    },
    answer_1217: {
        text: '10 x 10 cella',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_330.id
    },
    answer_1218: {
        text: '100 x 10 cella',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_330.id
    },
    answer_1219: {
        text: '8 x 8 cella',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_330.id
    },
    answer_1220: {
        text: '10 x 8 cella',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_330.id
    },
    answer_1221: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_331.id
    },
    answer_1222: {
        text: 'Kijelölöm az egyesíteni kívánt cellákat és Ctrl + U',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_331.id
    },
    answer_1223: {
        text: 'Kijelölöm az egyesíteni kívánt cellákat, és az Elrendezés menün a Cellák egyesítése opciót választom.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_331.id
    },
    answer_1224: {
        text: 'Kijelölöm az egyesíteni kívánt cellákat, Ctrl + n, és az Elrendezés menün Cellák egyesítése opciót választom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_331.id
    },
    answer_1225: {
        text: 'Kattintok egy cellán, majd Delete gomb',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_332.id
    },
    answer_1226: {
        text: 'Jobb klikk a táblázatra >> a menüszalagon: Törlés >> Táblázat törlése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_332.id
    },
    answer_1227: {
        text: 'Jobb klikk a táblázatra >> a helyi menün: Törlés >> Táblázat törlése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_332.id
    },
    answer_1228: {
        text: 'Jobb klikk a táblázatra >> Alt + Ctrl + Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_332.id
    },
    answer_1229: {
        text: '1 tabulátor volt az "alma" szó előtt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_333.id
    },
    answer_1230: {
        text: '2 tabulátor volt az "alma" szó előtt.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_333.id
    },
    answer_1231: {
        text: '2 szóköz volt az "alma" szó előtt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_333.id
    },
    answer_1232: {
        text: '1 szóköz volt az "alma" szó előtt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_333.id
    },
    answer_1233: {
        text: ' kb. több tucat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_334.id
    },
    answer_1234: {
        text: 'kb. több millió',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_334.id
    },
    answer_1235: {
        text: 'kb. több ezer',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_334.id
    },
    answer_1236: {
        text: 'kb. több százezer',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_334.id
    },
    answer_1237: {
        text: '"=SZUM"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_335.id
    },
    answer_1238: {
        text: '"SUM"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_335.id
    },
    answer_1239: {
        text: '"=RESULT"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_335.id
    },
    answer_1240: {
        text: '"=SUM(ABOVE)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_335.id
    },
    answer_1241: {
        text: 'Fájlméretet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_336.id
    },
    answer_1242: {
        text: 'Hogy a használni kívánt nyomtató és festék alkamas-e a célra.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_336.id
    },
    answer_1243: {
        text: 'Háttérszínt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_336.id
    },
    answer_1244: {
        text: 'Lapméretet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_336.id
    },
    answer_1245: {
        text: 'Nagy legyen.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_337.id
    },
    answer_1246: {
        text: 'Kicsi legyen.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_337.id
    },
    answer_1247: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_337.id
    },
    answer_1248: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_337.id
    },
    answer_1249: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_338.id
    },
    answer_1250: {
        text: 'Nézet menü >> Színek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_338.id
    },
    answer_1251: {
        text: 'Helyi menü >> Színek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_338.id
    },
    answer_1252: {
        text: 'Tervezés menü >> Színek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_338.id
    },
    answer_1253: {
        text: 'pdf-ként',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_339.id
    },
    answer_1254: {
        text: 'sablonként',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_339.id
    },
    answer_1255: {
        text: 'preziként',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_339.id
    },
    answer_1256: {
        text: 'fejlécként',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_339.id
    },
    answer_1257: {
        text: 'Szimpla: 1',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_340.id
    },
    answer_1258: {
        text: '1,15',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_340.id
    },
    answer_1259: {
        text: '1,5',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_340.id
    },
    answer_1260: {
        text: '2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_340.id
    },
    answer_1261: {
        text: 'Minden levél külön fájl lesz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_341.id
    },
    answer_1262: {
        text: 'Megmarad egy sablon külön, maguk a körlevelek alapértelmezetten Levél1 néven, vagy Levél2 stb. néven menthetőek el.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_341.id
    },
    answer_1263: {
        text: 'A körlevelek alapértelmezetten Levél1 néven, vagy Levél2 stb. néven menthetőek el. A sablon automatikusan törlődik.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_341.id
    },
    answer_1264: {
        text: 'Megmarad egy sablon külön, maguk a körlevelek alapértelmezetten Körlevél1 néven, vagy Körlevél2 stb. néven menthetőek el.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_341.id
    },
    answer_1265: {
        text: 'Rekordok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_342.id
    },
    answer_1266: {
        text: 'Mező',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_342.id
    },
    answer_1267: {
        text: 'Adatok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_342.id
    },
    answer_1268: {
        text: 'Adatmező',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_342.id
    },
    answer_1269: {
        text: 'Egyszerre csak 10 sort mutat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_343.id
    },
    answer_1270: {
        text: 'Makrót futtat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_343.id
    },
    answer_1271: {
        text: 'Színes stílus és gyors rendezés, valamint táblázatszintű műveletek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_343.id
    },
    answer_1272: {
        text: 'Kevesebb adatot mutat, így átláthatóbb',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_343.id
    },
    answer_1273: {
        text: 'A képre a jobb egérgombbal kattintok és elhúzom oda a képet ahová akarom, és a végén felengedem az egérgombot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_344.id
    },
    answer_1277: {
        text: 'Jobb klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_345.id
    },
    answer_1278: {
        text: 'Bal klikk a képre >> Kép / Ábra formázása >> Bal oldali szürke munkaablak: Kép / Ábra formázása >> Kitöltés >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_345.id
    },
    answer_1279: {
        text: 'Jobb klikk a képre >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_345.id
    },
    answer_1280: {
        text: 'Nem lehet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_345.id
    },
    answer_1281: {
        text: '1',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_346.id
    },
    answer_1282: {
        text: '2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_346.id
    },
    answer_1283: {
        text: '3',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_346.id
    },
    answer_1284: {
        text: '4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_346.id
    },
    answer_1285: {
        text: 'Bal oldalon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_347.id
    },
    answer_1286: {
        text: 'Jobb klikk a képre és a helyi menü alatt, a Stílus mellett jobbra van a körülvágás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_347.id
    },
    answer_1287: {
        text: 'Jobb klikk a képre és a helyi menü közepén van a körülvágás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_347.id
    },
    answer_1288: {
        text: 'Jobb klikk a képre és a helyi menü felett, a Stílus mellett jobbra van a körülvágás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_347.id
    },
    answer_1289: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_348.id
    },
    answer_1290: {
        text: 'A kontraszt állításával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_348.id
    },
    answer_1291: {
        text: 'A Formátum menüben van erre mód',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_348.id
    },
    answer_1292: {
        text: 'A Képformátum menüben van erre mód',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_348.id
    },
    answer_1293: {
        text: 'Nyilat szaggatott vonalból',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_349.id
    },
    answer_1294: {
        text: 'Nyilat szaggatott vonalból árnyékkal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_349.id
    },
    answer_1295: {
        text: 'Nyilat szaggatott vonalból árnyékkal és tükrözve',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_349.id
    },
    answer_1297: {
        text: 'Sárga villám alakzatot',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_350.id
    },
    answer_1298: {
        text: 'Sárga villám alakzatot fekete körvonallal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_350.id
    },
    answer_1299: {
        text: 'Sárga villám alakzatot fekete körvonallal, és tükrözve',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_350.id
    },
    answer_1300: {
        text: 'Mindegyiket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_350.id
    },
    answer_1301: {
        text: 'Igen. A WordArt-ra jobb egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_351.id
    },
    answer_1302: {
        text: 'Igen. A WordArt-ra duplán a bal egérgombbal kattintok >> Alakzat formázása >>  Bal oldalon: Szövegbeállítások >> Szöveg kitöltése és körvonala >> Kitöltés képpel vagy anyagmintával',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_351.id
    },
    answer_1303: {
        text: 'Igen. A WordArt jobb egérgombbal kattintok >> Beszúrás >> Kép',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_351.id
    },
    answer_1304: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_351.id
    },
    answer_1305: {
        text: '4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_352.id
    },
    answer_1306: {
        text: '6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_352.id
    },
    answer_1307: {
        text: '8',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_352.id
    },
    answer_1308: {
        text: '10',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_352.id
    },
    answer_1309: {
        text: 'Sehogy',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_353.id
    },
    answer_1310: {
        text: 'Beszúrás >> Szimbólum',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_353.id
    },
    answer_1311: {
        text: 'AltGr+I billentyűkombináció',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_353.id
    },
    answer_1312: {
        text: 'Jobb klikk és AltGr',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_353.id
    },
    answer_1313: {
        text: 'Kezdőlap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_354.id
    },
    answer_1314: {
        text: 'Formátum',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_354.id
    },
    answer_1315: {
        text: 'Beszúrás >> Egyenlet >> Szabadkézi egyenlet',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_354.id
    },
    answer_1316: {
        text: 'Képletek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_354.id
    },
    answer_1296: {
        text: 'Mindegyiket',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_349.id
    },
    answer_1317: {
        text: 'Kezdőlap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_355.id
    },
    answer_1318: {
        text: 'Beszúrás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_355.id
    },
    answer_1319: {
        text: 'Adatok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_355.id
    },
    answer_1320: {
        text: 'Képletek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_355.id
    },
    answer_1321: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és jobb egérgombbal leokézom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_356.id
    },
    answer_1322: {
        text: 'Kijelölöm a táblázatot >> Adatokeszközök menü >> Ismétlődések eltávolítása >> és leokézom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_356.id
    },
    answer_1323: {
        text: 'Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_356.id
    },
    answer_1324: {
        text: 'Kijelölöm a táblázatot >> Adatok menü >> Ismétlődések eltávolítása >> kijelölöm a párbeszédablakon mindhárom oszlopot és leokézom',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_356.id
    },
    answer_1325: {
        text: 'Ha védem a táblázatot az adatvesztéstől',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_357.id
    },
    answer_1326: {
        text: 'Ha többen használunk egy táblázatot, és el akarom kerülni a hibákat',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_357.id
    },
    answer_1327: {
        text: 'Ha színesebb a táblázat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_357.id
    },
    answer_1328: {
        text: 'Ha makrókat tiltok le vele',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_357.id
    },
    answer_1329: {
        text: 'Katt a C1 cellára >> Adatok a menüszalagon >> Adatérvényesítés >> Megengedve >> Lista >> Forrás: C1:C10 >> OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_358.id
    },
    answer_1330: {
        text: 'Katt a B1 cellára >> Adatérvényesítés >> Megengedve >> Lista >> Forrás: C1:C10 >> OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_358.id
    },
    answer_1331: {
        text: 'Katt a B1 cellára >> Adatok a menüszalagon >> Adatérvényesítés >> Megengedve >> Lista >> Forrás: C1:C10 >> OK',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_358.id
    },
    answer_1332: {
        text: 'Katt a B1 cellára >> Adatok a menüszalagon >> Adatérvényesítés >> Feltételes formázás >> Lista >> Forrás: C1:C10 >> OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_358.id
    },
    answer_1333: {
        text: 'Megengedve >> Szöveghossz >> minimum 0; maximum 6',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_359.id
    },
    answer_1334: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_359.id
    },
    answer_1335: {
        text: 'Lista  >> Szöveghossz >> minimum 0; maximum 7',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_359.id
    },
    answer_1336: {
        text: 'Megengedve >> Szöveghossz >> minimum 5; maximum 6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_359.id
    },
    answer_1337: {
        text: 'Nem lehet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_360.id
    },
    answer_1338: {
        text: 'Formátum',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_360.id
    },
    answer_1339: {
        text: 'Adatok érvényesítése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_360.id
    },
    answer_1340: {
        text: 'Adatok érvényesítése >> Hibajelzés fül',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_360.id
    },
    answer_1341: {
        text: 'A THM: a B2 cella',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_361.id
    },
    answer_1342: {
        text: 'A hónap: a B4 cella. Fix hivatkozással: $B$3',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_361.id
    },
    answer_1343: {
        text: 'A hónap: a B3 cella',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_361.id
    },
    answer_1344: {
        text: 'A THM: a B2 cella Fix hivatkozással: $B$2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_361.id
    },
    answer_1345: {
        text: 'Mert ha tagolva van és nem szám a formátum, akkor a tagolást szóköznek veszi az Excel és nem fog tudni számolni.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_362.id
    },
    answer_1346: {
        text: 'Mert így kevesebb lesz az adat, amit át kell konvertálni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_362.id
    },
    answer_1347: {
        text: 'Nem kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_362.id
    },
    answer_1348: {
        text: 'Mert tizedes törtet nem tud átkonvertálni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_362.id
    },
    answer_1349: {
        text: 'ACII',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_363.id
    },
    answer_1350: {
        text: 'UTF8',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_363.id
    },
    answer_1351: {
        text: '1250',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_363.id
    },
    answer_1352: {
        text: 'Európai/Magyar',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_363.id
    },
    answer_1353: {
        text: 'Semmi hiba nem történik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_364.id
    },
    answer_1354: {
        text: 'Üres cellákat kapok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_364.id
    },
    answer_1355: {
        text: 'Mindent kétszer ír ki',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_364.id
    },
    answer_1356: {
        text: 'Az Excel az egész táblázatot átmásolja szűrés helyett.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_364.id
    },
    answer_1357: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak elrejti',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_365.id
    },
    answer_1358: {
        text: 'Áttekinthetőbb lesz a táblázat, a felesleges adatokat törli az Excel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_365.id
    },
    answer_1359: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak másik munkalapra menti',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_365.id
    },
    answer_1360: {
        text: 'Az Excel a kiszűrt adatokat törli',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_365.id
    },
    answer_1361: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Első 10 Százalék',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_366.id
    },
    answer_1362: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Első 10 Százalék',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_366.id
    },
    answer_1363: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Számszűrők >> Toplista >> Megjelenítendő: Első 10 Tétel',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_366.id
    },
    answer_1364: {
        text: 'Az oszlop tetején a szűrő jelére kattintva lenyitom a menüt >> Toplista >> Megjelenítendő: Első 10 Tétel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_366.id
    },
    answer_1471: {
        text: 'CTRL + D',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_400.id
    },
    answer_1472: {
        text: 'F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_400.id
    },
    answer_1365: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: CÉGNÉV és RENDELÉS ÖSSZEGE',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_367.id
    },
    answer_1366: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_367.id
    },
    answer_1367: {
        text: 'Csoportosítási alap: RENDELÉS ÖSSZEGE; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS IDŐPONTJA',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_367.id
    },
    answer_1368: {
        text: 'Csoportosítási alap: RENDELÉS IDŐPONTJA; Melyik függvénnyel: ÖSSZEG és Összegzendő oszlopok: RENDELÉS ÖSSZEGE',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_367.id
    },
    answer_1369: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_368.id
    },
    answer_1370: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_368.id
    },
    answer_1371: {
        text: 'Igen, de csak oszlopokból',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_368.id
    },
    answer_1372: {
        text: 'Igen, maximum 3 különálló sorból',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_368.id
    },
    answer_1393: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_381.id
    },
    answer_1394: {
        text: 'Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_381.id
    },
    answer_1395: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Oldalak >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_381.id
    },
    answer_1396: {
        text: 'Kijelölöm a nyomtatni kívánt részt >> Nyomtatás >> Beállítások >> Kijelölt terület >> és végül katt a nyomtató ikonon.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_381.id
    },
    answer_1397: {
        text: 'Bal felső',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_382.id
    },
    answer_1398: {
        text: 'Bal alsó',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_382.id
    },
    answer_1399: {
        text: 'Jobb alsó',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_382.id
    },
    answer_1400: {
        text: 'Jobb felső',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_382.id
    },
    answer_1401: {
        text: 'Beírom, hogy "hatvány"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_383.id
    },
    answer_1402: {
        text: 'Beírom, hogy "*"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_383.id
    },
    answer_1403: {
        text: 'Beírom, hogy "^"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_383.id
    },
    answer_1404: {
        text: 'Beírom, hogy "X"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_383.id
    },
    answer_1405: {
        text: '"B4*B5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_384.id
    },
    answer_1406: {
        text: '"B4 * B5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_384.id
    },
    answer_1407: {
        text: '"=B4XB5"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_384.id
    },
    answer_1408: {
        text: '"=B4*B5"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_384.id
    },
    answer_1409: {
        text: 'Alt+3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_385.id
    },
    answer_1410: {
        text: 'AltGr+3',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_385.id
    },
    answer_1411: {
        text: 'Ctrl+3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_385.id
    },
    answer_1412: {
        text: 'AltGr+Ctrl',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_385.id
    },
    answer_1413: {
        text: 'A számok közé Entert ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_386.id
    },
    answer_1414: {
        text: 'A számok közé szóközt ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_386.id
    },
    answer_1415: {
        text: 'Kezdőlap >> Szám >> Ezres tagolás (3 nulla a jele a menüszalagon)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_386.id
    },
    answer_1416: {
        text: 'A számok közé Tab-ot ütök',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_386.id
    },
    answer_1417: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 3 és 3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_387.id
    },
    answer_1418: {
        text: 'Formátum >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_387.id
    },
    answer_1419: {
        text: ' Feltételes formázás >> Kezdőlap >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_387.id
    },
    answer_1420: {
        text: 'Kezdőlap >> Feltételes formázás >> Cellakiemelési szabályok >> Két érték között >> A párbeszédablakban beállítom, hogy: 2 és 4',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_387.id
    },
    answer_1421: {
        text: 'Az adattartományra kattintok, majd a Kezdőlap menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_388.id
    },
    answer_1422: {
        text: 'Az adattartományra kattintok, majd a Adatok menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_388.id
    },
    answer_1423: {
        text: 'Az adattartományra kattintok, majd a Nézet menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_388.id
    },
    answer_1424: {
        text: 'Az adattartományra kattintok, majd a Képletek menün a Stílusoknál a Formázás táblázatként ikonnál kiválasztom a nekem megfelelő stílust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_388.id
    },
    answer_1425: {
        text: '"=ÁTLAG(B2:B20)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_389.id
    },
    answer_1426: {
        text: '"ÁTLAG(B2:B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_389.id
    },
    answer_1427: {
        text: '"=ÁTLAG(B2;B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_389.id
    },
    answer_1428: {
        text: '"=ÁTLAG(B2 B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_389.id
    },
    answer_1429: {
        text: '"DARABTELI(B2:B20;2)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_390.id
    },
    answer_1430: {
        text: '"=DARABTELI(B2:B20;5)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_390.id
    },
    answer_1431: {
        text: '"=DARABTELI(2;B2:B20)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_390.id
    },
    answer_1432: {
        text: '"=DARABTELI(B2:B20;2)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_390.id
    },
    answer_1433: {
        text: '"=HA(A1=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_391.id
    },
    answer_1434: {
        text: '"=HA(B2=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_391.id
    },
    answer_1435: {
        text: '"=HAA1(B2=0;"TEA";"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_391.id
    },
    answer_1436: {
        text: '"=HA(A1=0;"TEA";VAGY,"KÁVÉ)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_391.id
    },
    answer_1437: {
        text: 'JÓ, ROSSZ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_392.id
    },
    answer_1438: {
        text: 'OK, NEM OK',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_392.id
    },
    answer_1439: {
        text: 'IGAZ, HAMIS',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_392.id
    },
    answer_1440: {
        text: 'Nincs kimeneti üzenete',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_392.id
    },
    answer_1441: {
        text: 'Több darabot számol egy tartományban',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_393.id
    },
    answer_1442: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre az összes kritérium',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_393.id
    },
    answer_1443: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre több kritérium',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_393.id
    },
    answer_1444: {
        text: 'Kritériumokat összegez több tartományban (pl. A" tartományban "XY" kritérium, "B" tartományban "ABC" kritérium... stb.) és összeszámolja, hogy hány alkalommal teljesül egyszerre 3 kritérium',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_393.id
    },
    answer_1445: {
        text: '"=KEREKÍTÉS(A1;3)"',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_394.id
    },
    answer_1446: {
        text: '"=KEREKÍTÉS(A1;0;3)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_394.id
    },
    answer_1447: {
        text: '"=KEREKÍTÉS(A1;111)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_394.id
    },
    answer_1448: {
        text: '"=KEREKÍTÉS(A1;000)"',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_394.id
    },
    answer_1449: {
        text: 'Szélesebb sorral',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_395.id
    },
    answer_1450: {
        text: 'Szélesebb oszloppal',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_395.id
    },
    answer_1451: {
        text: 'Ellenőrzöm a képletet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_395.id
    },
    answer_1452: {
        text: 'Megkeresem a hiányzó hivatkozást',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_395.id
    },
    answer_1453: {
        text: 'CTRL + O ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_396.id
    },
    answer_1454: {
        text: 'CTRL + B',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_396.id
    },
    answer_1455: {
        text: 'CTRL + S',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_396.id
    },
    answer_1456: {
        text: 'CTRL + A',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_396.id
    },
    answer_1457: {
        text: 'Több oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_397.id
    },
    answer_1458: {
        text: 'Egy oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_397.id
    },
    answer_1459: {
        text: 'Több oldalas dokumentumot egy példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_397.id
    },
    answer_1460: {
        text: '1-1-1-1 2-2-2-2 3-3-3-3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_397.id
    },
    answer_1461: {
        text: 'Írásvédett lesz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_398.id
    },
    answer_1462: {
        text: 'Törölhetetlen lesz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_398.id
    },
    answer_1463: {
        text: 'A Word fájlmenüjében rögzítem a fájlt, hogy mindig lássam a menüben.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_398.id
    },
    answer_1464: {
        text: 'PDF-fájl lesz belőle.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_398.id
    },
    answer_1465: {
        text: 'A cím mutatja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_399.id
    },
    answer_1466: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_399.id
    },
    answer_1467: {
        text: 'Adatok menü: Információ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_399.id
    },
    answer_1468: {
        text: 'Fájl menü: Információ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_399.id
    },
    answer_1469: {
        text: 'CTRL + B',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_400.id
    },
    answer_1470: {
        text: 'Kezdőlap >> Betűtipus >> Kattintok a "D"-re vagy CTRL + I',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_400.id
    },
    answer_1473: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_401.id
    },
    answer_1474: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_401.id
    },
    answer_1475: {
        text: 'Adott lapra több szöveg kerül fel, azaz ugyanannyi szöveghez kevesebb oldal kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_401.id
    },
    answer_1476: {
        text: 'Adott lapra kevesebb szöveg kerül fel, azaz ugyanannyi szöveghez több oldal kell',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_401.id
    },
    answer_1477: {
        text: 'Nem lehet frissíteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_402.id
    },
    answer_1478: {
        text: 'Manuálisan kell átírni az oldalszámokat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_402.id
    },
    answer_1479: {
        text: 'Kattintok a tartalomjegyzékre, majd a fent megjelenő "Frissítés"-re. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_402.id
    },
    answer_1480: {
        text: 'F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_402.id
    },
    answer_1481: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_403.id
    },
    answer_1482: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_403.id
    },
    answer_1483: {
        text: 'Csak C4 méretben',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_403.id
    },
    answer_1484: {
        text: 'Csak A4 méretben',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_403.id
    },
    answer_1485: {
        text: 'Arra, hogy nagy legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_404.id
    },
    answer_1486: {
        text: 'Arra, hogy kicsi legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_404.id
    },
    answer_1487: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_404.id
    },
    answer_1488: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_404.id
    },
    answer_1489: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_405.id
    },
    answer_1490: {
        text: 'Nagybetű formátum és méret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_405.id
    },
    answer_1491: {
        text: 'A formátuma a nagybetűéké, a mérete a kicsiké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete megváltozik.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_405.id
    },
    answer_1492: {
        text: 'A formátuma a kisbetűéké, a mérete a nagyoké, azaz látványosan hangsúlyozhatunk vele, de a szöveg mérete nem változik.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_405.id
    },
    answer_1493: {
        text: 'Szóközt ütök közéjük.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_406.id
    },
    answer_1494: {
        text: 'Kijelölöm a ritkítani kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Térköz: Ritkított.>> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_406.id
    },
    answer_1495: {
        text: 'Tab-ot ütök közéjük',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_406.id
    },
    answer_1496: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Sorköz: Ritkított.>> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_406.id
    },
    answer_1497: {
        text: 'Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak: Szövegeffektusok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_407.id
    },
    answer_1498: {
        text: 'Nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_407.id
    },
    answer_1499: {
        text: 'Kezdőlap menüszalag: Betűtípus résznél van az ikonja.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_407.id
    },
    answer_1500: {
        text: 'Beállítások',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_407.id
    },
    answer_1501: {
        text: 'CTRL + J',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_408.id
    },
    answer_1502: {
        text: 'CTRL + R',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_408.id
    },
    answer_1503: {
        text: 'CTRL + NYÍL JOBBRA',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_408.id
    },
    answer_1504: {
        text: 'CTRL + END',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_408.id
    },
    answer_1505: {
        text: 'Sorköz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_409.id
    },
    answer_1506: {
        text: 'Behúzás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_409.id
    },
    answer_1507: {
        text: 'Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_409.id
    },
    answer_1508: {
        text: 'Térköz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_409.id
    },
    answer_1509: {
        text: 'Kattintok a MÁSODIK bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_410.id
    },
    answer_1510: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Tervezés menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_410.id
    },
    answer_1511: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Kezdőlap menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_410.id
    },
    answer_1512: {
        text: 'Kattintok az ELSŐ bekezdésen. >> Nézet menü >> Bekezdés rész A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Szövegbeosztás fül >> Együtt a következővel >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_410.id
    },
    answer_1513: {
        text: 'Stabilabban tartja a távolságot, mint a szóközök.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_411.id
    },
    answer_1514: {
        text: 'Gyorsabb a szóköznél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_411.id
    },
    answer_1515: {
        text: 'Térközt is ad.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_411.id
    },
    answer_1516: {
        text: 'Ritkítja a betűk közti távolságot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_411.id
    },
    answer_1517: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_412.id
    },
    answer_1518: {
        text: 'Bal klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Számozás folytatása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_412.id
    },
    answer_1519: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Nézet >> Számozás folytatása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_412.id
    },
    answer_1520: {
        text: 'Jobb klikk az egyes számra, amelyiknél folytatnám a félbehagyott felsorolást >> Helyi menü >> Frissítés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_412.id
    },
    answer_1521: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >>  a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_413.id
    },
    answer_1522: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >>Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_413.id
    },
    answer_1523: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Megjelenik a menüszalagon az Élőfej és élőláb menü >> Nézet >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Számformátum >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_413.id
    },
    answer_1524: {
        text: 'Beszúrás menü >> Oldalszámok >>  Élőfej és élőláb rész >> Oldalszámok  >> Beállítom, hová szeretném >> Beállítás a listáról és Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_413.id
    },
    answer_1525: {
        text: 'Kattintás a fedőlapon >> Nézet menü >> Színek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_414.id
    },
    answer_1526: {
        text: 'Kattintás a fedőlapon >> Tervezés menü >> Színek',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_414.id
    },
    answer_1527: {
        text: 'Kattintás a fedőlapon >> Tervezés menü >> Témák',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_414.id
    },
    answer_1528: {
        text: 'Kattintás a fedőlapon >> Fedőlap menü >> Színek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_414.id
    },
    answer_1529: {
        text: 'Nem lehet stílust módosítani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_415.id
    },
    answer_1530: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_415.id
    },
    answer_1531: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Bal klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_415.id
    },
    answer_1532: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Szerkesztés  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_415.id
    },
    answer_1533: {
        text: 'Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_416.id
    },
    answer_1534: {
        text: 'Home',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_416.id
    },
    answer_1535: {
        text: 'End',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_416.id
    },
    answer_1536: {
        text: 'CTRL',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_416.id
    },
    answer_1537: {
        text: 'CTRL + Enter',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_417.id
    },
    answer_1538: {
        text: 'Shift + Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_417.id
    },
    answer_1539: {
        text: 'CTRL + End',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_417.id
    },
    answer_1540: {
        text: 'Ctrl + F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_417.id
    },
    answer_1541: {
        text: 'Nem lehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_418.id
    },
    answer_1542: {
        text: 'Táblázat szegélyekkel teszem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_418.id
    },
    answer_1543: {
        text: 'Szerkesztés >> Rácsvonalak',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_418.id
    },
    answer_1544: {
        text: 'Nézet menü >> Megjelenítés >> Rácsvonalak',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_418.id
    },
    answer_1545: {
        text: 'Kezdőlap >> Bekezdés >> Minden látszik',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_419.id
    },
    answer_1546: {
        text: 'Nézet >> Bekezdés >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_419.id
    },
    answer_1547: {
        text: 'Nézet >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_419.id
    },
    answer_1548: {
        text: 'Kezdőlap >> Bekezdés >> Nagyítás >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_419.id
    },
    answer_1549: {
        text: 'Kezdőlap menü >> Ablak >> Felosztás megszüntetése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_420.id
    },
    answer_1550: {
        text: 'Kezdőlap menü >> Megjelenítés >> Webes nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_420.id
    },
    answer_1551: {
        text: 'Nézet menü >> Ablak >> Felosztás megszüntetése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_420.id
    },
    answer_1552: {
        text: 'Nézet menü >> Megjelenítés >> Webes nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_420.id
    },
    answer_1553: {
        text: 'Kezdőlap menü >> Nézet >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_421.id
    },
    answer_1554: {
        text: 'CTRL + H >> Vágólap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_421.id
    },
    answer_1555: {
        text: 'Kezdőlap menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_421.id
    },
    answer_1556: {
        text: 'Formátum menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_421.id
    },
    answer_1557: {
        text: 'Ecset. Kezdőlap menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_422.id
    },
    answer_1558: {
        text: 'Ecset. Nézet menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_422.id
    },
    answer_1559: {
        text: 'CD-t ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_422.id
    },
    answer_1560: {
        text: 'Tollat ábrázol. Kezdőlap menü >> Vágólap >> Ecset ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_422.id
    },
    answer_1561: {
        text: 'Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_423.id
    },
    answer_1562: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_423.id
    },
    answer_1563: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >>  A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_423.id
    },
    answer_1564: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Ellenőrzés >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_423.id
    },
    answer_1565: {
        text: 'Ctrl + H >> A párbeszédablakba beírom, hogy: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_424.id
    },
    answer_1566: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_424.id
    },
    answer_1567: {
        text: 'Ctrl + F >> A párbeszédablakba bírom, hogy: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_424.id
    },
    answer_1568: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >> Egyebek >> Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_424.id
    },
    answer_1569: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_425.id
    },
    answer_1570: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "apple" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_425.id
    },
    answer_1571: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_425.id
    },
    answer_1572: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "alma" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_425.id
    },
    answer_1573: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_426.id
    },
    answer_1574: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Formátum >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje >> Szükség esetén ismétlem. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_426.id
    },
    answer_1575: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Speciális >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_426.id
    },
    answer_1576: {
        text: 'Kijelölhetjük a szükséges területet, ha nem az egész dokumentum a cél  >> CTRL + H >> A párbeszédablakon: Egyebek >> Kattintok a "Keresett szöveg" mezőn >> Bekezdés >> Kattintok a bekezdésjelre, majd ismétlem ezt >> Kattintok a "Csere erre" mezőn >> Speciális >> Kattintok a bekezdésjelre >>Az összes cseréje >> Szükség esetén ismétlem. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_426.id
    },
    answer_1577: {
        text: 'Manuálisan kell elválasztani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_427.id
    },
    answer_1578: {
        text: 'Kijelelöm az elválasztás tartományát. >> Tervezés menü >> Elválasztás >> Automatikus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_427.id
    },
    answer_1579: {
        text: 'Kijelelöm az elválasztás tartományát. >> Elrendezés menü >> Elválasztás >> Automatikus',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_427.id
    },
    answer_1580: {
        text: 'Kijelelöm az elválasztás tartományát. >> Szerkesztés menü >> Elválasztás >> Automatikus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_427.id
    },
    answer_1581: {
        text: 'Kihagyás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_428.id
    },
    answer_1582: {
        text: 'Az összes kihagyása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_428.id
    },
    answer_1583: {
        text: 'Felvétel a szótárba',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_428.id
    },
    answer_1584: {
        text: 'Szótár frissítése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_428.id
    },
    answer_1585: {
        text: 'Shift + F4',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_429.id
    },
    answer_1586: {
        text: 'Shift + F5',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_429.id
    },
    answer_1587: {
        text: 'Shift + F6',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_429.id
    },
    answer_1588: {
        text: 'Shift + F7',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_429.id
    },
    answer_1589: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_430.id
    },
    answer_1590: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_430.id
    },
    answer_1591: {
        text: '(A hasábokon kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kipipálom az azonos hasábszélességet, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_430.id
    },
    answer_1592: {
        text: '(A hasábokon kívűl kattintok egyet a bal egérgombbal) >> Elrendezés menü >> Hasábok >> További hasábok >> A párbeszédablakon kiveszem a pipát az azonos hasábszélesség elől, és beállítom az első hasábot szélesebbnek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_430.id
    },
    answer_1593: {
        text: 'Formátum és betűtípus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_431.id
    },
    answer_1594: {
        text: 'Adatok rendezése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_431.id
    },
    answer_1595: {
        text: 'Címsorszámozás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_431.id
    },
    answer_1596: {
        text: 'Felsorolás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_431.id
    },
    answer_1597: {
        text: 'Hivatkozások menü >>  A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_432.id
    },
    answer_1598: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_432.id
    },
    answer_1599: {
        text: 'Hivatkozások menü >> Végjegyzetek rész >> A jobb alsó sarokban a kis jobbra és le mutató nyíll >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_432.id
    },
    answer_1725: {
        text: 'Jobb klikk az alakzaton >> Szerkesztés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_464.id
    },
    answer_1600: {
        text: 'Hivatkozások menü >> Lábjegyzetek rész >> A Lábjegyezt és végjegyzet párbeszédablakon: Konvertálás >>Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_432.id
    },
    answer_1601: {
        text: 'A menüszalagon',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_433.id
    },
    answer_1602: {
        text: 'Beszúrás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_433.id
    },
    answer_1603: {
        text: 'Nézet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_433.id
    },
    answer_1604: {
        text: 'Ha nincs a menüszalagon, akkor Fájl >> (Egyebek >>) Beállítások >> Menüszalag testreszabása',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_433.id
    },
    answer_1605: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_434.id
    },
    answer_1606: {
        text: 'Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Tulajdonságokra kattintva a lenyíló párbeszédablakban testreszabom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_434.id
    },
    answer_1607: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_434.id
    },
    answer_1608: {
        text: 'Kattintok a cél helyére >> Ezután: Fejlesztőeszközök >> Vezérlők >>  Naptár ikonra kattintok >> Ezután a Fejlesztőeszközök menün a Formátumra kattintva a lenyíló párbeszédablakban testreszabom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_434.id
    },
    answer_1609: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_435.id
    },
    answer_1610: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_435.id
    },
    answer_1611: {
        text: 'Az alakzatra kattintok, majd az Alakzat formátuma menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_435.id
    },
    answer_1612: {
        text: 'Az alakzatra kattintok, majd az Alakzat beszúrása menün a kitöltésre. >> Kép >> Online képek >> a keresőcsíkba almát beírva keresek egyet >> Beszúrás ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_435.id
    },
    answer_1613: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_436.id
    },
    answer_1614: {
        text: 'Új diagramot kell szerkesztenem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_436.id
    },
    answer_1615: {
        text: 'Kijelölöm a diagramot >> Adatok szerkesztése menü a menüszalagon >> a lenyíló Excel-alapú táblázatban pedig szerkeszthetem az adatokat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_436.id
    },
    answer_1616: {
        text: 'Jobb kattintás a diagramra >> Adatok szerkesztése >> a lenyíló PowerPoint-alapú táblázatban pedig szerkeszthetem az adatokat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_436.id
    },
    answer_1617: {
        text: 'Kattintok az ábrán, majd a lenyíló párbeszédablakban adhatom meg az új adatokat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_437.id
    },
    answer_1618: {
        text: 'A nézet menüben állíthatom át a körvonalakat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_437.id
    },
    answer_1619: {
        text: 'Kattintok az ábrán és a menüszalagon megjelenik a SmartArt-terv menü. Ebben.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_437.id
    },
    answer_1620: {
        text: 'Nem lehet szerkeszteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_437.id
    },
    answer_1621: {
        text: 'Nézet >> Szín >> Szépia szín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_438.id
    },
    answer_1622: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépia szín',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_438.id
    },
    answer_1623: {
        text: 'Kattintok a kép mellé >>  Képformátum menü >> Kiigazítás rész >> Szín >> Szépia szín',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_438.id
    },
    answer_1624: {
        text: 'Kattintok a képen >>  Képformátum menü >> Kiigazítás rész >> Szín >> RGB: 255',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_438.id
    },
    answer_1625: {
        text: 'Jobb klikk az alakzaton >> Szerkesztés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_439.id
    },
    answer_1626: {
        text: 'Jobb klikk az alakzaton >> Alakzat formázása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_439.id
    },
    answer_1627: {
        text: 'Jobb klikk az alakzaton >> Csomópontok szerkesztése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_439.id
    },
    answer_1628: {
        text: 'Ezt nem lehet szerkeszteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_439.id
    },
    answer_1629: {
        text: 'Egy makró.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_440.id
    },
    answer_1630: {
        text: 'Egy látványos szövegrész, amit beszúrhatunk a szövegbe és formázhatunk.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_440.id
    },
    answer_1631: {
        text: 'Egy képaláírás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_440.id
    },
    answer_1632: {
        text: 'Egy Iniciálé',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_440.id
    },
    answer_1633: {
        text: 'Arial',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_441.id
    },
    answer_1634: {
        text: 'Tahoma',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_441.id
    },
    answer_1635: {
        text: 'Wingdings',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_441.id
    },
    answer_1636: {
        text: 'Courgette',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_441.id
    },
    answer_1637: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_442.id
    },
    answer_1638: {
        text: 'Beszúrás menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és hagyjuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_442.id
    },
    answer_1639: {
        text: 'Beszúrás menü >> Dátum és idő >> A legördülő listán állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_442.id
    },
    answer_1640: {
        text: 'Dátum menü >> Dátum és idő >> A párbeszédablakon állítsuk be a kívánt formátumot, és pipáljuk ki az Automatikus frissítést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_442.id
    },
    answer_1641: {
        text: 'Több oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_443.id
    },
    answer_1642: {
        text: 'Egy oldalas dokumentumot több példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_443.id
    },
    answer_1643: {
        text: 'Több oldalas dokumentumot egy példányban úgy nyomtat, hogy az első példányt kinyomtatja az elejétől végéig, majd a következőt az elejétől a végéig stb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_443.id
    },
    answer_1644: {
        text: '1-1-1-1 2-2-2-2 3-3-3-3',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_443.id
    },
    answer_1645: {
        text: 'A cím mutatja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_444.id
    },
    answer_1646: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_444.id
    },
    answer_1647: {
        text: 'Adatok menü: Információ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_444.id
    },
    answer_1648: {
        text: 'Fájl menü: Információ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_444.id
    },
    answer_1649: {
        text: 'CTRL + B',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_445.id
    },
    answer_1650: {
        text: 'Kezdőlap >> Betűtipus >> Kattintok a "D"-re vagy CTRL + I',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_445.id
    },
    answer_1651: {
        text: 'CTRL + D',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_445.id
    },
    answer_1652: {
        text: 'F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_445.id
    },
    answer_1653: {
        text: 'Nem lehet frissíteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_446.id
    },
    answer_1654: {
        text: 'Manuálisan kell átírni az oldalszámokat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_446.id
    },
    answer_1655: {
        text: 'Kattintok a tartalomjegyzékre, majd a fent megjelenő "Frissítés"-re. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_446.id
    },
    answer_1656: {
        text: 'F2',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_446.id
    },
    answer_1657: {
        text: 'CTRL + F',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_447.id
    },
    answer_1658: {
        text: 'CTRL + D',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_447.id
    },
    answer_1659: {
        text: 'CTRL + B',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_447.id
    },
    answer_1660: {
        text: 'CTRL + T',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_447.id
    },
    answer_1661: {
        text: 'Szóközt ütök közéjük.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_448.id
    },
    answer_1662: {
        text: 'Kijelölöm a ritkítani kívánt szöveget. >> Kezdőlap menü >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Térköz: Ritkított.>> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_448.id
    },
    answer_1663: {
        text: 'Tab-ot ütök közéjük',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_448.id
    },
    answer_1664: {
        text: 'Kijelölöm az aláhúzni kívánt szöveget. >> Betűtípus >> A rész bal alsó sarkában a kis jobbra és lefelé mutató nyílra kattintok. >> Párbeszédablak >> Speciális >> Sorköz: Ritkított.>> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_448.id
    },
    answer_1665: {
        text: 'Stabilabban tartja a távolságot, mint a szóközök.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_449.id
    },
    answer_1666: {
        text: 'Gyorsabb a szóköznél',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_449.id
    },
    answer_1667: {
        text: 'Térközt is ad.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_449.id
    },
    answer_1668: {
        text: 'Ritkítja a betűk közti távolságot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_449.id
    },
    answer_1669: {
        text: 'Kattintok a vonalzón a margóra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_450.id
    },
    answer_1670: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_450.id
    },
    answer_1671: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló párbeszédablakon kijelölöm a megfelelő tabulátort >>  vessző >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_450.id
    },
    answer_1672: {
        text: 'Kattintok a vonalzón a tabulátorra >> a lenyíló helyi menün kijelölöm a megfelelő tabulátort >>  Decimális >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_450.id
    },
    answer_1673: {
        text: 'Bal egérgombbal duplán kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_451.id
    },
    answer_1674: {
        text: 'Jobbal kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Élőfej és élőláb menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_451.id
    },
    answer_1675: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Nézet menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_451.id
    },
    answer_1676: {
        text: 'Kattintok a meglévő oldalszámra (esetleg az élőfejre-élőlábra) >> Tervezés menü >> Oldalszám >> Oldalszámozás formázása >> a párbeszédablakon: Kezdő sorszám >> Beállítom, hogy 2243',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_451.id
    },
    answer_1677: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása >> Stílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_452.id
    },
    answer_1678: {
        text: 'Formátum menü >> Stílusok >> Új Stílus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_452.id
    },
    answer_1679: {
        text: 'Bal klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus létrehozása párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_452.id
    },
    answer_1680: {
        text: 'Jobb klikk a szövegre.>> Stílusok >> Legördülő menü >> Sílus átnevezése  párbeszédablak >> Beállítom, amit szeretnék, és Ok. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_452.id
    },
    answer_1681: {
        text: 'Nem lehet stílust módosítani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_453.id
    },
    answer_1682: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_453.id
    },
    answer_1683: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Bal klikk rajta >> Módosítás  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_453.id
    },
    answer_1684: {
        text: 'Kezdőlap menü >> Stílusok >> Kivalásztom a módosítani kívánt stílust >> Jobb klikk rajta >> Szerkesztés  >> Stílus módosítása párbeszédablakban módosítom, amit akarok  >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_453.id
    },
    answer_1685: {
        text: 'Del',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_454.id
    },
    answer_1686: {
        text: 'Home',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_454.id
    },
    answer_1687: {
        text: 'End',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_454.id
    },
    answer_1688: {
        text: 'CTRL',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_454.id
    },
    answer_1689: {
        text: 'Kezdőlap >> Bekezdés >> Minden látszik',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_455.id
    },
    answer_1690: {
        text: 'Nézet >> Bekezdés >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_455.id
    },
    answer_1691: {
        text: 'Nézet >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_455.id
    },
    answer_1692: {
        text: 'Kezdőlap >> Bekezdés >> Nagyítás >> Minden látszik',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_455.id
    },
    answer_1693: {
        text: 'Kezdőlap menü >> Nézet >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_456.id
    },
    answer_1694: {
        text: 'CTRL + H >> Vágólap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_456.id
    },
    answer_1695: {
        text: 'Kezdőlap menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_456.id
    },
    answer_1696: {
        text: 'Formátum menü >> Vágólap >> a rész jobb alsó sarkában lévő jobbra és le mutató nyílra kattintok >> és bal oldalon megjelenik a Vágókönyv.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_456.id
    },
    answer_1697: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Bal oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_457.id
    },
    answer_1698: {
        text: 'Nem lehet ilyet beállítani.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_457.id
    },
    answer_1699: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Nincs módosítás (csak olvasható) >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_457.id
    },
    answer_1700: {
        text: 'Véleményezés menü >> Védelem >> Szerkesztés korlátozása >> Jobb oldalt szerkesztés korlátozása munkaablak >> Módosítási korlátozások >> Formázás >> Igen, bekapcsolom a dokumentumvédelmet >> Jelszó 789 >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_457.id
    },
    answer_1701: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_458.id
    },
    answer_1702: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >>  Szöveg használata vízjelként >> Szöveg: titok; Szín a listából: piros >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_458.id
    },
    answer_1703: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szín a listából: piros >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_458.id
    },
    answer_1704: {
        text: 'Tervezés menü >> Vízjel >> Egyéni vízjel >> Nyomtatott vízjel >> Szöveg használata vízjelként >> Szöveg: titok;  >> Ok vagy Alkalmaz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_458.id
    },
    answer_1705: {
        text: 'Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_459.id
    },
    answer_1706: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_459.id
    },
    answer_1707: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Nyelv >> Nyelv  >>  A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_459.id
    },
    answer_1708: {
        text: 'Kijelölöm a fontos részt >> Véleményezés menü >> Ellenőrzés >> Nyelv >> Nyelv  >> Ellenőrzés nyelvének megadása >> A listán kikeresem a francia nyelvet >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_459.id
    },
    answer_1709: {
        text: 'Ctrl + H >> A párbeszédablakba beírom, hogy: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_460.id
    },
    answer_1710: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >>  Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_460.id
    },
    answer_1711: {
        text: 'Ctrl + F >> A párbeszédablakba bírom, hogy: Courgette >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_460.id
    },
    answer_1712: {
        text: 'Kezdőlap menü >> Szekesztés >>Keresés >> Irányított keresés >> Egyebek >> Formátum >> Betűtipus: Courgette >> Ok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_460.id
    },
    answer_1713: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Ok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_461.id
    },
    answer_1714: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "apple" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_461.id
    },
    answer_1715: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "apple"; "Csere erre": "alma" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_461.id
    },
    answer_1716: {
        text: 'Ctrl + H >> A párbeszédablakban a "Keresett szöveg": "alma"; "Csere erre": "alma" >> Az összes cseréje',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_461.id
    },
    answer_1717: {
        text: 'Kezdőlap menü >> Bekezdés >> Rendezés ikon',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_462.id
    },
    answer_1718: {
        text: 'Nézet menü >> Bekezdés >> Rendezés ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_462.id
    },
    answer_1719: {
        text: 'Kezdőlap menü >> Adatok >> Bekezdés >> Rendezés ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_462.id
    },
    answer_1720: {
        text: 'Kezdőlap menü >> Nézet >> Rendezés ikonKezdőlap menü >> Nézet >> Rendezés ikon',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_462.id
    },
    answer_1721: {
        text: 'Formátum és betűtípus',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_463.id
    },
    answer_1722: {
        text: 'Adatok rendezése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_463.id
    },
    answer_1723: {
        text: 'Címsorszámozás',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_463.id
    },
    answer_1724: {
        text: 'Felsorolás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_463.id
    },
    answer_1726: {
        text: 'Jobb klikk az alakzaton >> Alakzat formázása',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_464.id
    },
    answer_1727: {
        text: 'Jobb klikk az alakzaton >> Csomópontok szerkesztése',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_464.id
    },
    answer_1728: {
        text: 'Ezt nem lehet szerkeszteni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_464.id
    },
    answer_1729: {
        text: 'Kiírja, hogy "hello".',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_465.id
    },
    answer_1730: {
        text: ' Az Üres bemutató lehetőség mellett megnyithatunk egy "Üdvözli a PowerPoint" című bemutatót, ami sok mindent elmagyaráz.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_465.id
    },
    answer_1731: {
        text: 'Youtube linket ad. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_465.id
    },
    answer_1732: {
        text: 'Emailt küld nekünk.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_465.id
    },
    answer_1733: {
        text: 'Nézet menü >> Ablakváltás >> arra a prezentációra kattintok, amivel dolgozni akarok.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_467.id
    },
    answer_1734: {
        text: 'Nem lehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_467.id
    },
    answer_1735: {
        text: 'Mentem a befejezni kívántat és kilépek belőle.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_467.id
    },
    answer_1736: {
        text: 'Nézet menü >> Aktív prezentáció >> arra a prezentációra kattintok, amivel dolgozni akarok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_467.id
    },
    answer_1737: {
        text: 'bal felső sarok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_468.id
    },
    answer_1738: {
        text: 'bal alsó sarok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_468.id
    },
    answer_1739: {
        text: 'jobb felső sarok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_468.id
    },
    answer_1740: {
        text: 'jobb alsó sarok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_468.id
    },
    answer_1741: {
        text: 'Nem lehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_469.id
    },
    answer_1742: {
        text: 'Csak az alapértelmezett helyekre lehet. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_469.id
    },
    answer_1743: {
        text: 'Beszúrás menü >> Szöveg >> Szövegdoboz >> majd egérrel kijelölöm a dián a helyet.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_469.id
    },
    answer_1744: {
        text: 'Nézet menü >> Szövegdoboz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_469.id
    },
    answer_1745: {
        text: 'CTRL + X',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_470.id
    },
    answer_1746: {
        text: 'CTRL+ Z',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_470.id
    },
    answer_1747: {
        text: 'A mégis nyila a gyorselérési eszköztáron (balra visszaforduló nyíl)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_470.id
    },
    answer_1748: {
        text: 'A mégis nyila a gyorselérési eszköztáron (jobbra visszaforduló nyíl)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_470.id
    },
    answer_1749: {
        text: '.ppt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_471.id
    },
    answer_1750: {
        text: '.keynote',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_471.id
    },
    answer_1751: {
        text: '.docx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_471.id
    },
    answer_1752: {
        text: '.pptx',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_471.id
    },
    answer_1753: {
        text: '1 kattintás a bal egérgombbal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_472.id
    },
    answer_1754: {
        text: '1 kattintás a jobb egérgombbal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_472.id
    },
    answer_1755: {
        text: '2 kattintás a bal egérgombbal',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_472.id
    },
    answer_1756: {
        text: '2 kattintás a jobb egérgombbal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_472.id
    },
    answer_1757: {
        text: 'Többen látják a fájlt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_473.id
    },
    answer_1758: {
        text: 'Egyszerre többen is dolgozhatunk egy fájlon.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_473.id
    },
    answer_1759: {
        text: 'Elküldhetem a fájlt bárkinek.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_473.id
    },
    answer_1760: {
        text: 'Felváltva többen is dolgozhatuk egy fájlon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_473.id
    },
    answer_1761: {
        text: 'Csak szabványméretek vannak.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_474.id
    },
    answer_1763: {
        text: 'Nézet menü >> Egyéni diaméret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_474.id
    },
    answer_1764: {
        text: 'Formátum menü >> Diaméret >> Egyéni diaméret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_474.id
    },
    answer_1765: {
        text: 'Ctrl',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_475.id
    },
    answer_1766: {
        text: 'NumLock',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_475.id
    },
    answer_1767: {
        text: 'Del',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_475.id
    },
    answer_1768: {
        text: 'Win',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_475.id
    },
    answer_1769: {
        text: 'Ctrl',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_476.id
    },
    answer_1770: {
        text: 'Shift',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_476.id
    },
    answer_1771: {
        text: 'Alt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_476.id
    },
    answer_1772: {
        text: 'Win',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_476.id
    },
    answer_1773: {
        text: 'A kijelölés után rákattintok a bal egérgombbal, de lenyomva tartom és amíg az egérgomb le van nyomva - húzással oda mozgatom, ahova szeretném.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_477.id
    },
    answer_1774: {
        text: 'A kijelölés után rákattintok a jobb egérgombbal, de lenyomva tartom és amíg az egérgomb le van nyomva - húzással oda mozgatom, ahova szeretném.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_477.id
    },
    answer_1775: {
        text: 'A kijelölés után rákattintok a jobb egérgombbal, de majd felengedem a gombot és húzással oda mozgatom, ahova szeretném.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_477.id
    },
    answer_1776: {
        text: 'Csak másolni lehet, mozgatni nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_477.id
    },
    answer_1777: {
        text: 'Szövegdoboz',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_478.id
    },
    answer_1778: {
        text: 'Szövegrész',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_478.id
    },
    answer_1779: {
        text: 'Kép',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_478.id
    },
    answer_1780: {
        text: 'Dia',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_478.id
    },
    answer_1781: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_479.id
    },
    answer_1782: {
        text: 'Beillesztés képként - ezután igen.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_479.id
    },
    answer_1783: {
        text: 'Forrásformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_479.id
    },
    answer_1784: {
        text: 'Célformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_479.id
    },
    answer_1785: {
        text: '12 a PowerPointból.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_480.id
    },
    answer_1786: {
        text: '24 a PowerPointból.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_480.id
    },
    answer_1787: {
        text: '24 a PowerPointból és más alkalmazásokból.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_480.id
    },
    answer_1788: {
        text: '12 a PowerPointból és más alkalmazásokból.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_480.id
    },
    answer_1793: {
        text: 'Arra, hogy nagy legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_482.id
    },
    answer_1794: {
        text: 'Arra, hogy kicsi legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_482.id
    },
    answer_1795: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_482.id
    },
    answer_1796: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_482.id
    },
    answer_1801: {
        text: 'kb. 60cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_484.id
    },
    answer_1802: {
        text: 'kb. 6 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_484.id
    },
    answer_1803: {
        text: 'kb. 24 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_484.id
    },
    answer_1804: {
        text: 'kb. 2,4 cm',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_484.id
    },
    answer_1805: {
        text: 'L',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_485.id
    },
    answer_1806: {
        text: 'I',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_485.id
    },
    answer_1807: {
        text: 'Y',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_485.id
    },
    answer_1808: {
        text: 'D',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_485.id
    },
    answer_1809: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_486.id
    },
    answer_1810: {
        text: '1 és 10 között.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_486.id
    },
    answer_1811: {
        text: 'Igen. Pozitív és negatív % értékekkel.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_486.id
    },
    answer_1812: {
        text: '1 és 5 között',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_486.id
    },
    answer_1813: {
        text: 'Kezdőlap menü >> Nézet >> Térköz és pozíció.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_487.id
    },
    answer_1814: {
        text: 'Nézet menü >> Betűtipus rész >> Térköz és pozíció.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_487.id
    },
    answer_1815: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és pozíció.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_487.id
    },
    answer_1816: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és betűköz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_487.id
    },
    answer_1817: {
        text: 'A kijelölt rész betűit mindenképpen kisbetűre állítja',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_488.id
    },
    answer_1818: {
        text: 'A kijelölt rész betűméretét kisebbre vagy nagyobbra állítja',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_488.id
    },
    answer_1819: {
        text: 'A kijelölt rész betűi közül az eredetileg nagybetűket kicsire cseréli, a kisbetűket pedig nagyra.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_488.id
    },
    answer_1820: {
        text: 'Az alapértelmezett betűtípust változtatja meg.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_488.id
    },
    answer_1821: {
        text: 'A betűszíneknél, a lenyitható listánál: >> További színek... >>Egyéni fül >> RGB (esetleg hexadecimális)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_489.id
    },
    answer_1822: {
        text: 'A nézetnél, a lenyitható listánál: >> További színek... >>Egyéni fül >> RGB (esetleg hexadecimális)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_489.id
    },
    answer_1823: {
        text: 'A betűszíneknél, a lenyitható listánál: >>  RGB (esetleg hexadecimális)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_489.id
    },
    answer_1824: {
        text: 'A betűszíneknél, a lenyitható listánál: >> Színek... >>Egyéni fül >> RGB (esetleg hexadecimális)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_489.id
    },
    answer_1825: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_490.id
    },
    answer_1826: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> bal alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_490.id
    },
    answer_1827: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> balra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_490.id
    },
    answer_1828: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra felfelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_490.id
    },
    answer_1829: {
        text: 'sorok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_492.id
    },
    answer_1830: {
        text: 'betűk',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_492.id
    },
    answer_1831: {
        text: 'bekezdések',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_492.id
    },
    answer_1832: {
        text: 'diák',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_492.id
    },
    answer_1833: {
        text: 'balra',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_493.id
    },
    answer_1834: {
        text: 'középre',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_493.id
    },
    answer_1835: {
        text: 'fel',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_493.id
    },
    answer_1836: {
        text: 'jobbra',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_493.id
    },
    answer_1837: {
        text: 'A WordArt-ot 100-nál kevesebb színnel tölthetem ki.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_494.id
    },
    answer_1838: {
        text: 'A WordArt-ot képpel is kitölthetem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_494.id
    },
    answer_1839: {
        text: 'A WordArt-ot  PowerPoint által megadott színekkel is kitölthetem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_494.id
    },
    answer_1840: {
        text: 'A WordArt-ot az internetről letöltött képpel is kitölthetem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_494.id
    },
    answer_1841: {
        text: 'Áttetszőség',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_495.id
    },
    answer_1842: {
        text: 'Méret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_495.id
    },
    answer_1843: {
        text: 'Elmosás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_495.id
    },
    answer_1844: {
        text: 'Térköz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_495.id
    },
    answer_1762: {
        text: 'Tervezés menü >> Diaméret >> Egyéni diaméret ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_474.id
    },
    answer_1845: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Kiigazítás menüben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_496.id
    },
    answer_1846: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Szín részben a Kiigazítás ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_496.id
    },
    answer_1847: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Kiigazítás részben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_496.id
    },
    answer_1848: {
        text: 'Nem lehet a beszúrt képet formázni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_496.id
    },
    answer_1849: {
        text: 'Első oszlop',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_497.id
    },
    answer_1850: {
        text: 'Középső oszlop',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_497.id
    },
    answer_1851: {
        text: 'Utolsó oszlop',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_497.id
    },
    answer_1852: {
        text: 'Összegsor',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_497.id
    },
    answer_1853: {
        text: 'Keretezés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_498.id
    },
    answer_1854: {
        text: 'Árnyékolás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_498.id
    },
    answer_1855: {
        text: 'Tükröződés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_498.id
    },
    answer_1856: {
        text: 'Fazetta',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_498.id
    },
    answer_1857: {
        text: 'A szövegdoboz vonalain 8 darab pont van.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_499.id
    },
    answer_1858: {
        text: 'A csúcsokon lévő pontok segítségével nyújtom a szövegdobozt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_499.id
    },
    answer_1859: {
        text: 'Az oldalfelezőkön lévő pontok segítségével elforgatom a szövegdobozt.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_499.id
    },
    answer_1860: {
        text: 'A nyújtás méretarányos átméretezés.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_499.id
    },
    answer_1861: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűméretét.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_500.id
    },
    answer_1862: {
        text: 'A PowerPoint automatikusan a szövegdobozt igazítja a beírt szöveg betűméretéhez.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_500.id
    },
    answer_1863: {
        text: 'A PowerPoint nem igazítja automatikusan a szövegdobozhoz a beírt szöveg betűméretét.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_500.id
    },
    answer_1864: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűtípusát.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_500.id
    },
    answer_1865: {
        text: 'Igen, a szövegdobozra kattintva a Szaggatott vonal menün, a Körvonal ikonján kattintva a lenyíló menüben az Alakzat formátuma lehetőségnél.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_501.id
    },
    answer_1866: {
        text: 'Igen, a diára kattintva az Alakzat formátuma menün, a Körvonal ikonján kattintva a lenyíló menüben a Szaggatott vonal lehetőségnél.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_501.id
    },
    answer_1867: {
        text: 'Igen, a szövegdobozra kattintva a Körvonal menün, az Alakzat formátuma ikonján kattintva a lenyíló menüben a Szaggatott vonal lehetőségnél.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_501.id
    },
    answer_1868: {
        text: 'Igen, a szövegdobozra kattintva az Alakzat formátuma menün a Körvonal ikonján kattintva a lenyíló menüben a Szaggatott vonal lehetőségnél.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_501.id
    },
    answer_1869: {
        text: 'Word',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_502.id
    },
    answer_1870: {
        text: 'Access',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_502.id
    },
    answer_1871: {
        text: 'Excel',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_502.id
    },
    answer_1872: {
        text: 'Publisher',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_502.id
    },
    answer_1873: {
        text: 'Minél áttetszőbb az árnyék, annál jobban látható az árnyék színe.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_503.id
    },
    answer_1874: {
        text: 'Az árnyék távolsága állandó.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_503.id
    },
    answer_1875: {
        text: 'Minél kevésbé áttetsző az árnyék, annál jobban látható az árnyék színe.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_503.id
    },
    answer_1876: {
        text: 'A tükröződés mérete állandó.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_503.id
    },
    answer_1877: {
        text: 'Felső fazetta',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_504.id
    },
    answer_1878: {
        text: 'Alsó fazetta',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_504.id
    },
    answer_1879: {
        text: 'WordArt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_504.id
    },
    answer_1880: {
        text: 'Megvilágítás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_504.id
    },
    answer_1881: {
        text: 'Fekete-fehérré teszi azt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_505.id
    },
    answer_1882: {
        text: 'Egyből törli.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_505.id
    },
    answer_1883: {
        text: 'Feketébe borítja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_505.id
    },
    answer_1884: {
        text: 'Ciklámen színnel.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_505.id
    },
    answer_1885: {
        text: 'Kattintok a beszúrt képen a jobb egérgombbal, a megjelenő Képformátum menüben a Körülvágásra kattintok, majd a lenyíló menüben a Körülvágás alakzatra lehetőségei közül kiválasztom a szívet, és kattintok a bal egérgombbal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_506.id
    },
    answer_1886: {
        text: 'Kattintok a beszúrt képen a bal egérgombbal, a megjelenő Képformátum menüben a Körülvágásra kattintok, majd a lenyíló menüben a Körülvágás alakzatra lehetőségei közül kiválasztom a szívet, és kattintok a bal egérgombbal.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_506.id
    },
    answer_1887: {
        text: 'Kattintok a beszúrt képen a bal egérgombbal, a megjelenő Körülvágás alakzatra menüben a Körülvágásra kattintok, majd a lenyíló menüben a Képformátum  lehetőségei közül kiválasztom a szívet, és kattintok a bal egérgombbal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_506.id
    },
    answer_1888: {
        text: 'Erre nincs lehetőség',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_506.id
    },
    answer_1889: {
        text: 'Címdiát.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_507.id
    },
    answer_1890: {
        text: 'Hátteret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_507.id
    },
    answer_1891: {
        text: 'Térhatást.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_507.id
    },
    answer_1892: {
        text: 'Bármit.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_507.id
    },
    answer_1893: {
        text: 'Win + Alt + Q',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_508.id
    },
    answer_1894: {
        text: 'Win + Ctrl + Q',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_508.id
    },
    answer_1895: {
        text: 'Win + Ctrl + Q + Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_508.id
    },
    answer_1896: {
        text: 'Win + Shift + Q',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_508.id
    },
    answer_1897: {
        text: 'A videó végén lévő kép.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_509.id
    },
    answer_1898: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és teljesen testreszabható.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_509.id
    },
    answer_1899: {
        text: 'Az a kép, ami a beszúrt videó végén van, a lejátszás után kerül oda, és teljesen testreszabható.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_509.id
    },
    answer_1900: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és a videó egyik kockáját mutatja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_509.id
    },
    answer_1901: {
        text: 'Másodperc pontossággal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_510.id
    },
    answer_1902: {
        text: 'Nem vágható.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_510.id
    },
    answer_1903: {
        text: 'Perc pontossággal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_510.id
    },
    answer_1904: {
        text: 'Ezredmásodperc pontossággal.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_510.id
    },
    answer_1905: {
        text: 'A videó lejátszásának általam beállított első szakaszában a nyitókép elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a videó.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_511.id
    },
    answer_1906: {
        text: 'A videó lejátszásának általam beállított utolsó szakaszában a videó elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a nyitókép.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_511.id
    },
    answer_1907: {
        text: 'A videó színeit sötétebbre állítom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_511.id
    },
    answer_1908: {
        text: 'A videó színeit halványabbra állítom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_511.id
    },
    answer_1909: {
        text: 'Rossz diaszám volt megadva.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_512.id
    },
    answer_1910: {
        text: 'Páratlan sorszámú diára kerülhet csak élőfej és élőláb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_512.id
    },
    answer_1911: {
        text: 'A címdiát duplikáltuk, és a beállításnal nem kértünk a címdiára élőfejet, élőlábat. Így a duplikált dia sem kap ilyet.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_512.id
    },
    answer_1912: {
        text: 'Nem volt hiba a végrehajtásban. A PowerPoint néha hibázik, ilyenkor frissíteni kell.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_512.id
    },
    answer_1913: {
        text: 'Kezdőlap menü >> Elrendezések rész >> Diák gomb (a videón: beépített elrendezések).',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_513.id
    },
    answer_1914: {
        text: 'Csak a szöveget lehet formázni a mentés után.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_513.id
    },
    answer_1915: {
        text: 'Nem lehet utólag átrendezni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_513.id
    },
    answer_1916: {
        text: 'Kezdőlap menü >> Diák rész >> Elrendezések gomb (a videón: beépített elrendezések).',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_513.id
    },
    answer_1917: {
        text: 'Diaméret menü >> Tervezés >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_514.id
    },
    answer_1918: {
        text: 'Diaméret menü >> Dia mérete >>  Tervezés párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_514.id
    },
    answer_1919: {
        text: 'Tervezés menü >> Diaméret >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_514.id
    },
    answer_1920: {
        text: 'Csak centiméteres pontosságú beállítás érvényes.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_514.id
    },
    answer_1921: {
        text: 'Ha ketten nézzük a diavetítést.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_515.id
    },
    answer_1922: {
        text: 'Ha például projektorra ki tudom vetíteni az előadást, és a nézők a kivetítést nézik, nekem meg a PowerPoint a laptopomon mutatja, hogy mi következik, és mit mondjak még el a dia mellé.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_515.id
    },
    answer_1923: {
        text: 'Ha makróra rögzítem a prezentációt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_515.id
    },
    answer_1924: {
        text: 'Ha önismétlő prezentációt adok elő.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_515.id
    },
    answer_1925: {
        text: 'Diavetítés menü >> Nézet >> Dia elrejtése.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_516.id
    },
    answer_1926: {
        text: 'Diavetítés menü >> Dia elrejtése.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_516.id
    },
    answer_1927: {
        text: 'Csak törölni lehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_516.id
    },
    answer_1928: {
        text: 'Ctrl kattintás >> Dia elrejtése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_516.id
    },
    answer_1929: {
        text: 'Ctrl + Shift +K',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_517.id
    },
    answer_1930: {
        text: 'Shift + K',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_517.id
    },
    answer_1931: {
        text: 'Alt + Ctrl + K',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_517.id
    },
    answer_1932: {
        text: 'Ctrl + K',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_517.id
    },
    answer_1933: {
        text: 'A teljes eltelt időt.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_518.id
    },
    answer_1934: {
        text: 'A hátralévő időt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_518.id
    },
    answer_1935: {
        text: 'Az aktív diánál eltöltött időt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_518.id
    },
    answer_1936: {
        text: 'A diák sorszámát.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_518.id
    },
    answer_1937: {
        text: '.pptx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_519.id
    },
    answer_1938: {
        text: '.ppsx',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_519.id
    },
    answer_1939: {
        text: '.pppsx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_519.id
    },
    answer_1940: {
        text: '.ptpx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_519.id
    },
    answer_1941: {
        text: 'Lista',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_520.id
    },
    answer_1942: {
        text: 'Folyamat',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_520.id
    },
    answer_1943: {
        text: 'Hierarchia',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_520.id
    },
    answer_1944: {
        text: 'Parabola',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_520.id
    },
    answer_1945: {
        text: 'Térhatást ad.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_521.id
    },
    answer_1946: {
        text: 'Az áttűnést a diák között.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_521.id
    },
    answer_1947: {
        text: 'A szövegdobozt.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_521.id
    },
    answer_1948: {
        text: 'A bekezdéseket.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_521.id
    },
    answer_1953: {
        text: 'CTRL + X',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_522.id
    },
    answer_1954: {
        text: 'Ctrl + Z',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_522.id
    },
    answer_1955: {
        text: 'A mégis nyila a gyorselérési eszköztáron (balra visszaforduló nyíl)',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_522.id
    },
    answer_1956: {
        text: 'A mégis nyila a gyorselérési eszköztáron (jobbra visszaforduló nyíl)',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_522.id
    },
    answer_1957: {
        text: 'Nyomtatást',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_523.id
    },
    answer_1958: {
        text: 'Mentést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_523.id
    },
    answer_1959: {
        text: 'Új dia beszúrását',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_523.id
    },
    answer_1960: {
        text: 'Új prezentáció létrehozását',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_523.id
    },
    answer_1961: {
        text: 'A fájl tárolása egy távoli szerveren történik, így az én gépemen nem foglal helyet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_524.id
    },
    answer_1962: {
        text: 'Lehetőségem van egyszerre több emberrel is együtt dolgozni egy fájlon',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_524.id
    },
    answer_1963: {
        text: 'A fájl átkerül egy másik számítógépre, amelyen később lehetőségem van megtartani a prezentációt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_524.id
    },
    answer_1964: {
        text: 'Lehetőségem van több emberrel együtt dolgozni, egyszerre azonban csak maximum 3 fővel. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_524.id
    },
    answer_1965: {
        text: 'Csak szabványméretek vannak.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_525.id
    },
    answer_1966: {
        text: 'Tervezés menü >> Diaméret >> Egyéni diaméret ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_525.id
    },
    answer_1967: {
        text: 'Nézet menü >> Egyéni diaméret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_525.id
    },
    answer_1968: {
        text: 'Formátum menü >> Diaméret >> Egyéni diaméret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_525.id
    },
    answer_1969: {
        text: 'Ctrl',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_526.id
    },
    answer_1970: {
        text: 'Shift',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_526.id
    },
    answer_1971: {
        text: 'Alt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_526.id
    },
    answer_1972: {
        text: 'Win',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_526.id
    },
    answer_1973: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_527.id
    },
    answer_1974: {
        text: 'Beillesztés képként - ezután igen.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_527.id
    },
    answer_1975: {
        text: 'Forrásformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_527.id
    },
    answer_1976: {
        text: 'Célformátum megőrzése - ezután kovertálás képpé, és azután mehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_527.id
    },
    answer_1977: {
        text: '12 a PowerPointból.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_528.id
    },
    answer_1978: {
        text: '24 a PowerPointból.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_528.id
    },
    answer_1979: {
        text: '24 a PowerPointból és más alkalmazásokból.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_528.id
    },
    answer_1980: {
        text: '12 a PowerPointból és más alkalmazásokból.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_528.id
    },
    answer_1981: {
        text: 'Arra, hogy nagy legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_529.id
    },
    answer_1982: {
        text: 'Arra, hogy kicsi legyen',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_529.id
    },
    answer_1983: {
        text: 'Tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_529.id
    },
    answer_1984: {
        text: 'Ne tartalmazza a magyar ékezetes magánhangzókat. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_529.id
    },
    answer_1985: {
        text: 'L',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_530.id
    },
    answer_1986: {
        text: 'I',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_530.id
    },
    answer_1987: {
        text: 'Y',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_530.id
    },
    answer_1988: {
        text: 'D',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_530.id
    },
    answer_1989: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_531.id
    },
    answer_1990: {
        text: '1 és 10 között.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_531.id
    },
    answer_1991: {
        text: 'Igen. Pozitív és negatív % értékekkel.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_531.id
    },
    answer_1992: {
        text: '1 és 5 között',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_531.id
    },
    answer_1993: {
        text: 'Kezdőlap menü >> Nézet >> Térköz és pozíció.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_532.id
    },
    answer_1994: {
        text: 'Nézet menü >> Betűtipus rész >> Térköz és pozíció.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_532.id
    },
    answer_1995: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és pozíció.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_532.id
    },
    answer_1996: {
        text: 'Kezdőlap menü >> Betűtipus rész >> Térköz és betűköz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_532.id
    },
    answer_1997: {
        text: 'A kijelölt rész betűit mindenképpen kisbetűre állítja',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_533.id
    },
    answer_1998: {
        text: 'A kijelölt rész betűméretét kisebbre vagy nagyobbra állítja',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_533.id
    },
    answer_1999: {
        text: 'A kijelölt rész betűi közül az eredetileg nagybetűket kicsire cseréli, a kisbetűket pedig nagyra.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_533.id
    },
    answer_2000: {
        text: 'Az alapértelmezett betűtípust változtatja meg.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_533.id
    },
    answer_2001: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_534.id
    },
    answer_2002: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> bal alsó sarok >> jobbra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_534.id
    },
    answer_2003: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> balra lefelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_534.id
    },
    answer_2004: {
        text: 'Lenyitom a betűtípus panelt (Kezdőlap menü >> Betűtípus rész >> jobb alsó sarok >> jobbra felfelé mutató nyíl >> Betűtípus párbeszédablak >> aláhúzás színe',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_534.id
    },
    answer_2005: {
        text: 'sorok',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_535.id
    },
    answer_2006: {
        text: 'betűk',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_535.id
    },
    answer_2007: {
        text: 'bekezdések',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_535.id
    },
    answer_2008: {
        text: 'diák',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_535.id
    },
    answer_2009: {
        text: 'A WordArt-ot 100-nál kevesebb színnel tölthetem ki.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_537.id
    },
    answer_2010: {
        text: 'A WordArt-ot képpel is kitölthetem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_537.id
    },
    answer_2011: {
        text: 'A WordArt-ot  PowerPoint által megadott színekkel is kitölthetem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_537.id
    },
    answer_2012: {
        text: 'A WordArt-ot az internetről letöltött képpel is kitölthetem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_537.id
    },
    answer_2013: {
        text: 'Áttetszőség',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_538.id
    },
    answer_2014: {
        text: 'Méret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_538.id
    },
    answer_2015: {
        text: 'Elmosás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_538.id
    },
    answer_2016: {
        text: 'Térköz',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_538.id
    },
    answer_2017: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Kiigazítás menüben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_539.id
    },
    answer_2018: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Szín részben a Kiigazítás ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_539.id
    },
    answer_2019: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Kiigazítás részben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_539.id
    },
    answer_2020: {
        text: 'Nem lehet a beszúrt képet formázni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_539.id
    },
    answer_2021: {
        text: 'Első oszlop',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_540.id
    },
    answer_2022: {
        text: 'Középső oszlop',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_540.id
    },
    answer_2023: {
        text: 'Utolsó oszlop',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_540.id
    },
    answer_2024: {
        text: 'Összegsor',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_540.id
    },
    answer_2025: {
        text: 'Keretezés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_541.id
    },
    answer_2026: {
        text: 'Árnyékolás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_541.id
    },
    answer_2027: {
        text: 'Tükröződés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_541.id
    },
    answer_2028: {
        text: 'Fazetta',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_541.id
    },
    answer_2029: {
        text: 'Semmiben.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_542.id
    },
    answer_2030: {
        text: 'A csatolt kép követi az eredeti képen a PowerPointtól függetlenül elvégzett változtatásokat. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_542.id
    },
    answer_2031: {
        text: 'A csatolt kép nagyobb felbontású.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_542.id
    },
    answer_2032: {
        text: 'A csatolt kép nem szekeszthető, de a beszúrt igen.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_542.id
    },
    answer_2033: {
        text: 'A szövegdoboz vonalain 8 darab pont van.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_543.id
    },
    answer_2034: {
        text: 'A csúcsokon lévő pontok segítségével nyújtom a szövegdobozt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_543.id
    },
    answer_2035: {
        text: 'Az oldalfelezőkön lévő pontok segítségével elforgatom a szövegdobozt.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_543.id
    },
    answer_2036: {
        text: 'A nyújtás méretarányos átméretezés.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_543.id
    },
    answer_2037: {
        text: 'Igen, jelképes 1 eurós árért.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_544.id
    },
    answer_2038: {
        text: 'Nem.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_544.id
    },
    answer_2039: {
        text: 'Igen, a szerző feltüntetésével.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_544.id
    },
    answer_2040: {
        text: 'Igen, de csak, ha a Chrome böngészővel kerestem a képet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_544.id
    },
    answer_2041: {
        text: 'Felső fazetta',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_545.id
    },
    answer_2042: {
        text: 'Alsó fazetta',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_545.id
    },
    answer_2043: {
        text: 'WordArt',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_545.id
    },
    answer_2044: {
        text: 'Megvilágítás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_545.id
    },
    answer_2045: {
        text: 'Fekete-fehérré teszi azt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_546.id
    },
    answer_2046: {
        text: 'Egyből törli.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_546.id
    },
    answer_2047: {
        text: 'Feketébe borítja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_546.id
    },
    answer_2048: {
        text: 'Ciklámen színnel.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_546.id
    },
    answer_2049: {
        text: 'Win + Alt + Q',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_547.id
    },
    answer_2050: {
        text: 'Win + Ctrl + Q',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_547.id
    },
    answer_2051: {
        text: 'Win + Ctrl + Q + Enter',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_547.id
    },
    answer_2052: {
        text: 'Win + Shift + Q',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_547.id
    },
    answer_2053: {
        text: 'A videó végén lévő kép.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_548.id
    },
    answer_2054: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és teljesen testreszabható.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_548.id
    },
    answer_2055: {
        text: 'Az a kép, ami a beszúrt videó végén van, a lejátszás után kerül oda, és teljesen testreszabható.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_548.id
    },
    answer_2056: {
        text: 'Az a kép, ami a beszúrt videón van annak elindításáig, és a videó egyik kockáját mutatja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_548.id
    },
    answer_2057: {
        text: 'Másodperc pontossággal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_549.id
    },
    answer_2058: {
        text: 'Nem vágható.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_549.id
    },
    answer_2059: {
        text: 'Perc pontossággal.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_549.id
    },
    answer_2060: {
        text: 'Ezredmásodperc pontossággal.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_549.id
    },
    answer_2061: {
        text: 'A videó lejátszásának általam beállított első szakaszában a nyitókép elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a videó.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_550.id
    },
    answer_2062: {
        text: 'A videó lejátszásának általam beállított utolsó szakaszában a videó elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a nyitókép.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_550.id
    },
    answer_2063: {
        text: 'A videó színeit sötétebbre állítom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_550.id
    },
    answer_2064: {
        text: 'A videó színeit halványabbra állítom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_550.id
    },
    answer_2065: {
        text: 'Rossz diaszám volt megadva.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_551.id
    },
    answer_2066: {
        text: 'Páratlan sorszámú diára kerülhet csak élőfej és élőláb.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_551.id
    },
    answer_2067: {
        text: 'A címdiát duplikáltuk, és a beállításnal nem kértünk a címdiára élőfejet, élőlábat. Így a duplikált dia sem kap ilyet.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_551.id
    },
    answer_2068: {
        text: 'Nem volt hiba a végrehajtásban. A PowerPoint néha hibázik, ilyenkor frissíteni kell.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_551.id
    },
    answer_2069: {
        text: 'Kezdőlap menü >> Elrendezések rész >> Diák gomb (a videón: beépített elrendezések).',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_552.id
    },
    answer_2070: {
        text: 'Csak a szöveget lehet formázni a mentés után.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_552.id
    },
    answer_2071: {
        text: 'Nem lehet utólag átrendezni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_552.id
    },
    answer_2072: {
        text: 'Kezdőlap menü >> Diák rész >> Elrendezések gomb (a videón: beépített elrendezések).',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_552.id
    },
    answer_2073: {
        text: 'Diaméret menü >> Tervezés >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_553.id
    },
    answer_2074: {
        text: 'Diaméret menü >> Dia mérete >>  Tervezés párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_553.id
    },
    answer_2075: {
        text: 'Tervezés menü >> Diaméret >> Dia mérete párbeszédablak >> Szélesség >> itt megadom a kért adatot.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_553.id
    },
    answer_2076: {
        text: 'Csak centiméteres pontosságú beállítás érvényes.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_553.id
    },
    answer_2077: {
        text: 'Ha ketten nézzük a diavetítést.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_554.id
    },
    answer_2078: {
        text: 'Ha például projektorra ki tudom vetíteni az előadást, és a nézők a kivetítést nézik, nekem meg a PowerPoint a laptopomon mutatja, hogy mi következik, és mit mondjak még el a dia mellé.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_554.id
    },
    answer_2079: {
        text: 'Ha makróra rögzítem a prezentációt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_554.id
    },
    answer_2080: {
        text: 'Ha önismétlő prezentációt adok elő.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_554.id
    },
    answer_2081: {
        text: 'Nem kötelező számozni a diákat.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_555.id
    },
    answer_2082: {
        text: 'A számozás mellé a dátumot is odailleszthetem, és beállíthatom, hogy a dátum fix legyen, azaz ne frissüljön.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_555.id
    },
    answer_2083: {
        text: 'A címdián mindig van számozás, ezt nem lehet letiltani.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_555.id
    },
    answer_2084: {
        text: 'A számozás mellé a dátumot is odailleszthetem, és beállíthatom, hogy a dátum frissüljön.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_555.id
    },
    answer_2085: {
        text: 'Ctrl + Shift +K',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_556.id
    },
    answer_2086: {
        text: 'Shift + K',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_556.id
    },
    answer_2087: {
        text: 'Alt + Ctrl + K',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_556.id
    },
    answer_2088: {
        text: 'Ctrl + K',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_556.id
    },
    answer_2089: {
        text: '.pptx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_557.id
    },
    answer_2090: {
        text: '.ppsx',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_557.id
    },
    answer_2091: {
        text: '.pppsx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_557.id
    },
    answer_2092: {
        text: '.ptpx',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_557.id
    },
    answer_2093: {
        text: 'Nem lehet.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_558.id
    },
    answer_2094: {
        text: 'Csak az alapértelmezett helyekre lehet. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_558.id
    },
    answer_2095: {
        text: 'Beszúrás menü >> Szöveg >> Szövegdoboz >> majd egérrel kijelölöm a dián a helyet.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_558.id
    },
    answer_2096: {
        text: 'Nézet menü >> Szövegdoboz.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_558.id
    },
    answer_2097: {
        text: 'Nyomtatást',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_559.id
    },
    answer_2098: {
        text: 'Mentést',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_559.id
    },
    answer_2099: {
        text: 'Új dia beszúrását',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_559.id
    },
    answer_2100: {
        text: 'Új prezentáció létrehozását',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_559.id
    },
    answer_2101: {
        text: 'Csak szabványméretek vannak.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_560.id
    },
    answer_2102: {
        text: 'Tervezés menü >> Diaméret >> Egyéni diaméret ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_560.id
    },
    answer_2103: {
        text: 'Nézet menü >> Egyéni diaméret',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_560.id
    },
    answer_2104: {
        text: 'Formátum menü >> Diaméret >> Egyéni diaméret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_560.id
    },
    answer_2105: {
        text: 'AltGr',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_561.id
    },
    answer_2106: {
        text: 'Alt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_561.id
    },
    answer_2107: {
        text: 'Shift',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_561.id
    },
    answer_2108: {
        text: 'Ctrl',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_561.id
    },
    answer_2109: {
        text: 'Betűszínt',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_562.id
    },
    answer_2110: {
        text: 'Betűtípust',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_562.id
    },
    answer_2111: {
        text: 'Méretet és a szövegkiemelés színét',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_562.id
    },
    answer_2112: {
        text: 'Igazítást',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_562.id
    },
    answer_2113: {
        text: 'kb. 60cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_563.id
    },
    answer_2114: {
        text: 'kb. 6 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_563.id
    },
    answer_2115: {
        text: 'kb. 24 cm',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_563.id
    },
    answer_2116: {
        text: 'kb 2,4 cm',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_563.id
    },
    answer_2117: {
        text: 'A kijelölt rész betűit mindenképpen kisbetűre állítja',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_564.id
    },
    answer_2118: {
        text: 'A kijelölt rész betűméretét kisebbre vagy nagyobbra állítja',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_564.id
    },
    answer_2119: {
        text: 'A kijelölt rész betűi közül az eredetileg nagybetűket kicsire cseréli, a kisbetűket pedig nagyra.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_564.id
    },
    answer_2120: {
        text: 'Az alapértelmezett betűtípust változtatja meg.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_564.id
    },
    answer_2121: {
        text: 'balra zár',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_565.id
    },
    answer_2122: {
        text: 'jobbra zár',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_565.id
    },
    answer_2123: {
        text: 'középre zár',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_565.id
    },
    answer_2124: {
        text: 'mindkét margóhoz igazít',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_565.id
    },
    answer_2125: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Kiigazítás menüben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_566.id
    },
    answer_2126: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Szín részben a Kiigazítás ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_566.id
    },
    answer_2127: {
        text: 'A kép beszúrása után kattintok a WordArton - majd a Képformátum menün a Kiigazítás részben a Szín ikonra kattintok. Ott a lenyíló menüben választom ki a megfelelő színt. ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_566.id
    },
    answer_2128: {
        text: 'Nem lehet a beszúrt képet formázni.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_566.id
    },
    answer_2129: {
        text: 'Keretezés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_567.id
    },
    answer_2130: {
        text: 'Árnyékolás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_567.id
    },
    answer_2131: {
        text: 'Tükröződés',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_567.id
    },
    answer_2132: {
        text: 'Fazetta',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_567.id
    },
    answer_2133: {
        text: 'Kattintok az első, majd a második dián >> Áttűnések menü >> Időzítés résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_568.id
    },
    answer_2134: {
        text: 'Kattintok a második dián >> Áttűnések menü >> Időzítés résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_568.id
    },
    answer_2135: {
        text: 'Kattintok az első dián >> Időzítés menü >> Áttűnések résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_568.id
    },
    answer_2136: {
        text: 'Kattintok az első dián >> Áttűnések menü >> Időzítés résznél >> Továbbítás >> Ennyi idő után: >> Beállítom a megfelelő időt.  ',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_568.id
    },
    answer_2137: {
        text: 'A jobb oldalon a dia száma alatt van egy csillag.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_569.id
    },
    answer_2138: {
        text: 'A bal oldalon a dia száma alatt van egy csillag.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_569.id
    },
    answer_2139: {
        text: 'A dia piros keretet kap a jobb oldalon.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_569.id
    },
    answer_2140: {
        text: 'Elindul az áttűnés, ha jobb egérgombbal kattintok kettőt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_569.id
    },
    answer_2141: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűméretét.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_570.id
    },
    answer_2142: {
        text: 'A PowerPoint automatikusan a szövegdobozt igazítja a beírt szöveg betűméretéhez.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_570.id
    },
    answer_2143: {
        text: 'A PowerPoint nem igazítja automatikusan a szövegdobozhoz a beírt szöveg betűméretét.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_570.id
    },
    answer_2144: {
        text: 'A PowerPoint automatikusan a szövegdobozhoz igazítja a beírt szöveg betűtípusát.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_570.id
    },
    answer_2145: {
        text: 'Fekete-fehérré teszi azt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_571.id
    },
    answer_2146: {
        text: 'Egyből törli.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_571.id
    },
    answer_2147: {
        text: 'Feketébe borítja.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_571.id
    },
    answer_2148: {
        text: 'Ciklámen színnel.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_571.id
    },
    answer_2149: {
        text: 'Címdiát.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_572.id
    },
    answer_2150: {
        text: 'Hátteret.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_572.id
    },
    answer_2151: {
        text: 'Térhatást.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_572.id
    },
    answer_2152: {
        text: 'Bármit.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_572.id
    },
    answer_2153: {
        text: 'A videó lejátszásának általam beállított első szakaszában a nyitókép elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a videó.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_573.id
    },
    answer_2154: {
        text: 'A videó lejátszásának általam beállított utolsó szakaszában a videó elhaványul, és ezzel ellentétesen egyre erősebben tűnik elő a nyitókép.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_573.id
    },
    answer_2155: {
        text: 'A videó színeit sötétebbre állítom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_573.id
    },
    answer_2156: {
        text: 'A videó színeit halványabbra állítom.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_573.id
    },
    answer_2157: {
        text: 'Ha ketten nézzük a diavetítést.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_574.id
    },
    answer_2158: {
        text: 'Ha például projektorra ki tudom vetíteni az előadást, és a nézők a kivetítést nézik, nekem meg a PowerPoint a laptopomon mutatja, hogy mi következik, és mit mondjak még el a dia mellé.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_574.id
    },
    answer_2159: {
        text: 'Ha makróra rögzítem a prezentációt.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_574.id
    },
    answer_2160: {
        text: 'Ha önismétlő prezentációt adok elő.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_574.id
    },
    answer_2161: {
        text: 'A jobb oldalon a Háttér formázása munkaablakon kattintok a Mindegyikre feliratú gombra. Ekkor az aktív dia háttere kerül az összes diára.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_575.id
    },
    answer_2162: {
        text: 'A jobb oldalon a Háttér formázása munkaablakon kattintok a Mindegyikre feliratú gombra. Ekkor a címdia háttere kerül az összes diára.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_575.id
    },
    answer_2163: {
        text: 'A bal oldalon a Háttér formázása munkaablakon kattintok a Mindegyikre feliratú gombra. Ekkor a címdia háttere kerül az összes diára.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_575.id
    },
    answer_2164: {
        text: 'A Tervezés menüban a Diaformátum ikonra kattintok.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_575.id
    },
    answer_2165: {
        text: 'Jobb vagy bal kattintás.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_576.id
    },
    answer_2166: {
        text: 'A rámutatás, vagy a kattintás a gombon.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_576.id
    },
    answer_2167: {
        text: 'F1 vagy rámutatás.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_576.id
    },
    answer_2168: {
        text: 'Csak a kattintás.',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_576.id
    },


    /* Precourse exam answers for 
    * Excel course #27
    * Precourse exam #43
    * Questions #580-584
    */
    answer_2169: {
        text: 'Kezdőlap',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_580.id
    },
    answer_2170: {
        text: 'Beszúrás',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_580.id
    },
    answer_2171: {
        text: 'Adatok',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_580.id
    },
    answer_2172: {
        text: 'Képletek',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_580.id
    },

    answer_2173: {
        text: 'Nem lehet',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_581.id
    },
    answer_2174: {
        text: 'Formátum',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_581.id
    },
    answer_2175: {
        text: 'Adatok érvényesítése',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_581.id
    },
    answer_2176: {
        text: 'Adatok érvényesítése >> Hibajelzés fül',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_581.id
    },

    answer_2177: {
        text: 'Mert ha tagolva van és nem szám a formátum, akkor a tagolást szóköznek veszi az Excel és nem fog tudni számolni.',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_582.id
    },
    answer_2178: {
        text: 'Mert így kevesebb lesz az adat, amit át kell konvertálni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_582.id
    },
    answer_2179: {
        text: 'Nem kell',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_582.id
    },
    answer_2180: {
        text: 'Mert tizedes törtet nem tud átkonvertálni',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_582.id
    },

    answer_2181: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak elrejti',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_583.id
    },
    answer_2182: {
        text: 'Áttekinthetőbb lesz a táblázat, a felesleges adatokat törli az Excel',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_583.id
    },
    answer_2183: {
        text: 'Áttekinthetőbb lesz a táblázat de a felesleges adatokat nem törli az Excel, csak másik munkalapra menti',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_583.id
    },
    answer_2184: {
        text: 'Az Excel a kiszűrt adatokat törli',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_583.id
    },

    answer_2185: {
        text: 'Igen, de csak szaggatott vonallal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_584.id
    },
    answer_2186: {
        text: 'Igen, de csak dupla vonallal',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_584.id
    },
    answer_2187: {
        text: 'Igen',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_584.id
    },
    answer_2188: {
        text: 'Nem',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_584.id
    },

    /* Precourse exam answers for 
    * PP/Word/OBS courses #28,#17,#22
    * Precourse exam #39,#40,#41
    * Questions #585-587
    */

    answer_2189: {
        text: 'a',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_585.id
    },
    answer_2190: {
        text: 'b',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_585.id
    },
    answer_2191: {
        text: 'c',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_585.id
    },
    answer_2192: {
        text: 'd',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_585.id
    },

    answer_2193: {
        text: 'a',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_586.id
    },
    answer_2194: {
        text: 'b',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_586.id
    },
    answer_2195: {
        text: 'c',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_586.id
    },
    answer_2196: {
        text: 'd',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_586.id
    },

    answer_2197: {
        text: 'a',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_587.id
    },
    answer_2198: {
        text: 'b',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_587.id
    },
    answer_2199: {
        text: 'c',
        deletionDate: null,
        isCorrect: true,
        questionId: seed_questions.question_587.id
    },
    answer_2200: {
        text: 'd',
        deletionDate: null,
        isCorrect: null,
        questionId: seed_questions.question_587.id
    }
});
export default list;