import {EpistoFlex2, EpistoFlex2Props} from './EpistoFlex';

export const FlexFloat = (props: EpistoFlex2Props & { elevation?: number, variant?: 'normal' | 'rect' }) => {

    const { elevation, variant, ...flexProps } = props;

    return <EpistoFlex2
        id="flexFloat"
        borderRadius={variant === 'rect' ? 'none' : '7px'}
        boxShadow={`0 0 ${elevation ?? 15}px #00000015`}
        bg="white"
        {...flexProps}>

        {props.children}
    </EpistoFlex2>;
};
