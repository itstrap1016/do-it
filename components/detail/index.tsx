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
  onImageError: (error: string) => void;
}

export default function TodoDetailView({
  todoData,
  updateField,
  status,
  onUpdate,
  onDelete,
  onImageError,
}: TodoDetailViewProps) {
  return (
    <section className="w-full min-h-[calc(100vh-60px)] py-6 px-[102px] bg-white max-[1248px]:px-6 max-sm:p-4">
      <h2 className="sr-only">ToDo 상세 페이지</h2>
      {/* Todo 상세 상태 */}
      <DetailHeader
        name={todoData.name}
        isCompleted={todoData.isCompleted}
        onNameChange={(name) => updateField("name", name)}
        onCompletedChange={(isCompleted) =>
          updateField("isCompleted", isCompleted)
        }
      />
      {/* Todo 상세 이미지 업로드 및 메모 */}
      <DetailContent
        imageUrl={todoData.imageUrl}
        memo={todoData.memo || ""}
        onImageChange={(url) => updateField("imageUrl", url)}
        onMemoChange={(memo) => updateField("memo", memo)}
        onImageError={onImageError}
      />
      {/* Todo 상세 수정 완료 및 삭제 버튼 */}
      <DetailActions
        isEditLoading={status.isEditLoading}
        isDeleteLoading={status.isDeleteLoading}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </section>
  );
}
