import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { shortId } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/auth/verify-email/${shortId}/`,
          {
            method: "GET",
          }
        );

        if (response.status === 200 | 202 | 201) {
          setMessage(
            "Email verified successfully. Redirecting to login page..."
          );
          setTimeout(() => navigate("/login"), 5000); // Redirect after 5 seconds
        } else {
          const data = await response.json();
          setMessage(data.error || "Failed to verify email. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    if (shortId) {
      verifyEmail();
    }
  }, [shortId, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify your email
            </h1>
            {message ? (
              <p>{message}</p>
            ) : (
              <p>A verification email has been sent to your email address.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
