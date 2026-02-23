import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {

  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-5xl font-bold bg-linear-to-r from-primary-content via-secondary-content to-accent-content bg-clip-text text-transparent tracking-tight">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-lg text-base-content/60 ml-16">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group px-5 py-3 bg-linear-to-r from-primary-content to-secondary-content rounded-lg transition-all duration-200 hover:opacity-90"
          >
            <div className="flex items-center gap-3 text-white font-semibold text-md">
              <ZapIcon className="w-5 h-5" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;