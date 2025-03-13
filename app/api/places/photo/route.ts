
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const photoReference = searchParams.get('photo_reference');
  const maxwidth = searchParams.get('maxwidth') || '400';
  const maxheight = searchParams.get('maxheight');

  if (!photoReference) {
    return NextResponse.json(
      { error: 'Missing photo_reference parameter' },
      { status: 400 }
    );
  }

  try {
    // Build URL with parameters
    let url = `https://maps.olakrutrim.com/v1/api/places/photo?photo_reference=${encodeURIComponent(photoReference)}&maxwidth=${maxwidth}`;
    if (maxheight) {
      url += `&maxheight=${maxheight}`;
    }

    // Call OlaKrutrim Photo API
    const response = await fetch(url, {
      headers: {
        'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`OlaKrutrim API error: ${response.status} ${response.statusText}`);
    }

    // Get the image blob
    const imageBlob = await response.blob();
    
    // Create response with appropriate content type
    return new NextResponse(imageBlob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error: any) {
    console.error('Place photo API error:', error.message);
    
    // Return placeholder image instead of error
    return NextResponse.redirect(new URL('/placeholder.svg', request.nextUrl.origin));
  }
}
