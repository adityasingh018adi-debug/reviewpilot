export const dynamic = "force-dynamic";

export const metadata = { title: "Team — ReviewPilot" };

export default function Page() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your team members and their permissions</p>
      </div>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Management</h3>
        <p className="text-sm text-gray-500 max-w-md mb-6">
          Invite team members, assign roles, and manage permissions. Available on Starter and above plans.
        </p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
          Invite Team Members
        </button>
      </div>
    </div>
  );
}
