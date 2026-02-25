import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="card bg-white border border-gray-300 shadow-md rounded-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-neutral-content rounded-lg">
              <UsersIcon className="w-7 h-7 text-info-content" />
            </div>
            <div className="badge badge-success badge-sm text-white font-semibold ">Live</div>
          </div>
          <div className="text-4xl font-black mb-1 text-gray-800">{activeSessionsCount}</div>
          <div className="text-sm text-gray-800 font-semibold">Active Sessions</div>
        </div>
      </div>

      {/* Recent Count */}
      <div className="card bg-white border border-gray-300 shadow-md rounded-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-neutral-content rounded-lg">
              <TrophyIcon className="w-7 h-7 text-secondary-content" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1 text-gray-800">{recentSessionsCount}</div>
          <div className="text-sm text-gray-800 font-semibold">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;