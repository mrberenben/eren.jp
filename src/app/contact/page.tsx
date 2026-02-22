import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="text-muted-foreground mt-2 text-base">
        Have a question or want to work together? Drop me a message.
      </p>
      <div className="mt-10 max-w-md">
        <ContactForm />
      </div>
    </section>
  );
}
