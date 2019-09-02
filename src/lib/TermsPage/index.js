import React, { useEffect } from 'react'

import {
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
  Text,
} = Typography

export default function TermsPage () {
  useEffect(() => {
    document.title = `Konsumentinformation | GEJA Smycken`
  })

  return (
    <div className="terms page">
      <Title>Konsument<wbr/>information</Title>

      <Title level={3}>FÖRETAGSINFORMATION</Title>
      <Paragraph>GEJA Smycken drivs av GEJA Trading Handelsbolag, org.nr 969600-5736</Paragraph>
      <Paragraph>
        <Text strong>E-post:</Text> <a href="mailto:support@geja.se">support@geja.se</a><br/>
      </Paragraph>
      <Paragraph>
        <Text strong>Postadress:</Text><br/>
        GEJA Trading<br />
        Genvägen 6<br />
        147 55 Tungelsta
      </Paragraph>

      <Title level={3}>FÖRSÄLJNINGS- OCH LEVERANSVILLKOR</Title>

      <Title level={4}>Priser</Title>
      <Paragraph>Alla priser anges i svenska kronor inklusive moms. Totalkostnaden framkommer tydligt innan slutlig beställning, inklusive eventuella porto-och fraktkostnader.</Paragraph>

      <Title level={4}>Leverans</Title>
      <Paragraph>Vanligtvis kommer varan skickas från oss inom 3 arbetsdagar efter godkänd betalning. Om varan inte finns i lager skickas en notis om detta via e-post.</Paragraph>

      <Title level={4}>Frakt</Title>
      <Paragraph>Vi skickar din order med PostNord som spårbar försändelse. Kostnader förenade med frakten visas i kassan och räknas in i totalbeloppet.</Paragraph>

      <Title level={4}>Betalning</Title>
      <Paragraph>Betalning skall vara GEJA Smycken tillhanda innan ordern bearbetas. Vanligtvis sker betalning i samband med att beställningen genomförs på hemsidan.</Paragraph>

      <Title level={4}>Personupplysningar</Title>
      <Paragraph>GEJA Smycken behandlar persondata i enlighet med Personuppgiftslagen (PuL) och det europeiska GDPR-direktivet. Uppgifter som kan knytas till dig som person kommer aldrig att bli tillgänglig för andra verksamheter eller kopplas till andra, externa register.</Paragraph>

      <Title level={4}>Betalningsuppgifter</Title>
      <Paragraph>När du handlar hos GEJA Smycken behandlas betalningen av Stripe Payments som är en branschledande leverantör av elektroniska betalningslösningar. All kortinformation lagras i enlighet med kortutgivarens och finansiella regelverk.</Paragraph>

      <Title level={4}>Säkerhet</Title>
      <Paragraph>Hela sidan är krypterad SSL. Om du befinner dig på en webbplats där det står HTTPS i adressfältet så krypteras all trafik mellan dig som besökare samt servern du kommunicerar med. Detta gör att det är mycket svårt att avlyssna eller manipulera informationen som skickas er emellan och SSL ger därmed en mycket högre säkerhet än en okrypterad HTTP-anslutning.</Paragraph>

      <Title level={3}>RUTINER FÖR RETURER AV VAROR</Title>

      <Title level={4}>Avbeställning</Title>
      <Paragraph>Avbeställning går endast att göra innan varorna skickas från lagret. Efter varorna skickas från lagret måste du skapa ett returärende, se avsnittet Ångerrätt. För att avbeställa en vara kontaktar du vår kundtjänst med din betalningsreferens.</Paragraph>

      <Title level={4}>Ångerrätt</Title>
      <Paragraph>Ångerrätten gäller i 14 dagar från det att du som köpare mottagit varan. Om du vill ångra köpet så returnerar du varan i väsentligt oförändrat skick så får du tillbaka det du har betalat för varan, inklusive fraktkostnader.</Paragraph>

      <Title level={4}>Reklamation</Title>
      <Paragraph>Om det föreligger ett fel på varan, bör du inom skälig tid efter att du upptäckt det, meddela GEJA Smycken skriftligen. GEJA Smycken kommer då ge dig information om hur du går vidare. Reglerna kring reklamation finns i Konsumentköplagen.</Paragraph>

      <Title level={4}>Returfrakt</Title>
      <Paragraph><Text mark>Beskriv vem som betalar returen om det är ni eller konsumenten</Text> För utförlig information se retursedeln (som bifogats försändelsen).</Paragraph>

      <Title level={4}>Garanti</Title>
      <Paragraph><Text mark>Upplysning om garanti på varorna. Garantin ger kunden rättigheter utöver rätten till reklamation som kunden har via Konsumentköplagen</Text></Paragraph>
    </div>
  )
}
