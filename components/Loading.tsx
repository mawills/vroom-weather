import React from 'react';
import Link from 'next/link';

const Loading = () => {
    return(
        <div>
            <p data-testid="loading-message">Loading...</p>
            <br />
            <Link href="/"><p>Click here to go back</p></Link>
        </div>
    )
}

export default Loading;
