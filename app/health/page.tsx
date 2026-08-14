type RepoData = {
  full_name: string;
  default_branch: string;
  updated_at: string;
  open_issues_count: number;
};

async function getRepoStatus(): Promise<RepoData | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/haidersara/flyrank-frontend-capstone",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Server Component — fetches live data at request time, no client JS needed.
export default async function Health() {
  const repo = await getRepoStatus();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 sm:px-8">
      <h1 className="font-mono text-3xl font-bold text-main">
        Health check
      </h1>
      {repo ? (
        <div className="rounded-md border border-main/10 bg-white p-6 font-mono text-sm">
          <p className="text-accent">Status: ok</p>
          <dl className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between gap-4">
              <dt className="text-text/60">repo</dt>
              <dd>{repo.full_name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text/60">default branch</dt>
              <dd>{repo.default_branch}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text/60">open issues</dt>
              <dd>{repo.open_issues_count}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text/60">last updated</dt>
              <dd>{new Date(repo.updated_at).toISOString()}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="font-mono text-sm text-red-700">
          Status: fetch failed — GitHub API unreachable.
        </p>
      )}
    </div>
  );
}
