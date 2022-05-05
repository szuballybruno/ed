import { Flex } from '@chakra-ui/react';
import { Environment } from '../static/Environemnt';

export const Badges = () => {

    {/* dummy badges */ }
    const badges = [
        Environment.getAssetUrl('/badges/001-badge.svg'),
        Environment.getAssetUrl('/badges/002-rating.svg'),
        Environment.getAssetUrl('/badges/003-flag.svg'),
        Environment.getAssetUrl('/badges/004-certificate.svg'),
        Environment.getAssetUrl('/badges/005-trophy.svg')
    ];

    return (

        <Flex
            direction="row"
            justify="flex-start"
            padding="10px">

            {badges
                .map((badge, index) => <Flex
                    key={index}
                    className="roundBorders"
                    background="orange"
                    width="120px"
                    height="120px"
                    ml="10px"
                    justify="center"
                    align="center">

                    <img
                        style={{
                            width: 100
                        }}
                        src={badge}
                        alt="" />
                </Flex>)}
        </Flex>
    );
};
