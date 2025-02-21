import { useState } from "react";

type SearchableItem = {
	id: string;
	name: string;
};

type SearchDropDownProps<TData extends SearchableItem> = {
	onSelect: (skill: TData) => void;
	selected?: TData;
	data?: TData[];
};

function SearchDropDown<TData extends SearchableItem>({
	onSelect,
	selected,
	data,
}: SearchDropDownProps<TData>) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="relative w-full max-w-md">
			{/* Main button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between px-4 py-2 border rounded-lg 
                 hover:bg-gray-100 transition-colors duration-150"
			>
				<div className="flex items-center gap-2">
					{selected ? (
						<>
							{/* TODO: Add icon here */}
							<span>{selected.name}</span>
						</>
					) : (
						<span className="text-gray-500">Select a Skill</span>
					)}
				</div>
				{/* TODO: Add icon here */}
			</button>

			{/* Dropdown panel */}
			{isOpen && (
				<div
					className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border 
                      overflow-hidden z-50"
				>
					{/* Search input */}
					<div className="p-2 border-b">
						<div className="relative">
							{/* TODO: Add icon here */}
							<input
								type="text"
								placeholder="Search skills..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-9 pr-4 py-2 rounded-md border text-sm focus:outline-none"
							/>
						</div>
					</div>

					{/* Skills list */}
					<div className="max-h-64 overflow-y-auto">
						{data?.length === 0 ? (
							<div className="p-4 text-center text-gray-500">
								No skills found
							</div>
						) : (
							data?.map((item) => (
								<button
									key={item.id}
									onClick={() => {
										onSelect(item);
										setIsOpen(false);
										setSearchTerm("");
									}}
									className="w-full px-4 py-2 text-left flex items-center gap-3 
                           hover:bg-gray-50 transition-colors duration-150"
								>
									{/* TODO: Add icon here */}
									<div>
										<div className="font-medium">{item.name}</div>
									</div>
								</button>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
}
