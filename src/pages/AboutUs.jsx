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

// Animated Heading with underline
function AnimatedHeading({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-semibold relative inline-block mb-6"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-green-600 to-emerald-400"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.h2>
  );
}

// Pull Quote
function PullQuote({ children }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-xl md:text-2xl font-bold text-green-700 italic my-6 max-w-4xl mx-auto"
    >
      “{children}”
    </motion.blockquote>
  );
}

// Styled Paragraph
function StyledText({ children }) {
  return (
    <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-5xl mx-auto text-gray-800">
      {children}
    </p>
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
                <AnimatedHeading>Who We Are</AnimatedHeading>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.2}>
                <StyledText>
                  At <a href="https://greenfinite.ai" className="!text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a>, we’re a team of sustainability-minded builders, technologists, and change-makers on a mission to make ESG accessible to everyone — not just big corporations.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.3}>
                <StyledText>
                  We created a modular, AI-powered ESG platform specifically for SMEs, ESG consultants, and public sector teams who want to lead with purpose — even if they’re starting from zero.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.4}>
                <StyledText>
                  <PullQuote>
                  No clue what ESG means? You’re in the right place. <br />
                  We guide you step-by-step — from “zero” to “net zero.”
                  </PullQuote>
                </StyledText>
              </FadeInSection>
            </section>

            {/* Why Our Mission Matters */}
            <section className="mb-12">
              <FadeInSection direction="right">
                <AnimatedHeading>Why Our Mission Matters</AnimatedHeading>
              </FadeInSection>

              <FadeInSection direction="left" delay={0.2}>
                <StyledText>
                  SMEs are the backbone of the global economy — and a surprisingly large source of emissions.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="left" delay={0.3}>
                <StyledText>
                  🌍 Over 90% of businesses globally are SMEs, and according to the International Trade Centre, SMEs contribute nearly 70% of industrial pollution and over 50% of carbon emissions.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="left" delay={0.4}>
                <StyledText>
                  Yet, most small businesses don’t track their carbon footprint, aren’t aware of ESG compliance frameworks like CSRD or GRI, and have zero support navigating sustainability regulations or carbon taxes.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.5}>
                <StyledText>
                  This creates a massive blind spot — for governments, suppliers, and the planet.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.6}>
                <StyledText>
                  We believe climate action shouldn’t require a compliance department. With <a href="https://greenfinite.ai" className="text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a>, any SME can start their sustainability journey with guided tools, smart estimates, and AI support — no PhD required.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.7}>
                <StyledText>
                  <PullQuote>
                  Because the future won’t wait, and neither should your business.
                  </PullQuote>
                </StyledText>
              </FadeInSection>
            </section>

            {/* How We’re Different */}
            <section>
              <FadeInSection direction="left">
                <AnimatedHeading>How We’re Different</AnimatedHeading>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.2}>
                <StyledText>
                  Most ESG platforms are built for enterprise clients — expensive, complex, and often disconnected from the needs of everyday businesses.
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="right" delay={0.3}>
                <StyledText>
                  <a href="https://greenfinite.ai" className="!text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a> is built from the ground up for SMEs. We offer tools that are:
                </StyledText>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.4}>
                <ul className="text-left text-lg md:text-xl leading-relaxed list-disc pl-8 mb-4 max-w-5xl mx-auto text-gray-800">
                  <li><strong>Modular</strong> – Use what you need, skip what you don’t.</li>
                  <li><strong>Affordable</strong> – Freemium model with SME-friendly pricing.</li>
                  <li><strong>Guided</strong> – Plain-language tips, term explanations, and AI-generated suggestions.</li>
                  <li><strong>Instant</strong> – Upload a policy or form and get ESG scores, reports, or compliant templates within minutes.</li>
                </ul>
              </FadeInSection>

              <FadeInSection direction="up" delay={0.5}>
                <StyledText>
                  And unlike legacy ESG tools, we don’t assume you already have policies in place.
                  We help you generate them — from carbon estimates to sustainability reports to ESG policy drafts — all with <a href="https://greenfinite.ai" className="!text-green-700 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Greenfinite.ai</a>.
                </StyledText>
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
