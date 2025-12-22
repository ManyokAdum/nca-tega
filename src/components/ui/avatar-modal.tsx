import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogClose,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    image: string;
    name: string;
    position?: string;
    description?: string;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
    open,
    onOpenChange,
    image,
    name,
    position,
    description,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                {/* Custom overlay with backdrop blur */}
                <DialogOverlay className="backdrop-blur-sm bg-black/60" />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed left-[50%] top-[50%] z-50 max-w-md w-[90vw] sm:w-full p-0 border-0 bg-transparent shadow-none",
                        "translate-x-[-50%] translate-y-[-50%]",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        "duration-300",
                        "focus:outline-none"
                    )}
                    onEscapeKeyDown={() => onOpenChange(false)}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                        onOpenChange(false);
                    }}
                >
                    <div className="relative flex flex-col items-center gap-6 p-6 sm:p-8">
                        {/* Close Button */}
                        <DialogClose className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        {/* Large Square Avatar */}
                        <div className="relative h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-xl border-4 border-background shadow-2xl transition-all duration-300">
                            <img
                                src={image}
                                alt={name}
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>

                        {/* Name and Position */}
                        <div className="text-center space-y-2">
                            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                                {name}
                            </h3>
                            {position && (
                                <p className="text-lg sm:text-xl font-semibold text-muted-foreground">
                                    {position}
                                </p>
                            )}
                            {description && (
                                <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
};

