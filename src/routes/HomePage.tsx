import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import StorytellingSection from '@/components/home/StorytellingSection';
import FeaturedBundles from '@/components/home/FeaturedBundles';
import DestinationShowcase from '@/components/home/DestinationShowcase';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Gateway to Yoruba Land</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:title" content={`${SITE_NAME} — Gateway to Yoruba Land`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <div className="adire-strip" />
      <FeaturedEvents />
      <StorytellingSection />
      <div className="adire-strip" />
      <FeaturedBundles />
      <DestinationShowcase />
      <TestimonialCarousel />
      <NewsletterSignup />
    </>
  );
}
