import React from 'react'

function Loading() {
    return(
        <div className="col-12 loading">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-light"></span>
            <p color="light">Loading . . .</p>
        </div>
    );
}

export default Loading;