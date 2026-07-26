import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const revalidationSecret =
    process.env.SANITY_REVALIDATE_SECRET ??
    process.env.NEXT_PUBLIC_REVALIDATION_TOKEN;

  if (!revalidationSecret || secret !== revalidationSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Add routes that use data from sanity
  revalidatePath('/');
  revalidatePath('/resume');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
