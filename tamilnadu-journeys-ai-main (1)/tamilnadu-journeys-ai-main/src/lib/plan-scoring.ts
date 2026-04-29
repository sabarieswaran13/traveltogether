// Local plan-matching algorithm. No external AI calls.
// Scores curated plans against user inputs (climate, budget, days, interests).

export interface ScoreInputs {
  climate: string;       // 'cool' | 'warm' | 'coastal' | 'hill' | 'any'
  budget: number;        // INR
  days: number;
  interests: string;     // free text
}

export interface ScorablePlan {
  id: string;
  climate: string;
  interests: string;
  budget_inr: number;
  days_count: number;
  total_cost_inr: number;
  rating: number;
  popularity: number;
}

export function scorePlan(plan: ScorablePlan, input: ScoreInputs): number {
  let score = 0;

  // Climate match (heaviest weight)
  if (input.climate === "any" || input.climate === plan.climate) score += 40;
  else if ((input.climate === "cool" && plan.climate === "hill") ||
           (input.climate === "hill" && plan.climate === "cool")) score += 30;

  // Budget match — closer = higher
  const cost = Number(plan.total_cost_inr);
  if (cost <= input.budget) {
    const ratio = cost / Math.max(input.budget, 1);
    score += 20 * ratio + 10; // up to 30
  } else {
    const over = (cost - input.budget) / Math.max(input.budget, 1);
    score += Math.max(0, 20 - over * 25); // penalize overshoot
  }

  // Days match
  const dayDiff = Math.abs(plan.days_count - input.days);
  score += Math.max(0, 15 - dayDiff * 4);

  // Interest keyword overlap
  const userKeywords = input.interests.toLowerCase().split(/[\s,;]+/).filter(Boolean);
  const planKeywords = plan.interests.toLowerCase().split(/[\s,;]+/).filter(Boolean);
  const hits = userKeywords.filter((k) => planKeywords.some((p) => p.includes(k) || k.includes(p))).length;
  score += Math.min(hits * 4, 12);

  // Quality boost
  score += plan.rating * 1.5;
  score += Math.min(plan.popularity / 200, 5);

  return Math.round(score);
}

export function rankPlans<T extends ScorablePlan>(plans: T[], input: ScoreInputs): Array<T & { matchScore: number }> {
  return plans
    .map((p) => ({ ...p, matchScore: scorePlan(p, input) }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
