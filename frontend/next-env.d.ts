/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

declare module 'next/image' {
	const Image: any
	export default Image
}

declare module 'next/link' {
	const Link: any
	export default Link
}

declare module 'lucide-react' {
	export const ArrowRight: any
}

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
