import React, { Component } from 'react'
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'
import { Button } from 'antd'

const elementsStyle = {
  base: {
    color: '#303238',
    fontSize: '16px',
    fontFamily: '"Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#CFD7DF',
    },
  },
  invalid: {
    color: '#e5424d',
    ':focus': {
      color: '#303238',
    },
  },
}

class CheckoutForm extends Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)

    this.state = {
      cardNumber: false,
      expiryIsValid: false,
      cvcIsValid: false,
    }
    this.cardInfoChanged = this.cardInfoChanged.bind(this)
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({
      name: 'Joakim Hedlund'
    })
    let response = await fetch('https://aws.triplehead.net/geja/stripe/charge', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        stripeEmail: 'contact@joakimhedlund.com',
        stripeToken: token.id,
      })
    });

    if (response.ok) console.log('Purchase Complete!')
  }

  cardInfoChanged(changeObj) {
    console.log('CardNumberElement changed', changeObj)

    const stateChange = {}
    stateChange[changeObj.elementType] = changeObj.complete
    this.setState(stateChange)
  }

  render() {
    return (
      <div className="stripe-checkoutform">
        <p>Fyll i dina kortuppgifter nedan för att avsluta köpet.</p>

        <div>
          <CardNumberElement className={'ant-input'} onChange={this.cardInfoChanged} />
          <CardExpiryElement className={'ant-input'} onChange={this.cardInfoChanged} />
          <CardCVCElement className={'ant-input'} onChange={this.cardInfoChanged} />
        </div>

        <Button
          type="primary" size="large" icon="check-circle"
          disabled={!(
            this.state.cardNumber
            && this.state.cardExpiry
            && this.state.cardCvc
          )}
          onClick={this.submit}>
          Betala
        </Button>

      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
