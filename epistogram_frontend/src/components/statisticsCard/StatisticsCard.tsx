import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { ArrowDropDown, ArrowDropUp, ArrowRight, ArrowUpward, FiberManualRecord, Lock } from '@mui/icons-material';
import React, { useState } from 'react';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { FlexFloat } from '../controls/FlexFloat';
import { EpistoHeader } from '../EpistoHeader';

export type StatisticsCardProps = {
    iconPath?: string
    suffix?: string
    title?: string
    value?: string
    isOpenByDefault?: boolean
    children?: React.ReactNode
    chartSize?: 'normal' | 'large',
    isComingSoon?: boolean,
    additionalFunction?: () => void,
    additionalInfo?: {
        value: string,
        suffix: string,
        change: 'up' | 'stagnate' | 'down'
    }
}

const StatisticsCard = (props: StatisticsCardProps & FlexProps) => {

    const {
        iconPath,
        isComingSoon,
        children,
        additionalFunction,
        additionalInfo,
        isOpenByDefault,
        chartSize,
        title,
        suffix,
        value,
        ...css
    } = props;

    const [isOpen, setIsOpen] = useState(!!isOpenByDefault);

    const getColorFromChange = (change: 'up' | 'stagnate' | 'down') => {
        return change === 'up'
            ? 'var(--deepGreen)'
            : change === 'stagnate'
                ? 'var(--mildOrange)'
                : 'var(--intenseRed)';
    };

    const getIconFromChange = (change: 'up' | 'stagnate' | 'down') => {
        return change === 'up'
            ? <ArrowDropUp
                style={{
                    margin: '3px 0 0 0',
                    padding: 0
                }} />
            : change === 'stagnate'
                ? <FiberManualRecord
                    style={{
                        height: 10,
                        width: 10,
                        margin: '2px 3px 0 0',
                        padding: 0
                    }} />
                : <ArrowDropDown
                    style={{
                        margin: '3px 0 0 0',
                        padding: 0
                    }} />;
    };

    return <FlexFloat
        background="var(--transparentWhite70)"
        gridColumn={chartSize === 'large' ? '1 / -1' : (isOpen ? 'span 2' : 'unset')} // do not remove!!
        gridRow={chartSize === 'large' ? 'span 2' : (isOpen ? 'span 2' : 'unset')} // do not remove!!
        //boxShadow="inset -1px -1px 5px rgba(0,0,0,0.15)"
        direction="column"
        minWidth={250}
        position="relative"
        {...css}>

        {/* locked overlay */}
        {isComingSoon && <Flex
            title="Ez az adat jelenleg nem áll rendelkezésre. Nézz vissza később."
            flexDir={'column'}
            alignItems={'flex-end'}
            justifyContent={'flex-start'}
            color={'black'}
            pos={'absolute'}
            width="100%"
            height="100%"
            borderRadius={5}
            bgColor={'#33333317'}>

            <Lock style={{
                width: '20px',
                height: '20px',
                margin: 10
            }} />
        </Flex>}

        {additionalInfo && <Flex
            align="center"
            p="5px 10px 5px 0"
            position="absolute"
            top="0"
            right="0"
            color={getColorFromChange(additionalInfo.change)}>

            {getIconFromChange(additionalInfo.change)}

            <EpistoFont
                fontSize="fontNormal14"
                style={{
                    fontWeight: 500
                }}>

                {[additionalInfo?.value, additionalInfo?.suffix]}
            </EpistoFont>
        </Flex>}



        {/* open state */}
        {isOpen && <Flex
            flex="1"
            className="roundBorders"
            align="center"
            justify="center"
            background="var(--transparentWhite70)"
            p="10px"
            gridColumn="auto / span 2"
            gridRow="auto / span 2">

            {/* <EpistoHeader variant="strongSub" text={title} /> */}


            {children}

        </Flex>}

        {/* closed state */}
        {!isOpen && <Flex flex="1"
            align="center">

            {/* image */}
            {iconPath && <img
                style={{
                    margin: '5px 10px 5px 20px',
                    width: 70,
                    height: 70,
                    objectFit: 'contain'
                }}
                alt=""
                src={iconPath} />}

            {/* texts */}
            <Flex direction="column"
                pr="10px">

                {/* value and suffix */}
                <Flex
                    align="flex-end"
                    flexWrap={'wrap'}>

                    {/* value */}
                    <EpistoFont
                        isAutoFontSize
                        fontSize={40}
                        style={{
                            lineHeight: 1,
                        }}>

                        {value ?? '-'}
                    </EpistoFont>

                    {/* suffix */}
                    <EpistoFont
                        fontSize="fontLargePlus"
                        style={{
                            fontSize: '20px',
                            marginLeft: '5px'
                        }}>

                        {suffix}
                    </EpistoFont>
                </Flex>

                {/* title */}
                <EpistoFont fontSize="fontSmall" >
                    {title}
                </EpistoFont>
            </Flex>
        </Flex>}

        {additionalFunction && <EpistoButton
            onClick={() => additionalFunction()}
            style={{
                position: 'absolute',
                right: 0,
                bottom: 0
            }}>

            <ArrowRight />
        </EpistoButton>}

        {/* open / close button 
        {children && <Box position="absolute">
            <EpistoButton
                style={{
                    alignSelf: "flex-start"
                }}
                onClick={() => { setIsOpen(p => !p) }}>

                {isOpen ? <FullscreenExit /> : <Fullscreen />}
            </EpistoButton>
        </Box>}*/}
    </FlexFloat>;
};

export default StatisticsCard;
