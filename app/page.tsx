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
      {/* 1. Hero Principal */}
      <Hero />

      {/* 2. Franja de Confianza */}
      <TrustBand />

      {/* 3. Sección Problema */}
      <ProblemSection />

      {/* 4. Propuesta de Valor */}
      <ValueProposition />

      {/* 5. Servicios */}
      <Services />

      {/* 6. Cómo Trabajamos */}
      <HowWeWork />

      {/* 7. Conexión de Marca */}
      <BrandConnection />

      {/* 8. Para Quién es JUN */}
      <TargetAudience />

      {/* 9. Cierre de Valor */}
      <ClosingCTA />

      {/* 10. FAQ */}
      <FAQ />

      {/* 11. Formulario de Contacto */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
