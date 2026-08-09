import { Link } from "react-router-dom";
import { Leaf, ArrowLeft, AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <section className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full rounded-[32px] bg-white shadow-xl border border-neutral-200 p-10 text-center">
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle className="h-10 w-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-green-600">
          Error 404
        </span>

        <h1 className="mt-2 text-3xl font-bold text-neutral-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
          Sorry, the page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 shadow-md shadow-green-600/20"
          >
            <Leaf className="h-4 w-4" /> Return to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
          >
            <ArrowLeft className="h-4 w-4" /> Browse Groceries
          </Link>
        </div>

      </div>
    </section>
  );
}

export default NotFound;