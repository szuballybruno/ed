import { PropsWithChildren } from '../../static/frontendHelpers';

export const ProgressierFrame = (props: PropsWithChildren) => {

    return (
        <>
            {<script src="https://progressier.com/client/script.js?id=coPxkN606k434rUE7NSS"></script>}
            {props.children}
        </>
    );
};