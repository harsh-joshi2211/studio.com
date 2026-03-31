import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Support = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='container mx-auto px-6 py-24 max-w-4xl'>
        <h1 className='text-4xl font-bold text-foreground mb-8'>Support</h1>
        <p className='text-muted-foreground mb-8'>
          We're here to help! Find answers to common questions or get in touch with our support team.
        </p>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>Frequently Asked Questions</h2>
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-medium text-foreground mb-2'>How do I book a studio?</h3>
              <p className='text-muted-foreground'>
                Browse studios, select one that fits your needs, choose an available time slot on the calendar, and click 'Book Now'. You'll receive a confirmation email shortly after.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-medium text-foreground mb-2'>Can I cancel my booking?</h3>
              <p className='text-muted-foreground'>
                Yes, cancellation policies vary by studio. Please check the studio's cancellation policy before booking. Generally, you can cancel up to 24 hours before your booking for a full refund.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-medium text-foreground mb-2'>How do I list my own studio?</h3>
              <p className='text-muted-foreground'>
                Click 'List Your Studio' on the homepage and fill out the form. Our team will review your submission and get back to you within 2-3 business days.
              </p>
            </div>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mt-8 mb-4'>Contact Support</h2>
          <p className='text-muted-foreground mb-4'>
            If you can't find what you're looking for, our support team is ready to assist.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button asChild variant='glow'>
              <a href='mailto:support@studio.com'>Email Support</a>
            </Button>
            <Button asChild variant='outline'>
              <Link to='/'>Back to Home</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;