import React, { useEffect, useState } from 'react'

import {
  Alert,
  Button,
  Form,
  Input,
  Spin,
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

const {
  REACT_APP_API_BASE_PATH: API_BASE_PATH
} = process.env

const ContactForm = Form.create({
  name: 'contact_form',
})(props => {
  const { getFieldDecorator } = props.form
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values)
      }
    })
  }

  const propsWithoutFormOrSubmitHandler = Object.entries(props).reduce((out, [key, value]) => {
    if(!['form', 'onSubmit'].includes(key)) out[key] = value
    return out
  }, {})

  return (
    <Form {...propsWithoutFormOrSubmitHandler} onSubmit={handleSubmit}>
      <Form.Item hasFeedback label="Din e-postadress" extra="Ange den e-postadress du vill att vi svarar till.">
        {getFieldDecorator('email', {
          rules: [{ required: true, transform: (v) => v && v.trim(), type: 'email', message: 'Din e-postadress är obligatorisk' }],
        })(<Input type="email" />)}
      </Form.Item>
      <Form.Item hasFeedback label="Meddelande" extra="Om du är befintlig kund, glöm inte att bifoga din betalningsreferens från orderbekräftelsen." htmlFor="textarea">
        {getFieldDecorator('message', {
          rules: [{ required: true, transform: (v) => v && v.trim(), message: 'Du måste fylla i ett meddelande' }],
        })(<Input.TextArea rows={4} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Skicka
        </Button>
      </Form.Item>
    </Form>
  )
})

export default function ContactPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = `Kontakt | GEJA Smycken`
  })

  useEffect(() => {
    setIsSubmitting(false)
  }, [submitted])

  const submitHandlerPostValidation = ({ email, message }) => {
    setIsSubmitting(true)
    fetch(`${API_BASE_PATH}/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        message,
      })
    })
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw new Error(res.error)
      setSubmitted(true)
    })
    .catch((err) => {
      // Something went sideways in the backend while fetching the PaymentIntent
      console.error(err)
    })
  }

  return (
    <div className="contact page">
      <div style={{ maxWidth: 600 }}>
        <Title>Kontakta oss</Title>
        <Paragraph>Vi försöker att svara på alla meddelanden inom 48 timmar.</Paragraph>
        <Spin spinning={isSubmitting}>
          {submitted
          ? <Alert
              message="Ditt meddelandet har skickats."
              type="success"
              showIcon
            />
          : <ContactForm onSubmit={submitHandlerPostValidation} hideRequiredMark={true} />
          }
        </Spin>
      </div>
    </div>
  )
}
