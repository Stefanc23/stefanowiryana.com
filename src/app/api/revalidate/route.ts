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

  const { body, isValidSignature } = await parseBody<{ _type?: string }>(
    request,
    revalidationSecret,
  );

  if (!isValidSignature) {
    return NextResponse.json(
      { message: 'Invalid webhook signature.' },
      { status: 401 },
    );
  }

  revalidateTag('sanity-content', 'max');
  revalidatePath('/');
  revalidatePath('/resume');

  return NextResponse.json({
    documentType: body?._type ?? null,
    now: Date.now(),
    revalidated: true,
  });
}
