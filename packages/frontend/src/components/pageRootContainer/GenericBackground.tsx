import { Responsivity } from '../../helpers/responsivity';
import { gradientBackgroundGenerator } from '../../services/core/gradientBackgroundGenerator';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoGrid } from '../controls/EpistoGrid';

export const GenericBackground = () => {

    const { isMobile } = Responsivity
        .useIsMobileView();

    const gradients = gradientBackgroundGenerator(isMobile ? 'rgba(160, 200, 255, 0.1)' : 'rgba(0, 100, 255, 0.1)');

    return (
        <EpistoGrid
            bgColor={'white'}
            filter="blur(50px)"
            minColumnWidth={'33%'}
            gap='0px'
            className="whall"
            gridTemplateColumns="repeat(3, 1fr)"
            auto={'fill'}>

            {gradients
                .map((gradient, index) => {
                    return <EpistoFlex2
                        key={index}
                        padding="20px"
                        filter="blur(8px)"
                        background={gradient}>

                    </EpistoFlex2>;
                })}
        </EpistoGrid>
    );
};