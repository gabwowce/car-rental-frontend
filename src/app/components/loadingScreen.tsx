"use client";

/**
 * `LoadingScreen` – Full-screen loading overlay with animated ring.
 *
 * This component displays a centered spinner on a white background.
 * Intended for use during full-page loads or async transitions.
 *
 * @returns JSX.Element – A fixed full-screen loading indicator
 *
 * @example
 * return isLoading ? <LoadingScreen /> : <MainContent />
 */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-20">
      <div className="flex flex-col items-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Inline CSS for spinner animation */}
      <style>{`
        .lds-ring {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 8px solid #2E95D3;
          border-radius: 50%;
          animation: lds-ring 1.2s linear infinite;
          border-color: #2E95D3 transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
