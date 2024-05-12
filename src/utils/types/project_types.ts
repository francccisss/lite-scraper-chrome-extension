export type task_schema = {
  [key: string]: any;
};
export type t_task = {
  taskID: string;
  websiteURL: string;
  isMultipage: boolean;
  multipageConfig?: {
    starting_page: number;
    end_page: number;
    next_element: string;
  };
  taskSchema: task_schema;
};
