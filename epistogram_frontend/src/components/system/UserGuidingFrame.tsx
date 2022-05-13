import { Environment } from '../../static/Environemnt';
import { ChildPropsType } from '../../static/frontendHelpers';

export const UserGuidingFrame = (props: ChildPropsType) => {

    return (
        <>
            {!Environment.isLocalhost && <script src="./userGuiding.js"></script>}
            {props.children}
        </>
    );
};