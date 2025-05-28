declare module "cheryglsljs" {
  // Main wave effect
  export function CherryWave(options: {
    image: HTMLImageElement;
    container: HTMLElement;
    speed?: number;
    strength?: number;
    hover?: boolean;
    light?: boolean;
  }): void;

  // Image transition effect 1
  export function ImageTransition1(
    container: HTMLElement,
    options?: {
      speed?: number;
      strength?: number;
      radius?: number;
      hover?: boolean;
      noise?: number;
      p?: number;
    }
  ): void;

  // Image transition effect 2
  export function ImageTransition2(
    container: HTMLElement,
    options?: {
      time?: boolean;
      speed?: number;
      p?: number;
      hover?: boolean;
      ttype?: number;
    }
  ): void;
}
