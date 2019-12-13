import React from "react";

const ProgressBar = ({ id, howMany }) => {
    return (
        <>
            <div className="progress-bar">
                <p>Odpowiadasz na {id} pytanie z {howMany}</p>
            </div>
        </>
    );
};

export default ProgressBar;
