import { Divider, Flex } from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { mockNotifications } from '../../static/mockData';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoPopper } from '../controls/EpistoPopper';

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
                        <Flex key={index}
                            width={200}
                            flexDirection={'column'}>

                            <Flex
                                width={200}
                                alignItems={'center'}
                                justifyContent={'center'}
                                my={10}
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
                            </Flex>

                            {index + 1 < mockNotifications.length && (
                                <Divider
                                    height={1}
                                    width="100%"
                                    bgColor={'grey'}
                                />
                            )}
                        </Flex>
                    );
                })}
        </EpistoPopper>
    );
};