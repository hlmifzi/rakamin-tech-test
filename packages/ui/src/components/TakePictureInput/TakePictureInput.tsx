"use client";
import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import { UilUpload, UilAngleRight } from "../../icons";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

import styles from "./TakePictureInput.module.scss";

export type PoseIndicatorStatus = "neutral" | "correct" | "wrong";

interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

// Canvas helpers for styled detection box and label tag
const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
};

const drawLabelTag = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string
) => {
  ctx.save();
  ctx.font = "bold 22px Nunito, sans-serif";
  const metrics = ctx.measureText(text);
  const paddingX = 12;
  const paddingY = 8;
  const labelW = metrics.width + paddingX * 2;
  const labelH = 30; // approximate height for 22px font
  const radius = 8;

  // Ensure label stays in canvas bounds
  const clampedX = Math.max(8, Math.min(x, ctx.canvas.width - labelW - 8));
  const clampedY = Math.max(8, Math.min(y, ctx.canvas.height - labelH - 8));

  // Draw label background
  ctx.fillStyle = color;
  drawRoundedRect(ctx, clampedX, clampedY, labelW, labelH, radius);
  ctx.fill();

  // Hapus tab aksen di sisi kiri agar label bersih

  // Draw label text
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.fillText(text, clampedX + paddingX, clampedY + labelH / 2);
  ctx.restore();
};
// Tambahkan util untuk cek orientasi telapak tangan
const isPalmFacingCamera = (lm: HandLandmark[]): boolean => {
  if (!lm || lm.length < 18) return false;
  // Gunakan tiga titik di pangkal telapak: wrist(0), index MCP(5), pinky MCP(17)
  const v1 = {
    x: lm[5].x - lm[0].x,
    y: lm[5].y - lm[0].y,
    z: lm[5].z - lm[0].z,
  };
  const v2 = {
    x: lm[17].x - lm[0].x,
    y: lm[17].y - lm[0].y,
    z: lm[17].z - lm[0].z,
  };
  const normal = {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
  // Asumsi kamera menghadap sumbu -Z, telapak menghadap kamera jika normal.z < 0
  return normal.z < 0;
};

const POSE_DEFINITIONS = {
  1: {
    name: "Pose 1",
    check: (lm: HandLandmark[]) => {
      if (!lm.length) return false;
      const indexUp = lm[8].y < lm[6].y - 0.02;
      const middleUp = lm[12].y < lm[10].y - 0.02;
      const ringUp = lm[16].y < lm[14].y - 0.02;
      return indexUp && !middleUp && !ringUp;
    },
  },
  2: {
    name: "Pose 2",
    check: (lm: HandLandmark[]) => {
      if (!lm.length) return false;
      const indexUp = lm[8].y < lm[6].y - 0.02;
      const middleUp = lm[12].y < lm[10].y - 0.02;
      const ringUp = lm[16].y < lm[14].y - 0.02;
      return indexUp && middleUp && !ringUp;
    },
  },
  3: {
    name: "Pose 3",
    check: (lm: HandLandmark[]) => {
      if (!lm.length) return false;
      const indexUp = lm[8].y < lm[6].y - 0.02;
      const middleUp = lm[12].y < lm[10].y - 0.02;
      const ringUp = lm[16].y < lm[14].y - 0.02;
      return indexUp && middleUp && ringUp;
    },
  },
};

// urutan: 3 → 2 → 1
const POSE_ORDER: (1 | 2 | 3)[] = [3, 2, 1];

export const TakePictureInput = ({
  label = "Photo Profile",
  defaultImageSrc = "/candidate/default-picture.webp",
  form,
  name = "photo",
  onCaptured,
  descriptionImages = [
    "/component/takePictureInput/Open-Camera-3.webp",
    "/component/takePictureInput/Open-Camera-2.webp",
    "/component/takePictureInput/Open-Camera-1.webp",
  ],
  arrowIcon,
}: any) => {
  const [open, setOpen] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);

  const [progressIdx, setProgressIdx] = useState(0);
  const currentPose: 1 | 2 | 3 = POSE_ORDER[progressIdx];
  const [poseStatus, setPoseStatus] = useState<PoseIndicatorStatus>("neutral");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stage, setStage] = useState<"pose" | "countdown" | "preview">("pose");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseLandmarkerRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // guard
  const poseJustDetectedRef = useRef(false);
  const countdownStartedRef = useRef(false);
  
  // NEW: refs to avoid stale closures in requestAnimationFrame loop
  const progressIdxRef = useRef(progressIdx);
  const stageRef = useRef<"pose" | "countdown" | "preview">(stage);
  const capturePhotoRef = useRef<() => void>(() => {});
  
  // NEW: keep recent correct rect to flash green briefly
  const lastCorrectRectRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const lastCorrectTsRef = useRef<number>(0);
  // NEW: require 1s hold before advancing to next pose
  const correctHoldTsRef = useRef<number | null>(null);
  
  // Countdown interval ref
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => { progressIdxRef.current = progressIdx; }, [progressIdx]);
  useEffect(() => { stageRef.current = stage; }, [stage]);

  // init mediapipe
  useEffect(() => {
    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm"
      );
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });
      poseLandmarkerRef.current = handLandmarker;
    };
    init();
  }, []);

  const startCamera = useCallback(async () => {
    try {
      // Stop camera yang mungkin masih berjalan
      stopCamera();
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error("Error starting camera:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    // Clear countdown interval
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Stop stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.8);
    stopCamera();
    setCaptured(dataUrl);
    setStage("preview");
    countdownStartedRef.current = false;
    if (onCaptured) onCaptured(dataUrl);
    if (form?.setValue && name) form.setValue(name, dataUrl);
  }, [form, name, onCaptured, stopCamera]);

  // sync capturePhoto ref after its declaration to avoid linter error
  useEffect(() => { capturePhotoRef.current = capturePhoto; }, [capturePhoto]);

  const detectPose = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const landmarker = poseLandmarkerRef.current;
    
    if (!video || !canvas || !ctx || !landmarker || 
        video.readyState < 2 || 
        video.videoWidth === 0 || 
        video.videoHeight === 0) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Freeze radar box after last pose; skip detection during countdown/preview
    if (stageRef.current !== "pose") {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    try {
      // Tambahan pengecekan sebelum detectForVideo
      if (video.currentTime === 0) {
        animationFrameRef.current = requestAnimationFrame(detectPose);
        return;
      }
      
      const results = landmarker.detectForVideo(video, performance.now());
      if (results.landmarks?.length) {
        const lm = results.landmarks[0] as HandLandmark[];
        const world = (results.worldLandmarks && results.worldLandmarks[0]) as HandLandmark[] | undefined;

        const xMin = Math.min(...lm.map((p) => p.x)) * canvas.width;
        const xMax = Math.max(...lm.map((p) => p.x)) * canvas.width;
        const yMin = Math.min(...lm.map((p) => p.y)) * canvas.height;
        const yMax = Math.max(...lm.map((p) => p.y)) * canvas.height;
        const width = xMax - xMin;
        const height = yMax - yMin;

        const rectX = xMin - 30;
        const rectY = yMin - 30;
        const rectW = width + 60;
        const rectH = height + 60;

        const currentPoseLocal: 1 | 2 | 3 = POSE_ORDER[progressIdxRef.current];
        const baseCorrect = POSE_DEFINITIONS[currentPoseLocal]?.check(lm) || false;
        // Gate dengan orientasi telapak menghadap kamera
        const palmFacing = isPalmFacingCamera(world ?? lm);
        const isCorrect = baseCorrect && palmFacing;
        setPoseStatus(isCorrect ? "correct" : "wrong");

        if (isCorrect) {
          lastCorrectRectRef.current = { x: rectX, y: rectY, width: rectW, height: rectH };
          lastCorrectTsRef.current = performance.now();
        }

        const borderColor = isCorrect ? "#22c55e" : "#ef4444";
        ctx.lineWidth = 6;
        ctx.strokeStyle = borderColor;
        ctx.lineJoin = "miter"; // sudut tajam, tanpa radius
        ctx.strokeRect(rectX, rectY, rectW, rectH);

        // Label kiri-atas dengan margin-bottom negatif ~1rem agar sedikit overlap
        const labelText = isCorrect ? "Detected" : "Undetected";
        const approxLabelH = 30;
        const labelY = rectY - approxLabelH + 16; // -1rem overlap
        drawLabelTag(ctx, labelText, rectX + 12, labelY, borderColor);

        const now = performance.now();
        if (!isCorrect && lastCorrectRectRef.current && now - lastCorrectTsRef.current < 160) {
          const r = lastCorrectRectRef.current;
          ctx.lineWidth = 5;
          ctx.strokeStyle = "#22c55e";
          ctx.strokeRect(r.x, r.y, r.width, r.height);
        }

        // Hapus tulisan "Pose X" di kanvas; urutan pose sudah dijelaskan di bawah

        if (stageRef.current === "pose") {
          const nowTs = performance.now();
          if (isCorrect) {
            if (correctHoldTsRef.current == null) {
              correctHoldTsRef.current = nowTs;
            }
            const elapsed = nowTs - (correctHoldTsRef.current ?? nowTs);
            if (elapsed >= 1000) {
              correctHoldTsRef.current = null;
              const nextIdx = progressIdxRef.current + 1;
              if (nextIdx < POSE_ORDER.length) {
                setProgressIdx((prev) => {
                  const next = prev + 1;
                  progressIdxRef.current = next;
                  return next;
                });
                setPoseStatus("neutral");
              } else {
                // Final pose completed: mark all steps as completed for UI (green borders)
                setProgressIdx(() => {
                  const next = descriptionImages.length;
                  progressIdxRef.current = next;
                  return next;
                });
                setStage("countdown");
                stageRef.current = "countdown";
                let count = 3;
                setCountdown(count);
                countdownStartedRef.current = true;
                
                // Clear existing interval
                if (countdownIntervalRef.current) {
                  clearInterval(countdownIntervalRef.current);
                }
                
                countdownIntervalRef.current = setInterval(() => {
                  count--;
                  setCountdown(count);
                  if (count === 0) {
                    if (countdownIntervalRef.current) {
                      clearInterval(countdownIntervalRef.current);
                      countdownIntervalRef.current = null;
                    }
                    capturePhotoRef.current();
                  }
                }, 1000);
              }
            }
          } else {
            correctHoldTsRef.current = null;
          }
        }
      } else {
        // No hand detected
        setPoseStatus("neutral");
        lastCorrectRectRef.current = null;
        correctHoldTsRef.current = null;
      }
    } catch (e) {
      console.error(e);
    }

    animationFrameRef.current = requestAnimationFrame(detectPose);
  }, []);

  // camera lifecycle
  useEffect(() => {
    if (open) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [open, startCamera, stopCamera]);

  useEffect(() => {
    if (open && videoRef.current) {
      const v = videoRef.current;
      const startDetection = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        detectPose();
      };
      
      v.addEventListener("loadeddata", startDetection);
      return () => {
        v.removeEventListener("loadeddata", startDetection);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    }
  }, [open, detectPose]);

  // Fungsi reset flow pose agar mulai dari Pose 3 (progressIdx=0)
  const resetPoseFlow = useCallback((opts?: { preserveCaptured?: boolean }) => {
    // Clear intervals
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    
    // Clear animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Reset semua state
    if (!opts?.preserveCaptured) {
      setCaptured(null);
    }
    setStage("pose");
    setProgressIdx(0);
    setPoseStatus("neutral");
    setCountdown(null);
    
    // Reset semua ref
    stageRef.current = "pose";
    progressIdxRef.current = 0;
    poseJustDetectedRef.current = false;
    countdownStartedRef.current = false;
    correctHoldTsRef.current = null;
    lastCorrectRectRef.current = null;
    lastCorrectTsRef.current = 0;
  }, []);

  const handleOpen = () => {
    setOpen(true);
    resetPoseFlow();
  };

  const handleClose = () => {
    stopCamera();
    setOpen(false);
    resetPoseFlow(); // Reset juga saat modal ditutup
  };

  const handleSubmit = useCallback(() => {
    // Kirim captured image ke form dan callback
    if (captured) {
      if (onCaptured) onCaptured(captured);
      if (form?.setValue && name) form.setValue(name, captured);
    }
    // Tutup modal setelah submit namun pertahankan preview gambar
    stopCamera();
    setOpen(false);
    resetPoseFlow({ preserveCaptured: true });
  }, [captured, onCaptured, form, name, stopCamera, resetPoseFlow]);

  const handleRetake = useCallback(async () => {
    // Reset everything first
    resetPoseFlow();
    
    // Tunggu sebentar untuk memastikan reset selesai
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Start camera lagi
    await startCamera();
    
    // Tunggu kamera siap lalu start detection
    if (videoRef.current) {
      const startDetection = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        detectPose();
      };
      
      if (videoRef.current.readyState >= 2) {
        startDetection();
      } else {
        videoRef.current.addEventListener('loadeddata', startDetection, { once: true });
      }
    }
  }, [resetPoseFlow, startCamera, detectPose]);

  return (
    <div className={styles.container}>
      {label && <Typography className={styles.label} variant="TextSBold">{label}</Typography>}

      <div className={`${styles.preview} ${captured ? styles.previewFilled : styles.previewEmpty}`}>
        <img src={captured || defaultImageSrc} alt="photo" width={128} height={128} />
      </div>

      <Button className={styles.uploadBtn} onClick={handleOpen}>
        <UilUpload />
        <Typography variant="TextMBold">Take a Picture</Typography>
      </Button>

      <Modal 
        open={open} 
        onClose={handleClose} 
        className={styles.modal}
        title="Raise Your Hand to Capture"
        subtitle="We'll take the photo once your hand pose is detected.">
        <div className={styles.modalContent}>
          {stage !== "preview" ? (
            <div className={styles.videoContainer}>
              <video ref={videoRef} className={styles.video} autoPlay muted playsInline />
              <canvas ref={canvasRef} className={styles.canvas} />
              {stage === "countdown" && countdown !== null && (
                <>
                  <Typography variant="TextMBold" className={styles.countdownText}>
                    Capturing photo in
                  </Typography>
                  <div className={styles.countdownOverlay}>
                    {countdown > 0 ? countdown : "📸"}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.previewResult}>
              <img src={captured as string} alt="captured"
                className="rounded-lg border border-neutral-300" />
            </div>
          )}

          {stage !== "preview" ? (
            <>
              <Typography variant="TextSRegular">
                Follow the hand poses in the order shown below. The system will automatically capture the image once the final pose is detected.
              </Typography>

              <div className={styles.descriptionContainer}>
                {descriptionImages.map((src: string, idx: number) => (
                  <Fragment key={`desc-${idx}`}>
                    <img
                      src={src}
                      alt={`open camera ${idx + 1}`}
                      width={58}
                      height={58}
                      className={`${styles.poseImage} ${idx < progressIdx ? styles.completed : ""}`}
                    />
                    {idx < descriptionImages.length - 1
                      ? (arrowIcon ?? <UilAngleRight className={styles.arrowLeft} />)
                      : null}
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.actions}>
              <Button variant="default" onClick={handleRetake}>
                <Typography variant="TextMBold">Retake photo</Typography>
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                <Typography variant="TextMBold">Submit</Typography>
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TakePictureInput;