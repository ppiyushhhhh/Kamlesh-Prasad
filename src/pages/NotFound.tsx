import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Resource Not Located | Kamlesh Prasad</title>
        <meta name="description" content="The page you are looking for could not be found on Kamlesh Prasad's website." />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center bg-[#070B16] text-white p-6 tech-grid">
        <div className="border border-slate-800 bg-slate-900/90 p-8 sm:p-12 text-center max-w-md w-full shadow-2xl">
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase block mb-3">
            Error 404 // Invalid Route
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white mb-3">
            Not Found
          </h1>
          <p className="text-slate-400 text-sm mb-8 font-light">
            The requested location could not be verified in this executive directory.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
