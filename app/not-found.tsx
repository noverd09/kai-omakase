import { Button, TextLink } from "@/components/ui/Button";
import { CounterLine } from "@/components/ui/CounterLine";

export default function NotFound() {
  return (
    <div className="section">
      <div className="wrap">
        <p className="t-kanji text-5xl text-tokiwa" aria-hidden="true">
          回
        </p>
        <h1 className="t-h1 mt-6">This page isn&rsquo;t on the menu.</h1>
        <p className="t-lead measure mt-4 text-ash">The page you were looking for has moved, or never existed. The counter is still open.</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
          <Button href="/">Back to home</Button>
          <TextLink href="/menu">View the menu</TextLink>
        </div>
        <CounterLine className="mt-24" />
      </div>
    </div>
  );
}
