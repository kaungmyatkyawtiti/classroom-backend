import { and, ilike, or } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express"
import { departments, subjects } from "../db/schema";
import { countFilteredSubjects, getSubjectsPaginated } from "../services/subject.service";

export async function handleGetAllSubjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      search,
      department,
      page = 1,
      limit = 10
    } = req.query;

    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);

    const offset = (currentPage - 1) * limitPerPage;

    const filterConditions = [];

    if (search) {
      filterConditions.push(
        or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`)
        )
      )
    }

    if (department) {
      filterConditions.push(ilike(departments.name, `%${department}%`))
    }

    const whereClause = filterConditions.length > 0
      ? and(...filterConditions)
      : undefined

    const totalCount = await countFilteredSubjects(whereClause);

    const subjectsList = await getSubjectsPaginated(
      whereClause,
      limitPerPage,
      offset
    )

    res.status(200).json({
      data: subjectsList,
      pagination: {
        page: currentPage,
        limit: limitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitPerPage)
      }
    })
  } catch (err) {
    console.error(`GET /subjects error ${err}`);
    res.status(500).json({
      error: "Failed to get subjects"
    })
  }
}
