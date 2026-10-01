export default function Footer() {
    return (
      <footer className="border-t border-white/10 bg-[#050505] px-5 py-10 md:px-10">
  
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
  
          <div>
  
            <div className="text-lg font-semibold tracking-[-0.03em]">
              DIV LABS
            </div>
  
            <p className="mt-3 max-w-xs text-sm text-white/30">
              Digital products, designed to move business forward.
            </p>
  
          </div>
  
          <div className="flex flex-col gap-2 text-right">
  
            <a
              href="mailto:hello@divlabs.com"
              className="text-sm text-white/50 hover:text-white"
            >
              hello@divlabs.com
            </a>
  
            <span className="font-mono text-[9px] text-white/20">
              © 2026 DIV LABS
            </span>
  
          </div>
  
        </div>
  
      </footer>
    );
  }