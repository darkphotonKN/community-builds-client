type PageTitleProps = {
  title: string;
};

function MainTitle({ title }: PageTitleProps) {
  return <div className="flex gap-2 text-xl font-medium mr-4">{title}</div>;
}

export default MainTitle;
