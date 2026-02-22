"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "./actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "~/components/ui/field";

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  if (state.success) {
    return (
      <p className="text-sm">
        Thanks for reaching out! I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input name="name" placeholder="Your name" required />
        {state.errors?.name && <FieldError>{state.errors.name}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input name="email" type="email" placeholder="you@example.com" required />
        {state.errors?.email && <FieldError>{state.errors.email}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Message</FieldLabel>
        <Textarea name="message" placeholder="Your message" required />
        {state.errors?.message && (
          <FieldError>{state.errors.message}</FieldError>
        )}
      </Field>

      {state.errors?.form && (
        <p className="text-destructive text-sm">{state.errors.form}</p>
      )}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
