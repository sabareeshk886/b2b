import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
    title: 'Privacy Policy | Fernway B2B',
};

export default function PrivacyPage() {
    return (
        <LegalPage title="Privacy Policy">
            <LegalSection title="1. Who we are">
                <p>
                    This policy explains how Fernway (&quot;we&quot;, &quot;us&quot;) collects and uses personal data through the
                    Fernway B2B partner portal (the &quot;Portal&quot;). We process this data in line with applicable Indian
                    law, including the Digital Personal Data Protection Act, 2023.
                </p>
            </LegalSection>

            <LegalSection title="2. Data we collect">
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Agency details:</strong> company name, email, phone, address, licence number and GST
                        number.
                    </li>
                    <li>
                        <strong>User accounts:</strong> names, email addresses, roles and securely hashed passwords for
                        agency staff.
                    </li>
                    <li>
                        <strong>Quotes and bookings:</strong> traveller names, contact details, travel dates, group size
                        and other information you enter for your customers.
                    </li>
                    <li>
                        <strong>Technical data:</strong> session cookies needed to keep you signed in, plus basic logs
                        used for security and troubleshooting.
                    </li>
                </ul>
            </LegalSection>

            <LegalSection title="3. How we use it">
                <ul className="list-disc pl-6 space-y-2">
                    <li>To verify agencies and provide and secure the Portal.</li>
                    <li>To prepare quotes and to arrange and confirm bookings.</li>
                    <li>To contact you about your account, bookings and changes to our services.</li>
                    <li>To meet legal, tax and accounting obligations.</li>
                </ul>
                <p>We do not sell personal data.</p>
            </LegalSection>

            <LegalSection title="4. Traveller data you provide">
                <p>
                    When you enter your customers&apos; details, you confirm that you are allowed to share them with us for
                    their trip. We use traveller data only to quote, arrange and service that trip.
                </p>
            </LegalSection>

            <LegalSection title="5. Sharing">
                <p>We share personal data only where needed:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        With travel suppliers such as hotels, transport providers and guides, to deliver confirmed
                        bookings.
                    </li>
                    <li>
                        With service providers who host and operate the Portal for us, such as cloud hosting and database
                        providers, under appropriate safeguards.
                    </li>
                    <li>Where required by law or to protect our rights.</li>
                </ul>
            </LegalSection>

            <LegalSection title="6. Cookies">
                <p>
                    The Portal uses essential cookies to keep you signed in and to protect forms against misuse. We do not
                    use advertising cookies.
                </p>
            </LegalSection>

            <LegalSection title="7. Security and retention">
                <p>
                    Passwords are stored as one-way hashes, and data is sent over encrypted connections. We keep data for
                    as long as the agency account is active, and afterwards for as long as legal, tax or dispute-resolution
                    obligations require.
                </p>
            </LegalSection>

            <LegalSection title="8. Your rights">
                <p>
                    You can request access to, correction of or deletion of your personal data, or withdraw consent where
                    processing is based on consent. Agency admins can update company and team details from the
                    dashboard. For anything else, contact us using the details below.
                </p>
            </LegalSection>

            <LegalSection title="9. Changes">
                <p>
                    We may update this policy from time to time. The date above shows the latest version.
                </p>
            </LegalSection>

            <LegalSection title="10. Contact">
                <p>For privacy questions or requests, contact your Fernway account manager.</p>
            </LegalSection>
        </LegalPage>
    );
}
