import Link from "next/link";

type PageTitleProps = {
  title: string;
};

function MainTitle({ title }: PageTitleProps) {
  return (
    <Link href="/">
      <div className="min-w-[190px] flex gap-2 text-2xl font-medium mr-4">
        {title}
      </div>
    </Link>
  );
}

export default MainTitle;
