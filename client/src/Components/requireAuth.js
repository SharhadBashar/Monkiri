import React from 'react';
import {connect} from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends React.Component {
        loggedIn() {
            if (!this.props.auth) {
                this.props.history.push('/');
            }
        }
        //Component just rendered
        componentDidMount() {
            this.loggedIn();
        }
        //Component just got updated
        componentDidUpdate() {
            this.loggedIn();
        }    
        //need the ...this.props to pass in the actions
        render() {
            return (
                <ChildComponent {...this.props}/>
            );
        }
    }

    function mapStateToProps(state) {
        return {auth: state.auth.auth};
    }

    return connect(mapStateToProps)(ComposedComponent);
};