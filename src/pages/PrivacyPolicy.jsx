import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SubHeader } from "../components/LandingPage/SubHeader";

export default function PrivacyPolicy() {
    return (
        <Box sx={{ pt: 6 }}>
            <SubHeader title={"Privacy Policy"} />
            <Box>
                <Container
                    maxWidth="md"
                    style={{ paddingTop: "60px", paddingBottom: "60px" }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography className="privacy_policy">
                            <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from this website (the “Site”).</p>

                            <p>PERSONAL INFORMATION WE COLLECT</p>

                            <p>When you visit the Site, we may collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>

                            <p>Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Browsing Information”.</p>

                            <p>We collect Browsing Information using the following technologies:</p>

                            <p>– “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" target="_blank">http://www.allaboutcookies.org</a>.</p>

                            <p>– “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>

                            <p>– “Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site.</p>

                            <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number). We refer to this information as “Purchase Information”.</p>

                            <p>When we talk about “Your Personal Information” in this Privacy Policy, we are talking both about Browsing Information and Purchase Information.</p>

                            <p>HOW DO WE USE YOUR PERSONAL INFORMATION?</p>

                            <p>We use the Purchase Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Purchase Information to:</p>

                            <p>– Communicate with you;</p>

                            <p>– Screen our orders for potential risk or fraud; and</p>

                            <p>– When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>

                            <p>We use the Browsing Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>

                            <p>SHARING YOUR PERSONAL INFORMATION</p>

                            <p>We may share Your Personal Information with third parties to help us use Your Personal Information, as described above. For example, we may use Google Analytics to help us understand how our customers use the Site — you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank">https://www.google.com/intl/en/policies/privacy</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">https://tools.google.com/dlpage/gaoptout</a>.</p>

                            <p>Finally, we may also share Your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

                            <p>BEHAVIOURAL ADVERTISING</p>

                            <p>As described above, we use Your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a> .</p>

                            <p>You can opt out of targeted advertising by using the links below:</p>

                            <p>– Facebook: <a href="https://www.facebook.com/settings/?tab=ads" target="_blank">https://www.facebook.com/settings/?tab=ads</a></p>

                            <p>– Google: <a href="https://www.google.com/settings/ads/anonymous" target="_blank">https://www.google.com/settings/ads/anonymous</a></p>

                            <p>– Bing: <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a></p>

                            <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="http://optout.aboutads.info" target="_blank">http://optout.aboutads.info</a>.</p>

                            <p>DO NOT TRACK</p>
                            <p>Please note that we presently do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>

                            <p>YOUR RIGHTS</p>

                            <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

                            <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information may be transferred outside of Europe, including to Canada and the United States.</p>

                            <p>DATA RETENTION</p>

                            <p>When you place an order through the Site, we will maintain your Purchase Information for our records unless and until you ask us to delete this information.</p>

                            <p>CHANGES</p>

                            <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>

                            <p>MINORS</p>
                            <p>The Site is not intended for individuals under the age of 18.</p>

                            <p>CONTACT US</p>
                            <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e‑mail at the email address provided in the Contact section of the Site</p>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
