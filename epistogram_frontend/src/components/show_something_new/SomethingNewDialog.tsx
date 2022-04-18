import React from 'react';
import ModalVideo from 'react-modal-video';

const SomethingNewDialog = () => {
    return <div>
        <ModalVideo channel='youtube'
            isOpen={true}
            videoId='L61p2uyiMSo' />
    </div>;
};

export default SomethingNewDialog;