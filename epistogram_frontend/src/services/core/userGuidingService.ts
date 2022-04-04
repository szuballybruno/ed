const getUserGuiding = () => (window as any).userGuiding; 

export const startUserGuide = () => {

    getUserGuiding()
.previewGuide(38873);
};

export const startUserGuideHelp = () => {

    getUserGuiding()
.expandResourceCenter();
};