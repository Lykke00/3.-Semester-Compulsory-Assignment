import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ModalBookNewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ModalBookNew({ open, onOpenChange }: ModalBookNewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new book</DialogTitle>
            <DialogDescription>
              Create a new book
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="title-1" name="title" defaultValue="Harry Potter" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pages-1">Pages</Label>
              <Input type="number" id="pages-1" name="pages" defaultValue="0"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
