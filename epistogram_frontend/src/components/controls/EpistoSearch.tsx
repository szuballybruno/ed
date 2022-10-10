import { Input, InputProps } from '@chakra-ui/input';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search } from '@mui/icons-material';
import React from 'react';

export const EpistoSearch = (props: {} & InputProps) => {
    const { ...css } = props;

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
            className="largeSoftShadow"
            outline="none"
            height='100%'
            padding="10px 10px 10px 35px"
            placeholder="Keresés..."
            borderRadius="5px"
            background="var(--transparentWhite70)"
            {...css}
        />
    </InputGroup>;
};
