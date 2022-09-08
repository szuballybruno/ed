import { BoxProps } from '@chakra-ui/layout';
import { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { EpistoButton } from './EpistoButton';
import { EpistoDiv } from './EpistoDiv';
import { EpistoPopper } from './EpistoPopper';

export const EpistoColorPicker = ({
    color,
    setColor,
    text,
    ...boxProps
}: {
    color: string | null,
    setColor: (color: string) => void,
    text?: string
} & Omit<BoxProps, 'color'>) => {

    const ref = useRef<HTMLDivElement | null>(null);
    const [popperOpen, setPopperOpen] = useState(false);

    return <>

        <EpistoDiv
            ref={ref}
            my="5px"
            {...boxProps}>

            <EpistoButton
                className="whall"
                onClick={() => setPopperOpen(true)}
                style={{
                    background: color as any,
                    border: '1px solid var(--mildGrey)'
                }}>
                {text ?? 'Pick color'}
            </EpistoButton>
        </EpistoDiv>

        <EpistoPopper
            isOpen={popperOpen}
            target={ref.current}
            handleClose={() => setPopperOpen(false)}>

            <SketchPicker
                color={color ?? undefined}
                onChange={x => setColor(x.hex)} />
        </EpistoPopper>
    </>;
};