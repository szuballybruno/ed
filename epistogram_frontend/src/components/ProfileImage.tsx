import { Image } from '@chakra-ui/image';
import { Flex, FlexProps } from '@chakra-ui/layout';
import { forwardRef, useContext } from 'react';
import { EpistoFont } from './controls/EpistoFont';
import { CurrentUserContext } from './system/AuthenticationFrame';

type ProfileImageProps = {
    url: string | null,
    firstName?: string,
    lastName?: string,
    className?: string
} & FlexProps;

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>((props: ProfileImageProps, ref) => {

    const { className, url, firstName, lastName, ...css } = props;
    const user = useContext(CurrentUserContext)!;
    const signature = (firstName ?? user.firstName).substr(0, 1) + (lastName ?? user.lastName).substr(0, 1);
    const showSingature = (!url && user);
    const showImage = !!url;

    return <Flex
        p="6px"
        className={className + ' circle'}
        boxShadow="inset -7px -2px 20px 4px rgba(124,192,194,0.9)"
        {...css}>

        <Flex
            className={'circle'}
            flex="1"
            ref={ref}
            bg="var(--deepBlue)"
            color="white"
            align="center"
            justify="center"
            overflow="hidden">

            <Image
                border="none"
                className="whall"
                objectFit="cover"
                src={url ?? ''}
                display={showImage ? undefined : 'none'} />

            <EpistoFont
                style={{
                    display: showSingature ? undefined : 'none'
                }}>

                {signature.toUpperCase()}
            </EpistoFont>
        </Flex>
    </Flex >;
});
