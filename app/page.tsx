"use client";

import { FormEvent, useState } from "react";
import { generatePrompt, GeneratorOptions, PromptArtifact } from "../lib/promptGenerator";

const defaultIdea =
  "A resilient engineer leads a small crew through a storm-lashed floating city to reignite its fading heart.";

const defaultOptions: GeneratorOptions = {
  includeVoiceover: true,
  includeDialogue: false,
  includeThumbnail: true,
  includeCaptions: false,
  includeMusic: true
};

const OPTION_LIST: Array<{ key: keyof GeneratorOptions; label: string }> = [
  {
    key: "includeVoiceover",
    label: "Voiceover script"
  },
  {
    key: "includeDialogue",
    label: "Dialogue snippet"
  },
  {
    key: "includeThumbnail",
    label: "Thumbnail / Poster prompt"
  },
  {
    key: "includeCaptions",
    label: "Captions & tags"
  },
  {
    key: "includeMusic",
    label: "Music style & sound mood"
  }
] as const;

export default function HomePage() {
  const [idea, setIdea] = useState(defaultIdea);
  const [options, setOptions] = useState<GeneratorOptions>(defaultOptions);
  const [artifact, setArtifact] = useState<PromptArtifact | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const generated = generatePrompt(idea, options);
    setArtifact(generated);
    setHasSubmitted(true);
    window.scrollTo({ top: window.innerHeight * 0.2, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen px-6 pb-24 pt-16 md:px-12 lg:px-24">
      <section className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Cinematic Promptsmith</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
            Transform any spark into a full cinematic text-to-video blueprint.
          </h1>
          <p className="mt-4 text-lg text-slate-300 md:text-xl">
            Enter a concept. Receive a scene-by-scene prompt engineered for AI video generators.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-2xl shadow-blue-950/50 backdrop-blur"
        >
          <label htmlFor="idea" className="block text-sm font-semibold uppercase tracking-wide text-slate-200">
            Concept Idea
          </label>
          <textarea
            id="idea"
            name="idea"
            required
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-slate-600 bg-slate-950/80 px-5 py-4 text-base leading-relaxed text-slate-100 outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-400/30"
            rows={5}
            placeholder="Describe the core idea, characters, and emotion you want to explore."
          />

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Optional Add-ons
            </legend>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {OPTION_LIST.map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-700/70 bg-slate-950/40 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400 focus:ring-sky-400/60"
                    checked={options[option.key as keyof GeneratorOptions]}
                    onChange={(event) =>
                      setOptions((prev) => ({
                        ...prev,
                        [option.key]: event.target.checked
                      }))
                    }
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-sky-500 px-6 py-4 text-base font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 hover:shadow-sky-400/50"
          >
            Generate Cinematic Prompt
          </button>
        </form>

        {hasSubmitted && artifact && (
          <section className="mt-16 space-y-10">
            <article className="rounded-3xl border border-slate-700/60 bg-slate-900/40 p-8 backdrop-blur">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Video Concept</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-50">{artifact.title}</h2>
                  <p className="mt-3 text-base text-slate-300">{artifact.oneLineIdea}</p>
                </div>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-950/50 px-6 py-4 text-sm uppercase tracking-wide text-slate-200">
                  <p>Mood: <span className="text-sky-200">{artifact.mood}</span></p>
                  <p>Style: <span className="text-sky-200">{artifact.style}</span></p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-700/60 bg-slate-900/40 p-8 backdrop-blur">
              <h3 className="text-2xl font-semibold text-slate-50">Scene Breakdown</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {artifact.scenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-700/60 bg-slate-950/40 p-6"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Scene {scene.id}</p>
                    <h4 className="text-lg font-semibold text-slate-100">{scene.setting}</h4>
                    <div className="space-y-2 text-sm leading-6 text-slate-300">
                      <p><span className="font-semibold text-slate-100">Camera angle:</span> {scene.cameraAngle}</p>
                      <p><span className="font-semibold text-slate-100">Camera movement:</span> {scene.cameraMovement}</p>
                      <p><span className="font-semibold text-slate-100">Character actions:</span> {scene.characterActions}</p>
                      <p><span className="font-semibold text-slate-100">Lighting:</span> {scene.lighting}</p>
                      <p><span className="font-semibold text-slate-100">Colors:</span> {scene.colors}</p>
                      <p><span className="font-semibold text-slate-100">Atmosphere:</span> {scene.atmosphere}</p>
                      <p><span className="font-semibold text-slate-100">Important objects:</span> {scene.importantObjects}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-700/60 bg-slate-900/40 p-8 backdrop-blur">
              <h3 className="text-2xl font-semibold text-slate-50">Full Text-to-Video Prompt</h3>
              <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-200">{artifact.fullPrompt}</p>
            </article>

            {Object.keys(artifact.addOns).length > 0 && (
              <article className="rounded-3xl border border-slate-700/60 bg-slate-900/40 p-8 backdrop-blur">
                <h3 className="text-2xl font-semibold text-slate-50">Add-ons</h3>
                <div className="mt-5 space-y-5 text-sm leading-7 text-slate-200">
                  {artifact.addOns.voiceover && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-sky-300">Voiceover Script</p>
                      <p className="mt-1 text-base">{artifact.addOns.voiceover}</p>
                    </div>
                  )}
                  {artifact.addOns.dialogue && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-sky-300">Dialogue</p>
                      <p className="mt-1 text-base">{artifact.addOns.dialogue}</p>
                    </div>
                  )}
                  {artifact.addOns.thumbnailPrompt && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-sky-300">Thumbnail / Poster Prompt</p>
                      <p className="mt-1 text-base">{artifact.addOns.thumbnailPrompt}</p>
                    </div>
                  )}
                  {artifact.addOns.captionsAndTags && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-sky-300">Captions & Tags</p>
                      <p className="mt-1 text-base">{artifact.addOns.captionsAndTags.join(" ")}</p>
                    </div>
                  )}
                  {artifact.addOns.musicStyle && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-sky-300">Music Style</p>
                      <p className="mt-1 text-base">{artifact.addOns.musicStyle}</p>
                    </div>
                  )}
                </div>
              </article>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
