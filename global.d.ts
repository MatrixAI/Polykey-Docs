/**
 * This TypeScript file includes custom imports and configurations
 * to handle non-code assets like images, text files, etc.
 *
 * Note:
 * - Non-code assets (e.g., images) are imported with specific type declarations.
 * - TypeScript requires these type declarations to ensure type safety and to
 *   provide IDE support (e.g., auto-completion, error checking).
 * - If you need to import new asset types (e.g., a new image format),
 *   ensure corresponding type declarations exist, typically in a `.d.ts` file.
 *
 * Example:
 * import myImage from './assets/image.png';
 *
 * If you're working with additional file types, you might need to extend
 * the custom declarations or update the TypeScript configuration accordingly.
 */

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.jpeg" {
  const value: any;
  export = value;
}

declare module "*.webp" {
  const value: any;
  export = value;
}

declare module '*.gltf' {
  const value: string;
  export default value;
}

declare module '*.obj' {
  const value: string;
  export default value;
}

declare module '*.usdz' {
  const value: string;
  export default value;
}

declare module '*.glb' {
  const value: string;
  export default value;
}

