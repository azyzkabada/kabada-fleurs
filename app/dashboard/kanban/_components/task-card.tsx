import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Task } from "@/src/lib/store"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cva } from "class-variance-authority"
import { GripVertical } from "lucide-react"

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
}

export type TaskType = "Task"

export interface TaskDragData {
  type: TaskType
  task: Task
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  })

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="relative flex flex-row px-3 py-3 border-b-2 space-between border-secondary">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="h-auto p-1 -ml-2 cursor-grab text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          Task
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.title}
      </CardContent>
    </Card>
  )
}
