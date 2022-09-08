import { forwardRef, useContext } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoImage } from './controls/EpistoImage';
import { CurrentUserContext } from './system/AuthenticationFrame';

type ProfileImageProps = {
    url?: string | null,
    firstName?: string,
    lastName?: string,
    className?: string
} & EpistoFlex2Props;

const getSignature = (firstName: string, lastName: string) => {

    return (firstName ?? firstName).substr(0, 1) + (lastName ?? lastName).substr(0, 1);
};

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>((props: ProfileImageProps, ref) => {

    const { className, firstName: b, lastName: a, url: c, ...css } = props;
    const user = useContext(CurrentUserContext);
    const firstName = props.firstName ?? user.firstName;
    const lastName = props.lastName ?? user.lastName;
    const url = props.url ?? user.avatarUrl;

    const signature = getSignature(firstName, lastName);
    const showSingature = !url;
    const showImage = !!url;

    return <EpistoFlex2
        p="4px"
        className={className + ' circle'}
        boxShadow="inset -7px -2px 20px 0px rgba(124,192,194,0.9)"
        {...css}>

        <EpistoFlex2
            className={'circle'}
            flex="1"
            ref={ref}
            bg="var(--deepBlue)"
            color="white"
            align="center"
            justify="center"
            overflow="hidden">

            <EpistoImage
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
        </EpistoFlex2>
    </EpistoFlex2 >;
});
