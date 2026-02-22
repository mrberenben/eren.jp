import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import type { ComponentEntry } from "~/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: component } = await supabase
    .from("components")
    .select("title, description")
    .eq("slug", slug)
    .eq("published", true)
    .single<Pick<ComponentEntry, "title" | "description">>();

  if (!component) return {};

  return {
    title: component.title,
    description: component.description ?? undefined,
  };
}

export default async function ComponentDemoPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: component } = await supabase
    .from("components")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single<ComponentEntry>();

  if (!component) notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          {component.title}
        </h1>
        {component.description && (
          <p className="text-muted-foreground mt-2 text-base">
            {component.description}
          </p>
        )}
      </header>

      {/* Live demo area — replace with actual component render */}
      <div className="bg-muted/50 mt-10 rounded-xl border p-8">
        <p className="text-muted-foreground text-center text-sm">
          Demo placeholder
        </p>
      </div>

      {/* Source code viewer */}
      {component.source_code && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium">Source Code</h2>
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            <code>{component.source_code}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
