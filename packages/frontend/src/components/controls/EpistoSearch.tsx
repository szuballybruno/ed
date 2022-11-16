import { Input, InputProps } from '@chakra-ui/input';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search } from '@mui/icons-material';
import React from 'react';

export const EpistoSearch = ({
    onKeywordChanged,
    ...css
}: {
    onKeywordChanged?: (keyword: string) => void
} & InputProps) => {

    return <InputGroup>
        <InputLeftElement
            className="InputLeft"
            pointerEvents="none"
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px 0 10px'
            }}>

            <Search />
        </InputLeftElement>

        <Input
            // className="largeSoftShadow"
            outline="none"
            height='100%'
            padding="10px 10px 10px 35px"
            placeholder="Keresés..."
            borderRadius="5px"
            background="var(--transparentWhite70)"
            onChange={x => {
                if (onKeywordChanged)
                    onKeywordChanged(x.target.value);
            }}
            {...css}
        />
    </InputGroup>;
};
