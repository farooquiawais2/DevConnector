import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Developer Connector</h1>
                        <p className="lead">
                            {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                        <hr />
                        <div class="buttons">
                            <Link to="/register" className="btn btn-primary">
                                Sign Up
                </Link>
                            <Link to="/login" className="btn btn-light">
                                Login
                </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
