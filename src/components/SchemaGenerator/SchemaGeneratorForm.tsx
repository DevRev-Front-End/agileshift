import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FieldGroup } from "./FieldGroup";

type GeneratorFormPropTypes = {
	list: TYPE_SCHEMA[];
	setList: (this: any, list: TYPE_SCHEMA[]) => void;
};

export const SchemaGeneratorForm = ({
	list,
	setList,
}: GeneratorFormPropTypes) => {
	const addColumn = (e: any) => {
		e.preventDefault();
		let tempColumns = [...list];
		tempColumns.push({ columnName: "", columnType: "" });
		setList(tempColumns);
	};

	const changeColumn = (id: number, columnName: string, columnType: string) => {
		let tempColumns = [...list];
		tempColumns[id].columnName = columnName;
		tempColumns[id].columnType = columnType;
		setList(tempColumns);
	};

	const deleteColumn = (id: number) => {
		const newObjects = [...list];
		newObjects.splice(id, 1);
		setList(newObjects);
	};

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(list);

		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setList(items);
	}

	return (
		<div className="flex justify-center gap-6 w-full">
			<section className="flex flex-col items-center h-full py-0 w-full">
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="dragableList">
						{(provided) => (
							<div
								className="w-max px-[1rem] flex-1 flex flex-col gap-[1rem] transition-all pt-[1rem] max-h-[50vh] overflow-auto"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{list.map((column, id) => {
									return (
										<Draggable
											key={"col-" + id}
											draggableId={"col-" + id}
											index={id}
										>
											{(provided) => (
												<div
													className="relative"
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<FieldGroup
														column={column}
														id={id}
														deleteColumn={deleteColumn}
														changeColumn={changeColumn}
														key={id}
														// testId={"col-"+id}
													/>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<div className="w-full flex justify-center">
					<button
						className="mt-[2rem] flex justify-center gap-3 items-center w-max h-[45px] rounded-md p-[5px_30px] text-sm font-dm_sans border-[2px] bg-Secondary_background_color border-dark_gray hover:bg-dark_gray hover:text-white"
						onClick={addColumn}
						data-testid="add-column"
					>
						<span className="material-symbols-outlined">add</span>{" "}
						<p className="text-sm font-dm_sans leading-normal">Add Column</p>
					</button>
				</div>
			</section>
		</div>
	);
};
