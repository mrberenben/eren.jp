"use server";

import { z } from "zod/v4";
import { createClient } from "~/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(1, "Message is required."),
});

export type ContactFormState = {
  success: boolean;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
    form?: string;
  };
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert(result.data);

  if (error) {
    return {
      success: false,
      errors: { form: "Something went wrong. Please try again." },
    };
  }

  return { success: true };
}
