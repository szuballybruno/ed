import { VideoFile } from '../../models/entity/video/VideoFile';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { StorageFileSeedDataType } from './seed_storage_file';

export const getVideoFilesSeedData = (storageFiles: StorageFileSeedDataType) => getSeedList<VideoFile>()({

    video_file_60: {
        lengthSeconds: 511.133333,
        storageFileId: storageFiles.storage_file_80.id,
    },
    video_file_54: {
        lengthSeconds: 123.533333,
        storageFileId: storageFiles.storage_file_74.id,
    },
    video_file_42: {
        lengthSeconds: 102.833333,
        storageFileId: storageFiles.storage_file_57.id,
    },
    video_file_61: {
        lengthSeconds: 135.7,
        storageFileId: storageFiles.storage_file_81.id,
    },
    video_file_62: {
        lengthSeconds: 283.066667,
        storageFileId: storageFiles.storage_file_82.id,
    },
    video_file_63: {
        lengthSeconds: 266.333333,
        storageFileId: storageFiles.storage_file_83.id,
    },
    video_file_27: {
        lengthSeconds: 198.466667,
        storageFileId: storageFiles.storage_file_40.id,
    },
    video_file_52: {
        lengthSeconds: 152.166667,
        storageFileId: storageFiles.storage_file_72.id,
    },
    video_file_53: {
        lengthSeconds: 136.8,
        storageFileId: storageFiles.storage_file_73.id,
    },
    video_file_76: {
        lengthSeconds: 124.2,
        storageFileId: storageFiles.storage_file_97.id,
    },
    video_file_70: {
        lengthSeconds: 255,
        storageFileId: storageFiles.storage_file_91.id,
    },
    video_file_67: {
        lengthSeconds: 250.866667,
        storageFileId: storageFiles.storage_file_88.id,
    },
    video_file_56: {
        lengthSeconds: 371.3,
        storageFileId: storageFiles.storage_file_76.id,
    },
    video_file_28: {
        lengthSeconds: 261.166667,
        storageFileId: storageFiles.storage_file_43.id,
    },
    video_file_29: {
        lengthSeconds: 248.766667,
        storageFileId: storageFiles.storage_file_42.id,
    },
    video_file_64: {
        lengthSeconds: 151.433333,
        storageFileId: storageFiles.storage_file_84.id,
    },
    video_file_30: {
        lengthSeconds: 168.566667,
        storageFileId: storageFiles.storage_file_44.id,
    },
    video_file_31: {
        lengthSeconds: 164.466667,
        storageFileId: storageFiles.storage_file_45.id,
    },
    video_file_32: {
        lengthSeconds: 239.2,
        storageFileId: storageFiles.storage_file_46.id,
    },
    video_file_33: {
        lengthSeconds: 225,
        storageFileId: storageFiles.storage_file_47.id,
    },
    video_file_34: {
        lengthSeconds: 284.633333,
        storageFileId: storageFiles.storage_file_48.id,
    },
    video_file_35: {
        lengthSeconds: 242.733333,
        storageFileId: storageFiles.storage_file_49.id,
    },
    video_file_36: {
        lengthSeconds: 104.233333,
        storageFileId: storageFiles.storage_file_50.id,
    },
    video_file_37: {
        lengthSeconds: 345.833333,
        storageFileId: storageFiles.storage_file_51.id,
    },
    video_file_38: {
        lengthSeconds: 317.3,
        storageFileId: storageFiles.storage_file_52.id,
    },
    video_file_55: {
        lengthSeconds: 380,
        storageFileId: storageFiles.storage_file_75.id,
    },
    video_file_80: {
        lengthSeconds: 120.633333,
        storageFileId: storageFiles.storage_file_101.id,
    },
    video_file_39: {
        lengthSeconds: 290.066667,
        storageFileId: storageFiles.storage_file_53.id,
    },
    video_file_40: {
        lengthSeconds: 464.066667,
        storageFileId: storageFiles.storage_file_55.id,
    },
    video_file_71: {
        lengthSeconds: 345.066667,
        storageFileId: storageFiles.storage_file_92.id,
    },
    video_file_77: {
        lengthSeconds: 115.033333,
        storageFileId: storageFiles.storage_file_98.id,
    },
    video_file_72: {
        lengthSeconds: 188.066667,
        storageFileId: storageFiles.storage_file_93.id,
    },
    video_file_41: {
        lengthSeconds: 317.466667,
        storageFileId: storageFiles.storage_file_56.id,
    },
    video_file_68: {
        lengthSeconds: 268,
        storageFileId: storageFiles.storage_file_89.id,
    },
    video_file_73: {
        lengthSeconds: 225.033333,
        storageFileId: storageFiles.storage_file_94.id,
    },
    video_file_65: {
        lengthSeconds: 205.566667,
        storageFileId: storageFiles.storage_file_85.id,
    },
    video_file_66: {
        lengthSeconds: 166.5,
        storageFileId: storageFiles.storage_file_86.id,
    },
    video_file_57: {
        lengthSeconds: 138.6,
        storageFileId: storageFiles.storage_file_77.id,
    },
    video_file_58: {
        lengthSeconds: 260.233333,
        storageFileId: storageFiles.storage_file_78.id,
    },
    video_file_59: {
        lengthSeconds: 377.066667,
        storageFileId: storageFiles.storage_file_79.id,
    },
    video_file_69: {
        lengthSeconds: 147.933333,
        storageFileId: storageFiles.storage_file_90.id,
    },
    video_file_78: {
        lengthSeconds: 415.1,
        storageFileId: storageFiles.storage_file_99.id,
    },
    video_file_74: {
        lengthSeconds: 229.033333,
        storageFileId: storageFiles.storage_file_95.id,
    },
    video_file_81: {
        lengthSeconds: 308.266667,
        storageFileId: storageFiles.storage_file_102.id,
    },
    video_file_75: {
        lengthSeconds: 382.666667,
        storageFileId: storageFiles.storage_file_96.id,
    },
    video_file_83: {
        lengthSeconds: 179.3,
        storageFileId: storageFiles.storage_file_104.id,
    },
    video_file_79: {
        lengthSeconds: 309.933333,
        storageFileId: storageFiles.storage_file_100.id,
    },
    video_file_82: {
        lengthSeconds: 239.866667,
        storageFileId: storageFiles.storage_file_103.id,
    },
    video_file_84: {
        lengthSeconds: 227.766667,
        storageFileId: storageFiles.storage_file_105.id,
    },
    video_file_86: {
        lengthSeconds: 78.433333,
        storageFileId: storageFiles.storage_file_107.id,
    },
    video_file_85: {
        lengthSeconds: 103.133333,
        storageFileId: storageFiles.storage_file_106.id,
    },
    video_file_88: {
        lengthSeconds: 144,
        storageFileId: storageFiles.storage_file_112.id,
    },
    video_file_89: {
        lengthSeconds: 287.333333,
        storageFileId: storageFiles.storage_file_110.id,
    },
    video_file_90: {
        lengthSeconds: 173.733333,
        storageFileId: storageFiles.storage_file_111.id,
    },
    video_file_87: {
        lengthSeconds: 292.066667,
        storageFileId: storageFiles.storage_file_108.id,
    },
    video_file_44: {
        lengthSeconds: 177.566667,
        storageFileId: storageFiles.storage_file_70.id,
    },
    video_file_51: {
        lengthSeconds: 222.933333,
        storageFileId: storageFiles.storage_file_71.id,
    },
    video_file_113: {
        lengthSeconds: 410.133333,
        storageFileId: storageFiles.storage_file_136.id,
    },
    video_file_109: {
        lengthSeconds: 193.6,
        storageFileId: storageFiles.storage_file_132.id,
    },
    video_file_114: {
        lengthSeconds: 94.2,
        storageFileId: storageFiles.storage_file_137.id,
    },
    video_file_125: {
        lengthSeconds: 100.266667,
        storageFileId: storageFiles.storage_file_148.id,
    },
    video_file_115: {
        lengthSeconds: 357.433333,
        storageFileId: storageFiles.storage_file_138.id,
    },
    video_file_116: {
        lengthSeconds: 318.766667,
        storageFileId: storageFiles.storage_file_139.id,
    },
    video_file_117: {
        lengthSeconds: 537.666667,
        storageFileId: storageFiles.storage_file_140.id,
    },
    video_file_118: {
        lengthSeconds: 136.2,
        storageFileId: storageFiles.storage_file_141.id,
    },
    video_file_127: {
        lengthSeconds: 115.033333,
        storageFileId: storageFiles.storage_file_150.id,
    },
    video_file_110: {
        lengthSeconds: 231.2,
        storageFileId: storageFiles.storage_file_133.id,
    },
    video_file_111: {
        lengthSeconds: 219.466667,
        storageFileId: storageFiles.storage_file_134.id,
    },
    video_file_45: {
        lengthSeconds: 142.2,
        storageFileId: storageFiles.storage_file_63.id,
    },
    video_file_46: {
        lengthSeconds: 271.033333,
        storageFileId: storageFiles.storage_file_66.id,
    },
    video_file_47: {
        lengthSeconds: 304.033333,
        storageFileId: storageFiles.storage_file_65.id,
    },
    video_file_48: {
        lengthSeconds: 362.1,
        storageFileId: storageFiles.storage_file_67.id,
    },
    video_file_49: {
        lengthSeconds: 404.733333,
        storageFileId: storageFiles.storage_file_68.id,
    },
    video_file_50: {
        lengthSeconds: 379.566667,
        storageFileId: storageFiles.storage_file_69.id,
    },
    video_file_119: {
        lengthSeconds: 226.8,
        storageFileId: storageFiles.storage_file_142.id,
    },
    video_file_112: {
        lengthSeconds: 360.466667,
        storageFileId: storageFiles.storage_file_135.id,
    },
    video_file_126: {
        lengthSeconds: 304.4,
        storageFileId: storageFiles.storage_file_151.id,
    },
    video_file_108: {
        lengthSeconds: 81.433333,
        storageFileId: storageFiles.storage_file_131.id,
    },
    video_file_120: {
        lengthSeconds: 144.3,
        storageFileId: storageFiles.storage_file_143.id,
    },
    video_file_128: {
        lengthSeconds: 148.7,
        storageFileId: storageFiles.storage_file_152.id,
    },
    video_file_121: {
        lengthSeconds: 68.7,
        storageFileId: storageFiles.storage_file_144.id,
    },
    video_file_122: {
        lengthSeconds: 76.4,
        storageFileId: storageFiles.storage_file_145.id,
    },
    video_file_129: {
        lengthSeconds: 110.333333,
        storageFileId: storageFiles.storage_file_153.id,
    },
    video_file_123: {
        lengthSeconds: 125.333333,
        storageFileId: storageFiles.storage_file_146.id,
    },
    video_file_124: {
        lengthSeconds: 112.633333,
        storageFileId: storageFiles.storage_file_147.id,
    },
    video_file_91: {
        lengthSeconds: 98,
        storageFileId: storageFiles.storage_file_114.id,
    },
    video_file_92: {
        lengthSeconds: 64.633333,
        storageFileId: storageFiles.storage_file_113.id,
    },
    video_file_150: {
        lengthSeconds: 225.033333,
        storageFileId: storageFiles.storage_file_188.id,
    },
    video_file_144: {
        lengthSeconds: 242.733333,
        storageFileId: storageFiles.storage_file_182.id,
    },
    video_file_132: {
        lengthSeconds: 254.9,
        storageFileId: storageFiles.storage_file_170.id,
    },
    video_file_145: {
        lengthSeconds: 104.233333,
        storageFileId: storageFiles.storage_file_183.id,
    },
    video_file_133: {
        lengthSeconds: 248.533333,
        storageFileId: storageFiles.storage_file_171.id,
    },
    video_file_159: {
        lengthSeconds: 188.066667,
        storageFileId: storageFiles.storage_file_196.id,
    },
    video_file_134: {
        lengthSeconds: 231.5,
        storageFileId: storageFiles.storage_file_172.id,
    },
    video_file_135: {
        lengthSeconds: 152.166667,
        storageFileId: storageFiles.storage_file_173.id,
    },
    video_file_156: {
        lengthSeconds: 268,
        storageFileId: storageFiles.storage_file_193.id,
    },
    video_file_152: {
        lengthSeconds: 138.6,
        storageFileId: storageFiles.storage_file_189.id,
    },
    video_file_136: {
        lengthSeconds: 136.8,
        storageFileId: storageFiles.storage_file_174.id,
    },
    video_file_137: {
        lengthSeconds: 123.533333,
        storageFileId: storageFiles.storage_file_175.id,
    },
    video_file_161: {
        lengthSeconds: 377.066667,
        storageFileId: storageFiles.storage_file_198.id,
    },
    video_file_138: {
        lengthSeconds: 380,
        storageFileId: storageFiles.storage_file_176.id,
    },
    video_file_153: {
        lengthSeconds: 260.233333,
        storageFileId: storageFiles.storage_file_190.id,
    },
    video_file_139: {
        lengthSeconds: 371.3,
        storageFileId: storageFiles.storage_file_177.id,
    },
    video_file_147: {
        lengthSeconds: 345.833333,
        storageFileId: storageFiles.storage_file_185.id,
    },
    video_file_140: {
        lengthSeconds: 164.466667,
        storageFileId: storageFiles.storage_file_178.id,
    },
    video_file_148: {
        lengthSeconds: 317.3,
        storageFileId: storageFiles.storage_file_186.id,
    },
    video_file_141: {
        lengthSeconds: 239.2,
        storageFileId: storageFiles.storage_file_179.id,
    },
    video_file_165: {
        lengthSeconds: 283.066667,
        storageFileId: storageFiles.storage_file_201.id,
    },
    video_file_157: {
        lengthSeconds: 147.933333,
        storageFileId: storageFiles.storage_file_194.id,
    },
    video_file_142: {
        lengthSeconds: 225,
        storageFileId: storageFiles.storage_file_180.id,
    },
    video_file_149: {
        lengthSeconds: 290.066667,
        storageFileId: storageFiles.storage_file_187.id,
    },
    video_file_143: {
        lengthSeconds: 284.633333,
        storageFileId: storageFiles.storage_file_181.id,
    },
    video_file_154: {
        lengthSeconds: 135.7,
        storageFileId: storageFiles.storage_file_191.id,
    },
    video_file_160: {
        lengthSeconds: 254.566667,
        storageFileId: storageFiles.storage_file_197.id,
    },
    video_file_158: {
        lengthSeconds: 255,
        storageFileId: storageFiles.storage_file_195.id,
    },
    video_file_155: {
        lengthSeconds: 250.866667,
        storageFileId: storageFiles.storage_file_192.id,
    },
    video_file_164: {
        lengthSeconds: 256.966667,
        storageFileId: storageFiles.storage_file_200.id,
    },
    video_file_163: {
        lengthSeconds: 245.066667,
        storageFileId: storageFiles.storage_file_199.id,
    },
    video_file_166: {
        lengthSeconds: 266.333333,
        storageFileId: storageFiles.storage_file_202.id,
    },
    video_file_167: {
        lengthSeconds: 345.066667,
        storageFileId: storageFiles.storage_file_203.id,
    },
    video_file_168: {
        lengthSeconds: 175,
        storageFileId: storageFiles.storage_file_204.id,
    },
    video_file_169: {
        lengthSeconds: 225.033333,
        storageFileId: storageFiles.storage_file_205.id,
    },
    video_file_170: {
        lengthSeconds: 229.033333,
        storageFileId: storageFiles.storage_file_206.id,
    },
    video_file_171: {
        lengthSeconds: 382.666667,
        storageFileId: storageFiles.storage_file_207.id,
    },
    video_file_403: {
        lengthSeconds: 168.7,
        storageFileId: storageFiles.storage_file_445.id,
    },
    video_file_172: {
        lengthSeconds: 124.2,
        storageFileId: storageFiles.storage_file_208.id,
    },
    video_file_205: {
        lengthSeconds: 87.5,
        storageFileId: storageFiles.storage_file_242.id,
    },
    video_file_187: {
        lengthSeconds: 308.266667,
        storageFileId: storageFiles.storage_file_224.id,
    },
    video_file_173: {
        lengthSeconds: 209.3,
        storageFileId: storageFiles.storage_file_209.id,
    },
    video_file_219: {
        lengthSeconds: 241.466667,
        storageFileId: storageFiles.storage_file_256.id,
    },
    video_file_174: {
        lengthSeconds: 224.5,
        storageFileId: storageFiles.storage_file_210.id,
    },
    video_file_198: {
        lengthSeconds: 266.466667,
        storageFileId: storageFiles.storage_file_235.id,
    },
    video_file_188: {
        lengthSeconds: 239.866667,
        storageFileId: storageFiles.storage_file_225.id,
    },
    video_file_175: {
        lengthSeconds: 268,
        storageFileId: storageFiles.storage_file_211.id,
    },
    video_file_211: {
        lengthSeconds: 407.166667,
        storageFileId: storageFiles.storage_file_248.id,
    },
    video_file_176: {
        lengthSeconds: 222,
        storageFileId: storageFiles.storage_file_212.id,
    },
    video_file_189: {
        lengthSeconds: 179.3,
        storageFileId: storageFiles.storage_file_226.id,
    },
    video_file_206: {
        lengthSeconds: 167.4,
        storageFileId: storageFiles.storage_file_243.id,
    },
    video_file_177: {
        lengthSeconds: 348,
        storageFileId: storageFiles.storage_file_213.id,
    },
    video_file_199: {
        lengthSeconds: 219.633333,
        storageFileId: storageFiles.storage_file_236.id,
    },
    video_file_190: {
        lengthSeconds: 227.766667,
        storageFileId: storageFiles.storage_file_227.id,
    },
    video_file_178: {
        lengthSeconds: 309,
        storageFileId: storageFiles.storage_file_214.id,
    },
    video_file_214: {
        lengthSeconds: 103.033333,
        storageFileId: storageFiles.storage_file_251.id,
    },
    video_file_179: {
        lengthSeconds: 144.766667,
        storageFileId: storageFiles.storage_file_215.id,
    },
    video_file_191: {
        lengthSeconds: 263.266667,
        storageFileId: storageFiles.storage_file_228.id,
    },
    video_file_180: {
        lengthSeconds: 235.233333,
        storageFileId: storageFiles.storage_file_216.id,
    },
    video_file_200: {
        lengthSeconds: 119.1,
        storageFileId: storageFiles.storage_file_237.id,
    },
    video_file_217: {
        lengthSeconds: 160.966667,
        storageFileId: storageFiles.storage_file_254.id,
    },
    video_file_192: {
        lengthSeconds: 317.733333,
        storageFileId: storageFiles.storage_file_229.id,
    },
    video_file_207: {
        lengthSeconds: 201.6,
        storageFileId: storageFiles.storage_file_244.id,
    },
    video_file_201: {
        lengthSeconds: 222.766667,
        storageFileId: storageFiles.storage_file_238.id,
    },
    video_file_193: {
        lengthSeconds: 227.866667,
        storageFileId: storageFiles.storage_file_230.id,
    },
    video_file_183: {
        lengthSeconds: 115.033333,
        storageFileId: storageFiles.storage_file_219.id,
    },
    video_file_212: {
        lengthSeconds: 294.933333,
        storageFileId: storageFiles.storage_file_249.id,
    },
    video_file_184: {
        lengthSeconds: 415.1,
        storageFileId: storageFiles.storage_file_220.id,
    },
    video_file_194: {
        lengthSeconds: 320.6,
        storageFileId: storageFiles.storage_file_231.id,
    },
    video_file_215: {
        lengthSeconds: 148.1,
        storageFileId: storageFiles.storage_file_252.id,
    },
    video_file_185: {
        lengthSeconds: 309.933333,
        storageFileId: storageFiles.storage_file_222.id,
    },
    video_file_202: {
        lengthSeconds: 207.233333,
        storageFileId: storageFiles.storage_file_239.id,
    },
    video_file_195: {
        lengthSeconds: 199.766667,
        storageFileId: storageFiles.storage_file_232.id,
    },
    video_file_186: {
        lengthSeconds: 120.633333,
        storageFileId: storageFiles.storage_file_223.id,
    },
    video_file_222: {
        lengthSeconds: 163.833333,
        storageFileId: storageFiles.storage_file_259.id,
    },
    video_file_203: {
        lengthSeconds: 193.666667,
        storageFileId: storageFiles.storage_file_240.id,
    },
    video_file_196: {
        lengthSeconds: 200.1,
        storageFileId: storageFiles.storage_file_233.id,
    },
    video_file_221: {
        lengthSeconds: 309.766667,
        storageFileId: storageFiles.storage_file_258.id,
    },
    video_file_208: {
        lengthSeconds: 276,
        storageFileId: storageFiles.storage_file_245.id,
    },
    video_file_197: {
        lengthSeconds: 227.833333,
        storageFileId: storageFiles.storage_file_234.id,
    },
    video_file_209: {
        lengthSeconds: 158.066667,
        storageFileId: storageFiles.storage_file_246.id,
    },
    video_file_204: {
        lengthSeconds: 310.066667,
        storageFileId: storageFiles.storage_file_241.id,
    },
    video_file_181: {
        lengthSeconds: 206.733333,
        storageFileId: storageFiles.storage_file_217.id,
    },
    video_file_182: {
        lengthSeconds: 216.8,
        storageFileId: storageFiles.storage_file_218.id,
    },
    video_file_213: {
        lengthSeconds: 233.133333,
        storageFileId: storageFiles.storage_file_250.id,
    },
    video_file_210: {
        lengthSeconds: 208.966667,
        storageFileId: storageFiles.storage_file_247.id,
    },
    video_file_218: {
        lengthSeconds: 260.2,
        storageFileId: storageFiles.storage_file_255.id,
    },
    video_file_216: {
        lengthSeconds: 206.066667,
        storageFileId: storageFiles.storage_file_253.id,
    },
    video_file_220: {
        lengthSeconds: 393.8,
        storageFileId: storageFiles.storage_file_257.id,
    },
    video_file_223: {
        lengthSeconds: 219.566667,
        storageFileId: storageFiles.storage_file_260.id,
    },
    video_file_224: {
        lengthSeconds: 185.966667,
        storageFileId: storageFiles.storage_file_261.id,
    },
    video_file_225: {
        lengthSeconds: 268.766667,
        storageFileId: storageFiles.storage_file_263.id,
    },
    video_file_404: {
        lengthSeconds: 218.666667,
        storageFileId: storageFiles.storage_file_446.id,
    },
    video_file_227: {
        lengthSeconds: 235.066667,
        storageFileId: storageFiles.storage_file_264.id,
    },
    video_file_406: {
        lengthSeconds: 129.833333,
        storageFileId: storageFiles.storage_file_448.id,
    },
    video_file_407: {
        lengthSeconds: 271.3,
        storageFileId: storageFiles.storage_file_449.id,
    },
    video_file_261: {
        lengthSeconds: 230.733333,
        storageFileId: storageFiles.storage_file_300.id,
    },
    video_file_279: {
        lengthSeconds: 112.1,
        storageFileId: storageFiles.storage_file_319.id,
    },
    video_file_245: {
        lengthSeconds: 187.7,
        storageFileId: storageFiles.storage_file_281.id,
    },
    video_file_246: {
        lengthSeconds: 171.933333,
        storageFileId: storageFiles.storage_file_282.id,
    },
    video_file_236: {
        lengthSeconds: 365.5,
        storageFileId: storageFiles.storage_file_273.id,
    },
    video_file_237: {
        lengthSeconds: 250.533333,
        storageFileId: storageFiles.storage_file_274.id,
    },
    video_file_238: {
        lengthSeconds: 155.2,
        storageFileId: storageFiles.storage_file_275.id,
    },
    video_file_263: {
        lengthSeconds: 211.033333,
        storageFileId: storageFiles.storage_file_303.id,
    },
    video_file_259: {
        lengthSeconds: 81.433333,
        storageFileId: storageFiles.storage_file_298.id,
    },
    video_file_248: {
        lengthSeconds: 211.666667,
        storageFileId: storageFiles.storage_file_284.id,
    },
    video_file_235: {
        lengthSeconds: 321,
        storageFileId: storageFiles.storage_file_272.id,
    },
    video_file_280: {
        lengthSeconds: 298.833333,
        storageFileId: storageFiles.storage_file_320.id,
    },
    video_file_269: {
        lengthSeconds: 123.966667,
        storageFileId: storageFiles.storage_file_309.id,
    },
    video_file_249: {
        lengthSeconds: 210.566667,
        storageFileId: storageFiles.storage_file_285.id,
    },
    video_file_264: {
        lengthSeconds: 158.866667,
        storageFileId: storageFiles.storage_file_304.id,
    },
    video_file_273: {
        lengthSeconds: 97.366667,
        storageFileId: storageFiles.storage_file_313.id,
    },
    video_file_265: {
        lengthSeconds: 154.266667,
        storageFileId: storageFiles.storage_file_305.id,
    },
    video_file_262: {
        lengthSeconds: 190.9,
        storageFileId: storageFiles.storage_file_301.id,
    },
    video_file_239: {
        lengthSeconds: 317.466667,
        storageFileId: storageFiles.storage_file_276.id,
    },
    video_file_250: {
        lengthSeconds: 142.2,
        storageFileId: storageFiles.storage_file_286.id,
    },
    video_file_240: {
        lengthSeconds: 102.833333,
        storageFileId: storageFiles.storage_file_277.id,
    },
    video_file_260: {
        lengthSeconds: 193.6,
        storageFileId: storageFiles.storage_file_299.id,
    },
    video_file_241: {
        lengthSeconds: 151.433333,
        storageFileId: storageFiles.storage_file_278.id,
    },
    video_file_276: {
        lengthSeconds: 254.4,
        storageFileId: storageFiles.storage_file_316.id,
    },
    video_file_242: {
        lengthSeconds: 205.566667,
        storageFileId: storageFiles.storage_file_279.id,
    },
    video_file_270: {
        lengthSeconds: 92.633333,
        storageFileId: storageFiles.storage_file_310.id,
    },
    video_file_244: {
        lengthSeconds: 248.3,
        storageFileId: storageFiles.storage_file_280.id,
    },
    video_file_228: {
        lengthSeconds: 181.9,
        storageFileId: storageFiles.storage_file_265.id,
    },
    video_file_229: {
        lengthSeconds: 182.2,
        storageFileId: storageFiles.storage_file_266.id,
    },
    video_file_230: {
        lengthSeconds: 230.066667,
        storageFileId: storageFiles.storage_file_267.id,
    },
    video_file_231: {
        lengthSeconds: 125.7,
        storageFileId: storageFiles.storage_file_268.id,
    },
    video_file_232: {
        lengthSeconds: 207.133333,
        storageFileId: storageFiles.storage_file_269.id,
    },
    video_file_233: {
        lengthSeconds: 165.2,
        storageFileId: storageFiles.storage_file_270.id,
    },
    video_file_234: {
        lengthSeconds: 357.7,
        storageFileId: storageFiles.storage_file_271.id,
    },
    video_file_266: {
        lengthSeconds: 221.8,
        storageFileId: storageFiles.storage_file_306.id,
    },
    video_file_405: {
        lengthSeconds: 115.3,
        storageFileId: storageFiles.storage_file_447.id,
    },
    video_file_278: {
        lengthSeconds: 268.2,
        storageFileId: storageFiles.storage_file_318.id,
    },
    video_file_274: {
        lengthSeconds: 125.466667,
        storageFileId: storageFiles.storage_file_314.id,
    },
    video_file_408: {
        lengthSeconds: 225.7,
        storageFileId: storageFiles.storage_file_450.id,
    },
    video_file_267: {
        lengthSeconds: 133.133333,
        storageFileId: storageFiles.storage_file_307.id,
    },
    video_file_271: {
        lengthSeconds: 232.9,
        storageFileId: storageFiles.storage_file_311.id,
    },
    video_file_268: {
        lengthSeconds: 151.733333,
        storageFileId: storageFiles.storage_file_308.id,
    },
    video_file_272: {
        lengthSeconds: 228.533333,
        storageFileId: storageFiles.storage_file_312.id,
    },
    video_file_277: {
        lengthSeconds: 238,
        storageFileId: storageFiles.storage_file_317.id,
    },
    video_file_275: {
        lengthSeconds: 163.3,
        storageFileId: storageFiles.storage_file_315.id,
    },
    video_file_281: {
        lengthSeconds: 253.633333,
        storageFileId: storageFiles.storage_file_321.id,
    },
    video_file_282: {
        lengthSeconds: 326.766667,
        storageFileId: storageFiles.storage_file_322.id,
    },
    video_file_283: {
        lengthSeconds: 126.566667,
        storageFileId: storageFiles.storage_file_323.id,
    },
    video_file_284: {
        lengthSeconds: 231.233333,
        storageFileId: storageFiles.storage_file_324.id,
    },
    video_file_247: {
        lengthSeconds: 166.5,
        storageFileId: storageFiles.storage_file_283.id,
    },
    video_file_285: {
        lengthSeconds: 177.5,
        storageFileId: storageFiles.storage_file_325.id,
    },
    video_file_286: {
        lengthSeconds: 77.333333,
        storageFileId: storageFiles.storage_file_327.id,
    },
    video_file_298: {
        lengthSeconds: 226.8,
        storageFileId: storageFiles.storage_file_338.id,
    },
    video_file_316: {
        lengthSeconds: 117.8,
        storageFileId: storageFiles.storage_file_356.id,
    },
    video_file_287: {
        lengthSeconds: 110.133333,
        storageFileId: storageFiles.storage_file_328.id,
    },
    video_file_251: {
        lengthSeconds: 271.033333,
        storageFileId: storageFiles.storage_file_287.id,
    },
    video_file_252: {
        lengthSeconds: 304.033333,
        storageFileId: storageFiles.storage_file_288.id,
    },
    video_file_253: {
        lengthSeconds: 362.1,
        storageFileId: storageFiles.storage_file_289.id,
    },
    video_file_254: {
        lengthSeconds: 404.733333,
        storageFileId: storageFiles.storage_file_290.id,
    },
    video_file_255: {
        lengthSeconds: 166.166667,
        storageFileId: storageFiles.storage_file_291.id,
    },
    video_file_256: {
        lengthSeconds: 271.4,
        storageFileId: storageFiles.storage_file_292.id,
    },
    video_file_257: {
        lengthSeconds: 129.533333,
        storageFileId: storageFiles.storage_file_293.id,
    },
    video_file_258: {
        lengthSeconds: 360.466667,
        storageFileId: storageFiles.storage_file_297.id,
    },
    video_file_299: {
        lengthSeconds: 144.3,
        storageFileId: storageFiles.storage_file_339.id,
    },
    video_file_288: {
        lengthSeconds: 128.433333,
        storageFileId: storageFiles.storage_file_329.id,
    },
    video_file_309: {
        lengthSeconds: 148.7,
        storageFileId: storageFiles.storage_file_349.id,
    },
    video_file_325: {
        lengthSeconds: 159.566667,
        storageFileId: storageFiles.storage_file_366.id,
    },
    video_file_290: {
        lengthSeconds: 171.4,
        storageFileId: storageFiles.storage_file_330.id,
    },
    video_file_300: {
        lengthSeconds: 68.7,
        storageFileId: storageFiles.storage_file_340.id,
    },
    video_file_291: {
        lengthSeconds: 115,
        storageFileId: storageFiles.storage_file_331.id,
    },
    video_file_317: {
        lengthSeconds: 314.1,
        storageFileId: storageFiles.storage_file_357.id,
    },
    video_file_310: {
        lengthSeconds: 110.333333,
        storageFileId: storageFiles.storage_file_350.id,
    },
    video_file_301: {
        lengthSeconds: 94.2,
        storageFileId: storageFiles.storage_file_341.id,
    },
    video_file_292: {
        lengthSeconds: 283.333333,
        storageFileId: storageFiles.storage_file_332.id,
    },
    video_file_293: {
        lengthSeconds: 160.066667,
        storageFileId: storageFiles.storage_file_333.id,
    },
    video_file_302: {
        lengthSeconds: 76.4,
        storageFileId: storageFiles.storage_file_342.id,
    },
    video_file_294: {
        lengthSeconds: 150.866667,
        storageFileId: storageFiles.storage_file_334.id,
    },
    video_file_322: {
        lengthSeconds: 185.166667,
        storageFileId: storageFiles.storage_file_363.id,
    },
    video_file_311: {
        lengthSeconds: 245.566667,
        storageFileId: storageFiles.storage_file_351.id,
    },
    video_file_295: {
        lengthSeconds: 136.2,
        storageFileId: storageFiles.storage_file_335.id,
    },
    video_file_303: {
        lengthSeconds: 125.333333,
        storageFileId: storageFiles.storage_file_343.id,
    },
    video_file_296: {
        lengthSeconds: 410.133333,
        storageFileId: storageFiles.storage_file_336.id,
    },
    video_file_318: {
        lengthSeconds: 131.366667,
        storageFileId: storageFiles.storage_file_358.id,
    },
    video_file_304: {
        lengthSeconds: 112.633333,
        storageFileId: storageFiles.storage_file_344.id,
    },
    video_file_297: {
        lengthSeconds: 337.266667,
        storageFileId: storageFiles.storage_file_337.id,
    },
    video_file_312: {
        lengthSeconds: 202.433333,
        storageFileId: storageFiles.storage_file_352.id,
    },
    video_file_328: {
        lengthSeconds: 107.166667,
        storageFileId: storageFiles.storage_file_369.id,
    },
    video_file_305: {
        lengthSeconds: 100.266667,
        storageFileId: storageFiles.storage_file_345.id,
    },
    video_file_326: {
        lengthSeconds: 70.2,
        storageFileId: storageFiles.storage_file_367.id,
    },
    video_file_313: {
        lengthSeconds: 229.333333,
        storageFileId: storageFiles.storage_file_353.id,
    },
    video_file_306: {
        lengthSeconds: 318.766667,
        storageFileId: storageFiles.storage_file_346.id,
    },
    video_file_319: {
        lengthSeconds: 448.2,
        storageFileId: storageFiles.storage_file_359.id,
    },
    video_file_323: {
        lengthSeconds: 154.366667,
        storageFileId: storageFiles.storage_file_364.id,
    },
    video_file_307: {
        lengthSeconds: 304.4,
        storageFileId: storageFiles.storage_file_347.id,
    },
    video_file_314: {
        lengthSeconds: 151.4,
        storageFileId: storageFiles.storage_file_354.id,
    },
    video_file_308: {
        lengthSeconds: 115.033333,
        storageFileId: storageFiles.storage_file_348.id,
    },
    video_file_320: {
        lengthSeconds: 153.966667,
        storageFileId: storageFiles.storage_file_360.id,
    },
    video_file_315: {
        lengthSeconds: 163,
        storageFileId: storageFiles.storage_file_355.id,
    },
    video_file_330: {
        lengthSeconds: 78.566667,
        storageFileId: storageFiles.storage_file_371.id,
    },
    video_file_324: {
        lengthSeconds: 128.6,
        storageFileId: storageFiles.storage_file_365.id,
    },
    video_file_321: {
        lengthSeconds: 174.666667,
        storageFileId: storageFiles.storage_file_362.id,
    },
    video_file_327: {
        lengthSeconds: 261.6,
        storageFileId: storageFiles.storage_file_368.id,
    },
    video_file_329: {
        lengthSeconds: 227.433333,
        storageFileId: storageFiles.storage_file_370.id,
    },
    video_file_333: {
        lengthSeconds: 86.2,
        storageFileId: storageFiles.storage_file_374.id,
    },
    video_file_332: {
        lengthSeconds: 145.466667,
        storageFileId: storageFiles.storage_file_373.id,
    },
    video_file_331: {
        lengthSeconds: 238.1,
        storageFileId: storageFiles.storage_file_372.id,
    },
    video_file_334: {
        lengthSeconds: 131.4,
        storageFileId: storageFiles.storage_file_375.id,
    },
    video_file_335: {
        lengthSeconds: 284.8,
        storageFileId: storageFiles.storage_file_376.id,
    },
    video_file_336: {
        lengthSeconds: 234.033333,
        storageFileId: storageFiles.storage_file_377.id,
    },
    video_file_337: {
        lengthSeconds: 294.4,
        storageFileId: storageFiles.storage_file_378.id,
    },
    video_file_338: {
        lengthSeconds: 163.766667,
        storageFileId: storageFiles.storage_file_379.id,
    },
    video_file_401: {
        lengthSeconds: 145.933333,
        storageFileId: storageFiles.storage_file_443.id,
    },
    video_file_339: {
        lengthSeconds: 237.766667,
        storageFileId: storageFiles.storage_file_380.id,
    },
    video_file_364: {
        lengthSeconds: 302.833333,
        storageFileId: storageFiles.storage_file_405.id,
    },
    video_file_353: {
        lengthSeconds: 221.866667,
        storageFileId: storageFiles.storage_file_394.id,
    },
    video_file_340: {
        lengthSeconds: 230.333333,
        storageFileId: storageFiles.storage_file_381.id,
    },
    video_file_341: {
        lengthSeconds: 167.866667,
        storageFileId: storageFiles.storage_file_382.id,
    },
    video_file_354: {
        lengthSeconds: 194.733333,
        storageFileId: storageFiles.storage_file_395.id,
    },
    video_file_342: {
        lengthSeconds: 172.233333,
        storageFileId: storageFiles.storage_file_383.id,
    },
    video_file_374: {
        lengthSeconds: 75.066667,
        storageFileId: storageFiles.storage_file_416.id,
    },
    video_file_365: {
        lengthSeconds: 229.266667,
        storageFileId: storageFiles.storage_file_406.id,
    },
    video_file_343: {
        lengthSeconds: 295.5,
        storageFileId: storageFiles.storage_file_384.id,
    },
    video_file_355: {
        lengthSeconds: 278.166667,
        storageFileId: storageFiles.storage_file_396.id,
    },
    video_file_344: {
        lengthSeconds: 240.066667,
        storageFileId: storageFiles.storage_file_385.id,
    },
    video_file_381: {
        lengthSeconds: 132.233333,
        storageFileId: storageFiles.storage_file_423.id,
    },
    video_file_356: {
        lengthSeconds: 277.3,
        storageFileId: storageFiles.storage_file_397.id,
    },
    video_file_366: {
        lengthSeconds: 77.833333,
        storageFileId: storageFiles.storage_file_408.id,
    },
    video_file_375: {
        lengthSeconds: 121.666667,
        storageFileId: storageFiles.storage_file_417.id,
    },
    video_file_357: {
        lengthSeconds: 203.866667,
        storageFileId: storageFiles.storage_file_398.id,
    },
    video_file_367: {
        lengthSeconds: 106.866667,
        storageFileId: storageFiles.storage_file_409.id,
    },
    video_file_358: {
        lengthSeconds: 331.333333,
        storageFileId: storageFiles.storage_file_399.id,
    },
    video_file_389: {
        lengthSeconds: 265.033333,
        storageFileId: storageFiles.storage_file_431.id,
    },
    video_file_368: {
        lengthSeconds: 231.833333,
        storageFileId: storageFiles.storage_file_410.id,
    },
    video_file_359: {
        lengthSeconds: 192.3,
        storageFileId: storageFiles.storage_file_400.id,
    },
    video_file_376: {
        lengthSeconds: 370.966667,
        storageFileId: storageFiles.storage_file_418.id,
    },
    video_file_360: {
        lengthSeconds: 232.866667,
        storageFileId: storageFiles.storage_file_401.id,
    },
    video_file_350: {
        lengthSeconds: 176.033333,
        storageFileId: storageFiles.storage_file_391.id,
    },
    video_file_345: {
        lengthSeconds: 175.6,
        storageFileId: storageFiles.storage_file_386.id,
    },
    video_file_346: {
        lengthSeconds: 245.1,
        storageFileId: storageFiles.storage_file_387.id,
    },
    video_file_347: {
        lengthSeconds: 146.3,
        storageFileId: storageFiles.storage_file_388.id,
    },
    video_file_348: {
        lengthSeconds: 234.866667,
        storageFileId: storageFiles.storage_file_389.id,
    },
    video_file_349: {
        lengthSeconds: 89.1,
        storageFileId: storageFiles.storage_file_390.id,
    },
    video_file_369: {
        lengthSeconds: 115.733333,
        storageFileId: storageFiles.storage_file_411.id,
    },
    video_file_351: {
        lengthSeconds: 140.066667,
        storageFileId: storageFiles.storage_file_392.id,
    },
    video_file_385: {
        lengthSeconds: 247.466667,
        storageFileId: storageFiles.storage_file_427.id,
    },
    video_file_361: {
        lengthSeconds: 145.533333,
        storageFileId: storageFiles.storage_file_402.id,
    },
    video_file_352: {
        lengthSeconds: 294.033333,
        storageFileId: storageFiles.storage_file_393.id,
    },
    video_file_382: {
        lengthSeconds: 104.433333,
        storageFileId: storageFiles.storage_file_424.id,
    },
    video_file_370: {
        lengthSeconds: 81.266667,
        storageFileId: storageFiles.storage_file_412.id,
    },
    video_file_377: {
        lengthSeconds: 126.6,
        storageFileId: storageFiles.storage_file_419.id,
    },
    video_file_362: {
        lengthSeconds: 182.933333,
        storageFileId: storageFiles.storage_file_403.id,
    },
    video_file_371: {
        lengthSeconds: 189.033333,
        storageFileId: storageFiles.storage_file_413.id,
    },
    video_file_363: {
        lengthSeconds: 321.633333,
        storageFileId: storageFiles.storage_file_404.id,
    },
    video_file_378: {
        lengthSeconds: 95.766667,
        storageFileId: storageFiles.storage_file_420.id,
    },
    video_file_372: {
        lengthSeconds: 142.433333,
        storageFileId: storageFiles.storage_file_414.id,
    },
    video_file_373: {
        lengthSeconds: 189.966667,
        storageFileId: storageFiles.storage_file_415.id,
    },
    video_file_383: {
        lengthSeconds: 126.066667,
        storageFileId: storageFiles.storage_file_425.id,
    },
    video_file_379: {
        lengthSeconds: 166.633333,
        storageFileId: storageFiles.storage_file_421.id,
    },
    video_file_388: {
        lengthSeconds: 168.9,
        storageFileId: storageFiles.storage_file_430.id,
    },
    video_file_380: {
        lengthSeconds: 152.433333,
        storageFileId: storageFiles.storage_file_422.id,
    },
    video_file_386: {
        lengthSeconds: 201.433333,
        storageFileId: storageFiles.storage_file_428.id,
    },
    video_file_384: {
        lengthSeconds: 104.566667,
        storageFileId: storageFiles.storage_file_426.id,
    },
    video_file_387: {
        lengthSeconds: 119.933333,
        storageFileId: storageFiles.storage_file_429.id,
    },
    video_file_391: {
        lengthSeconds: 236.2,
        storageFileId: storageFiles.storage_file_433.id,
    },
    video_file_390: {
        lengthSeconds: 175.3,
        storageFileId: storageFiles.storage_file_432.id,
    },
    video_file_395: {
        lengthSeconds: 130.166667,
        storageFileId: storageFiles.storage_file_436.id,
    },
    video_file_396: {
        lengthSeconds: 294.166667,
        storageFileId: storageFiles.storage_file_437.id,
    },
    video_file_397: {
        lengthSeconds: 64.366667,
        storageFileId: storageFiles.storage_file_438.id,
    },
    video_file_399: {
        lengthSeconds: 149.5,
        storageFileId: storageFiles.storage_file_440.id,
    },
    video_file_400: {
        lengthSeconds: 122.366667,
        storageFileId: storageFiles.storage_file_441.id,
    },
    video_file_402: {
        lengthSeconds: 125.966667,
        storageFileId: storageFiles.storage_file_444.id,
    },
    video_file_409: {
        lengthSeconds: 156.866667,
        storageFileId: storageFiles.storage_file_451.id,
    },
    video_file_434: {
        lengthSeconds: 297.9,
        storageFileId: storageFiles.storage_file_471.id,
    },
    video_file_410: {
        lengthSeconds: 278.766667,
        storageFileId: storageFiles.storage_file_452.id,
    },
    video_file_411: {
        lengthSeconds: 192.433333,
        storageFileId: storageFiles.storage_file_453.id,
    },
    video_file_443: {
        lengthSeconds: 264.933333,
        storageFileId: storageFiles.storage_file_479.id,
    },
    video_file_435: {
        lengthSeconds: 278.5,
        storageFileId: storageFiles.storage_file_472.id,
    },
    video_file_412: {
        lengthSeconds: 261.366667,
        storageFileId: storageFiles.storage_file_454.id,
    },
    video_file_413: {
        lengthSeconds: 325.866667,
        storageFileId: storageFiles.storage_file_455.id,
    },
    video_file_414: {
        lengthSeconds: 227.7,
        storageFileId: storageFiles.storage_file_456.id,
    },
    video_file_457: {
        lengthSeconds: 267.866667,
        storageFileId: storageFiles.storage_file_501.id,
    },
    video_file_418: {
        lengthSeconds: 154.1,
        storageFileId: storageFiles.storage_file_460.id,
    },
    video_file_415: {
        lengthSeconds: 346.833333,
        storageFileId: storageFiles.storage_file_457.id,
    },
    video_file_454: {
        lengthSeconds: 161.266667,
        storageFileId: storageFiles.storage_file_489.id,
    },
    video_file_419: {
        lengthSeconds: 216.3,
        storageFileId: storageFiles.storage_file_461.id,
    },
    video_file_416: {
        lengthSeconds: 200.1,
        storageFileId: storageFiles.storage_file_458.id,
    },
    video_file_420: {
        lengthSeconds: 279,
        storageFileId: storageFiles.storage_file_462.id,
    },
    video_file_421: {
        lengthSeconds: 287.766667,
        storageFileId: storageFiles.storage_file_463.id,
    },
    video_file_417: {
        lengthSeconds: 285.966667,
        storageFileId: storageFiles.storage_file_459.id,
    },
    video_file_445: {
        lengthSeconds: 135.466667,
        storageFileId: storageFiles.storage_file_481.id,
    },
    video_file_422: {
        lengthSeconds: 238.333333,
        storageFileId: storageFiles.storage_file_464.id,
    },
    video_file_423: {
        lengthSeconds: 281.3,
        storageFileId: storageFiles.storage_file_465.id,
    },
    video_file_424: {
        lengthSeconds: 206.966667,
        storageFileId: storageFiles.storage_file_466.id,
    },
    video_file_431: {
        lengthSeconds: 99.1,
        storageFileId: storageFiles.storage_file_468.id,
    },
    video_file_447: {
        lengthSeconds: 204.266667,
        storageFileId: storageFiles.storage_file_483.id,
    },
    video_file_437: {
        lengthSeconds: 245.433333,
        storageFileId: storageFiles.storage_file_473.id,
    },
    video_file_448: {
        lengthSeconds: 269.533333,
        storageFileId: storageFiles.storage_file_484.id,
    },
    video_file_438: {
        lengthSeconds: 123.366667,
        storageFileId: storageFiles.storage_file_474.id,
    },
    video_file_446: {
        lengthSeconds: 132.366667,
        storageFileId: storageFiles.storage_file_482.id,
    },
    video_file_439: {
        lengthSeconds: 146.1,
        storageFileId: storageFiles.storage_file_475.id,
    },
    video_file_449: {
        lengthSeconds: 306.5,
        storageFileId: storageFiles.storage_file_485.id,
    },
    video_file_432: {
        lengthSeconds: 247.833333,
        storageFileId: storageFiles.storage_file_469.id,
    },
    video_file_440: {
        lengthSeconds: 173.733333,
        storageFileId: storageFiles.storage_file_476.id,
    },
    video_file_451: {
        lengthSeconds: 162.733333,
        storageFileId: storageFiles.storage_file_486.id,
    },
    video_file_433: {
        lengthSeconds: 277.433333,
        storageFileId: storageFiles.storage_file_470.id,
    },
    video_file_441: {
        lengthSeconds: 100.133333,
        storageFileId: storageFiles.storage_file_477.id,
    },
    video_file_458: {
        lengthSeconds: 346.966667,
        storageFileId: storageFiles.storage_file_493.id,
    },
    video_file_455: {
        lengthSeconds: 278.633333,
        storageFileId: storageFiles.storage_file_490.id,
    },
    video_file_442: {
        lengthSeconds: 146.966667,
        storageFileId: storageFiles.storage_file_478.id,
    },
    video_file_464: {
        lengthSeconds: 147.766667,
        storageFileId: storageFiles.storage_file_499.id,
    },
    video_file_461: {
        lengthSeconds: 97.833333,
        storageFileId: storageFiles.storage_file_496.id,
    },
    video_file_456: {
        lengthSeconds: 264.466667,
        storageFileId: storageFiles.storage_file_491.id,
    },
    video_file_453: {
        lengthSeconds: 267.5,
        storageFileId: storageFiles.storage_file_488.id,
    },
    video_file_459: {
        lengthSeconds: 343.1,
        storageFileId: storageFiles.storage_file_494.id,
    },
    video_file_463: {
        lengthSeconds: 151.1,
        storageFileId: storageFiles.storage_file_498.id,
    },
    video_file_460: {
        lengthSeconds: 120.333333,
        storageFileId: storageFiles.storage_file_495.id,
    },
    video_file_462: {
        lengthSeconds: 239.133333,
        storageFileId: storageFiles.storage_file_497.id,
    },
    video_file_444: {
        lengthSeconds: 222.866667,
        storageFileId: storageFiles.storage_file_480.id,
    },
    video_file_465: {
        lengthSeconds: 285.966667,
        storageFileId: storageFiles.storage_file_500.id,
    },
    video_file_425: {
        lengthSeconds: 169.833333,
        storageFileId: storageFiles.storage_file_467.id,
    },
    video_file_466: {
        lengthSeconds: 226.133333,
        storageFileId: storageFiles.storage_file_518.id,
    },
    video_file_467: {
        lengthSeconds: 316.633333,
        storageFileId: storageFiles.storage_file_519.id,
    }
});

export type VideoFilesSeedDataType = ReturnType<typeof getVideoFilesSeedData>;