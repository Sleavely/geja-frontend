import React, { Component } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'
import { Button } from 'antd'

class PaymentForm extends Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)

    this.state = {
      cardNumber: false,
      expiryIsValid: false,
      cvcIsValid: false,
      processingCard: false,
    }
    this.cardInfoChanged = this.cardInfoChanged.bind(this)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    this.setState({ processingCard: true })
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

    if (response.ok) {
      console.log('Purchase Complete!')
      //TODO: divert to some confirmation page?
    } else {
      //TODO: Display errors and unlock the form
      this.setState({ processingCard: false })
    }
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
          loading={this.state.processingCard}
          onClick={this.submit}>
          Betala
        </Button>

      </div>
    )
  }
}

export default injectStripe(PaymentForm)
