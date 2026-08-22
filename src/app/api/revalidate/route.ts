import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(request: NextRequest) {
  const revalidationSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!revalidationSecret) {
    return NextResponse.json(
      { message: 'Webhook secret is not configured.' },
      { status: 503 },
    );
  }

  const { body, isValidSignature } = await parseBody<{
    _type?: string;
    slug?: { current?: string };
  }>(request, revalidationSecret);

  if (!isValidSignature) {
    return NextResponse.json(
      { message: 'Invalid webhook signature.' },
      { status: 401 },
    );
  }

  revalidateTag('sanity-content', 'max');
  revalidatePath('/');
  revalidatePath('/resume');

  if (body?._type === 'project') {
    revalidateTag('sanity-projects', 'max');
    revalidatePath('/dev');
    revalidatePath('/projects/[slug]', 'page');
    revalidatePath('/sitemap.xml');

    if (body.slug?.current) {
      revalidateTag(`sanity-project-${body.slug.current}`, 'max');
      revalidatePath(`/projects/${body.slug.current}`);
    }
  }

  return NextResponse.json({
    documentType: body?._type ?? null,
    now: Date.now(),
    revalidated: true,
  });
}
