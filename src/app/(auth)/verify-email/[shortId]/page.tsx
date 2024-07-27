import VerifyEmail from '@/pages/ClientVerifyEmail'
import React from 'react'

interface ShortIdProps {
  params: {
    shortId: string;
  };
}

export async function generateStaticParams() {
    const response = await fetch(`http://127.0.0.1:8000/auth/get-short-ids/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch short IDs");
    }
  
    const { short_ids } = await response.json();
    return short_ids.map((shortId: string) => ({ shortId }));
}

const Page = ({params}: ShortIdProps) => {
  return <VerifyEmail params={params} />
}

export default Page
