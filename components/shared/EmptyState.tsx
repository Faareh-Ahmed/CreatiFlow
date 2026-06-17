import Link from "next/link";
import { ImageOff } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  actionLink?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title = "No edits found",
  subtitle = "You haven't created any edits yet or no edits match your current filters.",
  actionLabel = "Create New Edit",
  actionLink = "/",
  icon = <ImageOff className="w-12 h-12 text-on-surface-variant/50" />,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-surface-container/30 rounded-xl border border-dashed border-outline-variant/50 min-h-[300px]">
      <div className="flex items-center justify-center w-20 h-20 bg-surface-variant/50 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="font-display-sm text-display-sm text-on-surface mb-2">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-8">
        {subtitle}
      </p>
      
      {actionLabel && actionLink && (
        <Link 
          href={actionLink}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-md hover:shadow-lg min-w-[200px]"
        >
          {actionLabel}
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      )}
    </div>
  );
};
