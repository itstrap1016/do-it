import DetailHeader from "./detail-header";
import DetailContent from "./detail-content";
import DetailActions from "./detail-actions";
import { TodoItem } from "@/app/lib/api";

interface TodoDetailViewProps {
  todoData: TodoItem;
  updateField: (field: keyof TodoItem, value: string | boolean) => void;
  status: {
    isEditLoading: boolean;
    isDeleteLoading: boolean;
    error: string | null;
  };
  onUpdate: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function TodoDetailView({
  todoData,
  updateField,
  status,
  onUpdate,
  onDelete,
}: TodoDetailViewProps) {
  return (
    <section className="w-full min-h-[calc(100vh-60px)] pt-6 px-[102px] bg-white">
      <h2 className="sr-only">ToDo 상세 페이지</h2>

      <DetailHeader
        name={todoData.name}
        isCompleted={todoData.isCompleted}
        onNameChange={(name) => updateField("name", name)}
        onCompletedChange={(isCompleted) =>
          updateField("isCompleted", isCompleted)
        }
      />

      <DetailContent
        imageUrl={todoData.imageUrl}
        memo={todoData.memo || ""}
        onImageChange={(url) => updateField("imageUrl", url)}
        onMemoChange={(memo) => updateField("memo", memo)}
      />

      <DetailActions
        isEditLoading={status.isEditLoading}
        isDeleteLoading={status.isDeleteLoading}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </section>
  );
}
