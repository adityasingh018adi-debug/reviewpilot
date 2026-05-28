export const dynamic = "force-dynamic";

export const metadata = { title: "Support — ReviewPilot" };

export default function Page() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <p className="text-sm text-gray-500 mt-0.5">Get help, browse documentation, and contact our team</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            title: "Documentation",
            desc: "Browse our comprehensive guides and API references.",
            icon: "📚",
            action: "View Docs",
          },
          {
            title: "Live Chat",
            desc: "Chat with our support team in real-time. Available Mon–Fri 9am–6pm IST.",
            icon: "💬",
            action: "Start Chat",
          },
          {
            title: "Email Support",
            desc: "Send us an email and we'll get back to you within 24 hours.",
            icon: "✉️",
            action: "Send Email",
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{card.desc}</p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              {card.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
