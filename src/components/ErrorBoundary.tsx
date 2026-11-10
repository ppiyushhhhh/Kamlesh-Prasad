import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0A0A0C] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full border border-zinc-800 bg-zinc-900/80 p-8 rounded-sm shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
              <AlertCircle size={24} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-2">
              Kamlesh Prasad &bull; Technology Executive
            </span>
            <h1 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
              Application Notice
            </h1>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              The portfolio encountered an unexpected display issue while initializing components. Please refresh to restore the view.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200 transition-colors w-full cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Reload Portfolio</span>
            </button>
            {Boolean(import.meta.env?.DEV) && this.state.error && (
              <pre className="mt-4 p-3 bg-black/60 border border-zinc-800 text-[11px] font-mono text-red-300 text-left overflow-auto max-h-32 rounded">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

