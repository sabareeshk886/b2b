import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
    title: 'Terms of Service | Fernway B2B',
};

export default function TermsPage() {
    return (
        <LegalPage title="Terms of Service">
            <LegalSection title="1. About these terms">
                <p>
                    These Terms of Service govern access to and use of the Fernway B2B partner portal (the &quot;Portal&quot;)
                    by travel agencies and their staff (&quot;Partners&quot;, &quot;you&quot;). By registering an agency account or
                    using the Portal, you agree to these terms on behalf of your agency.
                </p>
            </LegalSection>

            <LegalSection title="2. Partner accounts">
                <p>
                    The Portal is for registered travel businesses only. You must provide accurate company details,
                    including licence and GST information where applicable, and keep them up to date. We may review,
                    approve, suspend or close any agency account.
                </p>
                <p>
                    Your agency admin is responsible for the team members they add, for keeping login credentials
                    confidential and for all activity under the agency&apos;s accounts. Tell us promptly if you suspect
                    unauthorised access.
                </p>
            </LegalSection>

            <LegalSection title="3. Trip catalog, rates and quotes">
                <p>
                    Itineraries, inclusions and B2B rates shown in the Portal are confidential and provided for your use
                    in selling Fernway packages to your own customers. You may not publish net rates or resell catalog
                    content to other agencies.
                </p>
                <p>
                    Rates and availability can change until a booking is confirmed by Fernway. Quotes generated in the
                    Portal are estimates and do not guarantee availability or price.
                </p>
            </LegalSection>

            <LegalSection title="4. Bookings, payments and cancellations">
                <p>
                    A booking is confirmed only when Fernway confirms it in writing. Payment terms, deposits and
                    cancellation charges are those stated on the trip, quote or booking confirmation. Where these
                    differ, the booking confirmation applies.
                </p>
                <p>
                    You are responsible for passing accurate traveller details, trip conditions and cancellation terms on
                    to your customers, and for collecting payment from them.
                </p>
            </LegalSection>

            <LegalSection title="5. White-label materials">
                <p>
                    You may add your own branding to brochures and quotes produced through the Portal and share them with
                    your customers. You are responsible for the accuracy of any changes you make and for your own
                    branding. Fernway&apos;s trademarks and imagery may not be used outside these materials without our
                    permission.
                </p>
            </LegalSection>

            <LegalSection title="6. Acceptable use">
                <p>
                    You must not misuse the Portal. This includes attempting to access other agencies&apos; data, scraping or
                    bulk-downloading content, interfering with its security or operation, or using it for unlawful
                    purposes.
                </p>
            </LegalSection>

            <LegalSection title="7. Liability">
                <p>
                    The Portal is provided on an &quot;as available&quot; basis. To the extent permitted by law, Fernway is not
                    liable for indirect or consequential losses, or for losses caused by inaccurate information supplied
                    by Partners or by third-party suppliers such as hotels, transport operators and airlines.
                </p>
            </LegalSection>

            <LegalSection title="8. Suspension and termination">
                <p>
                    Either party may stop using the Portal at any time. We may suspend or terminate access if these terms
                    are breached. Confirmed bookings remain subject to their own terms after an account is closed.
                </p>
            </LegalSection>

            <LegalSection title="9. Changes and governing law">
                <p>
                    We may update these terms from time to time. The date above shows the latest version, and continued
                    use of the Portal after a change means you accept it. These terms are governed by the laws of India,
                    and disputes are subject to the jurisdiction of the courts of India.
                </p>
            </LegalSection>

            <LegalSection title="10. Contact">
                <p>For questions about these terms, contact your Fernway account manager.</p>
            </LegalSection>
        </LegalPage>
    );
}
