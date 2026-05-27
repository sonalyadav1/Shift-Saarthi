import type { HandoffTask } from '@/lib/types';
import { riskBadgeStyles } from '@/lib/risk-styles';

interface PendingTasksProps {
  tasks: HandoffTask[];
}

export function PendingTasks({ tasks }: PendingTasksProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">Pending Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
          >
            <input
              type="checkbox"
              checked={task.completed}
              readOnly
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground">{task.title}</p>
              <p className="text-xs text-muted-foreground">Due: {task.dueTime}</p>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border capitalize ${riskBadgeStyles[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
