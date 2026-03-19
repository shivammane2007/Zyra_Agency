'use client'

import * as React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { motion } from "framer-motion";


function FAQsComponent() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What is Zyra Agency?',
      answer: 'Zyra is a high-performance digital product agency that specializes in building scalable software, AI-driven applications, and premium user experiences for founders and enterprise teams.',
    },
    {
      id: 'item-2',
      question: 'Which technologies do you specialize in?',
      answer: 'We specialize in modern web and mobile stacks, including React, Next.js, TypeScript, Node.js, and advanced AI integrations. We focus on building type-safe, performant, and maintainable systems.',
    },
    {
      id: 'item-3',
      question: 'Can I customize the delivery workflow?',
      answer: 'Yes. Our delivery milestones are designed to be transparent and adaptable to your specific product requirements, whether you are launching an MVP or scaling an enterprise platform.',
    },
    {
      id: 'item-4',
      question: 'Do you provide post-launch support?',
      answer: 'Absolutely. We offer reliability audits, performance monitoring, and continuous delivery services to ensure your product remains healthy and scales effectively after the initial launch.',
    },
    {
      id: 'item-5',
      question: 'How do we get started?',
      answer: 'You can start by reaching out through our "Start Project" flow. We will review your brief and set up a strategic session to align on product direction, architecture, and release priorities.',
    },
  ];


  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12">
        <h2 className="text-zyra-text-primary text-4xl font-semibold font-heading">Common Questions</h2>
        <p className="text-zyra-text-secondary mt-4 text-balance text-lg">
          Everything you need to know about our engineering and delivery process.
        </p>
      </div>

      <div className="w-full">
        <Accordion
          type="single"
          collapsible>
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-zyra-border-subtle">
              <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline text-zyra-text-primary hover:text-zyra-accent-neon transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zyra-text-secondary">
                <BlurredStagger text={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <p className="text-zyra-text-secondary mt-12 text-center">
        Can&apos;t find what you&apos;re looking for? Contact our{' '}
        <Link
          href="/start-project"
          className="text-zyra-accent-neon font-medium hover:underline">
          support team
        </Link>
      </p>
    </div>
  )
}

export default React.memo(FAQsComponent)

 
const BlurredStaggerComponent = ({
  text = "built by zyra.agency",
}: {
  text: string;
}) => {
  const headingText = text;
 
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };
 
  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-base leading-relaxed break-words whitespace-normal"
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export const BlurredStagger = React.memo(BlurredStaggerComponent)
