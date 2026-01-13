const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

export function cloudinaryUrl(
  id: string,
  transform: string = "w_1920,q_auto,f_auto"
): string {
  return `${BASE_URL}/image/upload/${transform}/${id}.webp`;
}

export function cloudinaryVideo(
  id: string,
  transform: string = "q_auto"
): string {
  return `${BASE_URL}/video/upload/${transform}/${id}`;
}
