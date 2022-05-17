import "react";

declare module "react" {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}
