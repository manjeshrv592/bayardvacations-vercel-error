import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import ContactForm from "@/components/Forms/LoginForm/ContactForm";

export const metadata = {
  title: "Contact Bayard Vacations | Start Your Travel Adventure Today",
  description:
    "Have questions or need assistance planning your trip? Contact Bayard Vacations! Our travel experts are here to help you design the perfect getaway. Reach out today!",
  keywords:
    "Bayard Vacations contact, travel planning assistance, vacation support, customized travel queries, contact travel experts, plan your trip",
};

const ContactPage = () => {
  return (
    <section className="pb-16 pt-32 lg:pt-48">
      <Container>
        <h1 className="mb-12 max-w-screen-c-xs font-nord text-4xl font-bold text-brand-blue">
          get in touch with us
        </h1>
        <div className="grid gap-16 c-xl:grid-cols-3">
          <div className="min-h-80 overflow-hidden rounded-bl-[64px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[64px] bg-blue-200 c-lg:rounded-bl-[128px] c-lg:rounded-tr-[128px]">
            <Image
              alt="Vidhan soudha"
              src="/img/contact-img.jpg"
              width={360}
              height={700}
              className="size-full object-cover"
            />
          </div>
          <div>
            <ContactForm />
          </div>
          <div className="flex flex-col gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="mb-2 text-xl font-bold text-brand-blue">
                  Our Office
                </h4>
                <p>
                  144, 9th Main Rd, 4th Block, Kanteerava Nagar, Nandini Layout,
                  Bengaluru, Karnataka 560096
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-xl font-bold text-brand-blue">
                  Reach us on
                </h4>
                <p>+91 63631 98911</p>
              </div>
              <div>
                <h4 className="mb-2 text-xl font-bold text-brand-blue">
                  Mail ID
                </h4>
                <p>info@bayardvacations.com</p>
              </div>
            </div>
            <div className="min-h-96 flex-1 overflow-hidden rounded-[32px] bg-blue-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0374837334227!2d77.52887181482946!3d13.016276090831987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d992c8d6cfd%3A0x5b343906dc2ad0af!2sBayard%20Vacations!5e0!3m2!1sen!2sin!4v1676992146250!5m2!1sen!2sin"
                className="size-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bayard Vacations Location"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
