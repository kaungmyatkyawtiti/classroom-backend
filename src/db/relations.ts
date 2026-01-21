import { defineRelations } from "drizzle-orm";
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  // Auth

  // Departments
  departments: {
    subjects: r.many.subjects()
  },

  // Subjects
  subjects: {
    department: r.one.departments({
      from: r.subjects.departmentId,
      to: r.departments.id,
    }),
  },

} as const));
