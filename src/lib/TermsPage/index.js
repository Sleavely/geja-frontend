import React, { Component } from 'react'

import {
  Typography,
} from 'antd'

const {
  Title,
  Paragraph,
  Text,
} = Typography

export default class TermsPage extends Component {

  render() {
    return (
      <div className="terms page">
        <Title>Konsumentinformation</Title>

        <Title level={3}>FÖRETAGSINFORMATION</Title>
        <Paragraph><Text mark>Företagsnamn, organisationsnummer och eventuellt momsregistreringsnummer bör finnas tillgängligt på ett enkelt och direkt sätt</Text></Paragraph>

        <Title level={4}>Kontaktuppgifter</Title>
        <Paragraph><Text mark>Postadress, telefonnummer, e-postadress, samt besöksadress i den mån en sådan finns></Text></Paragraph>

        <Title level={3}>PRODUKTINFORMATION OCH PRIS</Title>

        <Title level={4}>Produktinformation</Title>
        <Paragraph><Text mark>Skriv in tydlig produktinformation om varje enskild vara. Den bör ge kunden nödvändig information om varan eller tjänstens huvud- sakliga egenskaper, mängd m.m</Text></Paragraph>

        <Title level={4}>Priser</Title>
        <Paragraph>Alla priser anges i svenska kronor och innehåller mervärdesskatt och övriga avgifter. Totalkostnaden för köpet kommer att framkomma tydligt innan slutlig beställning och kommer att inkludera samtliga kostnader förenade med köpet, inklusive eventuella porto-och fraktkostnader.</Paragraph>

        <Title level={3}>FÖRSÄLJNINGS-OCH LEVERANSVILLKOR</Title>

        <Title level={4}>Ta emot en order</Title>
        <Paragraph><Text mark>Beskriv hur en order behandlas</Text>.</Paragraph>

        <Title level={4}>Leverans</Title>
        <Paragraph>Vanligtvis kommer varan skickas från oss senast <Text mark>sätt in antal dagar</Text> arbetsdagar efter att ordern mottagits. Om varan inte finns i lager <Text mark>beskriv hur kunden får besked om detta</Text>.</Paragraph>

        <Title level={4}>Frakt</Title>
        <Paragraph>Vi skickar din vara <Text mark>skriv något om hur varan skickas</Text>. Kostnader förenade med frakten är <Text mark>skriv in relevant information om vad det kostar och om kunden har möjlighet att välja mellan olika leveranssätt</Text>.</Paragraph>

        <Title level={4}>Betalning</Title>
        <Paragraph>Vi kräver betalning för varan från den tidpunkt den skickas från oss till kunden.</Paragraph>

        <Title level={4}>Personupplysningar</Title>
        <Paragraph><Text mark>Företagsnamn</Text> behandlar persondata i enlighet med Personuppgiftslagen (PuL) och det europeiska GDPR-direktivet. Uppgifter som kan knytas till dig som person kommer aldrig att bli tillgänglig för andra verksamheter eller kopplas till andra, externa register.</Paragraph>

        <Title level={4}>Kortinformation</Title>
        <Paragraph>När du handlar hos <Text mark>företagsnamn</Text> behandlas betalningen av Stripe Payments som är en branschledande leverantör av elektroniska betalningslösningar. All kortinformation lagras i enlighet med kortutgivarens och finansiella regelverk.</Paragraph>

        <Title level={4}>Säkerhet</Title>
        <Paragraph>Hela sidan är krypterad SSL. Om du befinner dig på en webbplats där det står https i adressfältet så krypteras all trafik mellan dig som besökare samt servern du kommunicerar med. Detta gör att det är mycket svårt att avlyssna eller manipulera informationen som skickas er emellan och SSL ger därmed en mycket högre säkerhet än en okrypterad http anslutning.</Paragraph>

        <Title level={3}>RUTINER FÖR RETURER AV VAROR</Title>

        <Title level={4}>Avbeställning</Title>
        <Paragraph>Om du önskar att avbeställa en vara <Text mark>skriv något om vad kunden skall göra för att avbeställa varan</Text></Paragraph>

        <Title level={4}>Reklamation</Title>
        <Paragraph>Om det föreligger ett fel på varan, bör du inom skälig tid efter att du upptäckt det, meddela <Text mark>företagsnamn</Text> skriftligen eller muntligen om felet. <Text mark>företagsnamn</Text> kommer då ge dig information om hur du går vidare. Reglerna kring reklamation finns i Konsumentköplagen.</Paragraph>

        <Title level={4}>Ångerrätt</Title>
        <Paragraph>Ångerrätten gäller i 14 dagar från det att du som köpare mottagit varan. Om du vill ångra köpet så returnerar du varan i väsentligt oförändrat skick så får du tillbaka det du har betalat för varan, inklusive fraktkostnader.</Paragraph>

        <Title level={4}>Returfrakten</Title>
        <Paragraph><Text mark>Beskriv vem som betalar returen om det är ni eller konsumenten</Text> För utförlig information se retursedeln (som bifogats försändelsen).</Paragraph>

        <Title level={4}>Garanti</Title>
        <Paragraph><Text mark>Upplysning om garanti på varorna. Garantin ger kunden rättigheter utöver rätten till reklamation som kunden har via Konsumentköplagen</Text></Paragraph>
      </div>
    )
  }
}
