const getUserGuiding = () => (window as any).userGuiding;

export const startUserGuide = () => {

    const userGuiding = getUserGuiding();

    if (userGuiding) {

        userGuiding
            .previewGuide(38873);
    }
    else {

        console.warn('Tried to start user guiding but failed!');
    }
};

export const startUserGuideHelp = () => {

    const userGuiding = getUserGuiding();

    if (userGuiding) {

        userGuiding
            .expandResourceCenter();
    }
    else {

        console.warn('Tried to exec "expandResourceCenter" in userGuiding but failed!');
    }
};