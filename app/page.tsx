"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<"text" | "url">("text");
  const [textContent, setTextContent] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const handleConvert = () => {
    router.push("/generating");
  };

  const wordCount = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
      <div className="relative flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden pastel-bg-1 pastel-gradient text-[#0d141b] dark:text-slate-100 transition-colors duration-300">
        <div className="absolute inset-0 pastel-bg-2 pointer-events-none"></div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 pt-10 pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="bg-[#137fec]/10 p-2 rounded-full">
                <span className="material-symbols-outlined text-[#137fec] text-2xl">
                  graphic_eq
                </span>
              </div>
              <h1 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight tracking-tight">
                Hey! What are we listening to today? 👋
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-12">
              Turn any text into a viral podcast
            </p>
          </div>
          <div className="shrink-0">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-4 ring-white dark:ring-slate-800"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbbP5xiUCAICPZWt8zJZpXfGueUROQJW4y_Z1mAeS4-cNTUQ8mMSHn67ZjXDE79lYbl8E77N9aqsbirKI432lGZgaZUaUIZp88h_3vghnbsTg6gBwSaz4WPNnMP73C46UrULWfUeiXlBcPB6C-g4uOKMRsbEkOnTkz8oyxKVaai0j9q27K3LhqSODlHVQyyS6yQo-bqpToLK2QAPeGcQNiyLkIg4iYZr64eC5425K-U1o7-W3eEUVTN4TojhQeC0DKyZU-zMjh-w")`,
              }}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex flex-1 flex-col px-6 pb-48">
          {/* Mode Selector Tabs */}
          <div className="flex py-4">
            <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-1.5 shadow-sm">
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-4 has-[:checked]:bg-[#137fec] has-[:checked]:text-white text-slate-500 dark:text-slate-400 text-sm font-semibold transition-all">
                <span className="truncate">Paste Text</span>
                <input
                  checked={mode === "text"}
                  className="invisible w-0"
                  name="mode-selector"
                  type="radio"
                  value="text"
                  onChange={() => setMode("text")}
                />
              </label>
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-4 has-[:checked]:bg-[#137fec] has-[:checked]:text-white text-slate-500 dark:text-slate-400 text-sm font-semibold transition-all">
                <span className="truncate">URL / Link</span>
                <input
                  checked={mode === "url"}
                  className="invisible w-0"
                  name="mode-selector"
                  type="radio"
                  value="url"
                  onChange={() => setMode("url")}
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="mt-4 flex flex-col gap-6">
            {/* Article Content - Show only when mode is "text" */}
            {mode === "text" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[#0d141b] dark:text-white text-base font-semibold">
                    Article Content
                  </p>
                  <span className="text-xs font-medium text-slate-400">
                    {wordCount} / 5000 words
                  </span>
                </div>
                <label className="flex flex-col flex-1">
                  <textarea
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#137fec]/20 border border-white dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm min-h-[220px] placeholder:text-slate-400 p-5 text-base font-normal leading-relaxed shadow-sm"
                    placeholder="Paste that 10-minute read you've been avoiding..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                </label>
              </div>
            )}

            {/* Website URL - Show only when mode is "url" */}
            {mode === "url" && (
              <div className="flex flex-col gap-2">
                <p className="text-[#0d141b] dark:text-white text-base font-semibold px-1">
                  Website URL
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-xl shadow-sm overflow-hidden">
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#137fec]/20 border border-white dark:border-slate-700 border-r-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm h-14 placeholder:text-slate-400 p-5 text-base font-normal transition-all"
                    placeholder="https://example.com/article"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                  />
                  <div className="text-[#137fec] flex border border-white dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm items-center justify-center pr-5 rounded-r-xl border-l-0">
                    <span className="material-symbols-outlined">link</span>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Topics */}
            <div className="mt-4">
              <h3 className="text-[#0d141b] dark:text-white text-base font-semibold mb-4 px-1">
                Trending Topics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 group">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group-active:scale-95 transition-transform cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuASXQ0A_d2mJX-AV5VGiaAauguL9perBvjqHZe33Th2h-XxhgSoTpnt50z1E82r2kRopnk_wWcqJ9J_ZsZX_iTijmsKA6ZvX08o3nNFJzmh2tdFhmU8D-KORe7vpEN2k344tcY9VKWaclmHrrbJy-9gvPL1hfzg6wluFOMUTZc_z9De7IX0N0JAxbncToUcJwclMUdmMc-NCNjCxl_lSrHeymeZmA0NxhFptcZkVytoqwH_-wYpSDwkL20d7wHF_hTjbLedh6GVbQ")`,
                      }}
                    />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-sm font-bold leading-tight truncate">
                        Tech Trends 2024
                      </p>
                      <p className="text-[10px] opacity-80 uppercase tracking-wider">
                        4 min read
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 group">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group-active:scale-95 transition-transform cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhffgmtTFcSyxqOWxS9NpVZIx2fW5m1ee2HxMITp2OUKF-vIpghLC1csAbxdSonw-nQ8PYNHpt-4rFQbyg4GUihTk4rnt-A8QSWfNLhjZ_aUNG63WWeA8qf6JtKq-ynU0uf7u9eSmGeqghgjlMS1Pvb55isr-VipwKoPCIPa-06IPUQAoFS1QKl9m8FjyljvqsTirQNjGIW5B21iDIipbKIUb4OucX4T8xPnqqNbQd-bNa0V0rBBycrJWdezROrwKvUDgmIXzl3g")`,
                      }}
                    />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-sm font-bold leading-tight truncate">
                        Wellness Hacks
                      </p>
                      <p className="text-[10px] opacity-80 uppercase tracking-wider">
                        8 min read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Section */}
        <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center">
          <div className="w-full max-w-[480px]">
            {/* Convert Button */}
            <div className="px-6 pb-6 pt-2 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent">
              <button
                onClick={handleConvert}
                className="flex w-full items-center justify-center gap-3 bg-[#137fec] hover:bg-[#137fec]/90 text-white rounded-full h-16 shadow-xl shadow-[#137fec]/30 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-2xl">
                  auto_awesome
                </span>
                <span className="text-lg font-bold">Convert to Podcast</span>
              </button>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
