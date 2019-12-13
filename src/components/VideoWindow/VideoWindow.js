import React from "react";
import { Player, ControlBar } from 'video-react';

const VideoWindow = ({ url }) => {
    return (
        <>
            <div className="video">
                <Player

                    autoPlay
                >
                    <source src={url} />
                    <ControlBar autoHide={true} />
                </Player>
            </div>
        </>
    );
};

export default VideoWindow;