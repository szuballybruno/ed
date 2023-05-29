import { EpistoFont } from '../controls/EpistoFont';

// TODO: UNUSED
const AdminSectionHeader = (props: {
    title: string
}) => {
    const { title } = props;

    return <EpistoFont
        margin='50px 0 0 0'
        textColor='eduptiveDeepDarkGreen'
        fontSize={'font22'}
        style={{
            fontWeight: 600
        }}>

        {title}
    </EpistoFont>;
};