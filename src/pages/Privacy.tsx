import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='container mx-auto px-6 py-24 max-w-4xl'>
        <h1 className='text-4xl font-bold text-foreground mb-8'>Privacy Policy</h1>
        <p className='text-muted-foreground mb-4'>Last updated: March 31, 2026</p>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>1. Information We Collect</h2>
          <p className='text-muted-foreground leading-relaxed'>
            We collect information you provide directly to us, such as when you create an account, book a studio, or contact support. This may include your name, email address, phone number, and payment information.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>2. How We Use Your Information</h2>
          <p className='text-muted-foreground leading-relaxed'>
            We use the information we collect to provide, maintain, and improve our services, process bookings, and communicate with you about your account and our services.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>3. Sharing Your Information</h2>
          <p className='text-muted-foreground leading-relaxed'>
            We do not share your personal information with third parties except as described in this policy or with your consent. We may share information with service providers who assist in operating our platform.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>4. Data Security</h2>
          <p className='text-muted-foreground leading-relaxed'>
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>5. Contact Us</h2>
          <p className='text-muted-foreground leading-relaxed'>
            If you have any questions about this Privacy Policy, please contact us at privacy@studio.com.
          </p>
        </section>

        <div className='mt-12'>
          <Button asChild variant='glow'>
            <Link to='/'>Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;