import type React from "react";

type BadgeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    theme?: string;
    label?: string;
    name?: string;
    href?: string;
  },
  HTMLElement
>;

// React 19 reads intrinsics from React.JSX, not the global JSX namespace.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "basilisk-badge": BadgeProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "basilisk-badge": BadgeProps;
    }
  }
}
