import { useHistory } from "react-router";

export const useNavigation = () => {

    const history = useHistory();

    return {
        navigate: (path: string) => history.push(path),
        history
    };
}