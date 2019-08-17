import React, { useEffect } from 'react'

import {
  Button,
  Form,
  Input,
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
} = Typography

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
  return (
    <Form {...props} onSubmit={handleSubmit}>
      <Form.Item label="Din e-postadress" extra="Ange den e-postadress du vill att vi svarar till.">
        {getFieldDecorator('email', {
          rules: [{ required: true, type: 'email', message: 'Din e-postadress är obligatorisk' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Meddelande" extra="Om du är befintlig kund, glöm inte att bifoga din betalningsreferens från orderbekräftelsen." htmlFor="textarea">
        {getFieldDecorator('message', {
          rules: [{ required: true, message: 'Du måste fylla i ett meddelande' }],
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
  useEffect(() => {
    document.title = `Kontakt | GEJA Smycken`
  })

  const submitHandlerPostValidation = (values) => {
    console.log('sending your datas to N(A)SA', values)
  }

  return (
    <div className="contact page">
      <div style={{ maxWidth: 600 }}>
        <Title>Kontakta oss</Title>
        <Paragraph>Vi försöker att svara på alla meddelanden inom 48 timmar.</Paragraph>
        <ContactForm onSubmit={submitHandlerPostValidation} hideRequiredMark={true} />
      </div>
    </div>
  )
}
