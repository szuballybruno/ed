import { Environment } from '../../static/Environemnt';
import { PropsWithChildren } from '../../static/frontendHelpers';

export const UserGuidingFrame = (props: PropsWithChildren) => {

    return (
        <>
            {!Environment.isLocalhost && <script src="../userGuiding.js"></script>}
            {props.children}
        </>
    );
};