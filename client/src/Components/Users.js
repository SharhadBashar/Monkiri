//The page you are redirected to once you are logged in
import React from 'react';
import {connect} from 'react-redux';
import requireAuth from './requireAuth';
import {getAll, save} from '../Actions/index';

class Users extends React.Component {
    state = {language: this.props.language};

    signOut = () => {
        this.props.history.push('/signOut');
    }

    save = (language) => {
        language = document.getElementById("languages").value;
        this.props.save(this.props.username, language);
    }

    componentDidMount() {
        this.props.getAll();
    }
    
    render() {
        return (
            <div className = "content">
                <h1>Welcome <font color="red">{this.props.username}</font> to this restricted page</h1>
                <h3>You can only see this page if you're a logged in user with valid credentials</h3>
                <h3>{this.props.language ? `Your current language is ${this.props.language}` : 'You do not have a language selected'}</h3>
                <h3>Select a new language from the list below:</h3>
                <select id = "languages">
                    {this.props.languages ? this.props.languages.map((language) => <option key={language} value={language}>{language}</option>) : <option key={0} value={0}>{0}</option>}
                </select>
                <button onClick = {this.save}>Save</button>
                <button onClick = {this.signOut}>Sign Out</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        languages: state.languages.languages,
        username: state.user.username,
        language: state.user.language
    }
}

export default connect(mapStateToProps, {
    getAll: getAll,
    save: save
})(requireAuth(Users));