var React = require('react');
var ReactDom = require('react-dom');
var store = require('../store/login-form-store.js');
var actions = require('../actions/login-form-actions.js');

var LoginForm = React.createClass({

    getInitialState: function() {
        return {
            passStr: 'weak',
            passStrs: {
                'weak': {
                    bubbleClass: 'bubble red',
                    str: 'Weak'
                },
                'ok': {
                    bubbleClass: 'bubble orange',
                    str: 'Ok'
                },
                'strong': {
                    bubbleClass: 'bubble green',
                    str: 'Strong'
                }
            },
            strIndicatorClasses: {
                hidden: 'strength-indicator hidden',
                visible: 'strength-indicator visible'
            },
            strIndicatorClass: 'strength-indicator hidden',
        };
    },
    componentDidMount: function(){
        store.addChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({
          passStr: store.getPasswordCheckResult()
        });
    },
    checkStrength: function(e) {
        var value = e.target.value;
        var length = value.length;
        if(length > 0) {
            this.showStrengthIndicator();
            actions.checkPassStrength(value);
        } else {
            this.hideStrengthIndicator();
        }
    },

    //strength indicator box**
    updateStrengthIndicatorClass: function(newValue) {
        this.setState({
            strIndicatorClass: newValue
        });
    },
    hideStrengthIndicator: function() {
        this.updateStrengthIndicatorClass(this.state.strIndicatorClasses.hidden);
    },
    showStrengthIndicator: function() {
        this.updateStrengthIndicatorClass(this.state.strIndicatorClasses.visible);
    },
    //**

    render: function() {
        return (
            <div className='form-box'>
                <header>
                    <h4>
                        Register
                    </h4>
                </header>
                <div className='input-row'>
                    <input type='text' placeholder='Username'/>
                </div>
                <div className='input-row'>
                    <input type='password' placeholder='Password' onChange={this.checkStrength}/>
                    <div className={this.state.strIndicatorClass}>
                        <div className='arrow-box'>
                            <div className='arrow left'></div>
                            <div className='vertical-mid-hack'></div>
                        </div>
                        <div className='text-box'>
                            <div className='text'>
                                <div className={this.state.passStrs[this.state.passStr].bubbleClass}></div>
                                <label>{this.state.passStrs[this.state.passStr].str}</label>
                            </div>
                            <div className='vertical-mid-hack'></div>
                        </div>
                        <div className='vertical-mid-hack'></div>
                    </div>
                </div>
            </div>
        );
    }
});

if(typeof window !== 'undefined') {
    ReactDom.render(<LoginForm/>, document.getElementById('login-form'));
}

module.exports = LoginForm;