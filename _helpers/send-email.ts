import config from '../config.json';

     export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
         
         // We use Mailtrap's API to bypass Render SMTP blocks
         // This will catch ALL emails in your Mailtrap Virtual Inbox
         try {
             const response = await
      fetch(`https://sandbox.api.mailtrap.io/api/send/${process.env.MAILTRAP_INBOX_ID}`, {
                 method: 'POST',
                headers: {
                    'Api-Token': process.env.MAILTRAP_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: { email: 'api@ipt-auth.com', name: 'IPT Auth System' },
                    to: [{ email: to }],
                    subject: subject,
                    html: html,
                }),
            });
   
            if (!response.ok) {
                const error = await response.text();
                console.error('Mailtrap API Error:', error);
            } else {
                console.log('--- EMAIL SENT TO MAILTRAP INBOX ---');
                console.log(`To: ${to}`);
                console.log('Check your dashboard at mailtrap.io');
            }
        } catch (err) {
            console.error('Network error calling Mailtrap:', err);
        }
    }