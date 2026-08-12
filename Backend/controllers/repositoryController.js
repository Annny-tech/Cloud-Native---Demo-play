import {
  analyzeRepositoryService
} from "../services/githubService.js";

export async function analyzeRepository(
  req,
  res,
  next
) {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "repoUrl is required"
      });
    }

    const result =
      await analyzeRepositoryService(repoUrl);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
}