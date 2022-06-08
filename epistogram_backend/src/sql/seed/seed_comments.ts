import { Comment } from '../../models/entity/Comment';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { UserSeedDataType } from './seed_users';
import { VideoSeedDataType } from './seed_videos';

export const getCommentsSeedData = (videos: VideoSeedDataType, users: UserSeedDataType) => getSeedList<Comment>()({
    excel_comment_1: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        text: 'Nagyon hasznos videó volt! Egy olyan kérdésem lenne, hogy nincs esetleg valamilyen billentyűkombináció arra, hogy gyorsan lehessen oszlopokat elrejteni?',
        userId: users.god.id,
        isAnonymous: false,
        isQuestion: false,
        videoId: videos.video_132.id,
        parentCommentId: null,
        groupId: 0,
    },
    excel_comment_2: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        text: 'Én erre a CTRL + 0-t szoktam használni!',
        userId: users.almostGod.id,
        isAnonymous: false,
        isQuestion: false,
        videoId: videos.video_132.id,
        parentCommentId: 1,
        groupId: 1,
    },
    excel_comment_3: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        text: 'Pontosan, ahogyan Melinda írja, ha pedig sorokat szeretnél elrejteni, úgy a CTRL + 9 kombinációt ajánlom.',
        userId: users.user_4.id,
        isAnonymous: false,
        isQuestion: false,
        videoId: videos.video_132.id,
        parentCommentId: 1,
        groupId: 2,
    },
    excel_comment_4: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        text: 'Sziasztok! Én használtam a fenti kombinációkat, viszont véletlenül olyan oszlopokat is elrejtettem, amiket nem szerettem volna. Hogyan tudom gyorsan visszahozni őket? A CTRL + Z parancsot próbáltam, viszont közben dolgoztam máson is, így azokat is vissza akarja vonni :(',
        userId: users.user_5.id,
        isAnonymous: false,
        isQuestion: false,
        videoId: videos.video_132.id,
        parentCommentId: null,
        groupId: 3,
    },
    excel_comment_5: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        text: 'Visszahozni (Felfedés) úgy tudod az oszlopokat, hogy egyben (Shift nyíl) kijelölsz az előtte és utána lévő oszlopban is legalább 1-1 cellát, majd megnyomod a Ctrl Shift 8 kombinációt. (Ez Windowson biztosan működik, Mac-en érdemes utána nézni a megfelelő kombinációnak, de ha erre rákeresel, már segíteni fog)',
        userId: users.user_6.id,
        isAnonymous: false,
        isQuestion: false,
        videoId: videos.video_132.id,
        parentCommentId: 4,
        groupId: 4,
    }
});

export type CommentsSeedDataType = ReturnType<typeof getCommentsSeedData>;