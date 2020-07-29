import React, { FunctionComponent } from 'react';
import Link from 'next/link';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }) => {
    return( 
        <div>
            <p data-testid="error-message">{message}</p>
            <br />
            <Link href="/"><p>Click here to go back</p></Link>
        </div>
    );
}

export default ErrorMessage;
