import React from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GreenFiniteQuote from '@/components/GreenFiniteQuote';
import WorldMap from '@/components/WorldMap';
import Testimonials from '@/components/Testimonials';

// Helper component for fade + slide-in animation
function FadeInSection({ children, direction = "up", delay = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default function AboutUs() {
  return (
    <div id="#about" className="min-h-screen flex flex-col bg-cover bg-center">
      <div
        className="w-full"
        style={{ fontFamily: 'var(--font-primary) !important' }}
      >
        {/* Top Divider Line */}
        <div className="w-full">
          <div className="border-t border-gray-500 opacity-40" />
        </div>

        {/* Main Full-Width Content Section */}
        <div className="w-full">
          <div
            className="text-black text-center py-4 px-4 sm:px-8 md:px-20"
            style={{ backgroundColor: '#F8F7F2' }}
          >
            {/* Who We Are */}
            <section className="mb-12">
              <FadeInSection direction="left">
                <h2 className="text-3xl font-semibold py-18">Who We Are</h2>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.2}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  At <a href="https://greenfinite.ai" className="!text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a>, we’re a team of sustainability-minded builders, technologists, and change-makers on a mission to make ESG accessible to everyone — not just big corporations.
                </p>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.3}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  We created a modular, AI-powered ESG platform specifically for SMEs, ESG consultants, and public sector teams who want to lead with purpose — even if they’re starting from zero.
                </p>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.4}>
                <p className="text-lg md:text-xl leading-relaxed max-w-5xl mx-auto">
                  No clue what ESG means? You’re in the right place. <br />
                  We guide you step-by-step — from “zero” to “net zero.”
                </p>
              </FadeInSection>
            </section>

            {/* Why Our Mission Matters */}
            <section className="mb-12">
              <FadeInSection direction="right">
                <h2 className="text-3xl font-semibold mb-4">Why Our Mission Matters</h2>
              </FadeInSection>

              <FadeInSection direction="left" delay={0.2}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  SMEs are the backbone of the global economy — and a surprisingly large source of emissions.
                </p>
              </FadeInSection>

              <FadeInSection direction="left" delay={0.3}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  🌍 Over 90% of businesses globally are SMEs, and according to the International Trade Centre, SMEs contribute nearly 70% of industrial pollution and over 50% of carbon emissions.
                </p>
              </FadeInSection>

              <FadeInSection direction="left" delay={0.4}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  Yet, most small businesses don’t track their carbon footprint, aren’t aware of ESG compliance frameworks like CSRD or GRI, and have zero support navigating sustainability regulations or carbon taxes.
                </p>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.5}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  This creates a massive blind spot — for governments, suppliers, and the planet.
                </p>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.6}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  We believe climate action shouldn’t require a compliance department. With <a href="https://greenfinite.ai" className="text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a>, any SME can start their sustainability journey with guided tools, smart estimates, and AI support — no PhD required.
                </p>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.7}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  Because the future won’t wait, and neither should your business.
                </p>
              </FadeInSection>
            </section>

            {/* How We’re Different */}
            <section>
              <FadeInSection direction="left">
                <h2 className="text-3xl font-semibold mb-4">How We’re Different</h2>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.2}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  Most ESG platforms are built for enterprise clients — expensive, complex, and often disconnected from the needs of everyday businesses.
                </p>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.3}>
                <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto">
                  <a href="https://greenfinite.ai" className="!text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a> is built from the ground up for SMEs. We offer tools that are:
                </p>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.4}>
                <ul className="text-left text-lg md:text-xl leading-relaxed list-disc pl-8 mb-4 max-w-5xl mx-auto">
                  <li><strong>Modular</strong> – Use what you need, skip what you don’t.</li>
                  <li><strong>Affordable</strong> – Freemium model with SME-friendly pricing.</li>
                  <li><strong>Guided</strong> – Plain-language tips, term explanations, and AI-generated suggestions.</li>
                  <li><strong>Instant</strong> – Upload a policy or form and get ESG scores, reports, or compliant templates within minutes.</li>
                </ul>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.5}>
                <p className="text-lg md:text-xl leading-relaxed max-w-5xl mx-auto">
                  And unlike legacy ESG tools, we don’t assume you already have policies in place.
                  We help you generate them — from carbon estimates to sustainability reports to ESG policy drafts — all with <a href="https://greenfinite.ai" className="!text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a>.
                </p>
              </FadeInSection>
            </section>
          </div>

          <div>
            <WorldMap />
          </div>

          <div>
            <Testimonials />
          </div>

          <div>
            <GreenFiniteQuote />
          </div>
        </div>
      </div>
    </div>
  );
}
