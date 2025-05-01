import { TextProps } from './HeaderOne';

function HeaderThree({ children }: TextProps) {
  return (
    <div className="text-customHeaderTwo text-lg font-medium mt-2">
      {children}
    </div>
  );
}

export default HeaderThree;
