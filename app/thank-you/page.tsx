import { Suspense } from 'react';
import ThankYouContent from '@/components/ThankYouContent';

export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThankYouContent />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"
          style={{
            background: 'rgba(212,175,154,0.15)',
            border: '2px solid rgba(212,175,154,0.4)',
          }}
        />
        <p className="text-white/50">Cargando...</p>
      </div>
    </div>
  );
}
