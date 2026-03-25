import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBand from '@/components/TrustBand';
import ProblemSection from '@/components/ProblemSection';
import ValueProposition from '@/components/ValueProposition';
import Services from '@/components/Services';
import HowWeWork from '@/components/HowWeWork';
import BrandConnection from '@/components/BrandConnection';
import TargetAudience from '@/components/TargetAudience';
import ClosingCTA from '@/components/ClosingCTA';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <TrustBand />
      <ProblemSection />
      <ValueProposition />
      <Services />
      <HowWeWork />
      <BrandConnection />
      <TargetAudience />
      <ClosingCTA />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
