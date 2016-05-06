var React = require('react');
var ReactDom = require('react-dom');

var LoginForm = React.createClass({

    getInitialState: function() {
        return {
            strIndClasses: {
                hidden: 'strength-indicator hidden',
                visible: 'strength-indicator visible'
            },
            strIndClass: 'strength-indicator hidden',
            passBubbleClasses: {
                red: 'bubble red',
                orange: 'bubble orange',
                green: 'bubble green'
            },
            passBubbleClass: 'bubble red',
            passStrengths: {
                weak: 'Weak',
                ok: 'Ok',
                strong: 'Strong'
            },
            passStrength: 'Weak'

        };
    },
    checkStrength: function(e) {
        var value = e.target.value;
        var length = value.length;
        if(length > 0) {
            this.showStrengthIndicator();
            if(length < 6) {
                this.handleWeak();
            } else if (length > 5 && length < 12) {
                this.handleOk();
            } else {
                this.handleStrong();
            }
        } else {
            this.hideStrengthIndicator();
        }
    },

    handleWeak: function() {
        this.makePassBubbleRed();
        this.sayWeak();
    },
    handleOk: function() {
        this.makePassBubbleOrange();
        this.sayOk();
    },
    handleStrong: function() {
        this.makePassBubbleGreen();
        this.sayStrong();
    },

    //strength indicator box**
    updateStrengthIndicatorClass: function(newValue) {
        this.setState({
            strIndClass: newValue
        });
    },
    hideStrengthIndicator: function() {
        this.updateStrengthIndicatorClass(this.state.strIndClasses.hidden);
    },
    showStrengthIndicator: function() {
        this.updateStrengthIndicatorClass(this.state.strIndClasses.visible);
    },
    //**

    //password bubble**
    updatePasswordBubbleClass: function(newValue) {
        this.setState({
            passBubbleClass: newValue
        });
    },
    makePassBubbleGreen: function() {
        this.updatePasswordBubbleClass(this.state.passBubbleClasses.green);
    },
    makePassBubbleOrange: function() {
        this.updatePasswordBubbleClass(this.state.passBubbleClasses.orange);
    },
    makePassBubbleRed: function() {
        this.updatePasswordBubbleClass(this.state.passBubbleClasses.red);
    },
    //**

    //password strength**
    updatePasswordStrength: function(newValue) {
        this.setState({
            passStrength: newValue
        });
    },
    sayWeak: function() {
        this.updatePasswordStrength(this.state.passStrengths.weak);
    },
    sayOk: function() {
        this.updatePasswordStrength(this.state.passStrengths.ok);
    },
    sayStrong: function() {
        this.updatePasswordStrength(this.state.passStrengths.strong);
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
                    <div className={this.state.strIndClass}>
                    </div>
                </div>
                <div className='input-row'>
                    <input type='password' placeholder='Password' onChange={this.checkStrength}/>
                    <div className={this.state.strIndClass}>
                        <div className={this.state.passBubbleClass}></div>
                        <label>{this.state.passStrength}</label>
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