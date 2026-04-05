import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import ProblemSection from '@/components/ProblemSection'
import ValueProposition from '@/components/ValueProposition'
import Services from '@/components/Services'
import HowWeWork from '@/components/HowWeWork'
import BrandConnection from '@/components/BrandConnection'
import ForWho from '@/components/ForWho'
import ClosingSection from '@/components/ClosingSection'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden pt-16">
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <ValueProposition />
        <Services />
        <HowWeWork />
        <BrandConnection />
        <ForWho />
        <ClosingSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
