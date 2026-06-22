import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const pathsParam = searchParams.get('paths');

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: 'REVALIDATE_SECRET is not configured' },
      { status: 500 },
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid secret' },
      { status: 401 },
    );
  }

  const paths: string[] = [];
  if (pathsParam) {
    paths.push(...pathsParam.split(',').map((p) => p.trim()).filter(Boolean));
  }
  if (path) {
    paths.push(path.trim());
  }

  if (paths.length === 0) {
    return NextResponse.json(
      { revalidated: false, message: 'No path provided' },
      { status: 400 },
    );
  }

  try {
    const results = paths.map((p) => {
      try {
        revalidatePath(p);
        return { path: p, revalidated: true };
      } catch {
        return { path: p, revalidated: false };
      }
    });

    const allSuccess = results.every((r) => r.revalidated);
    return NextResponse.json({
      revalidated: allSuccess,
      paths: results,
    });
  } catch {
    return NextResponse.json(
      { revalidated: false, message: 'Error revalidating paths' },
      { status: 500 },
    );
  }
}
