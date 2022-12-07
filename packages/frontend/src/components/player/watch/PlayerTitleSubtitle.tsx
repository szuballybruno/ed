import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

export const PlayerTitleSubtitle = (props: {
    title: string,
    subTitle: string,
    isMobile: boolean
}) => {

    const { title, subTitle, isMobile } = props;

    return <EpistoFlex2
        id='playerTitleSubtitle'
        direction="column"
        pr={isMobile ? '10px' : '0'}
        flex={'5'}>

        <EpistoFont
            fontSize={isMobile ? 'fontLarge' : 'fontLargePlus'}
            style={{
                fontWeight: 500,
                margin: isMobile ? '10px 0 5px 0' : '0'
            }}>

            {title}
        </EpistoFont>

        <EpistoFont
            fontSize={isMobile ? 'fontLarge' : 'fontLarge'}
            style={{
                fontWeight: 400
            }}>

            {subTitle}
        </EpistoFont>
    </EpistoFlex2>;
};