import { EpistoFont } from '../controls/EpistoFont';

export const AdminSectionHeader = (props: {
    title: string
}) => {
    const { title } = props;

    return <EpistoFont
        fontSize={'fontHuge'}
        style={{
            marginTop: 50,
            fontWeight: 600
        }}>

        {title}
    </EpistoFont>;
};