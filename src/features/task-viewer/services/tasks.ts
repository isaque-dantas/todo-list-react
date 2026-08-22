import {useState} from "react";
import type {TaskGroupData, TaskItemData} from "../../../shared/types.ts";
import {useGet} from "../../../shared/services/api-service.ts";

export function useItems(options: string = '') {
  const [items, setItems] = useState<TaskItemData[] | null>(null);
  useGet(`items${options}`, setItems)
  return items
}

export function useGroups(options: string  = ''): TaskGroupData[] | null {
  const [groups, setItems] = useState<TaskGroupData[] | null>(null);
  useGet(`groups${options}`, setItems)
  return groups
}
