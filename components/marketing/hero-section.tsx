import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5 rounded-full px-4 py-1 text-xs">
          <Sparkles className="size-3" />
          Early Access
        </Badge>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          上传房间照片，AI 生成可落地
          <br className="hidden sm:block" />
          布置方案和采购清单
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Whether you&apos;re furnishing from scratch or refreshing a listing, RoomReady AI
          analyzes your room and delivers a complete furnishing plan and ready-to-order
          shopping list — in minutes, not days.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects/new"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Upload a photo
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center rounded-lg border px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View pricing
          </Link>
        </div>
      </Container>

      {/* decorative gradient blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[500px] w-full max-w-3xl bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_60%)] opacity-[0.08]"
      />
    </section>
  );
}
