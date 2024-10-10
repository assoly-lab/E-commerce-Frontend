'use client'

import React, { useState } from 'react';
import { FaPlus,FaMinus } from "react-icons/fa6";
import {AnimatePresence, motion} from "framer-motion"

const faqData = [
  {
    question: "How to buy a product?",
    answer: "To buy a product, browse through our categories, select the product you'd like to purchase, add it to your cart, and proceed to checkout. You can review your cart, provide shipping details, and make the payment using your preferred method."
  },
  {
    question: "How can I make a refund from your website?",
    answer: "To request a refund, please log in to your account, go to your order history, select the order you'd like to return, and follow the prompts for initiating a refund. Our support team will review your request and get back to you within a few business days."
  },
  {
    question: "I am a new user. How should I start?",
    answer: "As a new user, you should start by creating an account on our website. Once registered, you can browse products, add items to your cart, and complete your purchase. You will also receive updates on your orders via email."
  },
  {
    question: "Are my details secured?",
    answer: "Yes, your details are secured. We use encryption and other security measures to ensure that your personal and payment information is safe when you shop on our website."
  },
  {
    question: "How do I make payment by my credit card?",
    answer: "To pay using your credit card, proceed to checkout, select the credit card option, enter your card details in the provided fields, and confirm the payment. You will receive a confirmation once the payment is successfully processed."
  }
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ is open

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close if same, open if different
  };

  return (
    <div className="md:w-[70%] flex flex-col gap-2">
      {faqData.map((faq, index) => (
        <div key={index} className="border border-gray-200 py-4 px-4">
          <div
            className="cursor-pointer text-lg font-semibold flex justify-between items-center  "
            onClick={() => toggleAccordion(index)}
          >
            <p>{faq.question}</p>
            <div className='p-2 bg-gray-300'>
                {index === openIndex ? <FaMinus /> :<FaPlus />}
            </div>
          </div>
                <AnimatePresence>
                {openIndex === index && (
                    <motion.div className="mt-2 text-gray-600"
                    initial={{height:0,opacity:0}}
                    animate={{height:'auto',opacity:1}}
                    exit={{height:0,opacity:0}}
                    >
                    <p>{faq.answer}</p> 
                    </motion.div>
                )}
                </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
