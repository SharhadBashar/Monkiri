import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './HeaderStyle.css'

class Header extends React.Component {
    renderLinks() {
        if (this.props.auth) {
            return (
                <div>
                    <Link to = "/signOut">Sign Out</Link>
                    <Link to = "/feature">Feature</Link>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Link to = "/signUp">Sign Up</Link>
                    <Link to = "/signIn">Sign In</Link>
                </div>
            );
        }
    }
    render() {
        return (
            <div className = "header">
                <Link to = "/">Redux Auth</Link>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {auth: state.auth.auth};
}

export default connect(mapStateToProps)(Header);