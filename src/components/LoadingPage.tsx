import { AvatarContainer, Img } from "@/components/Elements";

export function LoadingPage() {

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5">
      <div className="w-full py-20 max-w-sm flex flex-col gap-8 bg-card rounded-2xl border border-border hover:border-border/80 transition-all duration-300 p-6 shadow-xl">
        {/* Logo */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <AvatarContainer className="w-20 h-20 p-1 shadow-lg">
            <Img src="/favicon.svg" alt="Logo" />
          </AvatarContainer>
          <h1 className="text-3xl font-bold">Madhuram</h1>
          <p className="text-muted-foreground">Only Music • No Ads</p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Enjoy uninterrupted music
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;
