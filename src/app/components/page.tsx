import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "~/lib/supabase/server";
import type { ComponentEntry } from "~/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Components",
  description: "Interactive React component demos with source code.",
};

export default async function ComponentsPage() {
  const supabase = await createClient();
  const { data: components } = await supabase
    .from("components")
    .select("slug, title, description")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<Pick<ComponentEntry, "slug" | "title" | "description">[]>();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Components</h1>
      <p className="text-muted-foreground mt-2 text-base">
        Interactive React component demos with source code.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {components && components.length > 0 ? (
          components.map((component) => (
            <Link key={component.slug} href={`/components/${component.slug}`}>
              <Card className="hover:border-foreground/20 transition-colors">
                <CardHeader>
                  <CardTitle>{component.title}</CardTitle>
                  {component.description && (
                    <CardDescription>{component.description}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No components yet.</p>
        )}
      </div>
    </section>
  );
}
