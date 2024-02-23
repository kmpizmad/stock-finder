import { Skull } from 'lucide-react';

export default function ErrorMessage({ message = 'Something went wrong.', resource }: ErrorMessageProps): JSX.Element {
  return (
    <div className="flex items-start gap-2 py-4 text-red-500">
      <Skull />
      <div>
        <div>Unexpected error occured with requested resource: {resource}.</div>
        <div className="italic">Message: {message}</div>
      </div>
    </div>
  );
}

type ErrorMessageProps = { message?: string; resource: string };
