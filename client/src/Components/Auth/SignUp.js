import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {signUp} from '../../Actions';

class SignUp extends React.Component {
    onSubmit = (formProps) => {
        this.props.signUp(formProps, () => {
            this.props.history.push('/feature');
        })
    };
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit = {handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field 
                        name = "email"
                        type = "text"
                        component = "input"
                        autoComplete = "none"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field 
                        name = "password"
                        type = "password"
                        component = "input"
                        autoComplete = "none"
                    />
                </fieldset>
                <div>{this.props.error}</div>
                <button>Sign Up</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {error: state.auth.error};
}

export default compose(
    reduxForm({form: 'signUp'}),
    connect(mapStateToProps, {
        signUp: signUp
    })
)(SignUp);