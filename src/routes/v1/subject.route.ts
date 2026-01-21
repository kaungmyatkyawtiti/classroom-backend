import { Router } from "express";
import * as subjectController from "../../controllers/subject.contoller"

const subjectRouter = Router();

subjectRouter.get("/subjects", subjectController.handleGetAllSubjects);

export default subjectRouter;
