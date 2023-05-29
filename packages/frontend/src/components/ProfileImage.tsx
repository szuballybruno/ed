import { forwardRef, useContext } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoImage } from './controls/EpistoImage';
import { CurrentUserContext } from './system/AuthenticationFrame';

const getSignature = (firstName: string, lastName: string) => {

    return (firstName ?? firstName).substr(0, 1) + (lastName ?? lastName).substr(0, 1);
};

type ProfileImageProps = {
    url?: string | null,
    firstName?: string,
    lastName?: string,
    className?: string,
    smallFrame?: boolean
} & EpistoFlex2Props;

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>(({
    className,
    firstName,
    lastName,
    url,
    smallFrame,
    ...css
}: ProfileImageProps, ref) => {

    const user = useContext(CurrentUserContext);

    const signature = getSignature(firstName ?? user.firstName, lastName ?? user.lastName);
    const showSignature = !url;
    const showImage = !!url;

    return <EpistoFlex2
        padding={smallFrame ? '2px' : '4px'}
        className={className + ' circle'}
        boxShadow="inset -7px -2px 20px 0px var(--eduptiveMildDarkGreen)"
        {...css}>

        <EpistoFlex2
            className={'circle'}
            flex="1"
            ref={ref}
            bg="var(--eduptiveDeepDarkGreen)"
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

            {showSignature && <EpistoFont
                textColor='white'>

                {signature.toUpperCase()}
            </EpistoFont>}
        </EpistoFlex2>
    </EpistoFlex2 >;
});
