import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

interface DataTableModalFooterProps {
    setIsOpenModal?: Dispatch<SetStateAction<boolean>>;
    textButton: string;
}

export default function DataTableModalFooter({ setIsOpenModal, textButton }: DataTableModalFooterProps) {
    return (
        <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="outline" type="button" onClick={() => setIsOpenModal?.(false)}>
                Отменить
            </Button>
            <Button className="cursor-pointer" type="submit">
                {textButton}
            </Button>
        </DialogFooter>
    );
}
