"use client";

// components/quiz-generator.tsx
//
// Styled with the Identity Kit:
//   teal #24423F · near-black #14181A · off-white #F7F9FA · sage #7FA39A

import { useState } from "react";
import type { Quiz } from "@/lib/ai/quiz-config";

type Status = "idle" | "loading" | "error";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  // answers: questionId -> selected optionId
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;

    setStatus("loading");
    setErrorMsg("");
    setQuiz(null);
    setAnswers({});
    setRevealed({});

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, questionCount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setQuiz(data as Quiz);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function selectAnswer(questionId: string, optionId: string) {
    if (revealed[questionId]) return; // already answered, don't allow changing
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  }

  function resetQuiz() {
    setQuiz(null);
    setAnswers({});
    setRevealed({});
    setTopic("");
  }

  const score = quiz
    ? quiz.questions.filter((q) => answers[q.id] === q.correctOptionId).length
    : 0;
  const allAnswered = quiz ? quiz.questions.every((q) => revealed[q.id]) : false;

  return (
    <div
      className="w-full max-w-2xl mx-auto px-4 py-8"
      style={{ fontFamily: "Inter, sans-serif", color: "#F7F9FA" }}
    >
      <h1
        className="text-sm tracking-wide mb-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        sara. / study quiz
      </h1>

      {!quiz && (
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 opacity-80">
              Topic or paste your notes
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={6}
              placeholder="e.g. Binary search trees, or paste your lecture notes here..."
              className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
              style={{ backgroundColor: "#1E2422", color: "#F7F9FA" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm opacity-80">Questions:</label>
            <input
              type="number"
              min={1}
              max={10}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-16 rounded-lg px-2 py-1 text-sm outline-none"
              style={{ backgroundColor: "#1E2422", color: "#F7F9FA" }}
            />
          </div>

          <button
            type="submit"
            disabled={!topic.trim() || status === "loading"}
            className="rounded-full px-5 py-2 text-sm font-medium disabled:opacity-40"
            style={{ backgroundColor: "#24423F", color: "#F7F9FA" }}
          >
            {status === "loading" ? "Generating..." : "Generate quiz"}
          </button>

          {status === "error" && (
            <p className="text-sm" style={{ color: "#e08080" }}>
              {errorMsg}
            </p>
          )}
        </form>
      )}

      {quiz && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">{quiz.title}</h2>
            <button
              onClick={resetQuiz}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#1E2422", color: "#F7F9FA" }}
            >
              New quiz
            </button>
          </div>

          {quiz.questions.map((q, i) => {
            const selected = answers[q.id];
            const isRevealed = revealed[q.id];

            return (
              <div
                key={q.id}
                className="rounded-xl p-4 space-y-3"
                style={{ backgroundColor: "#1E2422" }}
              >
                <p className="text-sm font-medium">
                  {i + 1}. {q.prompt}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.id;
                    const isCorrect = opt.id === q.correctOptionId;

                    let bg = "#24423F";
                    if (isRevealed) {
                      if (isCorrect) bg = "#3a6b52";
                      else if (isSelected && !isCorrect) bg = "#6b3a3a";
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => selectAnswer(q.id, opt.id)}
                        disabled={isRevealed}
                        className="w-full text-left rounded-lg px-3 py-2 text-sm transition-colors"
                        style={{ backgroundColor: bg, color: "#F7F9FA" }}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {isRevealed && (
                  <p className="text-xs opacity-80 pt-1">{q.explanation}</p>
                )}
              </div>
            );
          })}

          {allAnswered && (
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: "#24423F" }}
            >
              <p className="text-sm font-medium">
                Score: {score} / {quiz.questions.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}