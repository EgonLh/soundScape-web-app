import {DropdownMenu, DropdownMenuRadioGroup, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {Button} from "@/app/components/ui/button";
import {
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator
} from "@/app/components/ui/dropdown-menu"

interface SortingButtonProps {
    onSortChange: (order: "asc" | "desc" | null) => void;
}
const SortingButton: React.FC<SortingButtonProps> = ({ onSortChange }) => {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    const toggleSort = () => {
        const newOrder = sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc";
        setSortOrder(newOrder);
        onSortChange(newOrder);
    };

    return (
        <Button onClick={toggleSort} variant="outline" className="flex items-center gap-2">
            Sort
            {sortOrder === "asc" ? <ArrowUp size={16} /> : sortOrder === "desc" ? <ArrowDown size={16} /> : <ArrowUpDown size={16} />}
        </Button>
    );
};

export const SortButton = () => {

}