import React, { useState } from 'react'
import Info from './Info'
import Tracker from './Tracker'

const Toggle = (props) => {
    const [showMe, setShowMe] = useState(0);
    function toggle(page: number) {
        setShowMe(page);
    }

    return (
        <div>
            <div>
                <button className={`px-7 py-5 text-xl ${showMe == 0 ? `bg-gray-300` : `bg-white` }  `} onClick={() => toggle(0)}>Info</button>
                <button className={`px-7 py-5 text-xl ${showMe == 1 ? `bg-gray-300` : `bg-white` }  `} onClick={() => toggle(1)}>Tracker</button>
            </div>
            {
                showMe == 0 ?
                    <Info show={props.show} />
                    :
                    <Tracker show={props.show} />
            }
        </div>
    )
}

export default Toggle