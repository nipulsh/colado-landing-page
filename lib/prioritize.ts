/**
 * Fake prioritization for the landing-page LiveDemo.
 *
 * Mirrors Colado's editorial specimen: each task gets a bucket, a priority
 * label (NOW / NEXT / THEN / LATER / ADMIN), a short mono-caps tag line
 * (e.g. "time-sensitive · 2 min · unblocks thread") and a longer prose reason.
 *
 * Rules (in order):
 *   1. investor / pitch / deadline / reply / raise / ship / demo day   -> top
 *   2. mom / dad / family / friend / birthday                          -> mid
 *   3. grocer / flight / buy / book / pay / bill / renew / laundry     -> low
 *   4. everything else                                                 -> mid (fallback)
 *
 * The returned list is sorted by (bucket asc, insertion asc) and each item
 * carries the label & tags we surface in the specimen card.
 */

export type Bucket = "top" | "mid" | "low";

export type PriorityLabel = "NOW" | "NEXT" | "THEN" | "LATER" | "ADMIN";

export type RawTask = {
  id: string;
  text: string;
};

export type PrioritizedTask = RawTask & {
  bucket: Bucket;
  label: PriorityLabel;
  tags: string;
  reason: string;
};

const BUCKET_ORDER: Record<Bucket, number> = { top: 0, mid: 1, low: 2 };

type Classification = { bucket: Bucket; tags: string; reason: string };

const RULES: Array<{
  keywords: RegExp;
  classify: (text: string) => Classification;
}> = [
  {
    keywords: /\b(investor|pitch|deck|deadline|reply|raise|demo day|ship)\b/i,
    classify: (text) => {
      if (/investor|reply/i.test(text)) {
        return {
          bucket: "top",
          tags: "time-sensitive · 2 min · unblocks thread",
          reason: "A short reply unblocks a longer flow.",
        };
      }
      if (/pitch|deck/i.test(text)) {
        return {
          bucket: "top",
          tags: "deep focus · 90 min · high impact",
          reason: "Upstream of every investor conversation this week.",
        };
      }
      return {
        bucket: "top",
        tags: "deadline-driven · high impact",
        reason: "Everything else waits on this.",
      };
    },
  },
  {
    keywords: /\b(pr|review|team|standup|1:1|one on one|unblock)\b/i,
    classify: () => ({
      bucket: "top",
      tags: "15 min · unblocks the team",
      reason: "A short review stops someone else from idling.",
    }),
  },
  {
    keywords: /\b(call mom|mom|dad|family|birthday|wish|friend|parent)\b/i,
    classify: () => ({
      bucket: "mid",
      tags: "relationship · important, not urgent",
      reason: "Not urgent, but you'll regret skipping.",
    }),
  },
  {
    keywords: /\b(design|lead|meeting|reply|respond)\b/i,
    classify: () => ({
      bucket: "mid",
      tags: "can wait 24 hours",
      reason: "Same thread — keep it warm.",
    }),
  },
  {
    keywords: /\b(grocer|flight|buy|book|order|pay|bill|laundry|domain|renew)\b/i,
    classify: (text) => {
      if (/flight|book/i.test(text)) {
        return {
          bucket: "low",
          tags: "admin · schedule this evening",
          reason: "Admin — batch it with other errands.",
        };
      }
      if (/renew|domain|bill|pay/i.test(text)) {
        return {
          bucket: "low",
          tags: "admin · batch with others",
          reason: "Batch these; don't let them interrupt deep work.",
        };
      }
      return {
        bucket: "low",
        tags: "admin · this week",
        reason: "Don't let admin interrupt deep work.",
      };
    },
  },
];

function classify(text: string): Classification {
  for (const rule of RULES) {
    if (rule.keywords.test(text)) return rule.classify(text);
  }
  return {
    bucket: "mid",
    tags: "worth doing · later this week",
    reason: "Slot it after the high-leverage work.",
  };
}

/**
 * Assign a priority label based on the task's ranked position and bucket.
 * - The #1 task is always NOW.
 * - Next "top"-bucket task is NEXT.
 * - Remaining top tasks slot into THEN.
 * - Mid bucket → LATER (relationships / context-sensitive).
 * - Low bucket → ADMIN.
 */
function assignLabel(bucket: Bucket, index: number, topIndex: number): PriorityLabel {
  if (index === 0) return "NOW";
  if (bucket === "top") return topIndex === 1 ? "NEXT" : "THEN";
  if (bucket === "mid") return "LATER";
  return "ADMIN";
}

export function prioritize(tasks: RawTask[]): PrioritizedTask[] {
  const tagged = tasks.map((t, i) => ({
    ...t,
    ...classify(t.text),
    _idx: i,
  }));

  tagged.sort((a, b) => {
    const bucketDiff = BUCKET_ORDER[a.bucket] - BUCKET_ORDER[b.bucket];
    if (bucketDiff !== 0) return bucketDiff;
    return a._idx - b._idx;
  });

  let topIndex = 0;
  return tagged.map((t, i) => {
    const { _idx: _unused, ...rest } = t;
    void _unused;
    const label = assignLabel(t.bucket, i, topIndex);
    if (t.bucket === "top") topIndex += 1;
    return { ...rest, label };
  });
}

export function parseTaskInput(input: string): RawTask[] {
  return input
    .split(/[,;\n]/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text, i) => ({ id: `t-${Date.now()}-${i}`, text }));
}
