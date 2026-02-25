import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 card bg-white border border-gray-300 shadow-md rounded-lg h-full">
      <div className="card-body">
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-6">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-content to-secondary-content rounded-lg">
              <ZapIcon className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 bg-primary-content rounded-full" />
            <span className="text-sm font-semibold text-primary-content">{sessions.length} Active</span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? ( 
            sessions.map((session) => (
              <div
                key={session._id}
                className="card bg-base-200 border-2 rounded-lg border-base-300 hover:border-primary-content transition-colors duration-200"
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 rounded-lg bg-info-content flex items-center justify-center">
                      <Code2Icon className="size-7 text-white" />
                      <div className="absolute -top-1 -right-1 size-4 bg-primary-content rounded-full border-2 border-base-100" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg truncate text-gray-800">{session.problem}</h3>
                        <span
                          className={`badge badge-sm text-white font-semibold ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() + session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm opacity-80">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-4 text-gray-800" />
                          <span className="font-medium">{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4 text-gray-800" />
                          <span className="text-xs text-gray-800">{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="badge badge-sm badge-secondary font-semibold">Full</span>
                         ) : (
                           <span className="badge badge-sm badge-primary font-semibold">Open</span>
                         )}
                      </div>
                    </div>
                  </div>

                  {session.participant && !isUserInSession(session) ? (
                    <button className="btn btn-disabled btn-sm">Full</button>
                  ) : (
                    <Link to={`/session/${session._id}`} className="btn btn-success text-white btn-sm gap-2">
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-17 h-17 mx-auto mb-4 bg-linear-to-br from-primary-content to-secondary-content rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold mb-1 text-gray-800">No active sessions</p>
              <p className="text-sm opacity-50">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ActiveSessions;