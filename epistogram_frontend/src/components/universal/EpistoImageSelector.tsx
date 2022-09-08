import { Image } from '@chakra-ui/image';
import { Box, BoxProps } from '@chakra-ui/layout';
import { Edit } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { HiddenFileUploadInput } from './HiddenFileUploadInput';

export const EpistoImageSelector = ({
    children,
    setImageFile,
    setImageSource,
    isInteractionBlocked,
    src,
    ...css
}: {
    setImageSource: (src: string) => void,
    setImageFile: (file: File) => void,
    src?: string,
    isInteractionBlocked?: boolean
} & BoxProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const fileBrowseInputRef = useRef<HTMLInputElement>(null);

    return <Box
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
                setImageSource(src);
                setImageFile(file);
            }} />

        {(!children && src)
            ? <Image
                className="whall"
                objectFit="cover"
                src={src} />
            : children}

        <EpistoFlex2
            position="absolute"
            display={isInteractionBlocked ? 'none' : undefined}
            className="whall"
            height="50%"
            transition="0.4s"
            top={0}
            bg="#ffffffcc"
            direction="column"
            align="center"
            justify="center"
            transform={isHovered ? 'translateY(100%)' : 'translateY(125%)'}
            opacity={isHovered ? 1 : 0}>

            <Edit />
        </EpistoFlex2>
    </Box>;
};