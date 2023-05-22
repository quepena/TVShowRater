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
                <button onClick={() => toggle(0)}>Info</button>
                <button onClick={() => toggle(1)}>Tracker</button>
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