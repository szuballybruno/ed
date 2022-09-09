import {Divider} from '@chakra-ui/react';
import {MutableRefObject} from 'react';
import {mockNotifications} from '../../static/mockData';
import {EpistoFlex2} from '../controls/EpistoFlex';
import {EpistoFont} from '../controls/EpistoFont';
import {EpistoPopper} from '../controls/EpistoPopper';

export const NotificationsPopper = (props: {
    isOpen: boolean,
    anchorRef: MutableRefObject<HTMLDivElement | null>,
    close: () => void
}) => {

    const { isOpen, close, anchorRef } = props;

    return (
        <EpistoPopper
            isOpen={isOpen}
            target={anchorRef?.current}
            placementX="left"
            handleClose={close}>

            {mockNotifications
                .map((x, index) => {
                    return (
                        <EpistoFlex2 key={index}
                            width='200px'
                            flexDirection={'column'}>

                            <EpistoFlex2
                                width='200px'
                                alignItems={'center'}
                                justifyContent={'center'}
                                my='10px'
                            >
                                <div
                                    style={{
                                        width: 3,
                                        height: 3,
                                        backgroundColor: 'blue',
                                        borderRadius: '50%',
                                    }}
                                />

                                <EpistoFont
                                    fontSize="fontNormal14"
                                    style={{
                                        marginLeft: '14px',
                                        textAlign: 'left',
                                    }}
                                >
                                    {x.title}
                                </EpistoFont>
                            </EpistoFlex2>

                            {index + 1 < mockNotifications.length && (
                                <Divider
                                    height='1px'
                                    width="100%"
                                    bgColor={'grey'}
                                />
                            )}
                        </EpistoFlex2>
                    );
                })}
        </EpistoPopper>
    );
};
