import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { VideosSeedDataType } from './seed_videos';
import { VideoDataSeedDataType } from './seed_video_datas';

export const getVideoVersionSeedData = (
    videoDatas: VideoDataSeedDataType,
    videos: VideosSeedDataType,
    moduleVersions: any
) => getSeedList<VideoVersion>()({

    video_60: {
        videoId: videos.video_60.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_60.id,
    },
    
    video_version_54: {
        videoId: videos.video_54.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_54.id,
    },
    
    video_version_42: {
        videoId: videos.video_42.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_42.id,
    },
    
    video_version_61: {
        videoId: videos.video_61.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_61.id,
    },
    
    video_version_62: {
        videoId: videos.video_62.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_62.id,
    },
    
    video_version_63: {
        videoId: videos.video_63.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_63.id,
    },
    
    video_version_27: {
        videoId: videos.video_27.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_27.id,
    },
    
    video_version_52: {
        videoId: videos.video_52.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_52.id,
    },
    
    video_version_53: {
        videoId: videos.video_53.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_53.id,
    },
    
    video_version_76: {
        videoId: videos.video_76.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_76.id,
    },
    
    video_version_70: {
        videoId: videos.video_70.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_70.id,
    },
    
    video_version_67: {
        videoId: videos.video_67.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_67.id,
    },
    
    video_version_56: {
        videoId: videos.video_56.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_56.id,
    },
    
    video_version_28: {
        videoId: videos.video_28.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_28.id,
    },
    
    video_version_29: {
        videoId: videos.video_29.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_29.id,
    },
    
    video_version_64: {
        videoId: videos.video_64.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_64.id,
    },
    
    video_version_30: {
        videoId: videos.video_30.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_30.id,
    },
    
    video_version_31: {
        videoId: videos.video_31.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_31.id,
    },
    
    video_version_32: {
        videoId: videos.video_32.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_32.id,
    },
    
    video_version_33: {
        videoId: videos.video_33.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_33.id,
    },
    
    video_version_34: {
        videoId: videos.video_34.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_34.id,
    },
    
    video_version_35: {
        videoId: videos.video_35.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_35.id,
    },
    
    video_version_36: {
        videoId: videos.video_36.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_36.id,
    },
    
    video_version_37: {
        videoId: videos.video_37.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_37.id,
    },
    
    video_version_38: {
        videoId: videos.video_38.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_38.id,
    },
    
    video_version_55: {
        videoId: videos.video_55.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_55.id,
    },
    
    video_version_80: {
        videoId: videos.video_80.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_80.id,
    },
    
    video_version_39: {
        videoId: videos.video_39.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_39.id,
    },
    
    video_version_40: {
        videoId: videos.video_40.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_40.id,
    },
    
    video_version_71: {
        videoId: videos.video_71.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_71.id,
    },
    
    video_version_77: {
        videoId: videos.video_77.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_77.id,
    },
    
    video_version_72: {
        videoId: videos.video_72.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_72.id,
    },
    
    video_version_41: {
        videoId: videos.video_41.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_41.id,
    },
    
    video_version_68: {
        videoId: videos.video_68.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_68.id,
    },
    
    video_version_73: {
        videoId: videos.video_73.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_73.id,
    },
    
    video_version_65: {
        videoId: videos.video_65.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_65.id,
    },
    
    video_version_66: {
        videoId: videos.video_66.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_66.id,
    },
    
    video_version_57: {
        videoId: videos.video_57.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_57.id,
    },
    
    video_version_58: {
        videoId: videos.video_58.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_58.id,
    },
    
    video_version_59: {
        videoId: videos.video_59.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_59.id,
    },
    
    video_version_69: {
        videoId: videos.video_69.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_69.id,
    },
    
    video_version_78: {
        videoId: videos.video_78.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_78.id,
    },
    
    video_version_74: {
        videoId: videos.video_74.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_74.id,
    },
    
    video_version_81: {
        videoId: videos.video_81.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_81.id,
    },
    
    video_version_75: {
        videoId: videos.video_75.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_75.id,
    },
    
    video_version_83: {
        videoId: videos.video_83.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_83.id,
    },
    
    video_version_79: {
        videoId: videos.video_79.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_79.id,
    },
    
    video_version_82: {
        videoId: videos.video_82.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_82.id,
    },
    
    video_version_84: {
        videoId: videos.video_84.id,
        moduleVersionId: moduleVersions.module_version_2.id,
        videoDataId: videoDatas.video_data_84.id,
    },
    
    video_version_86: {
        videoId: videos.video_86.id,
        moduleVersionId: moduleVersions.module_version_3.id,
        videoDataId: videoDatas.video_data_86.id,
    },
    
    video_version_85: {
        videoId: videos.video_85.id,
        moduleVersionId: moduleVersions.module_version_3.id,
        videoDataId: videoDatas.video_data_85.id,
    },
    
    video_version_88: {
        videoId: videos.video_88.id,
        moduleVersionId: moduleVersions.module_version_3.id,
        videoDataId: videoDatas.video_data_88.id,
    },
    
    video_version_89: {
        videoId: videos.video_89.id,
        moduleVersionId: moduleVersions.module_version_3.id,
        videoDataId: videoDatas.video_data_89.id,
    },
    
    video_version_90: {
        videoId: videos.video_90.id,
        moduleVersionId: moduleVersions.module_version_3.id,
        videoDataId: videoDatas.video_data_90.id,
    },
    
    video_version_87: {
        videoId: videos.video_87.id,
        moduleVersionId: moduleVersions.module_version_3.id,
        videoDataId: videoDatas.video_data_87.id,
    },
    
    video_version_44: {
        videoId: videos.video_44.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_44.id,
    },
    
    video_version_51: {
        videoId: videos.video_51.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_51.id,
    },
    
    video_version_113: {
        videoId: videos.video_113.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_113.id,
    },
    
    video_version_109: {
        videoId: videos.video_109.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_109.id,
    },
    
    video_version_114: {
        videoId: videos.video_114.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_114.id,
    },
    
    video_version_125: {
        videoId: videos.video_125.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_125.id,
    },
    
    video_version_115: {
        videoId: videos.video_115.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_115.id,
    },
    
    video_version_116: {
        videoId: videos.video_116.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_116.id,
    },
    
    video_version_117: {
        videoId: videos.video_117.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_117.id,
    },
    
    video_version_118: {
        videoId: videos.video_118.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_118.id,
    },
    
    video_version_127: {
        videoId: videos.video_127.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_127.id,
    },
    
    video_version_110: {
        videoId: videos.video_110.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_110.id,
    },
    
    video_version_111: {
        videoId: videos.video_111.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_111.id,
    },
    
    video_version_45: {
        videoId: videos.video_45.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_45.id,
    },
    
    video_version_46: {
        videoId: videos.video_46.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_46.id,
    },
    
    video_version_47: {
        videoId: videos.video_47.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_47.id,
    },
    
    video_version_48: {
        videoId: videos.video_48.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_48.id,
    },
    
    video_version_49: {
        videoId: videos.video_49.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_49.id,
    },
    
    video_version_50: {
        videoId: videos.video_50.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_50.id,
    },
    
    video_version_119: {
        videoId: videos.video_119.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_119.id,
    },
    
    video_version_112: {
        videoId: videos.video_112.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_112.id,
    },
    
    video_version_126: {
        videoId: videos.video_126.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_126.id,
    },
    
    video_version_108: {
        videoId: videos.video_108.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_108.id,
    },
    
    video_version_120: {
        videoId: videos.video_120.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_120.id,
    },
    
    video_version_128: {
        videoId: videos.video_128.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_128.id,
    },
    
    video_version_121: {
        videoId: videos.video_121.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_121.id,
    },
    
    video_version_122: {
        videoId: videos.video_122.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_122.id,
    },
    
    video_version_129: {
        videoId: videos.video_129.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_129.id,
    },
    
    video_version_123: {
        videoId: videos.video_123.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_123.id,
    },
    
    video_version_124: {
        videoId: videos.video_124.id,
        moduleVersionId: moduleVersions.module_version_4.id,
        videoDataId: videoDatas.video_data_124.id,
    },
    
    video_version_91: {
        videoId: videos.video_91.id,
        moduleVersionId: moduleVersions.module_version_8.id,
        videoDataId: videoDatas.video_data_91.id,
    },
    
    video_version_92: {
        videoId: videos.video_92.id,
        moduleVersionId: moduleVersions.module_version_7.id,
        videoDataId: videoDatas.video_data_92.id,
    },
    
    video_version_150: {
        videoId: videos.video_150.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_150.id,
    },
    
    video_version_144: {
        videoId: videos.video_144.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_144.id,
    },
    
    video_version_132: {
        videoId: videos.video_132.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_132.id,
    },
    
    video_version_145: {
        videoId: videos.video_145.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_145.id,
    },
    
    video_version_133: {
        videoId: videos.video_133.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_133.id,
    },
    
    video_version_159: {
        videoId: videos.video_159.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_159.id,
    },
    
    video_version_134: {
        videoId: videos.video_134.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_134.id,
    },
    
    video_version_135: {
        videoId: videos.video_135.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_135.id,
    },
    
    video_version_156: {
        videoId: videos.video_156.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_156.id,
    },
    
    video_version_152: {
        videoId: videos.video_152.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_152.id,
    },
    
    video_version_136: {
        videoId: videos.video_136.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_136.id,
    },
    
    video_version_137: {
        videoId: videos.video_137.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_137.id,
    },
    
    video_version_161: {
        videoId: videos.video_161.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_161.id,
    },
    
    video_version_138: {
        videoId: videos.video_138.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_138.id,
    },
    
    video_version_153: {
        videoId: videos.video_153.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_153.id,
    },
    
    video_version_139: {
        videoId: videos.video_139.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_139.id,
    },
    
    video_version_147: {
        videoId: videos.video_147.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_147.id,
    },
    
    video_version_140: {
        videoId: videos.video_140.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_140.id,
    },
    
    video_version_148: {
        videoId: videos.video_148.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_148.id,
    },
    
    video_version_141: {
        videoId: videos.video_141.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_141.id,
    },
    
    video_version_165: {
        videoId: videos.video_165.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_165.id,
    },
    
    video_version_157: {
        videoId: videos.video_157.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_157.id,
    },
    
    video_version_142: {
        videoId: videos.video_142.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_142.id,
    },
    
    video_version_149: {
        videoId: videos.video_149.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_149.id,
    },
    
    video_version_143: {
        videoId: videos.video_143.id,
        moduleVersionId: moduleVersions.module_version_35.id,
        videoDataId: videoDatas.video_data_143.id,
    },
    
    video_version_154: {
        videoId: videos.video_154.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_154.id,
    },
    
    video_version_160: {
        videoId: videos.video_160.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_160.id,
    },
    
    video_version_158: {
        videoId: videos.video_158.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_158.id,
    },
    
    video_version_155: {
        videoId: videos.video_155.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_155.id,
    },
    
    video_version_164: {
        videoId: videos.video_164.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_164.id,
    },
    
    video_version_163: {
        videoId: videos.video_163.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_163.id,
    },
    
    video_version_166: {
        videoId: videos.video_166.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_166.id,
    },
    
    video_version_167: {
        videoId: videos.video_167.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_167.id,
    },
    
    video_version_168: {
        videoId: videos.video_168.id,
        moduleVersionId: moduleVersions.module_version_37.id,
        videoDataId: videoDatas.video_data_168.id,
    },
    
    video_version_169: {
        videoId: videos.video_169.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_169.id,
    },
    
    video_version_170: {
        videoId: videos.video_170.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_170.id,
    },
    
    video_version_171: {
        videoId: videos.video_171.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_171.id,
    },
    
    video_version_403: {
        videoId: videos.video_403.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_403.id,
    },
    
    video_version_172: {
        videoId: videos.video_172.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_172.id,
    },
    
    video_version_205: {
        videoId: videos.video_205.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_205.id,
    },
    
    video_version_187: {
        videoId: videos.video_187.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_187.id,
    },
    
    video_version_173: {
        videoId: videos.video_173.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_173.id,
    },
    
    video_version_219: {
        videoId: videos.video_219.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_219.id,
    },
    
    video_version_174: {
        videoId: videos.video_174.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_174.id,
    },
    
    video_version_198: {
        videoId: videos.video_198.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_198.id,
    },
    
    video_version_188: {
        videoId: videos.video_188.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_188.id,
    },
    
    video_version_175: {
        videoId: videos.video_175.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_175.id,
    },
    
    video_version_211: {
        videoId: videos.video_211.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_211.id,
    },
    
    video_version_176: {
        videoId: videos.video_176.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_176.id,
    },
    
    video_version_189: {
        videoId: videos.video_189.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_189.id,
    },
    
    video_version_206: {
        videoId: videos.video_206.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_206.id,
    },
    
    video_version_177: {
        videoId: videos.video_177.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_177.id,
    },
    
    video_version_199: {
        videoId: videos.video_199.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_199.id,
    },
    
    video_version_190: {
        videoId: videos.video_190.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_190.id,
    },
    
    video_version_178: {
        videoId: videos.video_178.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_178.id,
    },
    
    video_version_214: {
        videoId: videos.video_214.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_214.id,
    },
    
    video_version_179: {
        videoId: videos.video_179.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_179.id,
    },
    
    video_version_191: {
        videoId: videos.video_191.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_191.id,
    },
    
    video_version_180: {
        videoId: videos.video_180.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_180.id,
    },
    
    video_version_200: {
        videoId: videos.video_200.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_200.id,
    },
    
    video_version_217: {
        videoId: videos.video_217.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_217.id,
    },
    
    video_version_192: {
        videoId: videos.video_192.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_192.id,
    },
    
    video_version_207: {
        videoId: videos.video_207.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_207.id,
    },
    
    video_version_201: {
        videoId: videos.video_201.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_201.id,
    },
    
    video_version_193: {
        videoId: videos.video_193.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_193.id,
    },
    
    video_version_183: {
        videoId: videos.video_183.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_183.id,
    },
    
    video_version_212: {
        videoId: videos.video_212.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_212.id,
    },
    
    video_version_184: {
        videoId: videos.video_184.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_184.id,
    },
    
    video_version_194: {
        videoId: videos.video_194.id,
        moduleVersionId: moduleVersions.module_version_40.id,
        videoDataId: videoDatas.video_data_194.id,
    },
    
    video_version_215: {
        videoId: videos.video_215.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_215.id,
    },
    
    video_version_185: {
        videoId: videos.video_185.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_185.id,
    },
    
    video_version_202: {
        videoId: videos.video_202.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_202.id,
    },
    
    video_version_195: {
        videoId: videos.video_195.id,
        moduleVersionId: moduleVersions.module_version_40.id,
        videoDataId: videoDatas.video_data_195.id,
    },
    
    video_version_186: {
        videoId: videos.video_186.id,
        moduleVersionId: moduleVersions.module_version_39.id,
        videoDataId: videoDatas.video_data_186.id,
    },
    
    video_version_222: {
        videoId: videos.video_222.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_222.id,
    },
    
    video_version_203: {
        videoId: videos.video_203.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_203.id,
    },
    
    video_version_196: {
        videoId: videos.video_196.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_196.id,
    },
    
    video_version_221: {
        videoId: videos.video_221.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_221.id,
    },
    
    video_version_208: {
        videoId: videos.video_208.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_208.id,
    },
    
    video_version_197: {
        videoId: videos.video_197.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_197.id,
    },
    
    video_version_209: {
        videoId: videos.video_209.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_209.id,
    },
    
    video_version_204: {
        videoId: videos.video_204.id,
        moduleVersionId: moduleVersions.module_version_41.id,
        videoDataId: videoDatas.video_data_204.id,
    },
    
    video_version_181: {
        videoId: videos.video_181.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_181.id,
    },
    
    video_version_182: {
        videoId: videos.video_182.id,
        moduleVersionId: moduleVersions.module_version_38.id,
        videoDataId: videoDatas.video_data_182.id,
    },
    
    video_version_213: {
        videoId: videos.video_213.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_213.id,
    },
    
    video_version_210: {
        videoId: videos.video_210.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_210.id,
    },
    
    video_version_218: {
        videoId: videos.video_218.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_218.id,
    },
    
    video_version_216: {
        videoId: videos.video_216.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_216.id,
    },
    
    video_version_220: {
        videoId: videos.video_220.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_220.id,
    },
    
    video_version_223: {
        videoId: videos.video_223.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_223.id,
    },
    
    video_version_224: {
        videoId: videos.video_224.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_224.id,
    },
    
    video_version_225: {
        videoId: videos.video_225.id,
        moduleVersionId: moduleVersions.module_version_42.id,
        videoDataId: videoDatas.video_data_225.id,
    },
    
    video_version_404: {
        videoId: videos.video_404.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_404.id,
    },
    
    video_version_227: {
        videoId: videos.video_227.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_227.id,
    },
    
    video_version_406: {
        videoId: videos.video_406.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_406.id,
    },
    
    video_version_407: {
        videoId: videos.video_407.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_407.id,
    },
    
    video_version_261: {
        videoId: videos.video_261.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_261.id,
    },
    
    video_version_279: {
        videoId: videos.video_279.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_279.id,
    },
    
    video_version_245: {
        videoId: videos.video_245.id,
        moduleVersionId: moduleVersions.module_version_44.id,
        videoDataId: videoDatas.video_data_245.id,
    },
    
    video_version_246: {
        videoId: videos.video_246.id,
        moduleVersionId: moduleVersions.module_version_44.id,
        videoDataId: videoDatas.video_data_246.id,
    },
    
    video_version_236: {
        videoId: videos.video_236.id,
        moduleVersionId: moduleVersions.module_version_44.id,
        videoDataId: videoDatas.video_data_236.id,
    },
    
    video_version_237: {
        videoId: videos.video_237.id,
        moduleVersionId: moduleVersions.module_version_44.id,
        videoDataId: videoDatas.video_data_237.id,
    },
    
    video_version_238: {
        videoId: videos.video_238.id,
        moduleVersionId: moduleVersions.module_version_44.id,
        videoDataId: videoDatas.video_data_238.id,
    },
    
    video_version_263: {
        videoId: videos.video_263.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_263.id,
    },
    
    video_version_259: {
        videoId: videos.video_259.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_259.id,
    },
    
    video_version_248: {
        videoId: videos.video_248.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_248.id,
    },
    
    video_version_235: {
        videoId: videos.video_235.id,
        moduleVersionId: moduleVersions.module_version_44.id,
        videoDataId: videoDatas.video_data_235.id,
    },
    
    video_version_280: {
        videoId: videos.video_280.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_280.id,
    },
    
    video_version_269: {
        videoId: videos.video_269.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_269.id,
    },
    
    video_version_249: {
        videoId: videos.video_249.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_249.id,
    },
    
    video_version_264: {
        videoId: videos.video_264.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_264.id,
    },
    
    video_version_273: {
        videoId: videos.video_273.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_273.id,
    },
    
    video_version_265: {
        videoId: videos.video_265.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_265.id,
    },
    
    video_version_262: {
        videoId: videos.video_262.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_262.id,
    },
    
    video_version_239: {
        videoId: videos.video_239.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_239.id,
    },
    
    video_version_250: {
        videoId: videos.video_250.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_250.id,
    },
    
    video_version_240: {
        videoId: videos.video_240.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_240.id,
    },
    
    video_version_260: {
        videoId: videos.video_260.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_260.id,
    },
    
    video_version_241: {
        videoId: videos.video_241.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_241.id,
    },
    
    video_version_276: {
        videoId: videos.video_276.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_276.id,
    },
    
    video_version_242: {
        videoId: videos.video_242.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_242.id,
    },
    
    video_version_270: {
        videoId: videos.video_270.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_270.id,
    },
    
    video_version_244: {
        videoId: videos.video_244.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_244.id,
    },
    
    video_version_228: {
        videoId: videos.video_228.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_228.id,
    },
    
    video_version_229: {
        videoId: videos.video_229.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_229.id,
    },
    
    video_version_230: {
        videoId: videos.video_230.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_230.id,
    },
    
    video_version_231: {
        videoId: videos.video_231.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_231.id,
    },
    
    video_version_232: {
        videoId: videos.video_232.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_232.id,
    },
    
    video_version_233: {
        videoId: videos.video_233.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_233.id,
    },
    
    video_version_234: {
        videoId: videos.video_234.id,
        moduleVersionId: moduleVersions.module_version_43.id,
        videoDataId: videoDatas.video_data_234.id,
    },
    
    video_version_266: {
        videoId: videos.video_266.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_266.id,
    },
    
    video_version_405: {
        videoId: videos.video_405.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_405.id,
    },
    
    video_version_278: {
        videoId: videos.video_278.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_278.id,
    },
    
    video_version_274: {
        videoId: videos.video_274.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_274.id,
    },
    
    video_version_408: {
        videoId: videos.video_408.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_408.id,
    },
    
    video_version_267: {
        videoId: videos.video_267.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_267.id,
    },
    
    video_version_271: {
        videoId: videos.video_271.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_271.id,
    },
    
    video_version_268: {
        videoId: videos.video_268.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_268.id,
    },
    
    video_version_272: {
        videoId: videos.video_272.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_272.id,
    },
    
    video_version_277: {
        videoId: videos.video_277.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_277.id,
    },
    
    video_version_275: {
        videoId: videos.video_275.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_275.id,
    },
    
    video_version_281: {
        videoId: videos.video_281.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_281.id,
    },
    
    video_version_282: {
        videoId: videos.video_282.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_282.id,
    },
    
    video_version_283: {
        videoId: videos.video_283.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_283.id,
    },
    
    video_version_284: {
        videoId: videos.video_284.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_284.id,
    },
    
    video_version_247: {
        videoId: videos.video_247.id,
        moduleVersionId: moduleVersions.module_version_36.id,
        videoDataId: videoDatas.video_data_247.id,
    },
    
    video_version_285: {
        videoId: videos.video_285.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_285.id,
    },
    
    video_version_286: {
        videoId: videos.video_286.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_286.id,
    },
    
    video_version_298: {
        videoId: videos.video_298.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_298.id,
    },
    
    video_version_316: {
        videoId: videos.video_316.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_316.id,
    },
    
    video_version_287: {
        videoId: videos.video_287.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_287.id,
    },
    
    video_version_251: {
        videoId: videos.video_251.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_251.id,
    },
    
    video_version_252: {
        videoId: videos.video_252.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_252.id,
    },
    
    video_version_253: {
        videoId: videos.video_253.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_253.id,
    },
    
    video_version_254: {
        videoId: videos.video_254.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_254.id,
    },
    
    video_version_255: {
        videoId: videos.video_255.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_255.id,
    },
    
    video_version_256: {
        videoId: videos.video_256.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_256.id,
    },
    
    video_version_257: {
        videoId: videos.video_257.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_257.id,
    },
    
    video_version_258: {
        videoId: videos.video_258.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_258.id,
    },
    
    video_version_299: {
        videoId: videos.video_299.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_299.id,
    },
    
    video_version_288: {
        videoId: videos.video_288.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_288.id,
    },
    
    video_version_309: {
        videoId: videos.video_309.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_309.id,
    },
    
    video_version_325: {
        videoId: videos.video_325.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_325.id,
    },
    
    video_version_290: {
        videoId: videos.video_290.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_290.id,
    },
    
    video_version_300: {
        videoId: videos.video_300.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_300.id,
    },
    
    video_version_291: {
        videoId: videos.video_291.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_291.id,
    },
    
    video_version_317: {
        videoId: videos.video_317.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_317.id,
    },
    
    video_version_310: {
        videoId: videos.video_310.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_310.id,
    },
    
    video_version_301: {
        videoId: videos.video_301.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_301.id,
    },
    
    video_version_292: {
        videoId: videos.video_292.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_292.id,
    },
    
    video_version_293: {
        videoId: videos.video_293.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_293.id,
    },
    
    video_version_302: {
        videoId: videos.video_302.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_302.id,
    },
    
    video_version_294: {
        videoId: videos.video_294.id,
        moduleVersionId: moduleVersions.module_version_47.id,
        videoDataId: videoDatas.video_data_294.id,
    },
    
    video_version_322: {
        videoId: videos.video_322.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_322.id,
    },
    
    video_version_311: {
        videoId: videos.video_311.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_311.id,
    },
    
    video_version_295: {
        videoId: videos.video_295.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_295.id,
    },
    
    video_version_303: {
        videoId: videos.video_303.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_303.id,
    },
    
    video_version_296: {
        videoId: videos.video_296.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_296.id,
    },
    
    video_version_318: {
        videoId: videos.video_318.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_318.id,
    },
    
    video_version_304: {
        videoId: videos.video_304.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_304.id,
    },
    
    video_version_297: {
        videoId: videos.video_297.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_297.id,
    },
    
    video_version_312: {
        videoId: videos.video_312.id,
        moduleVersionId: moduleVersions.module_version_49.id,
        videoDataId: videoDatas.video_data_312.id,
    },
    
    video_version_328: {
        videoId: videos.video_328.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_328.id,
    },
    
    video_version_305: {
        videoId: videos.video_305.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_305.id,
    },
    
    video_version_326: {
        videoId: videos.video_326.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_326.id,
    },
    
    video_version_313: {
        videoId: videos.video_313.id,
        moduleVersionId: moduleVersions.module_version_49.id,
        videoDataId: videoDatas.video_data_313.id,
    },
    
    video_version_306: {
        videoId: videos.video_306.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_306.id,
    },
    
    video_version_319: {
        videoId: videos.video_319.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_319.id,
    },
    
    video_version_323: {
        videoId: videos.video_323.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_323.id,
    },
    
    video_version_307: {
        videoId: videos.video_307.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_307.id,
    },
    
    video_version_314: {
        videoId: videos.video_314.id,
        moduleVersionId: moduleVersions.module_version_49.id,
        videoDataId: videoDatas.video_data_314.id,
    },
    
    video_version_308: {
        videoId: videos.video_308.id,
        moduleVersionId: moduleVersions.module_version_48.id,
        videoDataId: videoDatas.video_data_308.id,
    },
    
    video_version_320: {
        videoId: videos.video_320.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_320.id,
    },
    
    video_version_315: {
        videoId: videos.video_315.id,
        moduleVersionId: moduleVersions.module_version_49.id,
        videoDataId: videoDatas.video_data_315.id,
    },
    
    video_version_330: {
        videoId: videos.video_330.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_330.id,
    },
    
    video_version_324: {
        videoId: videos.video_324.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_324.id,
    },
    
    video_version_321: {
        videoId: videos.video_321.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_321.id,
    },
    
    video_version_327: {
        videoId: videos.video_327.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_327.id,
    },
    
    video_version_329: {
        videoId: videos.video_329.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_329.id,
    },
    
    video_version_333: {
        videoId: videos.video_333.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_333.id,
    },
    
    video_version_332: {
        videoId: videos.video_332.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_332.id,
    },
    
    video_version_331: {
        videoId: videos.video_331.id,
        moduleVersionId: moduleVersions.module_version_50.id,
        videoDataId: videoDatas.video_data_331.id,
    },
    
    video_version_334: {
        videoId: videos.video_334.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_334.id,
    },
    
    video_version_335: {
        videoId: videos.video_335.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_335.id,
    },
    
    video_version_336: {
        videoId: videos.video_336.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_336.id,
    },
    
    video_version_337: {
        videoId: videos.video_337.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_337.id,
    },
    
    video_version_338: {
        videoId: videos.video_338.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_338.id,
    },
    
    video_version_401: {
        videoId: videos.video_401.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_401.id,
    },
    
    video_version_339: {
        videoId: videos.video_339.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_339.id,
    },
    
    video_version_364: {
        videoId: videos.video_364.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_364.id,
    },
    
    video_version_353: {
        videoId: videos.video_353.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_353.id,
    },
    
    video_version_340: {
        videoId: videos.video_340.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_340.id,
    },
    
    video_version_341: {
        videoId: videos.video_341.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_341.id,
    },
    
    video_version_354: {
        videoId: videos.video_354.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_354.id,
    },
    
    video_version_342: {
        videoId: videos.video_342.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_342.id,
    },
    
    video_version_374: {
        videoId: videos.video_374.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_374.id,
    },
    
    video_version_365: {
        videoId: videos.video_365.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_365.id,
    },
    
    video_version_343: {
        videoId: videos.video_343.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_343.id,
    },
    
    video_version_355: {
        videoId: videos.video_355.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_355.id,
    },
    
    video_version_344: {
        videoId: videos.video_344.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_344.id,
    },
    
    video_version_381: {
        videoId: videos.video_381.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_381.id,
    },
    
    video_version_356: {
        videoId: videos.video_356.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_356.id,
    },
    
    video_version_366: {
        videoId: videos.video_366.id,
        moduleVersionId: moduleVersions.module_version_45.id,
        videoDataId: videoDatas.video_data_366.id,
    },
    
    video_version_375: {
        videoId: videos.video_375.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_375.id,
    },
    
    video_version_357: {
        videoId: videos.video_357.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_357.id,
    },
    
    video_version_367: {
        videoId: videos.video_367.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_367.id,
    },
    
    video_version_358: {
        videoId: videos.video_358.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_358.id,
    },
    
    video_version_389: {
        videoId: videos.video_389.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_389.id,
    },
    
    video_version_368: {
        videoId: videos.video_368.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_368.id,
    },
    
    video_version_359: {
        videoId: videos.video_359.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_359.id,
    },
    
    video_version_376: {
        videoId: videos.video_376.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_376.id,
    },
    
    video_version_360: {
        videoId: videos.video_360.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_360.id,
    },
    
    video_version_350: {
        videoId: videos.video_350.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_350.id,
    },
    
    video_version_345: {
        videoId: videos.video_345.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_345.id,
    },
    
    video_version_346: {
        videoId: videos.video_346.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_346.id,
    },
    
    video_version_347: {
        videoId: videos.video_347.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_347.id,
    },
    
    video_version_348: {
        videoId: videos.video_348.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_348.id,
    },
    
    video_version_349: {
        videoId: videos.video_349.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_349.id,
    },
    
    video_version_369: {
        videoId: videos.video_369.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_369.id,
    },
    
    video_version_351: {
        videoId: videos.video_351.id,
        moduleVersionId: moduleVersions.module_version_51.id,
        videoDataId: videoDatas.video_data_351.id,
    },
    
    video_version_385: {
        videoId: videos.video_385.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_385.id,
    },
    
    video_version_361: {
        videoId: videos.video_361.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_361.id,
    },
    
    video_version_352: {
        videoId: videos.video_352.id,
        moduleVersionId: moduleVersions.module_version_52.id,
        videoDataId: videoDatas.video_data_352.id,
    },
    
    video_version_382: {
        videoId: videos.video_382.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_382.id,
    },
    
    video_version_370: {
        videoId: videos.video_370.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_370.id,
    },
    
    video_version_377: {
        videoId: videos.video_377.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_377.id,
    },
    
    video_version_362: {
        videoId: videos.video_362.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_362.id,
    },
    
    video_version_371: {
        videoId: videos.video_371.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_371.id,
    },
    
    video_version_363: {
        videoId: videos.video_363.id,
        moduleVersionId: moduleVersions.module_version_53.id,
        videoDataId: videoDatas.video_data_363.id,
    },
    
    video_version_378: {
        videoId: videos.video_378.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_378.id,
    },
    
    video_version_372: {
        videoId: videos.video_372.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_372.id,
    },
    
    video_version_373: {
        videoId: videos.video_373.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_373.id,
    },
    
    video_version_383: {
        videoId: videos.video_383.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_383.id,
    },
    
    video_version_379: {
        videoId: videos.video_379.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_379.id,
    },
    
    video_version_388: {
        videoId: videos.video_388.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_388.id,
    },
    
    video_version_380: {
        videoId: videos.video_380.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_380.id,
    },
    
    video_version_386: {
        videoId: videos.video_386.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_386.id,
    },
    
    video_version_384: {
        videoId: videos.video_384.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_384.id,
    },
    
    video_version_387: {
        videoId: videos.video_387.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_387.id,
    },
    
    video_version_391: {
        videoId: videos.video_391.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_391.id,
    },
    
    video_version_390: {
        videoId: videos.video_390.id,
        moduleVersionId: moduleVersions.module_version_54.id,
        videoDataId: videoDatas.video_data_390.id,
    },
    
    video_version_395: {
        videoId: videos.video_395.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_395.id,
    },
    
    video_version_396: {
        videoId: videos.video_396.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_396.id,
    },
    
    video_version_397: {
        videoId: videos.video_397.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_397.id,
    },
    
    video_version_399: {
        videoId: videos.video_399.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_399.id,
    },
    
    video_version_400: {
        videoId: videos.video_400.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_400.id,
    },
    
    video_version_402: {
        videoId: videos.video_402.id,
        moduleVersionId: moduleVersions.module_version_55.id,
        videoDataId: videoDatas.video_data_402.id,
    },
    
    video_version_409: {
        videoId: videos.video_409.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_409.id,
    },
    
    video_version_434: {
        videoId: videos.video_434.id,
        moduleVersionId: moduleVersions.module_version_57.id,
        videoDataId: videoDatas.video_data_434.id,
    },
    
    video_version_410: {
        videoId: videos.video_410.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_410.id,
    },
    
    video_version_411: {
        videoId: videos.video_411.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_411.id,
    },
    
    video_version_443: {
        videoId: videos.video_443.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_443.id,
    },
    
    video_version_435: {
        videoId: videos.video_435.id,
        moduleVersionId: moduleVersions.module_version_57.id,
        videoDataId: videoDatas.video_data_435.id,
    },
    
    video_version_412: {
        videoId: videos.video_412.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_412.id,
    },
    
    video_version_413: {
        videoId: videos.video_413.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_413.id,
    },
    
    video_version_414: {
        videoId: videos.video_414.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_414.id,
    },
    
    video_version_457: {
        videoId: videos.video_457.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_457.id,
    },
    
    video_version_418: {
        videoId: videos.video_418.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_418.id,
    },
    
    video_version_415: {
        videoId: videos.video_415.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_415.id,
    },
    
    video_version_454: {
        videoId: videos.video_454.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_454.id,
    },
    
    video_version_419: {
        videoId: videos.video_419.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_419.id,
    },
    
    video_version_416: {
        videoId: videos.video_416.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_416.id,
    },
    
    video_version_420: {
        videoId: videos.video_420.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_420.id,
    },
    
    video_version_421: {
        videoId: videos.video_421.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_421.id,
    },
    
    video_version_417: {
        videoId: videos.video_417.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_417.id,
    },
    
    video_version_445: {
        videoId: videos.video_445.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_445.id,
    },
    
    video_version_422: {
        videoId: videos.video_422.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_422.id,
    },
    
    video_version_423: {
        videoId: videos.video_423.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_423.id,
    },
    
    video_version_424: {
        videoId: videos.video_424.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_424.id,
    },
    
    video_version_431: {
        videoId: videos.video_431.id,
        moduleVersionId: moduleVersions.module_version_57.id,
        videoDataId: videoDatas.video_data_431.id,
    },
    
    video_version_447: {
        videoId: videos.video_447.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_447.id,
    },
    
    video_version_437: {
        videoId: videos.video_437.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_437.id,
    },
    
    video_version_448: {
        videoId: videos.video_448.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_448.id,
    },
    
    video_version_438: {
        videoId: videos.video_438.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_438.id,
    },
    
    video_version_446: {
        videoId: videos.video_446.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_446.id,
    },
    
    video_version_439: {
        videoId: videos.video_439.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_439.id,
    },
    
    video_version_449: {
        videoId: videos.video_449.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_449.id,
    },
    
    video_version_432: {
        videoId: videos.video_432.id,
        moduleVersionId: moduleVersions.module_version_57.id,
        videoDataId: videoDatas.video_data_432.id,
    },
    
    video_version_440: {
        videoId: videos.video_440.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_440.id,
    },
    
    video_version_451: {
        videoId: videos.video_451.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_451.id,
    },
    
    video_version_433: {
        videoId: videos.video_433.id,
        moduleVersionId: moduleVersions.module_version_57.id,
        videoDataId: videoDatas.video_data_433.id,
    },
    
    video_version_441: {
        videoId: videos.video_441.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_441.id,
    },
    
    video_version_458: {
        videoId: videos.video_458.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_458.id,
    },
    
    video_version_455: {
        videoId: videos.video_455.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_455.id,
    },
    
    video_version_442: {
        videoId: videos.video_442.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_442.id,
    },
    
    video_version_464: {
        videoId: videos.video_464.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_464.id,
    },
    
    video_version_461: {
        videoId: videos.video_461.id,
        moduleVersionId: moduleVersions.module_version_60.id,
        videoDataId: videoDatas.video_data_461.id,
    },
    
    video_version_456: {
        videoId: videos.video_456.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_456.id,
    },
    
    video_version_453: {
        videoId: videos.video_453.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_453.id,
    },
    
    video_version_459: {
        videoId: videos.video_459.id,
        moduleVersionId: moduleVersions.module_version_59.id,
        videoDataId: videoDatas.video_data_459.id,
    },
    
    video_version_463: {
        videoId: videos.video_463.id,
        moduleVersionId: moduleVersions.module_version_60.id,
        videoDataId: videoDatas.video_data_463.id,
    },
    
    video_version_460: {
        videoId: videos.video_460.id,
        moduleVersionId: moduleVersions.module_version_60.id,
        videoDataId: videoDatas.video_data_460.id,
    },
    
    video_version_462: {
        videoId: videos.video_462.id,
        moduleVersionId: moduleVersions.module_version_60.id,
        videoDataId: videoDatas.video_data_462.id,
    },
    
    video_version_444: {
        videoId: videos.video_444.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_444.id,
    },
    
    video_version_465: {
        videoId: videos.video_465.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_465.id,
    },
    
    video_version_425: {
        videoId: videos.video_425.id,
        moduleVersionId: moduleVersions.module_version_56.id,
        videoDataId: videoDatas.video_data_425.id,
    },
    
    video_version_466: {
        videoId: videos.video_466.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_466.id,
    },
    
    video_version_467: {
        videoId: videos.video_467.id,
        moduleVersionId: moduleVersions.module_version_58.id,
        videoDataId: videoDatas.video_data_467.id,
    },
    
});

export type VideoVersionSeedDataType = ReturnType<typeof getVideoVersionSeedData>;