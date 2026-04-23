"use client";

/**
 * AutoVideo — Fully automated, looping, responsive video player.
 *
 * Sound strategy:
 *   Browsers block autoplay WITH sound. This component uses a two-phase
 *   approach:
 *     Phase 1 — Video starts muted immediately (guaranteed by all browsers)
 *     Phase 2 — On the FIRST user interaction (click, tap, scroll, keydown),
 *               the video is unmuted. This typically happens within 1–3
 *               seconds and feels seamless to the user.
 *
 *   Set `enableSound={true}` (default) to use this behaviour.
 *   Set `enableSound={false}` for a permanently muted background video.
 *
 * Other features:
 *   • Hides all native browser controls
 *   • Loops continuously — restarts from 0:00 on each cycle
 *   • Resets to the beginning on page refresh / component remount
 *   • Responsive — fills its container and scales with the viewport
 *   • Cross-browser: Chrome, Firefox, Safari, Edge
 *   • Error handling with optional fallback UI
 *
 * Usage:
 *   <AutoVideo src="/videos/hero.mp4" />
 *   <AutoVideo src="/videos/hero.mp4" enableSound={false} />
 *   <AutoVideo src="/videos/hero.mp4" poster="/img/poster.jpg" aspectRatio="4/3" />
 *
 * To customise the video source, change the `src` prop to any local
 * path (relative to /public) or an absolute URL.
 */

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type CSSProperties,
} from "react";

/* ── Props ───────────────────────────────────────────────────────── */

interface AutoVideoProps {
  /** Path to the video file (relative to /public or an absolute URL). */
  src: string;
  /** Optional poster image shown before playback starts. */
  poster?: string;
  /** CSS aspect-ratio value, e.g. "16/9" (default) or "4/3". */
  aspectRatio?: string;
  /**
   * Enable sound on first user interaction.
   *
   * When true (default), the video starts muted to satisfy browser
   * autoplay policies, then unmutes as soon as the user interacts
   * with the page (click, tap, scroll, or keypress).
   *
   * When false, the video stays permanently muted (background mode).
   */
  enableSound?: boolean;
  /** Extra CSS class names for the outer container. */
  className?: string;
  /** Extra inline styles for the outer container. */
  style?: CSSProperties;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** Called when an unrecoverable playback error occurs. */
  onError?: (error: Error) => void;
}

/* ── Component ───────────────────────────────────────────────────── */

export function AutoVideo({
  src,
  poster,
  aspectRatio = "16/9",
  enableSound = true,
  className = "",
  style,
  ariaLabel = "Background video",
  onError,
}: AutoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const unmutedRef = useRef(false);

  /* ── Phase 1: Reset & autoplay (muted) on mount ──────────────── */
  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    // Always reset to the beginning (handles page refresh / remount)
    video.currentTime = 0;
    video.muted = true; // Phase 1: always start muted
    unmutedRef.current = false;

    try {
      await video.play();
    } catch (err) {
      console.warn("[AutoVideo] Autoplay failed:", err);
      setHasError(true);
      onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  }, [onError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure attributes are set (SSR hydration safety)
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    // Start playback (muted)
    startPlayback();

    // Resume on tab return
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, [src, startPlayback]);

  /* ── Phase 2: Unmute on first user interaction ───────────────── */
  useEffect(() => {
    if (!enableSound) return;

    const video = videoRef.current;
    if (!video) return;

    /**
     * The moment the user does ANYTHING on the page (click, tap,
     * scroll, keypress), we unmute. Browsers treat this as a valid
     * "user gesture" and allow sound.
     *
     * This fires once and then removes all listeners.
     */
    const unmute = () => {
      if (unmutedRef.current) return;
      unmutedRef.current = true;

      video.muted = false;

      // Some browsers (Safari) need a fresh play() call after unmuting
      if (video.paused) {
        video.play().catch(() => {
          // If play-with-sound is still blocked, fall back to muted
          video.muted = true;
          video.play().catch(() => {});
        });
      }

      // Clean up — only need to do this once
      cleanup();
    };

    const events: (keyof WindowEventMap)[] = [
      "click",
      "touchstart",
      "scroll",
      "keydown",
      "pointerdown",
    ];

    for (const evt of events) {
      window.addEventListener(evt, unmute, { once: false, passive: true });
    }

    const cleanup = () => {
      for (const evt of events) {
        window.removeEventListener(evt, unmute);
      }
    };

    return cleanup;
  }, [enableSound, src]);

  /* ── Error handler ───────────────────────────────────────────── */
  const handleVideoError = () => {
    setHasError(true);
    onError?.(new Error(`Failed to load video: ${src}`));
  };

  /* ── Render ───────────────────────────────────────────────────── */
  if (hasError) {
    return (
      <div
        className={`auto-video auto-video--error ${className}`}
        style={{ aspectRatio, ...style }}
        role="img"
        aria-label={`${ariaLabel} (failed to load)`}
      >
        <p style={{ margin: 0, opacity: 0.5, fontSize: 14 }}>
          Video unavailable
        </p>
      </div>
    );
  }

  return (
    <div
      className={`auto-video ${className}`}
      style={{ aspectRatio, ...style }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={false}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        aria-label={ariaLabel}
        onError={handleVideoError}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        .auto-video {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: inherit;
        }
        .auto-video--error {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #888;
        }
        .auto-video video::-webkit-media-controls {
          display: none !important;
        }
        .auto-video video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        .auto-video video::-webkit-media-controls-panel {
          display: none !important;
        }
        .auto-video video::-internal-media-controls-download-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
