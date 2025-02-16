import {URLWidget} from "@/components/URLWidget";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold mb-8 text-center">My Bit.ly clone</h1>
        <URLWidget />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Developed by Matt H 2025</p>
      </footer>
    </div>
  );
}
