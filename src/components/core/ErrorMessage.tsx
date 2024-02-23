import { Skull } from 'lucide-react';

export default function ErrorMessage({ message = 'Something went wrong.', resource }: ErrorMessageProps): JSX.Element {
  return (
    <div className="flex items-start gap-2 py-4 text-sm text-red-500 sm:text-base">
      <div className="basis-6">
        <Skull />
      </div>
      <div>
        <div>Unexpected error occured with requested resource: {resource}.</div>
        <div className="italic">Message: {message}</div>
      </div>
    </div>
  );
}

type ErrorMessageProps = { message?: string; resource: string };
