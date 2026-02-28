import type { APIRoute } from 'astro';
import puppeteer from 'puppeteer';

export const prerender = false; // Enable SSR for this endpoint

export const POST: APIRoute = async ({ request }) => {
  try {
    const { html, format, filename } = await request.json();

    if (!html) {
      return new Response(JSON.stringify({ error: 'HTML content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('[Server] Starting browser...');
    
    // Use system Chromium if available (for production)
    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || undefined;
    
    const browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions'
      ]
    });

    console.log('[Server] Creating page...');
    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    console.log('[Server] Setting content...');
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    let result: Buffer;
    let contentType: string;
    let disposition: string;

    if (format === 'png') {
      console.log('[Server] Generating PNG...');
      result = await page.screenshot({
        type: 'png',
        fullPage: true,
        omitBackground: false
      });
      contentType = 'image/png';
      disposition = `attachment; filename="${filename || 'quote.png'}"`;
    } else {
      console.log('[Server] Generating PDF...');
      result = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });
      contentType = 'application/pdf';
      disposition = `attachment; filename="${filename || 'quote.pdf'}"`;
    }

    await browser.close();
    console.log('[Server] Generation complete!');

    return new Response(result, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': disposition,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('[Server] Error generating quote:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate quote',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
