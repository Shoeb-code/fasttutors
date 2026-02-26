export default function AdminHeader() {
    return (
      <header className="
        border-b border-white/10
        px-8 py-4
        flex justify-between items-center
      ">
        <h2 className="text-lg font-semibold">
          Control Panel
        </h2>
  
        <div className="flex gap-4">
          <span className="text-amber-400">Admin</span>
        </div>
      </header>
    );
  }
  