declare module "quote-unquote" {
  export function single(s: string): string;
  export function double(s: string): string;
  export function quote(s: string): string;
  export function unquote(s: string): string;
}
