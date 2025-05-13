type PageTitleProps = {
  title: string;
};

function MainTitle({ title }: PageTitleProps) {
  return (
    <div className="min-w-[190px] flex gap-2 text-2xl font-medium mr-4">
      {title}
    </div>
  );
}

export default MainTitle;
