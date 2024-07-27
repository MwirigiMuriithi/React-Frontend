"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RSC_PREFETCH_SUFFIX } from "next/dist/lib/constants";

interface ShortIdProps {
  params: {
    shortId: string;
  };
}

const VerifyEmail = ({ params }: ShortIdProps) => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
    const { shortId } = params;
  useEffect(() => {
    if (shortId) {
      const verifyEmail = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/auth/verify-email/${shortId}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const res = await response.json()

          if (res.ok) {
            setMessage(
              res.message || "Email verified successfully. Redirecting to login page..."
            );
            setTimeout(() => router.push("/login"), 3000);
          } else {
            setMessage(
              res.error || "Failed to verify email. The link may have expired. Please sign up again to get a new verification link."
            );
          }
        } catch (error) {
          setMessage("An error occurred. Please try again.");
        }
      };

      verifyEmail();
    }
  }, [shortId, router]);

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify your email
            </h1>
            <p>{message ? message : "Wait as we redirect..."}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
