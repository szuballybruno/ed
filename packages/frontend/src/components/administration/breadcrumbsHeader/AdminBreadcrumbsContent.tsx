import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

export const AdminBreadcrumbsContent = ({
    iconComponent,
    isCurrent,
    title
}: {
    isCurrent: boolean,
    title: string
    iconComponent?: JSX.Element,
}) => {

    return (
        <EpistoFlex2>

            {iconComponent && <EpistoFlex2
                width='27px'
                height="100%"
                m={'2px 10px 2px 2px'}>

                {iconComponent}
            </EpistoFlex2>}

            <EpistoFont
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontWeight: isCurrent ? 'bold' : undefined,
                    alignItems: 'center',
                    padding: '0 2px 0 5px'
                }}>

                {title}
            </EpistoFont>
        </EpistoFlex2>
    );
};