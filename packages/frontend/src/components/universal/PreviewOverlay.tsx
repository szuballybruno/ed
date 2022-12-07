import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoHeader } from '../EpistoHeader';

export const PreviewOverlay = (parms: {
    align?: 'center' | 'corner',
}) => {

    const align = parms.align ?? 'corner';

    return (
        <EpistoFlex2
            id={PreviewOverlay.name}
            position='absolute'
            userSelect="none"
            className='whall'
            align={align === 'center' ? 'center' : 'flex-start'}
            justify={align === 'center' ? 'center' : 'flex-end'}>

            <EpistoHeader
                margin={align === 'corner' ? '10px' : undefined}
                text='Preview'
                opacity='.1'
                variant='giant' />
        </EpistoFlex2>
    );
};