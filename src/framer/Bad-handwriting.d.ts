declare module "@/framer/Bad-handwriting.js" {
  import type { FC } from "react";

  export type BadHandwritingProps = {
    text?: string;
    fontSize?: number;
    color?: string;
    letterSpacing?: number;
    lineHeight?: number;
    fontWeight?: number;
    seed?: number;
    alignment?: "left" | "center" | "right";
  };

  const BadHandwriting: FC<BadHandwritingProps>;
  export default BadHandwriting;
}
