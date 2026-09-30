"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="section">
      <div className="wrap">
        <h1 className="t-h1">Something went wrong on our side.</h1>
        <p className="t-lead measure mt-4 text-ash">Nothing you did caused this. Please try again in a moment.</p>
        <div className="mt-10">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
