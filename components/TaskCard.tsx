import Link from "next/link";
import React from "react";
import { CgTrash } from "react-icons/cg";

interface TaskProps {
  id: string;
  title: string;
  handleDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskProps> = ({ title, id, handleDelete }) => {
  const onDelete = () => {
    handleDelete(id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
  };

  

  return (
    <section className="pb-2">
      <div className="border-2 rounded-md shadow-sm py-2 px-2 flex justify-between items-center cursor-pointer" draggable="true"
        onDragStart={handleDragStart}>
        <Link href={`/task?id=${id}`}>
          <h3 className="flex-grow-1">{title}</h3>
        </Link>
        <button onClick={onDelete} className="text-red-300 hover:text-red-700">
          <CgTrash className="" />
        </button>
      </div>
    </section>
  );
};

export default TaskCard;
