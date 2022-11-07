import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const MobileHeader = (props: {
    title: string,
    subTitle?: string
}) => {

    return <EpistoFlex2
        justify='space-between'
        align='center'
        px='10px'
        my='20px'>

        <EpistoFlex2 direction='column'>

            <EpistoFont
                fontWeight='heavy'
                fontSize='fontLargePlus'>

                {props.title}
            </EpistoFont>
            <EpistoFont fontSize='fontLarge'>

                {props.subTitle}
            </EpistoFont>
        </EpistoFlex2>
    </EpistoFlex2 >;
};