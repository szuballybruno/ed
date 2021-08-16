import {createState} from "@hookstate/core";
import { LoadingStateType } from "./ApplicationRunningStateInterface";

const loadingIndicator = createState<LoadingStateType>("loading")

export default loadingIndicator