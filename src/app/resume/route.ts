import { fetchAboutData } from '@/utils/fetchAboutData';

const resumeFallback = (request: Request) =>
  Response.redirect(new URL('/#contact', request.url), 302);

export async function GET(request: Request) {
  try {
    const about = await fetchAboutData();

    if (!about?.resumeUrl) return resumeFallback(request);

    const resumeUrl = new URL(about.resumeUrl);
    const isSanityAsset =
      resumeUrl.protocol === 'https:' && resumeUrl.hostname === 'cdn.sanity.io';

    return isSanityAsset
      ? Response.redirect(resumeUrl, 307)
      : resumeFallback(request);
  } catch (error) {
    console.error('Unable to resolve the Sanity resume asset.', error);
    return resumeFallback(request);
  }
}
