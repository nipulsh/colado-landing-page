"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(
  () => import("@/components/ThreeScene").then((m) => m.ThreeScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[520px] w-full bg-[#1A1B15] md:h-[620px]"
        aria-hidden
      />
    ),
  }
);

type Props = {
  modelUrl?: string;
};

export function ThreeSceneLoader(props: Props) {
  return <ThreeScene {...props} />;
}
