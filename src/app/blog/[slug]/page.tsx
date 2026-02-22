import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { formatDate } from "~/lib/utils";
import type { Post } from "~/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single<Pick<Post, "title" | "excerpt">>();

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single<Post>();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <time className="text-muted-foreground mt-2 block text-sm">
          {formatDate(post.created_at)}
        </time>
      </header>
      <div className="prose mt-8 max-w-none">
        {post.content ?? (
          <p className="text-muted-foreground">No content yet.</p>
        )}
      </div>
    </article>
  );
}
