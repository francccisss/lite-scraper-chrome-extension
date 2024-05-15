export type task_schema = {
  [key: string]: any;
};

export type t_task_ui = {
  taskID: string;
  title: string;
};

export type t_task = {
  taskID: string;
  title: string;
  websiteURL: string;
  isMultipage: boolean;
  multipageConfig?: {
    starting_page: number;
    end_page: number;
    next_element: string;
  };
  taskSchema: task_schema;
};

type t_any = {};
export interface t_local_storage extends t_any {
  tasks: Array<t_task>;
  scrape_calls: number;
}
