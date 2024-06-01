import React from 'react';
import jwt from 'jsonwebtoken';

class TokenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            decodedToken: null,
            error: null
        };
    }

    generateToken = () => {
        const payload = { username: 'user123' };
        const secretKey = 'my_secret_key';
        const token = jwt.sign(payload, secretKey);
        this.setState({ token });
    };

    verifyToken = () => {
        const { token } = this.state;
        const secretKey = 'my_secret_key';
        try {
            const decoded = jwt.verify(token, secretKey);
            this.setState({ decodedToken: decoded, error: null });
        } catch (error) {
            this.setState({ error: error.message, decodedToken: null });
        }
    };

    render() {
        const { token, decodedToken, error } = this.state;
        return (
            <div>
                <button onClick={this.generateToken}>Generate Token</button>
                <button onClick={this.verifyToken}>Verify Token</button>
                {token && <p>Generated Token: {token}</p>}
                {decodedToken && <p>Decoded Token: {JSON.stringify(decodedToken)}</p>}
                {error && <p>Error: {error}</p>}
            </div>
        );
    }
}

export default TokenComponent;
