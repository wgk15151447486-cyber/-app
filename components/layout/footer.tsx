import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p>&copy; {new Date().getFullYear()} RoomReady AI. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>
      </div>
    </footer>
  );
}
