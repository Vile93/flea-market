import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

interface DataTableAddModalFooterProps {
    setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableAddModalFooter({ setIsOpenAddModal }: DataTableAddModalFooterProps) {
    return (
        <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="outline" type="button" onClick={() => setIsOpenAddModal(false)}>
                Отменить
            </Button>
            <Button className="cursor-pointer" type="submit">
                Добавить
            </Button>
        </DialogFooter>
    );
}
