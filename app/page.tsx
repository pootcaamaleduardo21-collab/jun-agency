import Hero from '@/components/Hero';
import TrustBand from '@/components/TrustBand';
import InteractiveShowcase from '@/components/InteractiveShowcase';
import ProblemSection from '@/components/ProblemSection';
import ValueProposition from '@/components/ValueProposition';
import ServicesShowcase from '@/components/ServicesShowcase';
import TargetAudience from '@/components/TargetAudience';
import HowWeWork from '@/components/HowWeWork';
import BrandConnection from '@/components/BrandConnection';
import ClosingCTA from '@/components/ClosingCTA';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Trust Band */}
      <TrustBand />

      {/* Interactive Showcase */}
      <InteractiveShowcase />

      {/* Problem Section */}
      <ProblemSection />

      {/* Value Proposition */}
      <ValueProposition />

      {/* Services Showcase - Highlighted */}
      <ServicesShowcase />

      {/* Target Audience - Highlighted */}
      <TargetAudience />

      {/* How We Work */}
      <HowWeWork />

      {/* Brand Connection */}
      <BrandConnection />

      {/* Closing CTA */}
      <ClosingCTA />

      {/* FAQ */}
      <FAQ />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
