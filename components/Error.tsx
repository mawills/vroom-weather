import React, { FunctionComponent } from 'react';
import Link from 'next/link';

interface ErrorProps {
    message: string;
}

const ErrorMessage: FunctionComponent<ErrorProps> = ({ message }) => {
    return( 
        <div>
            <p data-testid="error-message">{message}</p>
            <br />
            <Link href="/"><p>Click here to go back</p></Link>
        </div>
    );
}

export default ErrorMessage;





