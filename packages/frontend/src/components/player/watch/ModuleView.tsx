import { ModulePlayerDTO } from '@episto/communication';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Responsivity } from '../../../helpers/responsivity';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoHeader } from '../../EpistoHeader';

export const ModuleView = (params: {
    module?: ModulePlayerDTO,
    startModule: () => void,
}) => {

    const { module, startModule } = params;
    const isVisible = !!module;
    const { isMobile } = Responsivity.useIsMobileView();

    return <EpistoFlex2
        className="whall roundBorders mildShadow"
        maxH={isMobile ? '100vh' : 'calc(100vh - 120px)'}
        display={isVisible ? undefined : 'none'}
        direction="column"
        background="var(--transparentWhite70)">

        <EpistoFlex2
            flex='1'
            maxH={isMobile ? '100vh' : 'calc(100vh - 120px)'}
            align="center"
            justify="center">

            <EpistoFlex2
                padding='20px'
                direction="row"
                align="center">

                {module?.imageFilePath
                    && <EpistoFlex2
                        justify='flex-end'>

                        <img
                            className="roundBorders"
                            src={module?.imageFilePath ?? ''}
                            style={{
                                width: '200px',
                                objectFit: 'cover',
                                margin: 10
                            }} />
                    </EpistoFlex2>}

                <EpistoFlex2
                    flex='2'
                    padding='20px'
                    direction="column"
                    justify="center">

                    <EpistoHeader
                        text={module?.name ?? ''}
                        variant="giant" />

                    <EpistoFont>
                        {module?.description}
                    </EpistoFont>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>

        <EpistoFlex2
            height="60px"
            borderTop="1px solid var(--mildGrey)"
            justify="flex-end"
            padding="10px">

            <EpistoButton variant="action"
                onClick={startModule}
                padding="0">

                <EpistoFlex2 className="whall"
                    mx="15px"
                    align="center">
                    <EpistoFont
                        isUppercase
                        style={{ marginRight: '5px' }}
                        fontSize="fontSmall">

                        {translatableTexts.player.moduleView.letsStart}
                    </EpistoFont>

                    <ArrowForwardIcon></ArrowForwardIcon>
                </EpistoFlex2>
            </EpistoButton>
        </EpistoFlex2>
    </EpistoFlex2>;
};