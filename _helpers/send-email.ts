import config from '../config.json';
    
     export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
         
         // Using standard HTTPS fetch to bypass Render's SMTP blocks
         try {
             const response = await fetch('https://api.resend.com/emails', {
                 method: 'POST',
                 headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'IPT-2026-FULLSTACK@resend.dev', 
                    to: to,
                    subject: subject,
                    html: html,
                }),
            });
   
            if (!response.ok) {
                const error = await response.text();
                console.error('Email failed via Resend API:', error);
            } else {
                console.log('Email sent successfully via Resend to:', to);
            }
        } catch (err) {
            console.error('Network error calling Resend API:', err);
        }
    }