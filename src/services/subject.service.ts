import { and, eq, getColumns, sql, desc } from "drizzle-orm";
import { db } from "../db";
import { departments, subjects } from "../db/schema";

export async function countFilteredSubjects(
  whereClause: ReturnType<typeof and> | undefined
) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(subjects)
    .leftJoin(departments, eq(subjects.departmentId, departments.id))
    .where(whereClause);

  return result[0]?.count ?? 0;
}

export async function getSubjectsPaginated(
  whereClause: ReturnType<typeof and> | undefined,
  limitPerPage: number,
  offset: number,
) {
  const result = await db
    .select({
      ...getColumns(subjects),
      department: { ...getColumns(departments) }
    })
    .from(subjects)
    .leftJoin(departments, eq(subjects.departmentId, departments.id))
    .where(whereClause)
    .orderBy(desc(subjects.createdAt))
    .limit(limitPerPage)
    .offset(offset)

  return result;
}
