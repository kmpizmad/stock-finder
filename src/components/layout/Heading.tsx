export default function Heading({ title }: HeadingProps): JSX.Element {
  return <h1 className="w-full text-2xl font-bold text-center md:text-3xl lg:text-5xl">{title}</h1>;
}

type HeadingProps = { title: string };
