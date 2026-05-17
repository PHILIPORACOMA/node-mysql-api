
    // RESEND VERSION
    import config from '../config.json';
    
     export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
         
         // THE FIX: We send the email to YOU, so Resend doesn't block it.
         // We add the "intended recipient" to the top of the message.
         const authorizedEmail = 'epicarusracoma@gmail.com'; 
         const modifiedHtml = `<p><strong>Note:</strong> This message was intended for: ${to}</p><hr>${html}`;
    
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
             },
                body: JSON.stringify({
                    from: 'onboarding@resend.dev', 
                    to: authorizedEmail, // Always send to your authorized address
                    subject: `[TEST] ${subject}`,
                    html: modifiedHtml,
                }),
            });
   
            if (!response.ok) {
                const error = await response.text();
                console.error('Resend Error:', error);
            } else {
                console.log(`Success! Email for ${to} was redirected to ${authorizedEmail}`);
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    }

   