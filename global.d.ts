import type { DetailedHTMLProps, HTMLAttributes } from "react";

/* Custom elements loaded at runtime via <script type="module"> (Solutions.tsx):
   - model-viewer  (Google <model-viewer>)
   - spline-viewer (Spline web component)
   React 19 reads intrinsic elements from the `React.JSX` namespace, so we
   augment that (the legacy global `JSX` namespace is no longer used). */
type ModelViewerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  "auto-rotate"?: boolean | string;
  "rotation-per-second"?: string;
  "camera-controls"?: boolean | string;
  "disable-zoom"?: boolean | string;
  "shadow-intensity"?: string;
  "environment-image"?: string;
};

type SplineViewerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  url?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
      "spline-viewer": SplineViewerProps;
    }
  }
}

export {};
