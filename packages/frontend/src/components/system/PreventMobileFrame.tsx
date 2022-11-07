import { ReactNode } from 'react';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

const MobileBlock = () => {

    return <EpistoFlex2
        background="var(--gradientBlueBackground)"
        align="center"
        justify="center"
        zIndex="100000"
        height="100vh"
        width="100vw">

        <EpistoFlex2
            className="roundBorders"
            background="var(--transparentWhite70)"
            direction="column"
            align="center"
            p="20px"
            maxW="400px">

            <EpistoFont
                fontSize="fontSmall"
                style={{
                    width: '100%',
                    padding: '5px 0'
                }}>

                {translatableTexts.preventMobileFrame.descriptions[2]}
            </EpistoFont>
        </EpistoFlex2>
    </EpistoFlex2>;
};

export const PreventMobileFrame = (props: { children: ReactNode }) => {

    // const [isNarrowerThan1024] = useMediaQuery("(max-width: 1124px)");
    // const [isLowerThan600] = useMediaQuery("(max-height: 600px)");

    // const isScreenTooSmall = isNarrowerThan1024 || isLowerThan600;
    // const showMobileBlock = isScreenTooSmall && !isLocalhost;

    return <>

        {/* block */}
        {/* {showMobileBlock && <MobileBlock></MobileBlock>} */}

        {/* application content */}
        {props.children}
    </>;
};

// {/* epistogram logo */}
// <img
// src={Environment.getAssetUrl("/images/logo.svg")}
// style={{
//     width: "250px",
//     maxHeight: "50px",
//     objectFit: "contain",
//     cursor: "pointer",
//     marginBottom: "20px"
// }}
// alt="" />

// {/* descriptions */}
// <EpistoFont
// fontSize="fontSmall"
// style={{
//     width: "100%",
//     padding: "5px 0"
// }}>

// {translatableTexts.preventMobileFrame.descriptions[0]}
// </EpistoFont>

// <EpistoFont
// fontSize="fontSmall"
// style={{
//     width: "100%",
//     padding: "5px 0"
// }}>

// {translatableTexts.preventMobileFrame.descriptions[1]}
// </EpistoFont>