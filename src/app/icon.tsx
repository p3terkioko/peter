import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A1A1A', // Matches your bg-charcoal
          color: '#D1FF36',      // Matches your bg-neonAccent for sharp contrast
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 900,
          fontFamily: 'monospace',
          lineHeight: 1,
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
