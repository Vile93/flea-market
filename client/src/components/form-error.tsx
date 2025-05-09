import { cn } from '@/lib/utils';

interface FormErrorProps {
    error?: string | null;
    className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
    if (error) {
        return <div className={cn('text-red-400', className)}>{error}</div>;
    }
    return <></>;
}
