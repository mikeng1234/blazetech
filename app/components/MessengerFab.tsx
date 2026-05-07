export default function MessengerFab() {
  return (
    <a
      href="https://m.me/blazetechdevt"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Blaze Tech on Facebook Messenger"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#0084FF] animate-bt-ping" aria-hidden="true" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-110 transition-transform animate-bt-bounce">
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-white" fill="currentColor" aria-hidden="true">
          <path d="M18 2C9.163 2 2 8.59 2 16.71c0 4.612 2.318 8.72 5.95 11.41V34l5.43-2.984c1.45.4 2.99.617 4.62.617 8.837 0 16-6.59 16-14.71S26.837 2 18 2zm1.6 19.78l-4.07-4.34-7.95 4.34 8.74-9.27 4.17 4.34 7.85-4.34-8.74 9.27z" />
        </svg>
      </span>
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-on-surface text-surface text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
    </a>
  );
}
