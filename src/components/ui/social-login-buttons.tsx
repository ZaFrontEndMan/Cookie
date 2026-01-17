import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";

interface SocialLoginButtonsProps {
  onAzureClick?: () => void;
  onLinkedInClick?: () => void;
  isLoading?: boolean;
}

export const SocialLoginButtons = ({
  onAzureClick,
  onLinkedInClick,
  isLoading = false,
}: SocialLoginButtonsProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            {t("pages.auth.login.orContinueWith")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Azure Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onAzureClick}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
            className="h-4 w-4"
          >
            <path
              fill="#f25022"
              d="M1 1h10v10H1z"
            />
            <path
              fill="#00a4ef"
              d="M12 1h10v10H12z"
            />
            <path
              fill="#7fba00"
              d="M1 12h10v10H1z"
            />
            <path
              fill="#ffb900"
              d="M12 12h10v10H12z"
            />
          </svg>
          <span className="hidden sm:inline">Azure</span>
        </Button>

        {/* LinkedIn Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onLinkedInClick}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-[#0A66C2]"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>
      </div>
    </div>
  );
};
