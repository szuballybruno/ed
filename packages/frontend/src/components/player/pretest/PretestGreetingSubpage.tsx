import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useNavigation } from '../../../services/core/navigatior';
import { Environment } from '../../../static/Environemnt';
import { useRouteParams_OLD } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { ExamLayout } from '../../exam/ExamLayout';

export const PretestGreetingSubpage = () => {

    const { navigate2 } = useNavigation();

    const courseId = useRouteParams_OLD(applicationRoutes.playerRoute.pretestGreetingRoute)
        .getValue(x => x.courseId, 'int');

    const gotToPretest = () => {

        navigate2(applicationRoutes.playerRoute.pretestRoute, { courseId });
    };

    return (
        <ExamLayout
            headerCenterText='Szintfelmérő vizsga'
            footerButtons={[{
                title: 'Kezdés',
                action: gotToPretest
            }]}>

            <EpistoFlex2
                direction="column"
                align="center"
                justify='center'
                background='var(--transparentWhite70)'
                flex="1"
                padding='20px'
                className="whall roundBorders mildShadow">
                <img
                    src={Environment.getAssetUrl('/images/examCover.png')}
                    alt={''}
                    style={{
                        objectFit: 'contain',
                        maxHeight: 200,
                        margin: '30px 0'
                    }} />

                <EpistoFont
                    fontSize="font22">

                    {'Szintfelmérő vizsga'}
                </EpistoFont>

                <EpistoFont
                    style={{
                        padding: '30px',
                        maxWidth: '600px',
                        textAlign: 'center'
                    }}>

                    {'Most pedig felmérjük, hogy milyen előzetes tudással rendelkezel a tanfolyam témaköreivel kapcsolatban. Ez azért fontos, mert így személyre tudjuk szabni számodra a napi ajánlott videók mennyiségét, valamint azt is, hogy mely videókra érdemes nagyobb hangsúlyt fektetned.'}
                </EpistoFont>
            </EpistoFlex2>
        </ExamLayout>
    );
};