import { UserRound } from "lucide-react";
import type { Agent } from "@/types/api";

export function AgentInline({ agent }: { agent: Agent }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        {agent.avatar ? (
          <img
            src={agent.avatar}
            alt={agent.name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <UserRound size={18} className="text-gray-400" />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">
          {agent.name}
        </p>
        {agent.code && (
          <p className="truncate text-xs text-gray-500">{agent.code}</p>
        )}
      </div>
    </div>
  );
}
