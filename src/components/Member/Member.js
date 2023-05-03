import React from 'react';

function Member(props) {
    return (
        <div className="flex items-center space-x-4">
            <img className="w-12 h-12 rounded-full" alt="Foto Member" src={props.imageSrc}/>
            <div>
                <p className="font-medium text-white">{props.name}</p>
                {/* <p className="text-white">{props.position}</p> */}
            </div>
        </div>
    );
}

export default Member;