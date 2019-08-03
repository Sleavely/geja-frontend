import React, { Component } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'
import {
  Alert,
  Button,
} from 'antd'

class PaymentForm extends Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)

    this.state = {
      cardNumber: false,
      expiryIsValid: false,
      cvcIsValid: false,
      processingCard: false,
      paymentError: '',
    }
    this.cardInfoChanged = this.cardInfoChanged.bind(this)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()

    this.setState({ processingCard: true, paymentError: '' })

    const paymentIntent = this.props.paymentIntent
    const paymentConfirmed = this.props.paymentConfirmed
    const customerInfo = this.props.customerInfo

    this.props.stripe.handleCardPayment(paymentIntent.client_secret, {
      shipping: {
        name: `${customerInfo.firstname} ${customerInfo.lastname}`,
        address: {
          line1: customerInfo.street,
          postal_code: customerInfo.zipcode,
          city: customerInfo.city
        },
      },
      receipt_email: customerInfo.email,
      metadata: {
        customer_firstname: customerInfo.firstname,
        customer_lastname: customerInfo.lastname,
      }
    })
    .then((result) => {
      if (result.error) {
        console.error('Something went wrong while processing the payment intent.', result.error)
        this.setState({ processingCard: false, paymentError: result.error.message })
      } else {
        console.log('Payment succeeded', result)
        paymentConfirmed()
      }
    })
    .catch((err) => {
      console.error('Something went wrong while processing the payment intent.', err)
      this.setState({ processingCard: false, paymentError: err.message })
    })
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

        {
          this.state.paymentError
          ? <Alert message={this.state.paymentError} type="error" showIcon />
          : ''
        }

      </div>
    )
  }
}

export default injectStripe(PaymentForm)
