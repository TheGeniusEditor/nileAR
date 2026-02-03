"use client"

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[#e7ecf3] dark:border-slate-800 bg-white dark:bg-[#161f2c] flex-shrink-0 z-10">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full text-slate-400 focus-within:text-primary">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input className="block w-full rounded-lg border-none bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 transition-all" placeholder="Search (Ctrl + /)" type="text" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Sarah Jenkins</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Product Designer</p>
          </div>
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-white dark:border-slate-700 shadow-sm"
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB48jMTkPZ0nor87Nv5RNKgPXMFnVqWZSnyHVnj2Az1T5bnChp6bjU5-sA6Inh4lDzcs1PvBkppXgRJ9dxM6NMyqUT6yy1HEPDUAdQYKgHxxW89PsnxqBbFJoCCTMAhBnNHhnvUvN1hjUDvyqdK_O_2VL68tXcFyoou8MWDiQGij-W0jaUMHXuCxv7Opt3XKBKWdIqrvQEylqYlEQFLz6pNKMYaPR0WXNb-oNxc2svT_iRXyClrQBIJbzRxWycB4bfKKMAnXHHedazR")'}}
          ></div>
        </div>
      </div>
    </header>
  )
}
