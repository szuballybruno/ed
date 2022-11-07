import { useRef, useState } from 'react';
import { EpistoIcons } from '../../static/EpistoIcons';
import { EpistoDiv, EpistoDivProps } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoImage } from '../controls/EpistoImage';
import { HiddenFileUploadInput } from './HiddenFileUploadInput';

export const EpistoImageSelector = ({
    children,
    setImageFile,
    setImageSource,
    setData,
    isInteractionBlocked,
    src,
    ...css
}: {
    setImageSource?: (src: string) => void,
    setImageFile?: (file: File) => void,
    setData?: (file: File, src: string) => void,
    src?: string,
    isInteractionBlocked?: boolean
} & EpistoDivProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const fileBrowseInputRef = useRef<HTMLInputElement>(null);

    return <EpistoDiv
        position="relative"
        overflow="hidden"
        cursor="pointer"
        pointerEvents={isInteractionBlocked ? 'none' : undefined}
        onClick={() => fileBrowseInputRef?.current?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...css}>

        {/* hidden input */}
        <HiddenFileUploadInput
            ref={fileBrowseInputRef}
            type="image"
            onFileSelected={(file, src) => {

                if (setImageSource)
                    setImageSource(src);

                if (setImageFile)
                    setImageFile(file);

                if (setData)
                    setData(file, src);
            }} />

        {(!children && src)
            ? <EpistoImage
                className="whall"
                objectFit="cover"
                src={src} />
            : children}

        <EpistoFlex2
            position="absolute"
            display={isInteractionBlocked ? 'none' : undefined}
            className="whall"
            transition="0.4s"
            top={0}
            bg="#ffffffcc"
            direction="column"
            align="center"
            justify="center"
            transform={isHovered ? 'translateY(0%)' : 'translateY(10%)'}
            opacity={isHovered ? 1 : 0}>

            <EpistoIcons.Upload />
        </EpistoFlex2>
    </EpistoDiv>;
};