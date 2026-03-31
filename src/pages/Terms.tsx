import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='container mx-auto px-6 py-24 max-w-4xl'>
        <h1 className='text-4xl font-bold text-foreground mb-8'>Terms of Service</h1>
        <p className='text-muted-foreground mb-4'>Last updated: March 31, 2026</p>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>1. Acceptance of Terms</h2>
          <p className='text-muted-foreground leading-relaxed'>
            By accessing or using studio.com, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>2. Use of Service</h2>
          <p className='text-muted-foreground leading-relaxed'>
            Our service allows you to discover and book creative studio spaces. You agree to use the service only for lawful purposes and in accordance with these Terms.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>3. User Accounts</h2>
          <p className='text-muted-foreground leading-relaxed'>
            When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>4. Booking and Cancellation</h2>
          <p className='text-muted-foreground leading-relaxed'>
            Bookings are subject to availability. Cancellation policies vary by studio and are displayed during the booking process. Please review them before confirming a reservation.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>5. Limitation of Liability</h2>
          <p className='text-muted-foreground leading-relaxed'>
            studio.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our service.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>6. Contact Us</h2>
          <p className='text-muted-foreground leading-relaxed'>
            If you have any questions about these Terms of Service, please contact us at legal@studio.com.
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

export default Terms;