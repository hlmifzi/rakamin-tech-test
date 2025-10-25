"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Button, Modal, Typography, UilUpload } from "@rakamin/ui";
import { HandLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import styles from "./TakePictureInput.module.scss";

export type PoseIndicatorStatus = "neutral" | "correct" | "wrong";

export type TakePictureInputProps = {
  label?: string;
  defaultImageSrc?: string;
  form?: { setValue?: (name: string, value: string, options?: Record<string, unknown>) => void } | null;
  name?: string;
  onCaptured?: (dataUrl: string) => void;
};

// Definisi pose jari berdasarkan landmark tangan MediaPipe
interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

const POSE_DEFINITIONS = {
  1: {
    name: "Pose 1",
    description: "Tunjukkan 1 jari (telunjuk)",
    check: (landmarks: HandLandmark[]) => {
      if (!landmarks || landmarks.length === 0) return false;
      const indexPip = landmarks[6];
      const indexTip = landmarks[8];
      const indexUp = indexTip && indexPip && indexTip.y < indexPip.y - 0.02;
      const middleUp = landmarks[12] && landmarks[10] && landmarks[12].y < landmarks[10].y - 0.02;
      const ringUp = landmarks[16] && landmarks[14] && landmarks[16].y < landmarks[14].y - 0.02;
      return !!indexUp && !middleUp && !ringUp;
    }
  },
  2: {
    name: "Pose 2",
    description: "Tunjukkan 2 jari (telunjuk + tengah)",
    check: (landmarks: HandLandmark[]) => {
      if (!landmarks || landmarks.length === 0) return false;
      const indexUp = landmarks[8] && landmarks[6] && landmarks[8].y < landmarks[6].y - 0.02;
      const middleUp = landmarks[12] && landmarks[10] && landmarks[12].y < landmarks[10].y - 0.02;
      const ringUp = landmarks[16] && landmarks[14] && landmarks[16].y < landmarks[14].y - 0.02;
      return !!indexUp && !!middleUp && !ringUp;
    }
  },
  3: {
    name: "Pose 3",
    description: "Tunjukkan 3 jari (telunjuk + tengah + manis)",
    check: (landmarks: HandLandmark[]) => {
      if (!landmarks || landmarks.length === 0) return false;
      const indexUp = landmarks[8] && landmarks[6] && landmarks[8].y < landmarks[6].y - 0.02;
      const middleUp = landmarks[12] && landmarks[10] && landmarks[12].y < landmarks[10].y - 0.02;
      const ringUp = landmarks[16] && landmarks[14] && landmarks[16].y < landmarks[14].y - 0.02;
      return !!indexUp && !!middleUp && !!ringUp;
    }
  }
};

export const TakePictureInput: React.FC<TakePictureInputProps> = ({
  label = "Photo Profile",
  defaultImageSrc = "/candidate/default-picture.webp",
  form,
  name = "photo",
  onCaptured,
}) => {
  const [open, setOpen] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [currentPose, setCurrentPose] = useState<1 | 2 | 3>(1);
  const [poseStatus, setPoseStatus] = useState<PoseIndicatorStatus>("neutral");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseLandmarkerRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const poseDetectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize MediaPipe
  useEffect(() => {
    const initializeMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm"
        );
        
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        
        poseLandmarkerRef.current = handLandmarker;
      } catch (error) {
        console.error("Failed to initialize MediaPipe:", error);
      }
    };

    initializeMediaPipe();
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Failed to start camera:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const detectPose = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !poseLandmarkerRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx || video.videoWidth === 0) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const results = poseLandmarkerRef.current.detectForVideo(video, performance.now());
      
      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];
        
        // Draw hand landmarks
        const drawingUtils = new DrawingUtils(ctx);
        drawingUtils.drawLandmarks(landmarks, { radius: () => 3 });

        // Check current finger pose
        const currentPoseDefinition = POSE_DEFINITIONS[currentPose];
        const isPoseCorrect = currentPoseDefinition.check(landmarks as unknown as HandLandmark[]);
        
        if (isPoseCorrect) {
          setPoseStatus("correct");
          
          // Start countdown if not already capturing
          if (!isCapturing && countdown === null) {
            setIsCapturing(true);
            let count = 3;
            setCountdown(count);
            
            const countdownInterval = setInterval(() => {
              count--;
              setCountdown(count);
              
              if (count === 0) {
                clearInterval(countdownInterval);
                capturePhoto();
              }
            }, 1000);
          }
        } else {
          setPoseStatus("wrong");
          if (countdown !== null) {
            setCountdown(null);
            setIsCapturing(false);
          }
        }
      } else {
        setPoseStatus("neutral");
        if (countdown !== null) {
          setCountdown(null);
          setIsCapturing(false);
        }
      }
    } catch (error) {
      console.error("Pose detection error:", error);
    }

    animationFrameRef.current = requestAnimationFrame(detectPose);
  }, [currentPose, countdown, isCapturing]);

  const capturePhoto = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    
    if (currentPose < 3) {
      // Move to next pose
      setCurrentPose((prev) => (prev + 1) as 1 | 2 | 3);
      setCountdown(null);
      setIsCapturing(false);
      setPoseStatus("neutral");
    } else {
      // All poses completed, capture final photo
      setCaptured(dataUrl);
      if (form?.setValue && name) {
        form.setValue(name, dataUrl);
      }
      if (onCaptured) {
        onCaptured(dataUrl);
      }
      handleClose();
    }
  }, [currentPose, form, name, onCaptured]);

  const handleOpen = () => {
    setOpen(true);
    setCurrentPose(1);
    setPoseStatus("neutral");
    setCountdown(null);
    setIsCapturing(false);
    startCamera();
  };

  const handleClose = () => {
    setOpen(false);
    stopCamera();
    setCurrentPose(1);
    setPoseStatus("neutral");
    setCountdown(null);
    setIsCapturing(false);
  };

  const handleRetake = () => {
    setCurrentPose(1);
    setPoseStatus("neutral");
    setCountdown(null);
    setIsCapturing(false);
  };

  // Start pose detection when video is ready
  useEffect(() => {
    if (open && videoRef.current) {
      const video = videoRef.current;
      const handleLoadedData = () => {
        detectPose();
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, [open, detectPose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (poseDetectionTimeoutRef.current) {
        clearTimeout(poseDetectionTimeoutRef.current);
      }
    };
  }, [stopCamera]);

  const currentPoseDefinition = POSE_DEFINITIONS[currentPose];
  const statusColor = poseStatus === "correct" ? "text-green-500" : 
                     poseStatus === "wrong" ? "text-red-500" : "text-gray-500";

  return (
    <div className={styles.container}>
      {label && <Typography className={styles.label} variant="TextSBold">{label}</Typography>}
      <div className={[styles.preview, captured ? styles.previewFilled : styles.previewEmpty].filter(Boolean).join(" ")}>
        {captured ? (
          <Image src={captured} alt="captured" width={128} height={128} />
        ) : (
          <Image alt="default-picture" src={defaultImageSrc} width={128} height={128} />
        )}
      </div>
      <Button className={styles.uploadBtn} onClick={handleOpen}>
        <UilUpload size={16} />
        <Typography variant="TextMBold">Take a Picture</Typography>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        title="Pose Detection Capture"
        subtitle={`Follow the poses in order. Current: ${currentPoseDefinition.name}`}
        footer={
          <div className={styles.actions}>
            <Button variant="tertiary" onClick={handleClose}>Cancel</Button>
            <Button variant="secondary" onClick={handleRetake}>Restart</Button>
          </div>
        }
      >
        <div className={styles.modalContent}>
          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              className={styles.video}
              autoPlay
              muted
              playsInline
            />
            <canvas
              ref={canvasRef}
              className={styles.canvas}
            />
            
            {/* Pose indicator overlay */}
            <div className={styles.poseIndicator}>
              <div className={[styles.poseStatus, styles[poseStatus]].join(" ")}>
                <Typography variant="TextLBold">
                  {currentPoseDefinition.name}
                </Typography>
                <Typography variant="TextMRegular">
                  {currentPoseDefinition.description}
                </Typography>
                {poseStatus === "correct" && countdown !== null && (
                  <Typography variant="TextXLBold">
                    {countdown > 0 ? `Capturing in ${countdown}...` : "📸 Capturing..."}
                  </Typography>
                )}
                {poseStatus === "wrong" && (
                  <Typography variant="TextSRegular">
                    ❌ Adjust your pose and try again
                  </Typography>
                )}
                {poseStatus === "neutral" && (
                  <Typography variant="TextSRegular">
                    👋 Position yourself and follow the instruction
                  </Typography>
                )}
              </div>
            </div>
          </div>
          
          {/* Pose sequence indicator */}
          <div className={styles.poseSequence}>
            {[1, 2, 3].map((poseNum) => (
              <div
                key={poseNum}
                className={[
                  styles.poseStep,
                  currentPose === poseNum ? styles.active : "",
                  currentPose > poseNum ? styles.completed : ""
                ].filter(Boolean).join(" ")}
              >
                <Typography variant="TextSBold">
                  {POSE_DEFINITIONS[poseNum as 1 | 2 | 3].name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TakePictureInput;