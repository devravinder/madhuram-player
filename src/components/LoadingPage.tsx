import { AvatarContainer, Img, MobileContainer, MobileLayout } from "@/components/Elements";

export function LoadingPage() {

  return (
    <MobileLayout>
      <MobileContainer>
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
      </MobileContainer>
    </MobileLayout>
  );
}

export default LoadingPage;
