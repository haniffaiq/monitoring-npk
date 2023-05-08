import React from 'react';
import './style.css';
function Member(props) {
    return (
        <div className="flex items-center space-x-4">
            <img className="w-12 h-12 rounded-full" alt="Foto Member" src={props.imageSrc}/>
            <div>
                <p className="font-medium text-white text-member">{props.name}</p>
                <p className="text-white text-member">{props.position}</p>
            </div>
        </div>
    );
}

export default Member;