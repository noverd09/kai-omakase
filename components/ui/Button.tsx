import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "inverse";

const base =
  "inline-flex h-[52px] items-center justify-center px-6 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-sumi text-washi hover:bg-tokiwa",
  inverse: "bg-washi text-sumi hover:bg-stone",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  >;
type NativeProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

/** One filled button per view. Everything else is a `TextLink`. */
export function Button(props: LinkProps | NativeProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);
  if (typeof rest.href === "string") {
    const { href, ...anchor } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchor}>
        {children}
      </Link>
    );
  }
  const native = rest as Omit<NativeProps, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...native}>
      {children}
    </button>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("arrow", className)}
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** The secondary action: label, thin arrow, drawn underline. */
export function TextLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  const content = (
    <>
      {children}
      <Arrow />
    </>
  );
  return external ? (
    <a href={href} className={cn("text-link", className)} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cn("text-link", className)} {...rest}>
      {content}
    </Link>
  );
}
