import { cn } from "~/lib/utils";

export function Section({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("relative w-full py-20", className)} {...props}>
      {children}
    </section>
  );
}
