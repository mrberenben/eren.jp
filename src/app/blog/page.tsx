import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "~/lib/supabase/server";
import { formatDate } from "~/lib/utils";
import type { Post } from "~/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on frontend development, tooling, and the web.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, excerpt, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<Pick<Post, "slug" | "title" | "excerpt" | "created_at">[]>();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="text-muted-foreground mt-2 text-base">
        Thoughts on frontend development, tooling, and the web.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="group-hover:text-muted-foreground text-lg font-medium transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {post.excerpt}
                  </p>
                )}
                <time className="text-muted-foreground mt-1 block text-xs">
                  {formatDate(post.created_at)}
                </time>
              </Link>
            </article>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No posts yet.</p>
        )}
      </div>
    </section>
  );
}
