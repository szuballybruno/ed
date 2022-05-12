import { Comment } from '../../models/entity/Comment';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<Comment>()({
    excel_comment_1: {
        id: 1,
        text: 'Nagyon hasznos videó volt! Egy olyan kérdésem lenne, hogy nincs esetleg valamilyen billentyűkombináció arra, hogy gyorsan lehessen oszlopokat elrejteni?',
        userId: 1,
        isAnonymous: false,
        isQuestion: false,
        videoId: 132,
        parentCommentId: null
    },
    excel_comment_2: {
        id: 2,
        text: 'Én erre a CTRL + 0-t szoktam használni!',
        userId: 2,
        isAnonymous: false,
        isQuestion: false,
        videoId: 132,
        parentCommentId: 1
    },
    excel_comment_3: {
        id: 3,
        text: 'Pontosan, ahogyan Melinda írja, ha pedig sorokat szeretnél elrejteni, úgy a CTRL + 9 kombinációt ajánlom.',
        userId: 4,
        isAnonymous: false,
        isQuestion: false,
        videoId: 132,
        parentCommentId: 1
    },
    excel_comment_4: {
        id: 4,
        text: 'Sziasztok! Én használtam a fenti kombinációkat, viszont véletlenül olyan oszlopokat is elrejtettem, amiket nem szerettem volna. Hogyan tudom gyorsan visszahozni őket? A CTRL + Z parancsot próbáltam, viszont közben dolgoztam máson is, így azokat is vissza akarja vonni :(',
        userId: 5,
        isAnonymous: false,
        isQuestion: false,
        videoId: 132,
        parentCommentId: null
    },
    excel_comment_5: {
        id: 5,
        text: 'Visszahozni (Felfedés) úgy tudod az oszlopokat, hogy egyben (Shift nyíl) kijelölsz az előtte és utána lévő oszlopban is legalább 1-1 cellát, majd megnyomod a Ctrl Shift 8 kombinációt. (Ez Windowson biztosan működik, Mac-en érdemes utána nézni a megfelelő kombinációnak, de ha erre rákeresel, már segíteni fog)',
        userId: 6,
        isAnonymous: false,
        isQuestion: false,
        videoId: 132,
        parentCommentId: 1

    }
});

export default list;