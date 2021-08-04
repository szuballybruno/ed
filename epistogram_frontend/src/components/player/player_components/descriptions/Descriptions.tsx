import React from 'react';
import PlayerDescription from "./description_components/PlayerDescription";
import Comments from "./description_components/Comments";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../../../store/application/applicationRunningState";

const Descriptions = () => {
    const app = useState(applicationRunningState)
    return app.currentDescriptionComponent.get() ? <Comments /> : <PlayerDescription />
};

export default Descriptions
