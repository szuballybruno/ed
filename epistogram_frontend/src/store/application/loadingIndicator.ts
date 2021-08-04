import {createState} from "@hookstate/core";

type loading = "null" | "loading" | "failed" | "succeeded"

const loadingIndicator = createState<loading>("null")

export default loadingIndicator