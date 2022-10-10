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
                width: 41,
                margin: '0 0 0 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
