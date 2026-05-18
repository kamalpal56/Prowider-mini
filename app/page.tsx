export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Prowider Mini Lead Distribution System
      </h1>

      <div className="flex gap-4">
        <a
          href="/request-service"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Request Service
        </a>

        <a
          href="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Dashboard
        </a>

        <a
          href="/test-tools"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Test Tools
        </a>
      </div>
    </div>
  );
}