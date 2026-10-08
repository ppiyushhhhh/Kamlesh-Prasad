import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Download, X } from "lucide-react";

interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RESUME_PAGES = [
  "/kamlesh-resume-page-1.png",
  "/kamlesh-resume-page-2.png",
];

const ResumeModal = ({ open, onOpenChange }: ResumeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[92dvh] w-[95vw] max-w-5xl flex-col gap-0 overflow-hidden p-0 border-border bg-card [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-4 flex-shrink-0 bg-background">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-border bg-card flex items-center justify-center text-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-display font-bold uppercase tracking-wider text-foreground">
                Executive Resume
              </DialogTitle>
              <p className="text-[11px] font-mono text-muted-foreground">
                Kamlesh Prasad &bull; Technology Executive &bull; CIO &bull; CISO
              </p>
            </div>
          </div>
          <DialogDescription className="sr-only">View Kamlesh Prasad&apos;s executive resume</DialogDescription>

          <div className="flex items-center gap-2">
            <a
              href="/kamlesh-resume.pdf"
              download="Kamlesh-Prasad-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background font-mono text-xs font-semibold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close resume viewer"
            >
              <X size={18} />
            </button>
          </div>
        </DialogHeader>

        {/* Document Pages Container */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-muted/20 px-4 py-6 md:px-8 md:py-8"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {RESUME_PAGES.map((pageSrc, index) => (
              <div key={pageSrc} className="overflow-hidden border border-border bg-card shadow-sm">
                <div className="bg-muted px-4 py-1.5 border-b border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>PAGE {index + 1} OF {RESUME_PAGES.length}</span>
                  <span>KAMLESH PRASAD</span>
                </div>
                <img
                  src={pageSrc}
                  alt={`Kamlesh Prasad resume page ${index + 1}`}
                  loading="eager"
                  decoding="sync"
                  className="block w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
