import Button from "../ui/button";

interface DetailActionsProps {
  isEditLoading: boolean;
  isDeleteLoading: boolean;
  onUpdate: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function DetailActions({
  isEditLoading,
  isDeleteLoading,
  onUpdate,
  onDelete,
}: DetailActionsProps) {
  return (
    <div className="flex gap-4 mt-6 justify-end max-lg:justify-center max-sm:gap-2">
      <Button
        text="수정 완료"
        bgColor={isEditLoading ? "bg-slate-200" : "bg-lime-300"}
        textColor="text-slate-900"
        loading={isEditLoading}
        disabled={isEditLoading || isDeleteLoading}
        onClick={onUpdate}
      />
      <Button
        text="삭제하기"
        bgColor="bg-red-500"
        textColor="text-white"
        loading={isDeleteLoading}
        disabled={isDeleteLoading || isEditLoading}
        onClick={onDelete}
      />
    </div>
  );
}
